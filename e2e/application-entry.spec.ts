import { expect, test } from "@playwright/test";

test.describe("Open Application navigation", () => {
  test("hero links to the guarded Angular dashboard entry", async ({ page }) => {
    await page.goto("/");
    const heroLink = page.locator("main").getByRole("link", { name: "Open Application" });
    await expect(heroLink).toBeVisible();

    const href = await heroLink.getAttribute("href");
    expect(href).toMatch(/\/dashboard$/);
    expect(href).toMatch(/^https?:\/\//);

    await page.setViewportSize({ width: 1280, height: 720 });
    const headerLink = page.locator("header").getByRole("link", { name: "Open Application" });
    await expect(headerLink).toHaveCount(0);
  });
});
