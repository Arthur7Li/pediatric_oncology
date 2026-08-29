import { test, expect } from "@playwright/test";

test("Support page renders charities properly", async ({ page }) => {
  await page.goto("en/support/");

  // Verify the charities heading exists (this is hardcoded/translated)
  const heading = page.locator("h2", {
    hasText: "National & International Fallback Resources",
  });
  await expect(heading).toBeVisible();

  // Verify we have some charity cards rendered
  const cards = page.locator(
    '.charity-card, .support-card, section:has-text("National & International") .bg-white, section:has-text("National & International") .p-6',
  );
  // Just ensure at least some cards are visible
  await expect(cards.first()).toBeVisible();
});
