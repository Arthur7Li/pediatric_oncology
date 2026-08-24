import { test, expect } from "@playwright/test";

test.describe("Mobile Navigation Menu", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("toggles mobile menu drawer on hamburger button click", async ({
    page,
  }) => {
    await page.goto("en");

    const mobileMenu = page.locator("#mobile-menu");
    const menuButton = page.locator("#mobile-menu-button");

    await expect(menuButton).toBeVisible();
    await expect(mobileMenu).toBeHidden();

    // Open mobile menu
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // Verify navigation links inside mobile menu
    await expect(
      mobileMenu.getByRole("link", { name: "The Journey" }),
    ).toBeVisible();
    await expect(
      mobileMenu.getByRole("link", { name: "Tumor Guides" }),
    ).toBeVisible();
    await expect(
      mobileMenu.getByRole("link", { name: "Symptoms" }),
    ).toBeVisible();
    await expect(
      mobileMenu.getByRole("link", { name: "Financial Support" }),
    ).toBeVisible();

    // Close mobile menu
    await menuButton.click();
    await expect(mobileMenu).toBeHidden();
  });
});
