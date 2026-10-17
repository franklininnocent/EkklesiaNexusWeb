import { expect, test } from "@playwright/test";

const GEO_SECRET = process.env.MARKETING_GEO_HEADER_SECRET || "e2e-geo-secret";

test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders({
    "x-en-geo-token": GEO_SECRET,
    "x-en-geo-country": "IN",
  });
});

test("unpublished catalog shows contact prompt without regional-unavailable copy", async ({ page }) => {
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await expect(page.locator("#pricing").getByRole("button", { name: /Show Price|Ver preço/i })).toHaveCount(3);
  await page.locator("#pricing").getByRole("button", { name: /Show Price|Ver preço/i }).first().click();
  await expect(page.locator("#pricing")).toContainText(/not on the website yet|ainda não estão no site/i);
  await expect(page.locator("#pricing")).not.toContainText(/not available for your region|não está disponível para a sua região/i);
});
