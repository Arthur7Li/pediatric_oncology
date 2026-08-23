# Implementation Plan: Elevate Pediatric Oncology Platform to Top-Tier Standards

Based on the comprehensive [qa_audit_report.md](file:///Users/arthurli/.gemini/antigravity/brain/807d6bf5-b6df-4823-970e-d14dbea65782/qa_audit_report.md), this plan systematically addresses all 24+ issues identified across medical content, UI/UX, accessibility, and architecture.

## Guiding Principles

1. **Medical accuracy is non-negotiable** — Zero hallucinations, Canadian-first sourcing
2. **User empathy above aesthetics** — Every design decision optimized for stressed, sleep-deprived parents
3. **Accessibility is a requirement, not a feature** — WCAG 2.1 AA compliance across all 3 languages
4. **Build must always pass** — Verify with `npm run build` after every change batch

---

## Phase 1: Critical Accessibility & Architecture Fixes

_Addresses: A11Y-01, UX-02, UX-03, ARCH-01, ARCH-03_

> [!IMPORTANT]
> These fixes unblock correct screen reader behavior and prevent broken functionality. Must ship first.

### Core Architecture

#### [MODIFY] [Layout.astro](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/layouts/Layout.astro)

- Accept `lang` prop (default: `"en"`) and set `<html lang={lang}>` dynamically
- Add skip navigation link: `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to content</a>`
- Add `id="main-content"` to `<main>`
- Add `<meta name="description">` with page-specific descriptions
- Add `prefers-reduced-motion` CSS media query to global.css

#### [MODIFY] [global.css](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/styles/global.css)

- Add `@media (prefers-reduced-motion: reduce)` rule to disable animations
- Add strong text and blockquote styling to prose class
- Add focus-visible utility styles

#### [MODIFY] [package.json](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/package.json)

- Rename from `"tmp-astro"` to `"canadian-pediatric-oncology-resource"`

### Pass `lang` Through All Pages

#### [MODIFY] All pages in `src/pages/[lang]/`

- Pass `lang` param from `Astro.params` to `<Layout lang={lang}>` in:
  - `[lang]/journey/[slug].astro`
  - `[lang]/symptoms/[slug].astro`
  - (New) `[lang]/tumors/[slug].astro`

#### [MODIFY] Static pages

- Pass `lang="en"` explicitly in: `index.astro`, `symptoms.astro`, `financial.astro`, `resources.md`, `tumors.md`

### Fix Interactive Components

#### [MODIFY] [JargonTooltip.astro](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/components/JargonTooltip.astro)

- Make focusable with `tabindex="0"` and `role="button"`
- Add `aria-describedby` linking to tooltip content
- Add `group-focus-within:opacity-100` alongside hover
- Add unique IDs for each tooltip instance
- Handle Escape key to dismiss

#### [MODIFY] [ProvincialFilter.astro](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/components/ProvincialFilter.astro)

- Add `aria-live="polite"` to `#resource-display`
- Refactor `<script is:inline>` to listen for `astro:page-load` event for View Transitions compatibility
- Add focus management: move focus to results after selection

### Create Missing Tumor Routes

#### [NEW] `src/pages/tumors.astro`

- Replace static `tumors.md` with dynamic Astro component
- Query `tumors` collection for English entries
- Render as card grid (same pattern as symptoms.astro)

#### [NEW] `src/pages/[lang]/tumors/[slug].astro`

- Dynamic route for individual tumor pages (matching journey/symptoms pattern)
- Include prev/next navigation and back-to-list link

---

## Phase 2: Medical Content — Fill Critical Gaps

_Addresses: MED-01, MED-02, MED-03_

> [!IMPORTANT]
> Content must be researched from authoritative sources (NCI, COG, SickKids, C17 Council). No medical hallucinations permitted. All content will be web-searched and verified.

### New Tumor Guides (en/fr/zh × 3 = 9 files)

#### [NEW] `src/content/tumors/{en,fr,zh}/all.md`

- **Acute Lymphoblastic Leukemia (ALL)**: Most common childhood cancer (~25%)
- Cover: What is ALL, subtypes (B-cell vs T-cell), risk stratification, treatment (induction, consolidation, maintenance), Canadian clinical trial participation via C17
- Canadian-first sources: SickKids, CHU Sainte-Justine, COG

#### [NEW] `src/content/tumors/{en,fr,zh}/neuroblastoma.md`

- Cover: What is neuroblastoma, MYCN amplification, staging (INRGSS), treatment approaches, spontaneous regression in infants
- Canadian sources: BC Children's Hospital neuroblastoma program, SickKids

#### [NEW] `src/content/tumors/{en,fr,zh}/wilms-tumor.md`

- Cover: What is Wilms tumor, staging, favorable vs anaplastic histology, treatment (surgery + chemo ± radiation)
- Canadian sources: SIOP approach (used in Canada), SickKids kidney tumor program

### New Journey Phases (en/fr/zh × 2 = 6 files)

#### [NEW] `src/content/journey/{en,fr,zh}/5-relapse.md`

- Cover: Understanding relapse, second-line therapies, clinical trials, emotional impact, Canadian clinical trial networks (C17, POGO)
- Tone: Compassionate, honest, maintaining hope while being realistic

#### [NEW] `src/content/journey/{en,fr,zh}/6-palliative-care.md`

- Cover: Pediatric palliative care philosophy (not giving up — improving quality of life), when it's introduced, hospice vs home care, emotional support for families
- Canadian-specific: Temmy Latner Centre for Palliative Care (SickKids), Roger Neilson House (CHEO), Canuck Place (Vancouver)
- Tone: Extremely sensitive, empathetic, hope-adjacent

### Canadian-First Source Rewrite

#### [MODIFY] All existing content files (30 files)

- Restructure `authoritative_sources` in frontmatter to list Canadian institutions first
- Add Canadian institutional references in body text
- Ensure SickKids, CHU Sainte-Justine, C17 Council, POGO are prominent

---

## Phase 3: UI/UX Overhaul

_Addresses: UX-01, UX-04, UX-05, UX-06, UX-07, UX-08, UX-09, UX-10, UX-11, UX-12, A11Y-03, A11Y-06_

### Navigation System

#### [MODIFY] [Header.astro](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/components/Header.astro)

- **Dynamic language switcher**: Read `Astro.url.pathname`, swap lang prefix, preserve context
- **Active nav state**: Highlight current section using `Astro.url.pathname` matching
- **Mobile hamburger menu**: Hidden nav on small screens with toggle button
- **Touch targets**: Add `px-3 py-2` padding on all nav links
- **Color contrast fix**: Change language toggle from `text-gray-400` to `text-gray-600`
- **ARIA improvements**: Add `hreflang` to language links, `aria-current="page"` to active link, fix `aria-label` alignment
- **Mobile menu ARIA**: `aria-expanded`, `aria-controls`, focus trapping

#### [MODIFY] [Footer.astro](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/components/Footer.astro)

- Add emergency contact information: "In a medical emergency, call 911"
- Add Kids Help Phone: 1-800-668-6868
- Add Crisis Services Canada reference
- Translate footer for i18n support

#### [MODIFY] [index.astro](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/pages/index.astro)

- Replace `bg-sky-600` with `bg-primary` / `hover:bg-primary-dark`
- Add `aria-hidden="true" focusable="false"` to decorative SVG
- Add links to additional sections (Tumors, Symptoms)

#### [MODIFY] [symptoms/[slug].astro](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/pages/%5Blang%5D/symptoms/%5Bslug%5D.astro)

- Fix back link: Change `href="/"` to `href="/symptoms"` with label "← Back to Symptoms"

### Component Polish

#### [MODIFY] [JargonTooltip.astro](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/components/JargonTooltip.astro)

- Add responsive positioning to prevent mobile overflow
- Use CSS `clamp()` or `max-width: min(16rem, calc(100vw - 2rem))`

#### [NEW] `src/components/MedicalDisclaimer.astro`

- Reusable disclaimer component rendered at bottom of all clinical content pages
- Styled as a gentle callout (not alarming)
- Content: "This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your child's oncology team."

---

## Phase 4: Full i18n Translation

_Addresses: ARCH-02, all new Phase 2 content_

### Translate New Content

All new content from Phase 2 needs French and Chinese translations:

- 3 new tumor guides × 2 languages = 6 files
- 2 new journey phases × 2 languages = 4 files
- Total: **10 new translated content files**

### i18n-Aware Static Pages

#### [NEW] `src/pages/[lang]/tumors.astro` (optional — if full i18n routing desired)

- Tumor index page that filters by `lang` param

#### [MODIFY] `src/pages/symptoms.astro`

- Accept lang context and filter content collection accordingly

---

## Phase 5: Content Enrichment & Hardening

_Addresses: MED-04, remaining medium/low issues_

### Schema Improvements

#### [MODIFY] [content.config.ts](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/content.config.ts)

- Add `medical_disclaimer: z.boolean().default(true)` to all schemas
- Add `canadian_sources: z.array(z.string()).optional()` for explicit Canadian citation tracking
- Consider `icd_code: z.string().optional()` for standardized disease metadata

### Indigenous-Specific Resources

#### [MODIFY] [provincial_resources.json](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/src/data/provincial_resources.json)

- Add Non-Insured Health Benefits (NIHB) details to relevant territories
- Add culturally safe care notes where available (e.g., Indigenous liaison workers at Stollery, CHEO)

#### [MODIFY] [financial_logistics.md](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/docs/knowledge_base/financial_logistics.md)

- Add section on Indigenous-specific health benefits and travel programs

---

## Phase 6: CI/CD & QA Hardening

_Addresses: A11Y-07, A11Y-08_

#### [MODIFY] [.pa11yci](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/.pa11yci)

- Expand URL list to include French and Chinese routes
- Add at least one page per content type per language

#### [MODIFY] [ci.yml](file:///Users/arthurli/.gemini/antigravity/scratch/pediatric_oncology/.github/workflows/ci.yml)

- Update `node-version: 20` → `node-version: 22` to match `package.json` engines
- Use full `.pa11yci` config instead of single URL in pa11y-ci command

---

## Open Questions

> [!IMPORTANT]
> **Scope of i18n for static pages**: The `resources.md`, `financial.astro`, and `tumors.md` pages currently exist only in English. Should we create full French and Chinese translations of these static pages, or is translating the content collections (journey, tumors, symptoms) sufficient for now?

> [!IMPORTANT]
> **Palliative care content sensitivity**: The Phase 5 "Palliative Care" journey step is extremely sensitive. Should we add a content warning/opt-in before displaying this content, or present it neutrally alongside the other journey phases?

> [!IMPORTANT]
> **Additional cancer types beyond ALL/Neuroblastoma/Wilms**: Should we also add Lymphoma (Hodgkin's and Non-Hodgkin's) and Retinoblastoma to be truly comprehensive, or are the 3 proposed additions sufficient for this iteration?

---

## Verification Plan

### Automated Tests

```bash
# After each phase:
npm run build          # Must produce 0 errors
npm run check          # Astro type checking
npm run format:check   # Prettier formatting
node scripts/check-medical-expiry.cjs  # Medical review dates

# Full QA suite:
npm run qa
```

### Manual Verification

- **Screen reader testing**: VoiceOver on macOS for all 3 languages
- **Keyboard navigation**: Full tab-through of every page, test skip link, test tooltip focus, test provincial filter
- **Mobile testing**: Responsive behavior at 320px, 375px, 768px, 1024px breakpoints
- **Color contrast**: Verify all text against backgrounds using WebAIM contrast checker
- **Medical review**: All new content will be web-searched against authoritative sources before writing
- **Build output**: Verify page count increases from 26 to ~50+ after all new content

### Expected Final Output

- **~50+ static pages** (up from 26)
- **6 tumor guides** (up from 3) across 3 languages
- **6 journey phases** (up from 4) across 3 languages
- **Full WCAG 2.1 AA compliance**
- **Zero medical hallucinations**
- **Canadian-first sourcing on all content**
