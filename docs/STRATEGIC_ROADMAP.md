# Strategic Improvement Roadmap

> **Created:** 2026-08-23  
> **Status:** Active — pick an area and hand it to an agent session  
> **Context:** Generated after completing the full 6-phase QA overhaul. All 24 original audit issues have been resolved. This roadmap focuses on elevating the platform to match and exceed top industry benchmarks.

---

## How to Use This Document

Each improvement area below is self-contained with:
- **Why it matters** — the user/business impact
- **Scope** — what files to create or modify
- **Agent prompt** — a ready-to-paste prompt optimized for the recommended model

**Workflow:**
1. Pick an area from the table below
2. Open a new Antigravity thread with the recommended model
3. Paste the agent prompt (modify if needed)
4. After completion, update `docs/INDUSTRY_BENCHMARK.md` to reflect the new capability
5. Update the status in this document

## Priority Table

| # | Area | Effort | Recommended Model | Status |
|---|---|---|---|---|
| 1 | [Search & SEO](#area-1-search--seo) | Medium | Gemini 3.7 Flash | `[ ]` Not started |
| 2 | [Breadcrumb Navigation](#area-2-breadcrumb-navigation) | Low | Gemini 3.7 Flash | `[ ]` Not started |
| 3 | [404 Page & Print Styles](#area-3-404-page--print-styles) | Low | Gemini 3.7 Flash | `[ ]` Not started |
| 4 | [Expand Cancer Coverage](#area-4-expand-cancer-type-coverage) | High | Gemini 3.1 Pro | `[ ]` Not started |
| 5 | [Expand Symptom Guides](#area-5-expand-symptom-management-guides) | High | Gemini 3.1 Pro | `[ ]` Not started |
| 6 | [Visual & Emotional Design](#area-6-visual--emotional-design-upgrade) | Medium | Gemini 3.7 Flash | `[ ]` Not started |
| 7 | [E2E Testing](#area-7-end-to-end-testing) | Medium | Gemini 3.7 Flash | `[ ]` Not started |
| 8 | [Content Freshness Dashboard](#area-8-content-freshness-dashboard) | Low | Gemini 3.7 Flash | `[ ]` Not started |

> **Tip:** Areas 1–3 can be bundled into a single "UX Foundation" session. Areas 4–5 require a more capable model due to medical accuracy requirements and mandatory web search verification.

---

## Area 1: Search & SEO

**Why:** Parents in crisis need to find information *instantly*. A search box is the single most important UX feature we're missing compared to every major competitor. SEO ensures families find us through Google.

**Scope:**
- Add client-side search using [Pagefind](https://pagefind.app/) (Astro-native, zero-JS static search)
- Add SEO metadata: Open Graph tags (`og:title`, `og:description`, `og:image`), Twitter cards, canonical URLs
- Add structured data (JSON-LD `MedicalWebPage` schema) to clinical content pages
- Add `@astrojs/sitemap` integration for `sitemap.xml` generation

**Key files to create/modify:**
- `src/layouts/Layout.astro` — add OG meta tags and JSON-LD
- New `src/components/SearchBar.astro` — Pagefind search UI
- `astro.config.mjs` — add sitemap integration
- `package.json` — add pagefind dependency

**Agent prompt:**
```
Read the project at /Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology. 
This is a trilingual (EN/FR/ZH) Astro 5 + Tailwind CSS v4 pediatric oncology education site.

Your task: Add search, SEO, and discoverability features.

1. Install and configure Pagefind for client-side static search. Create a SearchBar.astro 
   component and integrate it into the Header. Ensure it works with View Transitions 
   (listen to astro:page-load).
2. Add Open Graph meta tags (og:title, og:description, og:type, og:url) to Layout.astro, 
   making them dynamic based on page props.
3. Add JSON-LD structured data (MedicalWebPage schema from schema.org) to all clinical 
   content pages ([lang]/journey/[slug].astro, [lang]/tumors/[slug].astro, 
   [lang]/symptoms/[slug].astro).
4. Add the @astrojs/sitemap integration to generate a sitemap.xml.
5. Run `npm run build` after all changes to verify. Update docs/SESSION_LOG.md.
```

---

## Area 2: Breadcrumb Navigation

**Why:** Deep pages like `/fr/tumors/medulloblastoma` have no wayfinding context. Breadcrumbs are required for WCAG 2.4.8 (AAA) and dramatically improve usability for overwhelmed parents.

**Scope:**
- Create a `Breadcrumbs.astro` component with `BreadcrumbList` JSON-LD structured data
- Integrate into all `[lang]/` page templates
- Use the `src/i18n/translations.ts` system for localized labels

**Key files:**
- New `src/components/Breadcrumbs.astro`
- Modify: all pages in `src/pages/[lang]/`

**Agent prompt:**
```
Read the project at /Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology. 

Your task: Add breadcrumb navigation to all pages.

1. Create src/components/Breadcrumbs.astro that accepts a `crumbs` prop (array of 
   {label, href} objects) and renders an accessible <nav aria-label="Breadcrumb"> 
   with an <ol> list and BreadcrumbList JSON-LD structured data.
2. Add the Breadcrumbs component to all [lang]/ page templates. Use the i18n translations 
   from src/i18n/translations.ts for localized labels (e.g., "Home" → "Accueil" → "首页").
3. Style with Tailwind: subtle, small text, separator chevrons, current page not linked.
4. Run `npm run build` to verify. Update docs/SESSION_LOG.md.
```

---

## Area 3: 404 Page & Print Styles

**Why:** A custom 404 prevents parents from hitting a dead-end. Print styles let families share clinical guides with grandparents, teachers, or caregivers who may not have internet access.

**Scope:**
- Create `src/pages/404.astro` with empathetic messaging and quick links
- Add `@media print` styles in `global.css`

**Key files:**
- New `src/pages/404.astro`
- Modify `src/styles/global.css`

**Agent prompt:**
```
Read the project at /Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology.

Your task: Create a 404 error page and add print-friendly styles.

1. Create src/pages/404.astro using the existing Layout component. Include a compassionate 
   message ("We couldn't find that page, but we're here to help"), and quick links to the 
   homepage, Journey, Symptoms, and Financial Support sections. Use the i18n translations 
   system and pass lang="en" (Astro serves 404 from root).
2. Add @media print CSS rules to src/styles/global.css that:
   - Hide the header, footer, mobile menu, and skip link
   - Remove background colors and shadows
   - Optimize prose typography for clean A4 printing
   - Show full URLs after links for offline reference
3. Run `npm run build` to verify. Update docs/SESSION_LOG.md.
```

---

## Area 4: Expand Cancer Type Coverage

**Why:** We cover 6 tumor types. Top platforms cover 15-30+. **Lymphoma** (Hodgkin's + Non-Hodgkin's) and **Retinoblastoma** are the most impactful additions to round out the top childhood cancers.

**Scope:**
- 2 new tumor types × 3 languages = 6 new content files
- **ALL content MUST be web-searched and verified** against NCI, COG, SickKids, C17 Council

**Key files:**
- New: `src/content/tumors/{en,fr,zh}/lymphoma.md`
- New: `src/content/tumors/{en,fr,zh}/retinoblastoma.md`

**Agent prompt:**
```
Read the project at /Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology.
Read the existing tumor guide at src/content/tumors/en/all.md to understand the 
required format, frontmatter schema, and tone.

Your task: Create medically verified tumor guides for Lymphoma and Retinoblastoma.

CRITICAL RULES:
- Use web search to verify ALL medical claims against NCI, COG, SickKids, and C17 Council
- Canadian institutions MUST be listed first in authoritative_sources
- Maintain an empathetic, accessible tone for overwhelmed parents
- Include a medical disclaimer field in frontmatter (medical_disclaimer: true)

1. Create src/content/tumors/en/lymphoma.md covering both Hodgkin's and Non-Hodgkin's 
   Lymphoma. Include subtypes, staging, Canadian treatment protocols, and prognosis.
2. Create src/content/tumors/en/retinoblastoma.md covering unilateral vs bilateral, 
   genetic counseling (RB1 gene), treatment (including eye preservation strategies), 
   and Canadian centres of excellence.
3. Create French translations at src/content/tumors/fr/lymphoma.md and 
   src/content/tumors/fr/retinoblastoma.md.
4. Create Chinese translations at src/content/tumors/zh/lymphoma.md and 
   src/content/tumors/zh/retinoblastoma.md.
5. Run `npm run build` to verify. Update docs/SESSION_LOG.md.
```

---

## Area 5: Expand Symptom Management Guides

**Why:** We have 3 symptom guides. Parents frequently deal with 5-10+ side effects. The highest-value additions are **Fatigue/Anemia**, **Hair Loss (Alopecia)**, and **Pain Management**.

**Scope:**
- 3 new symptom guides × 3 languages = 9 new content files

**Key files:**
- New: `src/content/symptoms/{en,fr,zh}/4-fatigue.md`
- New: `src/content/symptoms/{en,fr,zh}/5-alopecia.md`
- New: `src/content/symptoms/{en,fr,zh}/6-pain.md`

**Agent prompt:**
```
Read the project at /Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology.
Read src/content/symptoms/en/1-neutropenia.md to understand the required format.

Your task: Create 3 new symptom management guides in all 3 languages.

CRITICAL RULES:
- Use web search to verify medical accuracy against NCI, COG, SickKids
- Canadian sources listed first in frontmatter
- Include clear emergency red flags, home management tips, and when to call the care team
- Empathetic, scannable tone for sleep-deprived parents

1. 4-fatigue.md: Cancer-related fatigue and anemia. Cover transfusion thresholds, 
   energy conservation strategies, school accommodations, and iron-rich foods.
2. 5-alopecia.md: Chemotherapy-induced hair loss. Cover timeline expectations, emotional 
   support, scalp care, wigs/head coverings (Canadian programs), and regrowth.
3. 6-pain.md: Pain management during treatment. Cover the WHO pain ladder for children, 
   non-pharmacological strategies, when pain indicates an emergency, and Canadian 
   pediatric pain programs.
4. Create FR and ZH translations for all three.
5. Run `npm run build` to verify. Update docs/SESSION_LOG.md.
```

---

## Area 6: Visual & Emotional Design Upgrade

**Why:** The platform is functional and accessible but visually utilitarian. Top-tier pediatric health platforms convey warmth and trust through thoughtful visual design.

**Scope:**
- Add section-specific hero icons/illustrations
- Add subtle card hover effects
- Consider a warm secondary accent color
- Enhance the homepage hero section

**Key files:** `src/styles/global.css`, component files, `src/pages/index.astro`, landing pages

**Agent prompt:**
```
Read the project at /Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology.

Your task: Enhance the visual warmth and emotional design of the platform.

1. Add tasteful section-specific inline SVG icons to the Journey, Tumors, Symptoms, 
   and Financial landing pages (e.g., a gentle heart for Journey, a shield for Symptoms).
2. Add subtle card hover effects (transform: scale(1.02) + shadow elevation) to tumor 
   and symptom card grids.
3. Add a warm secondary accent color (soft amber or warm coral) to the Tailwind theme 
   in global.css for non-clinical callout sections.
4. Enhance the homepage hero with a more inviting layout (larger illustration area, 
   testimonial-style subtitle, or trust badges from partner hospitals).
5. ALL changes must remain WCAG 2.1 AA compliant (check color contrast).
6. Run `npm run build` to verify. Update docs/SESSION_LOG.md.
```

---

## Area 7: End-to-End Testing

**Why:** With 65+ pages and growing, manual testing is unsustainable. Automated regression testing prevents broken navigation flows and language switching bugs.

**Scope:**
- Set up Playwright for E2E testing
- Test critical user flows
- Add to CI pipeline

**Key files:** New `tests/` directory, `playwright.config.ts`, `.github/workflows/ci.yml`

**Agent prompt:**
```
Read the project at /Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology.

Your task: Set up Playwright E2E testing with comprehensive user flow tests.

1. Install Playwright and create playwright.config.ts (use the built Astro preview server).
2. Write tests for:
   - Full Journey wizard: navigate all 6 steps forward, then back
   - Language switching: on /en/journey/1-diagnosis, click FR, verify URL is 
     /fr/journey/1-diagnosis and page content is in French
   - ProvincialFilter: select "Ontario", verify SickKids and OHIP+ appear in results
   - Mobile menu: toggle hamburger, verify nav links become visible
   - 404 page: navigate to /nonexistent, verify 404 content appears
3. Add a Playwright test job to .github/workflows/ci.yml.
4. Run tests locally to verify. Update docs/SESSION_LOG.md.
```

---

## Area 8: Content Freshness Dashboard

**Why:** Medical content has a 1-year expiry enforced by CI. A visual dashboard helps maintainers prioritize content reviews before CI breaks.

**Scope:**
- Extend the medical expiry script to generate a markdown status report
- Add to QA workflow

**Key files:** `scripts/check-medical-expiry.cjs`, new `docs/CONTENT_STATUS.md`

**Agent prompt:**
```
Read the project at /Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology.
Read scripts/check-medical-expiry.cjs to understand the existing expiry checking logic.

Your task: Create a content freshness dashboard.

1. Extend check-medical-expiry.cjs (or create a new script) to generate a markdown 
   report at docs/CONTENT_STATUS.md showing:
   - A table of all content files with their title, language, last review date, 
     days until expiry, and a status emoji (🟢 <6mo, 🟡 6-10mo, 🔴 >10mo)
   - A summary line with total files, files needing review soon, and expired files
2. Add a new npm script: "content-status": "node scripts/generate-content-status.cjs"
3. Add this to the qa-audit skill so it runs as part of QA audits.
4. Run the script to generate the initial report. Update docs/SESSION_LOG.md.
```
