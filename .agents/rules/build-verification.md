---
name: build-verification
description: Enforces that the agent always runs a build before committing code.
trigger: always_on
---

# Rule: Mandatory Build Verification

1. **Verify Before Committing:** Every time significant code or content changes are made to the platform, you MUST verify that the project builds successfully before staging and committing to version control.
2. **Execution:** Run `npm run build` (or the equivalent build command) in the root directory.
3. **Resolution:** If the build fails, you must diagnose and fix the errors immediately before proceeding with any git operations. Never push broken code to the repository.
