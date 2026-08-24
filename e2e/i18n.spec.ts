import { test, expect } from "@playwright/test";

test.describe("Language Switching & I18n", () => {
  test("switches language preserving slug and updates content accurately", async ({
    page,
  }) => {
    // Start at English Journey Step 1
    await page.goto("en/journey/1-diagnosis");
    await expect(page.locator("h1")).toContainText(
      "Phase 1: Initial Symptoms & Diagnosis",
    );

    // Click French language toggle in desktop header
    const frToggle = page.locator('header a[hreflang="fr"]').first();
    await frToggle.click();

    // Verify URL and French content
    await expect(page).toHaveURL(/.*\/fr\/journey\/1-diagnosis/);
    await expect(page.locator("h1")).toContainText(
      "Phase 1 : Premiers symptômes et diagnostic",
    );
    await expect(page.getByText(/Étape 1 de 6/i)).toBeVisible();

    // Click Chinese language toggle in desktop header
    const zhToggle = page.locator('header a[hreflang="zh"]').first();
    await zhToggle.click();

    // Verify URL and Chinese content
    await expect(page).toHaveURL(/.*\/zh\/journey\/1-diagnosis/);
    await expect(page.locator("h1")).toContainText("第一阶段：早期症状与诊断");
    await expect(page.getByText(/第 1 阶段/i)).toBeVisible();
  });
});
