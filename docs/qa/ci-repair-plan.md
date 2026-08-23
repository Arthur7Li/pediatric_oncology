# CI/CD Repair & Hardening Plan

This document outlines the phased repair and hardening strategy for the Canadian Pediatric Oncology platform's GitHub Actions CI/CD pipelines (`ci.yml` and `deploy.yml`), ensuring 100% reliable automated quality assurance, broken link checking, accessibility auditing, and static site deployment.

---

## Current CI Architecture & Identified Failure Risks

1. **Accessibility Audit Job (`accessibility-audit` in `ci.yml`):**
   - **Risk:** In GitHub Actions `ubuntu-latest` runners, Puppeteer fails when attempting to launch Chrome without the `--no-sandbox` flag.
   - **Risk:** A fixed `sleep 3` after `npx serve dist -l 3000 &` is brittle and prone to race conditions if the server takes longer to bind to port 3000 in CI.
   - **Fix:** Updated `.pa11yci` with `chromeLaunchConfig` specifying `--no-sandbox`, `--disable-setuid-sandbox`, and `--disable-dev-shm-usage`. Added `wait-on` to `devDependencies` and use `npx wait-on http://localhost:3000` to guarantee server availability before launching `pa11y-ci`.

2. **Link Checker Job (`link-checker` in `ci.yml`):**
   - **Risk:** `lycheeverse/lychee-action` attempts HTTP requests against external hospital domains (_CHU Sainte-Justine_, _BC Children's_, _Stollery_, _AboutKidsHealth_). Some Canadian health authority firewalls block GitHub Actions runner IP ranges (returning HTTP 403 Forbidden or timeouts), which falsely breaks the CI pipeline.
   - **Fix:** Configured Lychee with `--accept 200,204,403`, `--timeout 15`, `--max-retries 2`, and exclude known anti-bot health firewall endpoints while rigorously validating all internal routes and authoritative documentation links.

3. **Quality Assurance Job (`quality-assurance` in `ci.yml`):**
   - **Status:** Currently verifies `npm run format:check`, `npm run check`, `npm run build`, and `node scripts/check-medical-expiry.cjs`.
   - **Optimization:** Added dependency caching, unified test scripts (`npm test`, `npm run test:a11y`, `npm run ci`) in `package.json`, and ensured exact Node 22 compatibility.

---

## Phased Implementation Plan

### Phase 1: CI Pipeline Hardening & Headless Sandbox Resilience (Completed)

- [x] Configure `.pa11yci` with explicit Linux Chrome sandbox bypass flags (`--no-sandbox`, `--disable-setuid-sandbox`, `--disable-dev-shm-usage`).
- [x] Update `.github/workflows/ci.yml` accessibility step to use `npx wait-on http://localhost:3000` instead of `sleep 3`.
- [x] Update `.github/workflows/ci.yml` link checker step with bot-resilient flags (`--accept 200,204,403`, `--timeout 15`, `--max-retries 2`).
- [x] Verify local build and accessibility suite.

### Phase 2: Test Script Harmonization & Package Scripts (Completed)

- [x] Add `npm run test:a11y`, `npm test`, and `npm run ci` commands to `package.json` to mirror CI operations locally.
- [x] Add `pa11y-ci`, `wait-on`, and `serve` to `devDependencies` in `package.json`.
- [x] Update `.github/workflows/ci.yml` to leverage local devDependencies directly.
- [x] Verify complete pipeline dry-run (`npm test`, `npm run ci`).

### Phase 3: GitHub Pages Deployment & Release Verification (Completed)

- [x] Verify `deploy.yml` permissions (`contents: read`, `pages: write`, `id-token: write`) and caching.
- [x] Test production build artifact structure (`./dist` containing 65 static pages).
- [x] Execute end-to-end build verification, stage all changes, and commit & push to GitHub repository.
