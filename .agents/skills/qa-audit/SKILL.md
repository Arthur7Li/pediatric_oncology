---
name: qa-audit
description: >-
  Use this skill when the user asks to run a quality assurance audit, QA review,
  holistic audit, or platform health check on the Pediatric Oncology educational
  website. This skill orchestrates parallel specialized subagents to audit
  medical content accuracy, UI/UX design quality, and WCAG 2.1 AA accessibility
  compliance, then compiles findings into a timestamped report.
---

# QA Audit Workflow — Pediatric Oncology Platform

This skill runs a comprehensive, parallel audit of the entire platform and
produces a dated report in `docs/qa/`.

## Prerequisites

1. Ensure the project builds cleanly before auditing:
   ```bash
   npm run build
   ```
2. Review the most recent audit report in `docs/qa/` to understand what was
   previously flagged and what has been resolved.

## Step 1: Define & Dispatch Parallel Audit Subagents

Spin up **three specialized subagents** to run concurrently:

### 1a. Medical Content Reviewer

- **Scope:** All files in `src/content/` (journey, tumors, symptoms) across
  all three languages (en/fr/zh), plus `src/pages/tumors.md`,
  `src/pages/resources.md`, `docs/knowledge_base/`, and
  `src/data/provincial_resources.json`.
- **Checks:** Zero medical hallucinations, Canadian-first institutional
  context, empathetic tone, content completeness (missing cancer types or
  journey phases), translation accuracy, source citations, medical disclaimers,
  and Zod schema adequacy in `src/content.config.ts`.
- **Tools:** Use web search to verify any uncertain medical claims against
  NCI, COG, SickKids, and C17 Council.

### 1b. UI/UX Design Auditor

- **Scope:** All files in `src/layouts/`, `src/components/`, `src/pages/`,
  and `src/styles/`.
- **Checks:** Visual hierarchy, Tailwind design-system consistency, mobile
  responsiveness, navigation UX (language switcher, breadcrumbs, back links),
  component polish, micro-interactions, emotional design for parents in crisis.

### 1c. Accessibility (WCAG 2.1 AA) Auditor

- **Scope:** All Astro components, layouts, pages, global CSS, generated HTML
  in `dist/`, Pa11y config (`.pa11yci`), and CI pipeline
  (`.github/workflows/ci.yml`).
- **Checks:** HTML semantics, ARIA patterns, keyboard navigation, color
  contrast, screen reader experience, interactive component accessibility,
  `lang` attribute correctness, `prefers-reduced-motion`, form labels, and
  CI test coverage.

### 1d. Visual Site Inspector (Optional)

- If browser tools are available, also spin up a browser subagent to serve
  the built site (`npx serve dist -l 4321`) and visually inspect key pages
  with screenshots.

## Step 2: Compile Findings

Once all subagents report back:

1. Merge and deduplicate findings across all three audits.
2. Assign severity ratings: **Critical**, **High**, **Medium**, **Low**.
3. Use consistent issue IDs: `MED-XX`, `UX-XX`, `A11Y-XX`, `ARCH-XX`.
4. Note what is working well (to track regressions).
5. Compare against the previous audit report to mark resolved vs. new issues.

## Step 3: Generate the Report

1. Create the report as an artifact named `qa_audit_report.md`.
2. Also save a dated copy to the repository:
   ```
   docs/qa/qa_audit_report_YYYY-MM-DD.md
   ```
3. Include an executive summary table, a priority matrix, and a section on
   what's working well.

## Step 4: Generate or Update the Implementation Plan

If actionable issues are found:

1. Generate an `implementation_plan.md` artifact with phased fixes.
2. Prioritize: Medical accuracy → Accessibility → UX → Polish.
3. Request user approval before execution.

## Verification

After the audit is complete:

- Confirm the report is saved in `docs/qa/`.
- Confirm the build still passes: `npm run build`.
- Update `docs/SESSION_LOG.md` with the audit timestamp and summary.
