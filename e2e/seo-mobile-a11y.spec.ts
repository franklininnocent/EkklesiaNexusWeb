import { expect, test } from "@playwright/test";

const SEO_PATHS = [
  { path: "/features", h1: /features/i },
  { path: "/features/family-management", h1: /family/i },
  { path: "/solutions/catholic-parishes", h1: /catholic/i },
  { path: "/about", h1: /about/i },
  { path: "/contact", h1: /contact/i },
];

test.describe("SEO pages — mobile viewport", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const { path, h1 } of SEO_PATHS) {
    test(`${path} renders one h1 and main landmark`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      await page.goto(path);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(h1);
      expect(errors, `console errors on ${path}`).toEqual([]);
    });
  }
});
