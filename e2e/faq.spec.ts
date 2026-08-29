import { test, expect } from "@playwright/test";

test.describe("FAQ Page Functionality", () => {
  test("FAQ page renders, filters categories, and expands/collapses properly", async ({
    page,
  }) => {
    await page.goto("en/faq/");

    // 1. Verify heading & breadcrumbs
    await expect(page.locator("h1")).toContainText(
      "Frequently Asked Questions",
    );
    await expect(page.locator("nav[aria-label='Breadcrumb']")).toBeVisible();

    // 2. Test Category Tab Filtering
    const treatmentTab = page.locator(
      "#faq-category-filters button[data-category='treatment']",
    );
    await expect(treatmentTab).toBeVisible();
    await treatmentTab.click();

    // Treatment section should be visible, others hidden
    const treatmentSection = page.locator(
      "section.faq-section[data-category='treatment']",
    );
    await expect(treatmentSection).toBeVisible();
    const diagnosisSection = page.locator(
      "section.faq-section[data-category='diagnosis']",
    );
    await expect(diagnosisSection).toBeHidden();

    // Switch back to all categories
    const allTab = page.locator(
      "#faq-category-filters button[data-category='all']",
    );
    await allTab.click();
    await expect(diagnosisSection).toBeVisible();

    // 3. Test Search filtering
    const searchInput = page.locator("#faq-search");
    await searchInput.fill("chemotherapy");
    // Visible details count should be filtered
    await expect(treatmentSection).toBeVisible();

    // Clear search
    await searchInput.fill("");

    // 4. Test Expand All and Collapse All
    const expandAllBtn = page.locator("#expand-all");
    const collapseAllBtn = page.locator("#collapse-all");

    await expandAllBtn.click();
    const firstDetails = page.locator("details.faq-item").first();
    await expect(firstDetails).toHaveAttribute("open", "");

    await collapseAllBtn.click();
    await expect(firstDetails).not.toHaveAttribute("open");
  });

  test("French and Chinese FAQ pages render localized titles and categories", async ({
    page,
  }) => {
    await page.goto("fr/faq/");
    await expect(page.locator("h1")).toContainText("Questions fréquentes");

    await page.goto("zh/faq/");
    await expect(page.locator("h1")).toContainText("常见问题解答 (FAQ)");
  });
});
