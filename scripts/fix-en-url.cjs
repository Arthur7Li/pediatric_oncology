const fs = require('fs');

let journey = fs.readFileSync('e2e/journey.spec.ts', 'utf8');
journey = journey.replace(/\\\/en/g, '');
// Also fix the Navigate Back: Step 1 -> Step 0 section
journey = journey.replace(/await expect\(page\)\.toHaveURL\(\/\.\*\\\/journey\\\/1-diagnosis\/\);\n    await expect\(page\.getByText\("Step 1 of 7"\)\)\.toBeVisible\(\);\n  \}\);\n\}\);/, 
'await expect(page).toHaveURL(/.*\\/journey\\/0-first-72-hours/);\n    await expect(page.getByText("Step 0 of 7")).toBeVisible();\n  });\n});');

fs.writeFileSync('e2e/journey.spec.ts', journey);
