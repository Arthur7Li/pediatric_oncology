import { test, expect } from "@playwright/test";

test.describe("Provincial Support Filter", () => {
  test("filters resources for Ontario and displays SickKids and OHIP+", async ({
    page,
  }) => {
    await page.goto("en/support");

    const select = page.locator("#province-select");
    await expect(select).toBeVisible();

    // Initially resource display is hidden
    const resourceDisplay = page.locator("#resource-display");
    await expect(resourceDisplay).toBeHidden();

    // Select Ontario
    await select.selectOption("Ontario");

    // Verify resource display is now visible
    await expect(resourceDisplay).toBeVisible();

    // Verify SickKids appears in hospitals list
    const hospitalsList = page.locator("#display-hospitals");
    await expect(hospitalsList).toContainText("SickKids");

    // Verify OHIP+ appears in financial list
    const financialList = page.locator("#display-financial");
    await expect(financialList).toContainText("OHIP+");
  });
});
