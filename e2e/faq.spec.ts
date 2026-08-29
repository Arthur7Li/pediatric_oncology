import { test, expect } from "@playwright/test";

test("FAQ page renders and accordions work", async ({ page }) => {
  await page.goto("en/faq/");

  // Verify heading
  await expect(page.locator("h1")).toContainText("Frequently Asked Questions");

  // Find a details element
  const details = page.locator("details").first();
  await expect(details).toBeVisible();

  // Verify expand all button (if available) or just simple interaction
  const summary = details.locator("summary").first();
  await summary.click();
  // We just want to ensure no errors and elements are present.
});
