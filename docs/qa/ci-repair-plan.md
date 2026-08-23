# CI/CD Repair Implementation Plan

> **For Antigravity:** This plan is structured in three mandatory phases — **Verify**, **Evaluate**, then **Implement**.
> Do not skip to Phase 3 without completing the prior verification steps.
> Each issue must be confirmed as genuine before any file is touched.
> Read `.agents/AGENTS.md` and all files under `.agents/rules/` before committing anything.

---

## Background & Diagnosis

Commit `9a822ad` triggered 3 failing checks out of 5:

| Check                 | Status           | Root Cause (preliminary)                                     |
| --------------------- | ---------------- | ------------------------------------------------------------ |
| `quality-assurance`   | ✅ Passing       | —                                                            |
| `build`               | ✅ Passing       | —                                                            |
| `accessibility-audit` | ❌ Failing (36s) | Chrome/Puppeteer cannot launch — missing `--no-sandbox` flag |
| `link-checker`        | ❌ Failing (1m)  | 3 genuinely dead URLs + 2 environmental false positives      |
| `deploy`              | ❌ Failing (5s)  | GitHub Pages not enabled in repository settings              |

The Astro codebase itself builds and type-checks cleanly. No source code logic is broken.

---

## Phase 1 — Verification (Read-Only, No Edits)

Run all steps below. If **any result deviates** from the expected outcome, **halt and report** rather than proceeding.

### 1.1 — Verify Pa11y/Chrome Sandbox Failure

Run Pa11y exactly as CI does:

```bash
npm ci
npm run build
npx serve dist -l 3000 &
sleep 3
pa11y-ci --config .pa11yci
```

**Expected:** Error output containing `FATAL: No usable sandbox!` or `error while loading shared libraries` from a Puppeteer/Chrome process crash.

**If instead:** Pa11y completes and reports actual WCAG violations — stop. That means the sandbox issue is resolved and real accessibility bugs exist. Surface those violations before continuing.

---

### 1.2 — Verify Three Broken External Links

```bash
curl -I --max-time 10 https://www.emilyshouse.ca/
curl -I --max-time 10 https://www.stjude.org/disease/pineal-region-tumors.html
curl -I --max-time 10 https://www.cancer.gov/types/kidney/patient/child-wilms-treatment-pdq
```

**Expected:**

- `emilyshouse.ca` → DNS resolution failure or non-2xx response
- St. Jude pineal URL → `404 Not Found`
- NCI Wilms PDQ URL → `404 Not Found`

**If any returns 200:** It is a Lychee false positive (e.g., bot-detection on CI). Use `--exclude` in Lychee config instead of replacing the link in content.

---

### 1.3 — Verify Two Environmental False Positives

```bash
curl -I --max-time 10 https://www.iwk.nshealth.ca/
curl -I --max-time 10 https://www.canada.ca/en/services/benefits/ei/ei-caregiving.html
```

**Expected:** Both return `200 OK` from your local machine, confirming they are live pages that fail only due to CI runner SSL/timeout constraints.

**If either returns non-200:** It may be a genuine dead link — treat it as such and find a replacement instead.

---

### 1.4 — Verify GitHub Pages Is Not Enabled

```bash
gh api repos/Arthur7Li/pediatric_oncology/pages
```

**Expected:** `404` response, confirming Pages is not active.

**If returns 200:** Pages IS enabled and the deploy failure has a different cause (likely a missing `pages` environment or permissions issue in `deploy.yml`). Stop and surface the actual API response before continuing.

---

## Phase 2 — Evaluate Proposed Fixes

Only proceed after all Phase 1 results match expectations above.

### 2.1 — Pa11y Fix: `chromeLaunchConfig` in `.pa11yci`

**Current file SHA:** `5964b6851d5094d313429c6e88b514f8cc9d3308`

**Current `.pa11yci` content:**

```json
{
  "urls": ["...existing 24 URLs unchanged..."],
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 30000,
    "wait": 2000
  }
}
```

**Proposed change:** Add `chromeLaunchConfig` to the `defaults` block:

```json
"chromeLaunchConfig": {
  "args": ["--no-sandbox", "--disable-setuid-sandbox"]
}
```

**Evaluate:** Confirm that `chromeLaunchConfig.args` is a supported key in Pa11y v6+ by checking the [Pa11y docs](https://github.com/pa11y/pa11y#chromeLaunchConfig). If Pa11y's installed version is below v6, a different approach is needed — check with `pa11y --version`.

**Alternative if Pa11y version is incompatible:** Set `CHROMIUM_FLAGS` env var in the `ci.yml` step instead:

```yaml
env:
  CHROMIUM_FLAGS: "--no-sandbox --disable-setuid-sandbox"
```

---

### 2.2 — Broken Link Fixes: Find and Confirm Replacement URLs

For each dead link, find the canonical live replacement, then `curl -I` it to confirm 200 before using it.

| Dead URL                                                                | Search Strategy                                           | Candidate Replacement                                             |
| ----------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| `https://www.emilyshouse.ca/`                                           | Search "Emily's House Toronto Philip Aziz Centre"         | `https://philipazizcentre.ca/emilys-house/`                       |
| `https://www.stjude.org/disease/pineal-region-tumors.html`              | Search `site:stjude.org pineal region tumors`             | Find current URL from St. Jude search results                     |
| `https://www.cancer.gov/types/kidney/patient/child-wilms-treatment-pdq` | The `/child-` prefix was removed in NCI's URL restructure | `https://www.cancer.gov/types/kidney/patient/wilms-treatment-pdq` |

Confirm each replacement returns `200 OK` before substituting it in content files. Use `grep -r "dead-url" src/ docs/` to find all occurrences of each link before editing.

---

### 2.3 — False Positive Suppression: Lychee `--exclude` Flags

**Current `ci.yml` link-checker args (SHA: `8c8459fb7a40f112bc633e7e8b408a131819b55e`):**

```
--verbose --no-progress --exclude-path './docs/qa' --scheme https --scheme http './**/*.md' './**/*.astro'
```

**Proposed addition:**

```
--exclude 'https://www.iwk.nshealth.ca'
--exclude 'https://www.canada.ca/en/services/benefits/ei'
```

**Evaluate:** Ensure the exclude pattern for `canada.ca` is broad enough to catch the specific EI page but not so broad it masks other legitimately broken canada.ca links. A URL prefix match is preferred over a regex.

---

### 2.4 — GitHub Pages Activation (Manual Step — Cannot Be Automated)

This requires a human action in the GitHub UI:

1. Navigate to: `https://github.com/Arthur7Li/pediatric_oncology/settings/pages`
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

After saving, verify with `gh api repos/Arthur7Li/pediatric_oncology/pages` returning a `200` with `"source": { "branch": null, "path": "/" }` before triggering any deploy run.

> **Note for Antigravity:** You cannot perform this step. Flag it to the repository owner (Arthur7Li) as a required manual action before the deploy job can ever succeed.

---

## Phase 3 — Implementation

Only execute after Phase 1 and Phase 2 are fully complete and all verifications passed.

### 3.1 — Edit `.pa11yci`

File: `.pa11yci` | Current SHA: `5964b6851d5094d313429c6e88b514f8cc9d3308`

Add `chromeLaunchConfig` to the `defaults` block. Preserve all existing URLs exactly. Final structure:

```json
{
  "urls": [
    "http://localhost:3000/",
    "http://localhost:3000/fr",
    "http://localhost:3000/zh",
    "http://localhost:3000/tumors",
    "http://localhost:3000/fr/tumors",
    "http://localhost:3000/zh/tumors",
    "http://localhost:3000/symptoms",
    "http://localhost:3000/fr/symptoms",
    "http://localhost:3000/zh/symptoms",
    "http://localhost:3000/financial",
    "http://localhost:3000/fr/financial",
    "http://localhost:3000/zh/financial",
    "http://localhost:3000/resources",
    "http://localhost:3000/fr/resources",
    "http://localhost:3000/zh/resources",
    "http://localhost:3000/en/journey/1-diagnosis",
    "http://localhost:3000/fr/journey/1-diagnosis",
    "http://localhost:3000/zh/journey/1-diagnosis",
    "http://localhost:3000/en/tumors/all",
    "http://localhost:3000/fr/tumors/all",
    "http://localhost:3000/zh/tumors/all",
    "http://localhost:3000/en/symptoms/1-neutropenia",
    "http://localhost:3000/fr/symptoms/1-neutropenia",
    "http://localhost:3000/zh/symptoms/1-neutropenia"
  ],
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 30000,
    "wait": 2000,
    "chromeLaunchConfig": {
      "args": ["--no-sandbox", "--disable-setuid-sandbox"]
    }
  }
}
```

---

### 3.2 — Edit `.github/workflows/ci.yml`

File: `.github/workflows/ci.yml` | Current SHA: `8c8459fb7a40f112bc633e7e8b408a131819b55e`

In the `link-checker` job, update the `args` value to add the two false-positive excludes:

```yaml
link-checker:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Lychee Broken Link Checker
      uses: lycheeverse/lychee-action@v1.9.3
      with:
        args: >-
          --verbose --no-progress
          --exclude-path './docs/qa'
          --exclude 'https://www.iwk.nshealth.ca'
          --exclude 'https://www.canada.ca/en/services/benefits/ei'
          --scheme https --scheme http
          './**/*.md' './**/*.astro'
        fail: true
```

No other jobs in `ci.yml` should be modified.

---

### 3.3 — Replace Dead Links in Content Files

Use `grep -r` to locate every occurrence of each dead URL across `src/` and `docs/`:

```bash
grep -r "emilyshouse.ca" src/ docs/
grep -r "stjude.org/disease/pineal-region-tumors" src/ docs/
grep -r "cancer.gov/types/kidney/patient/child-wilms-treatment-pdq" src/ docs/
```

Replace each occurrence with the confirmed-live replacement URL found during Phase 2.2. Do not change any surrounding text, anchor labels, or other attributes — only the URL string itself.

---

### 3.4 — Commit Message Convention

All changes should be committed together in a single atomic commit:

```
fix(ci): resolve 3 failing CI checks — Pa11y sandbox, broken links, Lychee false positives

- Add chromeLaunchConfig.args no-sandbox to .pa11yci for GitHub Actions Linux runners
- Replace 3 dead external URLs (emilyshouse.ca, St. Jude pineal, NCI Wilms PDQ)
- Exclude iwk.nshealth.ca and canada.ca/ei from Lychee (SSL/timeout false positives)

Note: GitHub Pages must be manually enabled under Settings → Pages → GitHub Actions
to resolve the deploy job failure. This cannot be automated via workflow changes.
```

---

## Phase 4 — Post-Implementation Validation

After the commit triggers CI, verify each check:

| Check                 | Expected Outcome                                             |
| --------------------- | ------------------------------------------------------------ |
| `accessibility-audit` | ✅ Pa11y completes all 24 routes, reports 0 errors           |
| `link-checker`        | ✅ Lychee reports 0 errors                                   |
| `deploy`              | ✅ Only passes after Arthur7Li manually enables GitHub Pages |
| `quality-assurance`   | ✅ Continues to pass (no source changes)                     |
| `build`               | ✅ Continues to pass (no source changes)                     |

If `accessibility-audit` now passes the Chrome launch but reports **actual WCAG violations**, those are genuine accessibility bugs in the site markup and must be addressed as a separate follow-up task — do not suppress them.

---

## Manual Action Required (Cannot Be Automated)

> **@Arthur7Li** — The `deploy` job will continue to fail until you complete this step manually:
>
> 1. Go to **[Settings → Pages](https://github.com/Arthur7Li/pediatric_oncology/settings/pages)**
> 2. Under **Source**, select **GitHub Actions**
> 3. Click **Save**
>
> This is a one-time repository configuration. No workflow file changes are needed.
