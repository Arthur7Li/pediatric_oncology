import { test, expect } from "@playwright/test";

test.describe("404 Error Page", () => {
  test("displays compassionate 404 content and helpful navigation links", async ({
    page,
  }) => {
    await page.goto("404.html");

    const main = page.locator("main");
    await expect(main.locator("h1")).toContainText("Page Not Found");
    await expect(
      main.getByText("We couldn't find that page, but we're here to help"),
    ).toBeVisible();

    // Verify presence of quick links in main 404 content
    await expect(
      main.getByRole("link", { name: /Return to Home/i }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /The Treatment Journey/i }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /Tumor Guides/i }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /Symptom Management/i }),
    ).toBeVisible();

    // Verify emergency support callout is visible
    await expect(
      main.getByText("Need Immediate Medical Support?"),
    ).toBeVisible();
    await expect(main.getByText(/Kids Help Phone/i)).toBeVisible();
  });
});
