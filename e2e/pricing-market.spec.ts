import { expect, test } from "@playwright/test";
import { formatMarketingMoneyFromDecimal } from "../src/lib/marketing-money";

const GEO_SECRET = process.env.MARKETING_GEO_HEADER_SECRET || "e2e-geo-secret";

const TAX_SNIPPET = {
  "en-US": "Prices exclude applicable taxes",
  "pt-BR": "Os preços não incluem os impostos aplicáveis",
};

/** Matches MARKETING_PRICING_FIXTURE_JSON in playwright.config.ts (published API shape). */
const HOMEPAGE_PLAN_AMOUNTS: Array<
  Record<"INR" | "USD" | "BRL", { monthly: string; annual: string }>
> = [
  {
    INR: { monthly: "1499.00", annual: "14990.00" },
    USD: { monthly: "39.00", annual: "390.00" },
    BRL: { monthly: "99.00", annual: "990.00" },
  },
  {
    INR: { monthly: "2999.00", annual: "29990.00" },
    USD: { monthly: "59.00", annual: "590.00" },
    BRL: { monthly: "199.00", annual: "1990.00" },
  },
  {
    INR: { monthly: "4999.00", annual: "49990.00" },
    USD: { monthly: "89.00", annual: "890.00" },
    BRL: { monthly: "399.00", annual: "3990.00" },
  },
];

function trustedGeoHeaders(country: string | null): Record<string, string> {
  const headers: Record<string, string> = { "x-en-geo-token": GEO_SECRET };
  if (country) {
    headers["x-en-geo-country"] = country;
  }
  return headers;
}

async function openPlanPrice(page: import("@playwright/test").Page, cardIndex: number) {
  const card = page.locator("#pricing article").nth(cardIndex);
  await card.scrollIntoViewIfNeeded();
  const showButton = card.getByRole("button", { name: /Show Price|Ver preço/i });
  await showButton.click();
  await expect(card.getByRole("button", { name: /Hide Price|Ocultar preço/i })).toBeVisible({ timeout: 10_000 });
}

async function assertPlanMonthlyAndAnnual(
  page: import("@playwright/test").Page,
  cardIndex: number,
  currency: "INR" | "USD" | "BRL",
  locale: "en-US" | "pt-BR",
) {
  await openPlanPrice(page, cardIndex);
  const amounts = HOMEPAGE_PLAN_AMOUNTS[cardIndex]![currency];
  const monthly = formatMarketingMoneyFromDecimal(amounts.monthly, currency, locale);
  const annual = formatMarketingMoneyFromDecimal(amounts.annual, currency, locale);
  const card = page.locator("#pricing article").nth(cardIndex);
  await expect(card).toContainText(monthly, { timeout: 15_000 });
  await expect(card).toContainText(annual);
}

async function assertAllHomepagePlanPrices(
  page: import("@playwright/test").Page,
  currency: "INR" | "USD" | "BRL",
  locale: "en-US" | "pt-BR",
) {
  for (let cardIndex = 0; cardIndex < HOMEPAGE_PLAN_AMOUNTS.length; cardIndex += 1) {
    await assertPlanMonthlyAndAnnual(page, cardIndex, currency, locale);
  }
}

const matrix: Array<{
  country: string | null;
  path: string;
  locale: "en-US" | "pt-BR";
  currency: "INR" | "USD" | "BRL";
}> = [
  { country: "IN", path: "/", locale: "en-US", currency: "INR" },
  { country: "IN", path: "/pt-br", locale: "pt-BR", currency: "INR" },
  { country: "BR", path: "/", locale: "en-US", currency: "BRL" },
  { country: "BR", path: "/pt-br", locale: "pt-BR", currency: "BRL" },
  { country: "US", path: "/", locale: "en-US", currency: "USD" },
  { country: "US", path: "/pt-br", locale: "pt-BR", currency: "USD" },
  { country: "DE", path: "/", locale: "en-US", currency: "USD" },
  { country: "GB", path: "/", locale: "en-US", currency: "USD" },
  { country: "PT", path: "/", locale: "en-US", currency: "USD" },
  { country: null, path: "/", locale: "en-US", currency: "USD" },
];

test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders(trustedGeoHeaders(null));
});

test("every plan shows Show Price while prices are hidden", async ({ page }) => {
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await expect(page.locator("#pricing").getByRole("button", { name: /Show Price|Ver preço/i })).toHaveCount(3);
});

test("hiding a price does not change the revealed amount", async ({ page }) => {
  await page.setExtraHTTPHeaders(trustedGeoHeaders("US"));
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await openPlanPrice(page, 0);
  const usd = formatMarketingMoneyFromDecimal("39.00", "USD", "en-US");
  await expect(page.locator("#pricing").getByText(usd).first()).toBeVisible();
  await page.locator("#pricing").getByRole("button", { name: /Hide Price|Ocultar preço/i }).first().click();
  await expect(page.locator("#pricing").getByRole("button", { name: /Show Price|Ver preço/i })).toHaveCount(3);
  await openPlanPrice(page, 0);
  await expect(page.locator("#pricing").getByText(usd).first()).toBeVisible();
});

for (const row of matrix) {
  test(`geo ${row.country ?? "none"} ${row.path} → ${row.currency} (all plans)`, async ({ page }) => {
    await page.setExtraHTTPHeaders(trustedGeoHeaders(row.country));
    await page.goto(`${row.path}#pricing`, { waitUntil: "domcontentloaded" });
    await assertAllHomepagePlanPrices(page, row.currency, row.locale);
    await expect(page.locator("#pricing")).toContainText(TAX_SNIPPET[row.locale]);
    await expect(page.locator("#pricing")).not.toContainText("%");
  });
}

test("spoofed cf-ipcountry without geo token does not change currency", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "cf-ipcountry": "IN" });
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await assertPlanMonthlyAndAnnual(page, 0, "USD", "en-US");
});

test("featured Standard plan Show Price uses primary button styling", async ({ page }) => {
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  const standardCard = page.locator("#pricing article").nth(1);
  const starterCard = page.locator("#pricing article").nth(0);
  await expect(standardCard.getByRole("button", { name: /Show Price|Ver preço/i })).toHaveClass(/bg-brand-blue/);
  await expect(starterCard.getByRole("button", { name: /Show Price|Ver preço/i })).toHaveClass(/border-brand-blue/);
});

test("Show Price expands via keyboard", async ({ page }) => {
  await page.setExtraHTTPHeaders(trustedGeoHeaders("US"));
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  const card = page.locator("#pricing article").first();
  const priceToggle = card.locator('button[aria-controls^="plan-price-"]');
  await expect(priceToggle).toHaveAttribute("aria-expanded", "false");
  await expect(priceToggle).toHaveAccessibleName(/Show Price|Ver preço/i);
  await priceToggle.press("Enter");
  const hideButton = card.getByRole("button", { name: /Hide Price|Ocultar preço/i });
  await expect(hideButton).toBeVisible({ timeout: 15_000 });
  await expect(hideButton).toHaveAttribute("aria-expanded", "true");
});

test("India with English shows INR; Portuguese UI in India still INR", async ({ page }) => {
  await page.setExtraHTTPHeaders(trustedGeoHeaders("IN"));
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await assertAllHomepagePlanPrices(page, "INR", "en-US");

  await page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "Português (Brasil)", exact: true }).click();
  await page.waitForURL(/\/pt-br\/?$/);
  await page.goto("/pt-br#pricing", { waitUntil: "domcontentloaded" });
  await assertAllHomepagePlanPrices(page, "INR", "pt-BR");
});
