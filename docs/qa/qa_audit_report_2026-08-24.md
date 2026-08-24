# QA Audit Report — 2026-08-24 (Round 2)

> **Build Status:** ✅ 81 pages built in ~1s  
> **Content Freshness:** 🟢 60/60 modules fresh (0 expiring)  
> **Pagefind Index:** 8,317 words across 3 languages  
> **Previous Audit (2026-08-23):** 24 issues found → **24/24 resolved**  
> **This Audit:** **25 unique issues** (after deduplication across 3 parallel auditors)

---

## Audit Methodology

Three specialized subagents ran in parallel:

| Auditor                           | Model          | Scope                                                    | Raw Findings         |
| --------------------------------- | -------------- | -------------------------------------------------------- | -------------------- |
| Medical Content Reviewer          | Gemini 3.1 Pro | 60 content files, provincial data, schema                | 4 (MED-05–08)        |
| UI/UX Design Auditor              | Flash          | All components, pages, generated HTML, print styles      | 12 (UX-13–24)        |
| WCAG 2.1 AA Accessibility Auditor | Flash          | ARIA, semantics, Pa11y coverage, E2E tests, `dist/` HTML | 13 (A11Y-09–21)      |
| **Total raw**                     |                |                                                          | **29**               |
| **After deduplication**           |                |                                                          | **25 unique issues** |

### Deduplicated Overlaps

| Merged Into | Absorbed                         | Reason                                                |
| ----------- | -------------------------------- | ----------------------------------------------------- |
| A11Y-09     | UX-19                            | Both identify dual `<h1>` headings on article pages   |
| A11Y-10     | UX-21 (partial)                  | Both identify `<h3>` skipping `<h2>` on symptom index |
| A11Y-13     | UX-14 (partial), UX-15 (partial) | All identify hardcoded English strings on FR/ZH pages |
| A11Y-18     | UX-17                            | Both identify duplicate brand name in 404 `<title>`   |

---

## Executive Summary

The platform is in **excellent** overall condition after the 8-area strategic roadmap was fully implemented. All 24 original audit issues remain resolved. The new issues cluster around **three systemic patterns**:

1. **i18n Incompleteness** (7 issues) — Hardcoded English strings in ARIA labels, page badges, filter scripts, and metadata labels that bypass `translations.ts` on FR/ZH pages
2. **Heading Hierarchy Violations** (3 issues) — Dual `<h1>` in content + template, skipped heading levels in components
3. **Root vs. `[lang]/` Page Divergence** (1 issue) — Root English pages missed the visual design upgrade

No **Critical** severity issues were found. The platform is functional, accessible at a baseline level, and medically accurate.

---

## Priority Matrix

| Severity     | Count | Issue IDs                                                                               |
| ------------ | ----- | --------------------------------------------------------------------------------------- |
| **Critical** | 0     | —                                                                                       |
| **High**     | 5     | A11Y-09, A11Y-10, A11Y-11, UX-13, UX-15                                                 |
| **Medium**   | 9     | MED-05, A11Y-12, A11Y-13, A11Y-14, A11Y-15, A11Y-19, UX-16, UX-18, MED-06               |
| **Low**      | 11    | MED-07, MED-08, A11Y-16, A11Y-17, A11Y-18, A11Y-20, A11Y-21, UX-20, UX-22, UX-23, UX-24 |

---

## High Severity Issues

### A11Y-09 · Dual `<h1>` Headings on 51 Article Pages

- **WCAG:** 1.3.1, 2.4.6 | **Also reported as:** UX-19
- **Scope:** All tumor, symptom, and journey detail pages
- **Details:** Page templates render `<h1>{title}</h1>` in the header. Content markdown files also begin with `# Title`, compiling to a second `<h1>` inside `<article class="prose">`. Screen readers encounter duplicate level-1 headings.
- **Fix:** Remove the leading `# Title` line from all 51 affected markdown files (or change to `## Subtitle`). The template `<h1>` is the canonical page heading.

### A11Y-10 · Skipped Heading `<h1>` → `<h3>` on Symptom Index Pages

- **WCAG:** 1.3.1, 2.4.6 | **Also reported as:** UX-21 (partial)
- **Files:** `src/pages/[lang]/symptoms/index.astro:L83`, `src/pages/symptoms.astro:L48`
- **Details:** Symptom card titles use `<h3>` directly after `<h1>`, skipping `<h2>`. Tumors index correctly uses `<h2>`.
- **Fix:** Change `<h3>` to `<h2>` on symptom card titles. Add `flex flex-col justify-between h-full` to card containers for uniform alignment.

### A11Y-11 · Skipped Heading Levels in ProvincialFilter & Footer

- **WCAG:** 1.3.1, 2.4.6
- **Files:** `src/components/ProvincialFilter.astro:L39-55`, `src/components/Footer.astro:L34-96`
- **Details:** ProvincialFilter renders `<h3>` and `<h4>` before any `<h2>` on the financial page. Footer uses `<h4>`/`<h5>` which skip levels from the page `<h1>`.
- **Fix:** Promote filter headings to `<h2>`/`<h3>`. In Footer, either use a visually-hidden `<h2>` wrapper or switch to styled `<p>` elements with `role="heading"`.

### UX-13 · Root Pages Missing Visual Design Upgrade

- **Files:** `src/pages/index.astro`, `tumors.astro`, `symptoms.astro`, `financial.astro`, `resources.astro`
- **Details:** The visual design upgrade (warm illustrations, trust badges, card hover micro-interactions, accent colors) was implemented in `src/pages/[lang]/*.astro` but the root English pages still have the legacy design. Visiting `/` shows an outdated homepage vs `/en`.
- **Fix:** Synchronize root pages to match their `[lang]` counterparts, or have root pages redirect/re-export the `[lang]` components with `lang="en"`.

### UX-15 · ProvincialFilter Injects Hardcoded English in Client Script

- **Files:** `src/components/ProvincialFilter.astro:L88, L99`
- **Details:** JavaScript sets `textContent = data.province + " Resources"` and `innerHTML = "<strong>Note on Care Coordination:</strong>"` — hardcoded English even on FR/ZH pages. Translation keys `t.filter.selectedHeading` and `t.filter.notesHeading` exist but are unused by the script.
- **Fix:** Pass localized templates via `define:vars` and use them in the client script.

---

## Medium Severity Issues

### MED-05 · Explicit `medical_disclaimer: true` Missing from Older Content Frontmatter

- **Files:** All journey files (1-6 × 3 langs), symptoms 1-3 (× 3 langs), tumors: all, neuroblastoma, wilms, atrt, medulloblastoma, pineal-gland (× 3 langs) — ~42 files
- **Details:** Schema default is `true`, so the field works correctly at runtime. However, explicit declaration is best practice for auditability. Only the newer files (lymphoma, retinoblastoma, symptoms 4-6) include it.
- **Fix:** Add `medical_disclaimer: true` to all 42 affected frontmatter blocks.

### A11Y-12 · Mobile Navigation Missing Landmark & ARIA States

- **WCAG:** 1.3.1, 4.1.2
- **Files:** `src/components/Header.astro:L119-278`
- **Details:** Desktop `<nav>` is hidden on mobile. Mobile menu is a plain `<div>` outside any `<nav>` landmark. Language switcher `<div aria-label="...">` has no role. Mobile lang toggles lack `aria-current`.
- **Fix:** Wrap mobile menu in `<nav aria-label="Mobile Navigation">`. Add `role="group"` to language containers. Add `aria-current` to mobile lang toggles.

### A11Y-13 · Unlocalized ARIA Labels & UI Strings on FR/ZH Pages

- **WCAG:** 3.1.2 | **Overlaps with:** UX-14, UX-15
- **Files:** `Layout.astro` (skip link), `MedicalDisclaimer.astro` (aria-label), `SearchBar.astro` (ESC text), `JargonTooltip.astro` (aria-label), `tumors/[slug].astro` (badges: "Pediatric Oncology Guide", "Incidence:", "Reviewed by:"), `symptoms/[slug].astro` (badges: "Symptom Management", "Severity:")
- **Details:** Multiple hardcoded English strings appear on French and Chinese pages. Also, severity badge color check only matches English keywords ("high", "emergency"), causing French "Élevée" and Chinese "高" to render in yellow instead of red.
- **Fix:** Source all strings from `translations[currentLang]`. Update severity color check to include FR/ZH equivalents.

### A11Y-14 · Decorative SVGs Missing `aria-hidden="true"`

- **WCAG:** 1.1.1
- **Files:** Section icon SVGs in `[lang]/index.astro`, `tumors/index.astro`, `symptoms/index.astro`, `resources.astro`, `financial.astro`, `journey/[slug].astro`
- **Fix:** Add `aria-hidden="true" focusable="false"` to all decorative SVGs.

### A11Y-15 · Color Contrast Failures in Footer & Homepage Button Hover

- **WCAG:** 1.4.3
- **Files:** `Footer.astro:L109-118` (text-gray-500 on bg-gray-100 = 4.15:1), `[lang]/index.astro:L80-84` (accent button hover = 3.91:1)
- **Fix:** Change footer text to `text-gray-600` (6.86:1). Fix button hover to use darker text or inverse colors.

### A11Y-19 · Pa11y CI Coverage Only 29.6% (24/81 pages)

- **Files:** `.pa11yci`
- **Details:** 57 pages are untested in CI, including all new tumor/symptom guides, journey steps 2-6, and the 404 page.
- **Fix:** Expand `.pa11yci` to cover all 81 routes, or write a script to auto-generate the URL list from `dist/`.

### UX-16 · Mobile Language Switcher Touch Targets Below 44×44px

- **Files:** `src/components/Header.astro:L198-215`
- **Details:** Mobile lang buttons are ~24×24px (`px-2 py-1 text-xs`), below the 44×44px WCAG recommendation.
- **Fix:** Increase to `min-h-[36px] min-w-[36px] px-2.5 py-1.5` with adequate spacing.

### UX-18 · SearchBar Hardcoded Colors & Missing i18n

- **Files:** `src/components/SearchBar.astro:L121, L145, L236`
- **Details:** Pagefind uses hardcoded `#0284c7` instead of `--color-primary: #026aa2`. Translation key `t.search.noResults` exists but isn't passed to Pagefind's `zero_results` option.
- **Fix:** Align CSS variables. Pass `zero_results` translation to PagefindUI init.

### MED-06 · Missing Major Pediatric Cancer Types

- **Details:** Platform covers 8 types. Still missing for comprehensive coverage: AML, Osteosarcoma, Ewing Sarcoma, Rhabdomyosarcoma, Gliomas/DIPG, Ependymoma, Hepatoblastoma.
- **Note:** This is a content expansion recommendation, not a defect. Prioritize AML and bone tumors as highest impact.

---

## Low Severity Issues

### MED-07 · Missing Common Symptom Guides

- **Details:** Missing guides for: Constipation (very common with vincristine), Diarrhea, Bleeding/Thrombocytopenia, Nutritional Support, Neuropathy.

### MED-08 · Incomplete Provincial Resources Data

- **File:** `src/data/provincial_resources.json`
- **Details:** Missing Kingston Health Sciences Centre (ON) and CIUSSS de l'Estrie - CHU de Sherbrooke (QC).

### A11Y-16 · JargonTooltip Focus Visibility & Keyboard Activation

- Uses `focus-within:outline-none` without visible focus ring. Has `role="button"` without Enter/Space handlers. No Escape key dismissal.

### A11Y-17 · SearchBar Focus Restoration & Keydown Overwrite

- Uses `window.onkeydown =` (overwrites handlers). No focus restoration to trigger button on dialog close. Missing `role="search"` landmark.

### A11Y-18 · 404 Page Duplicate Title & Missing Language Attributes

- Title renders as "Page Not Found - Brand Name | Brand Name". Language links lack `lang`/`hreflang`.

### A11Y-20 · External Links Open in New Tab Without Warning

- Hospital links in resources use `target="_blank"` without screen reader notification.
- **Fix:** Add `<span class="sr-only">(opens in a new tab)</span>`.

### A11Y-21 · View Transition Focus Management

- After client-side navigation, focus isn't reset to `#main-content` and page title isn't announced.
- **Fix:** Add `astro:page-load` listener to focus `#main-content`.

### UX-20 · Missing Space in Footer Copyright

- Renders as `© 2026Canadian Pediatric Oncology...` due to Astro stripping newlines between expressions.

### UX-22 · Wizard Navigation Visible in Print

- Previous/Next phase buttons and back links are not hidden by `@media print`.
- **Fix:** Add `print:hidden` class to wizard nav containers.

### UX-23 · Unused CSS Keyframe `fadeIn`

- `@keyframes fadeIn` and `--animate-fade-in` declared but never referenced.

### UX-24 · SearchBar Script Load Race Condition

- `loadPagefindAssets()` resolves immediately if script tag exists but hasn't finished executing.

---

## What Is Working Exceptionally Well ✅

| Area                        | Details                                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Medical Accuracy**        | All 60 content modules are medically accurate with Canadian-first sourcing. Complex topics (ATRT molecular subgroups, ALL MRD monitoring, neuroblastoma MYCN) are handled correctly. |
| **Trilingual Architecture** | Context-preserving language switcher, 305-line translations dictionary, FR/ZH translations are structurally equivalent to EN.                                                        |
| **Breadcrumb Navigation**   | Valid Schema.org BreadcrumbList JSON-LD, localized labels, `aria-current="page"` on terminal crumb.                                                                                  |
| **Search Dialog**           | Native `<dialog>` with focus trapping, ⌘K/Ctrl+K shortcut, ESC dismiss, `aria-haspopup="dialog"`, `aria-labelledby`.                                                                 |
| **Reduced Motion**          | `@media (prefers-reduced-motion: reduce)` zeroes all animations.                                                                                                                     |
| **Print Styles**            | Clean A4 output, suppresses chrome, prints URLs after external links, prevents page breaks inside callouts.                                                                          |
| **Contrast (Core)**         | Primary #026aa2 on white = 5.87:1. All severity badges exceed 7:1.                                                                                                                   |
| **View Transition Compat**  | All interactive components listen to `astro:page-load` alongside DOMContentLoaded.                                                                                                   |
| **Content Freshness**       | 60/60 modules fresh. Automated CI check via `check-medical-expiry.cjs`. Dashboard at `docs/CONTENT_STATUS.md`.                                                                       |
| **E2E Testing**             | Playwright suite with 5 spec files covering journey wizard, i18n switching, mobile menu, 404, and provincial filter.                                                                 |

---

## Recommended Remediation Sprints

### Sprint 1 — Heading & i18n Fix (High Impact, ~2-3 hours)

**Model:** Gemini 3.7 Flash

1. Strip leading `# Title` from all 51 markdown files → fixes **A11Y-09** across all pages
2. Fix `<h3>` → `<h2>` on symptom index cards → fixes **A11Y-10**
3. Fix heading levels in ProvincialFilter and Footer → fixes **A11Y-11**
4. Localize all hardcoded English strings (badges, labels, ARIA, filter script) → fixes **A11Y-13, UX-15, UX-14**
5. Fix severity badge color check for FR/ZH → part of **A11Y-13**

### Sprint 2 — Root Page Sync & Polish (~1-2 hours)

**Model:** Gemini 3.7 Flash

1. Sync root pages with `[lang]` visual design → fixes **UX-13**
2. Add `aria-hidden="true"` to decorative SVGs → fixes **A11Y-14**
3. Fix footer contrast (`text-gray-600`) and button hover → fixes **A11Y-15**
4. Fix mobile lang toggle touch targets → fixes **UX-16**
5. Fix footer copyright spacing → fixes **UX-20**
6. Fix 404 title duplication → fixes **A11Y-18**
7. Add `medical_disclaimer: true` to 42 older frontmatter blocks → fixes **MED-05**

### Sprint 3 — Search, Print & CI Polish (~1 hour)

**Model:** Gemini 3.7 Flash

1. Align SearchBar colors with design tokens, pass i18n to Pagefind → fixes **UX-18**
2. Fix SearchBar focus restoration, use `addEventListener`, add `role="search"` → fixes **A11Y-17**
3. Add `print:hidden` to wizard nav → fixes **UX-22**
4. Wrap mobile menu in `<nav>`, add `role="group"` to lang container → fixes **A11Y-12**
5. Add `(opens in new tab)` to external links → fixes **A11Y-20**
6. Expand `.pa11yci` to cover all 81 routes → fixes **A11Y-19**
7. Clean up unused CSS and script race condition → fixes **UX-23, UX-24**
8. Add View Transition focus management → fixes **A11Y-21**
9. Fix JargonTooltip focus/keyboard → fixes **A11Y-16**

### Sprint 4 — Content Expansion (Ongoing)

**Model:** Gemini 3.1 Pro (requires web search for medical verification)

1. Add AML and bone tumors (Osteosarcoma, Ewing) → addresses **MED-06**
2. Add Constipation and Thrombocytopenia symptom guides → addresses **MED-07**
3. Add missing provincial hospitals → addresses **MED-08**
