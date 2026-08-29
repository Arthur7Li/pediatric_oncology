import { test, expect } from "@playwright/test";

test.describe("Provincial Support Filter", () => {
  test("filters resources for Ontario and displays SickKids and OHIP+", async ({
    page,
  }) => {
    await page.goto("en/support/");

    const select = page.locator("#province-select");
    await expect(select).toBeVisible();

    // Select Ontario
    await select.selectOption("Ontario");

    // Verify Ontario view is now visible
    const ontarioView = page.locator('.province-view[data-province-id="Ontario"]');
    await expect(ontarioView).toBeVisible();

    // Verify SickKids appears in hospitals list (it's inside ontarioView)
    await expect(ontarioView).toContainText("SickKids");

    // Verify OHIP+ appears in financial list
    await expect(ontarioView).toContainText("OHIP+");
  });
});
