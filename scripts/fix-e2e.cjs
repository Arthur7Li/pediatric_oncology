const fs = require("fs");

// Fix charities.spec.ts
let char = fs.readFileSync("e2e/charities.spec.ts", "utf8");
char = char.replace(
  "await page.goto('/en/support');",
  "await page.goto('en/support');",
);
fs.writeFileSync("e2e/charities.spec.ts", char);

// Fix glossary.spec.ts
let glo = fs.readFileSync("e2e/glossary.spec.ts", "utf8");
glo = glo.replace(
  "await page.goto('/en/glossary');",
  "await page.goto('en/glossary');",
);
fs.writeFileSync("e2e/glossary.spec.ts", glo);

// Fix faq.spec.ts
let faq = fs.readFileSync("e2e/faq.spec.ts", "utf8");
faq = faq.replace("await page.goto('/en/faq');", "await page.goto('en/faq');");
fs.writeFileSync("e2e/faq.spec.ts", faq);

// Fix i18n.spec.ts
let i18n = fs.readFileSync("e2e/i18n.spec.ts", "utf8");
i18n = i18n.replace(/de 6/g, "de 7").replace(/共 6 阶段/g, "共 7 阶段");
fs.writeFileSync("e2e/i18n.spec.ts", i18n);

// Fix journey.spec.ts
let journey = fs.readFileSync("e2e/journey.spec.ts", "utf8");
journey = journey.replace(/of 6/g, "of 7");
journey = journey.replace(
  'await page.goto("en/journey/1-diagnosis");',
  'await page.goto("en/journey/0-first-72-hours");\n' +
    '    await expect(page.locator("h1")).toContainText("Phase 0: The First 72 Hours");\n' +
    '    await expect(page.getByText("Step 0 of 7")).toBeVisible();\n' +
    '    await page.getByRole("link", { name: "Next Phase →" }).click();\n' +
    "    await expect(page).toHaveURL(/.*\\/en\\/journey\\/1-diagnosis/);",
);
journey = journey.replace(
  "// Navigate Back: Step 2 -> Step 1",
  "// Navigate Back: Step 2 -> Step 1\n" +
    '    await page.getByRole("link", { name: /Previous Phase/ }).click();\n' +
    "    await expect(page).toHaveURL(/.*\\/en\\/journey\\/1-diagnosis/);\n" +
    '    await expect(page.getByText("Step 1 of 7")).toBeVisible();\n' +
    "    // Navigate Back: Step 1 -> Step 0",
);
fs.writeFileSync("e2e/journey.spec.ts", journey);

// Fix mobile-menu.spec.ts
let mobile = fs.readFileSync("e2e/mobile-menu.spec.ts", "utf8");
mobile = mobile.replace(/Symptoms/g, "Symptom Care");
fs.writeFileSync("e2e/mobile-menu.spec.ts", mobile);
