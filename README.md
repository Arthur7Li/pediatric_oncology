# Canadian Pediatric Oncology Educational Platform

## Mission

To provide a comprehensive, unified, and easy-to-understand educational platform for families facing a pediatric oncology diagnosis. The platform bridges the gap between dense medical jargon and fragmented resources, specifically tailored to the **Canadian healthcare context**, with deep dives into rare conditions like Pineal Gland tumors.

## Project Structure

- `docs/`: Documentation, research reports, quality assurance audits (`qa/`), and knowledge base (`knowledge_base/`).
  - `docs/SESSION_LOG.md`: Mandatory working document logging all workflow changes.
- `.agents/`: Antigravity agentic workflow harness. Contains the main `AGENTS.md` configuration, agent `rules/` (fact-checking, tone guidelines, session logging, build verification), and reusable `skills/` (like QA auditing).
- `src/`: The Astro 5 (Content Collections, ViewTransitions) and Tailwind CSS v4 source code for the web platform.
- `scripts/`: Custom scripts for CI/CD and QA (e.g., medical expiry checks).

## Development Commands

All commands are run from the root of the project:

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/`     |
