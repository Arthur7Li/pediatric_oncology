# Canadian Pediatric Oncology Educational Platform

[![Deploy to GitHub Pages](https://github.com/canadian-pediatric-oncology/pediatric_oncology/actions/workflows/deploy.yml/badge.svg)](https://github.com/canadian-pediatric-oncology/pediatric_oncology/actions/workflows/deploy.yml)
[![CI & QA Pipeline](https://github.com/canadian-pediatric-oncology/pediatric_oncology/actions/workflows/ci.yml/badge.svg)](https://github.com/canadian-pediatric-oncology/pediatric_oncology/actions/workflows/ci.yml)
[![Accessibility: WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA%20Pass-success)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Languages: EN | FR | ZH](https://img.shields.io/badge/Languages-EN%20%7C%20FR%20%7C%20ZH-blue)](https://astro.build/config)

🌐 **Live Website:** [https://canadian-pediatric-oncology.github.io/pediatric_oncology/](https://canadian-pediatric-oncology.github.io/pediatric_oncology/)

---

## Mission

To provide a compassionate, medically verified, and trilingual (English, French, and Simplified Chinese) educational platform for families navigating childhood cancer within the **Canadian healthcare system**. The platform translates complex medical jargon into clear, reassuring guidance, prioritizes authoritative Canadian clinical institutions (_SickKids_, _CHU Sainte-Justine_, _C17 Council_, _POGO_, _BC Children's_, _Stollery_, _CHEO_, _IWK_), and details provincial and Indigenous health coverage.

---

## Key Features

1. **Trilingual Architecture & In-Place Language Toggle (EN / FR / ZH):**
   - Seamless, persistent language switching across all 96 static pages without loss of context.
   - Fully localized navigation, emergency crisis banners, medical disclaimers, and disease guides.

2. **Pediatric Tumor & Malignancy Guides:**
   - Deep-dive clinical guides for **11 major pediatric cancers**:
     - _Acute Lymphoblastic Leukemia (ALL)_ & _Acute Myeloid Leukemia (AML)_
     - _Neuroblastoma_
     - _Wilms Tumor (Nephroblastoma)_
     - _Pediatric Lymphoma (Hodgkin & Non-Hodgkin)_
     - _Retinoblastoma_
     - _Osteosarcoma_ & _Ewing Sarcoma_
     - _Pineal Gland Tumors (Pineoblastoma, Pineocytoma, Germ Cell)_
     - _Medulloblastoma_ & _Atypical Teratoid/Rhabdoid Tumor (ATRT)_
   - Covers risk stratification, molecular diagnostics, standard protocols, cellular therapies (CAR-T, Blinatumomab), and at-home care.

3. **6-Phase Treatment Journey Roadmap:**
   - **Phase 1:** Initial Symptoms & Diagnosis (Scans, biopsies, staging)
   - **Phase 2:** Treatment Protocols (Chemotherapy, radiation, surgery, BMT/HSCT)
   - **Phase 3:** Long-Term Survivorship & Follow-Up Care (POGO clinics, COG late-effects monitoring)
   - **Phase 4:** Mental Health & Sibling Support (Care for "glass children", Child Life specialists)
   - **Phase 5:** Navigating Relapse (Second-line regimens, cellular therapies, clinical trials)
   - **Phase 6:** Compassionate Care & Pediatric Palliative Support (Concurrent care, symptom management, hospice respite)

4. **At-Home Symptom Management:**
   - Medical protocols for _Febrile Neutropenia_ (Urgent emergency guidance), _Mucositis_ (Oral mouthwash recipes and soft diet), _Chemotherapy-Induced Nausea and Vomiting (CINV)_, _Fatigue & Anemia_, _Alopecia_, _Pain Management_, _Constipation_, and _Thrombocytopenia (Low Platelets)_.

5. **Financial, Provincial & Indigenous Health Logistics:**
   - Provincial Healthcare breakdowns (OHIP+, RAMQ, Fair PharmaCare).
   - Federal Employment Insurance (EI) Family Caregiver Benefit for Children (up to 35 weeks).
   - **Indigenous Health Support & NIHB:** Medical travel, airfare, meals, accommodations for patient and escort, and non-insured health benefits.
   - Interactive provincial filter with out-of-province care coordination notes.

6. **Specialized Hospital Resource Directory:**
   - Comprehensive profiles for premier Canadian pediatric centers and supplementary US research hubs (_St. Jude_, _CHOP_).

---

## Technical Stack & Standards

- **Framework:** [Astro 5](https://astro.build) with Content Collections (Zod schemas, glob loaders) & View Transitions (`ClientRouter`).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with custom accessible color themes (4.5:1+ contrast ratios).
- **Accessibility:** Strict **WCAG 2.1 AA** compliance audited across 24 routes via [Pa11y](https://pa11y.org/).
- **Quality Assurance:** Type checking (`astro check`), Prettier code formatting, and automated annual medical review expiry validation.

---

## Repository Structure

```
├── .agents/                    # Antigravity agentic harness
│   ├── AGENTS.md               # Core configuration and directives
│   ├── rules/                  # Mandatory quality rules (fact-checking, tone, logging, build verification)
│   └── skills/qa-audit/        # Reusable QA audit automation skill
├── .github/workflows/          # CI/CD pipelines (QA, Broken link check, Pa11y accessibility audit, Deployment)
├── docs/                       # Feasibility, session logs, and knowledge base
│   ├── SESSION_LOG.md          # Chronological working log of all changes and audits
│   ├── INDUSTRY_BENCHMARK.md   # Living comparison vs. NHS, SickKids, St. Jude (update after each release)
│   ├── STRATEGIC_ROADMAP.md    # Prioritized improvement areas with ready-to-use agent prompts
│   ├── qa/                     # Holistic QA audit reports and implementation plans
│   └── knowledge_base/         # Verified medical, financial, and institutional references
├── scripts/                    # Build scripts (check-medical-expiry.cjs)
├── src/
│   ├── components/             # Reusable Astro components (Header, Footer, Tooltip, Disclaimer, Filter)
│   ├── content/                # Trilingual content collections (journey/, tumors/, symptoms/)
│   ├── data/                   # Provincial resources JSON data
│   ├── i18n/                   # Centralized translations dictionary (EN, FR, ZH)
│   ├── layouts/                # Base HTML layout with dynamic lang, meta, and skip navigation
│   └── pages/                  # Static and dynamic localized Astro routes ([lang]/...)
└── astro.config.mjs            # Astro configuration
```

---

## Development & Verification Commands

All commands are run from the repository root:

| Command                                 | Description                                                             |
| :-------------------------------------- | :---------------------------------------------------------------------- |
| `npm install`                           | Install all project dependencies                                        |
| `npm run dev`                           | Start Astro development server (`http://localhost:4321`)                |
| `npm run build`                         | Build 96 static production pages to `./dist/`                           |
| `npm run preview`                       | Preview production build locally                                        |
| `npm run check`                         | Run Astro type and component diagnostics                                |
| `npm run format`                        | Auto-format codebase using Prettier                                     |
| `npm run format:check`                  | Verify code formatting compliance                                       |
| `npm run qa`                            | Run full QA suite (`check`, `format:check`, and `check-medical-expiry`) |
| `npm test`                              | Alias to `npm run qa`                                                   |
| `node scripts/check-medical-expiry.cjs` | Validate that all medical content is within the 1-year review window    |

---

## Medical Disclaimer

_This platform is designed strictly for educational purposes to assist families navigating the Canadian pediatric healthcare system. It does not provide medical diagnoses, treatment plans, or individual medical advice. Always consult your child's primary pediatric oncology team for specific medical care. In a medical emergency (such as a fever during neutropenia), call 911 or visit your nearest Emergency Department immediately._
