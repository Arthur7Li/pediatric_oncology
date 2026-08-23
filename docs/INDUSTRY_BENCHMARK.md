# Industry Benchmark Comparison

> **Last Updated:** 2026-08-23  
> **Purpose:** Track how our platform compares to the top pediatric oncology educational platforms worldwide. Update this document after every significant feature release to measure progress and identify remaining gaps.

---

## Our Competitive Position

Our platform's unique value proposition is the **combination** of trilingual Canadian-first content, a guided step-by-step journey, comprehensive provincial financial support guides, and full WCAG 2.1 AA accessibility — a combination that no single competitor offers.

## Feature Comparison Matrix

| Benchmark Feature | NHS Children's Cancer | AboutKidsHealth (SickKids) | Together by St. Jude | **Our Platform** | Notes |
|---|---|---|---|---|---|
| **Multilingual** | ✅ 20+ langs | ❌ EN only | ⚠️ EN/ES | ✅ **EN/FR/ZH** | We cover Canada's two official languages + Mandarin Chinese |
| **Step-by-step Journey** | ❌ | Partial | ✅ | ✅ **6 phases** | Diagnosis → Treatment → Survivorship → Sibling Support → Relapse → Palliative Care |
| **Cancer Type Coverage** | ✅ Extensive (30+) | ✅ Extensive (30+) | ✅ Extensive (30+) | ⚠️ **6 types** | ALL, ATRT, Medulloblastoma, Neuroblastoma, Pineal Gland, Wilms |
| **Symptom Management** | ✅ 10+ guides | ✅ 10+ guides | ✅ 10+ guides | ⚠️ **3 guides** | Neutropenia, Mucositis, Nausea |
| **Provincial/Regional Guide** | N/A (UK) | ❌ | N/A (US) | ✅ **13 provinces** | **Unique — no competitor offers this** |
| **Financial Support Guide** | ❌ | ❌ | ❌ | ✅ **Comprehensive** | **Unique — EI benefits, provincial pharmacare, charity grants, NIHB** |
| **Indigenous Health Resources** | ❌ | ❌ | ❌ | ✅ **NIHB + navigators** | **Unique — CHEO Inuit navigators, Stollery Awasisak program** |
| **Emergency Guidance** | ✅ | ✅ | ✅ | ✅ | 911, Kids Help Phone, 988, CCS in footer |
| **Accessibility (WCAG AA)** | ✅ | ✅ | ✅ | ✅ | 24-route Pa11y CI suite, skip links, ARIA, keyboard nav |
| **Search / Site Map** | ✅ | ✅ | ✅ | ❌ Missing | Priority improvement |
| **Print-Friendly / PDF** | ✅ | ✅ | ✅ | ❌ Missing | Important for caregivers |
| **Dark Mode** | ❌ | ❌ | ❌ | ❌ | Low priority — no competitor has this either |
| **Clinical Trial Finder** | ❌ | ❌ | ✅ | ❌ Missing | Could link to C17/COG trial registries |
| **User Personalization** | ❌ | ❌ | Partial | ❌ | Future consideration |
| **SEO / Open Graph** | ✅ | ✅ | ✅ | ⚠️ Basic | Has meta description but no OG tags or JSON-LD |
| **404 Error Page** | ✅ | ✅ | ✅ | ❌ Missing | Quick win |
| **Breadcrumb Navigation** | ✅ | ✅ | ✅ | ❌ Missing | Important for deep pages |
| **E2E Testing** | ✅ (internal) | ✅ (internal) | ✅ (internal) | ❌ Missing | Important for regression prevention |

## Our Unique Strengths 🍁

These are features where **we lead the industry** — no other pediatric oncology platform offers them:

1. **Provincial Healthcare Navigation** — Interactive filter covering all 13 Canadian provinces/territories with hospital referral chains, provincial drug plans, and out-of-province care coordination
2. **Trilingual Financial Support** — Comprehensive guide to EI Family Caregiver Benefits, OHIP+, RAMQ, Fair PharmaCare, and charity grants (POGO, Leucan, Kids Cancer Care) in EN/FR/ZH
3. **Indigenous Health Benefits Integration** — NIHB travel logistics, culturally safe care liaisons, and Indigenous Health Navigator programs at major centres
4. **Open-Source & Community-Driven** — Fully open repository with automated medical expiry checks, CI/CD, and an agentic QA workflow for continuous improvement

---

## How to Update This Document

After implementing a significant feature:

1. Change the corresponding row from ❌/⚠️ to ✅ 
2. Update the **Notes** column with specifics
3. Update the **Last Updated** date at the top
4. If a new benchmark feature emerges from competitor analysis, add a new row
5. Commit with message: `docs: update industry benchmark after [feature name]`
