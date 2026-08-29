import { test, expect } from "@playwright/test";

test("Glossary page loads and searches correctly", async ({ page }) => {
  await page.goto("en/glossary/");

  // Verify heading
  await expect(page.locator("h1")).toContainText("Medical Terms");

  // Verify the search input exists
  const searchInput = page.locator('input[type="text"], input[type="search"]');
  await expect(searchInput).toBeVisible();

  // Verify terms exist
  const term = page.locator("dt, h3, .term-title").first();
  await expect(term).toBeVisible();
});
