import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Home/);
  });

  test("has header", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
  });
});
