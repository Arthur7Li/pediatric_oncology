import { test, expect } from "@playwright/test";

test.describe("Treatment Journey Wizard", () => {
  test("navigates forward through all 6 steps and back to step 1", async ({
    page,
  }) => {
    // Step 1: Diagnosis
    await page.goto("en/journey/1-diagnosis");
    await expect(page.locator("h1")).toContainText(
      "Phase 1: Initial Symptoms & Diagnosis",
    );
    await expect(page.getByText("Step 1 of 6")).toBeVisible();

    // Navigate to Step 2: Treatment
    await page.getByRole("link", { name: "Next Phase →" }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/2-treatment/);
    await expect(page.getByText("Step 2 of 6")).toBeVisible();

    // Navigate to Step 3: Survivorship
    await page.getByRole("link", { name: "Next Phase →" }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/3-survivorship/);
    await expect(page.getByText("Step 3 of 6")).toBeVisible();

    // Navigate to Step 4: Sibling Support
    await page.getByRole("link", { name: "Next Phase →" }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/4-sibling-support/);
    await expect(page.getByText("Step 4 of 6")).toBeVisible();

    // Navigate to Step 5: Relapse
    await page.getByRole("link", { name: "Next Phase →" }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/5-relapse/);
    await expect(page.getByText("Step 5 of 6")).toBeVisible();

    // Navigate to Step 6: Palliative Care
    await page.getByRole("link", { name: "Next Phase →" }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/6-palliative-care/);
    await expect(page.getByText("Step 6 of 6")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Next Phase →" }),
    ).not.toBeVisible();

    // Navigate Back: Step 6 -> Step 5
    await page.getByRole("link", { name: /Previous Phase/ }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/5-relapse/);

    // Navigate Back: Step 5 -> Step 4
    await page.getByRole("link", { name: /Previous Phase/ }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/4-sibling-support/);

    // Navigate Back: Step 4 -> Step 3
    await page.getByRole("link", { name: /Previous Phase/ }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/3-survivorship/);

    // Navigate Back: Step 3 -> Step 2
    await page.getByRole("link", { name: /Previous Phase/ }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/2-treatment/);

    // Navigate Back: Step 2 -> Step 1
    await page.getByRole("link", { name: /Previous Phase/ }).click();
    await expect(page).toHaveURL(/.*\/en\/journey\/1-diagnosis/);
    await expect(page.getByText("Step 1 of 6")).toBeVisible();
  });
});
