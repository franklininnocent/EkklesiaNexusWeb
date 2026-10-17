import { expect, test } from "@playwright/test";
import { formatMarketingMoneyFromDecimal } from "../src/lib/marketing-money";

const GEO_SECRET = process.env.MARKETING_GEO_HEADER_SECRET || "e2e-geo-secret";

const TAX_SNIPPET = {
  "en-US": "Prices exclude applicable taxes",
  "pt-BR": "Os preços não incluem os impostos aplicáveis",
};

function trustedGeoHeaders(country: string | null): Record<string, string> {
  const headers: Record<string, string> = { "x-en-geo-token": GEO_SECRET };
  if (country) {
    headers["x-en-geo-country"] = country;
  }
  return headers;
}

async function openStarterPrice(page: import("@playwright/test").Page) {
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Show Price|Ver preço/i }).first().click();
}

async function assertStarterMonthly(
  page: import("@playwright/test").Page,
  currency: "INR" | "USD" | "BRL",
  locale: "en-US" | "pt-BR",
) {
  await openStarterPrice(page);
  const amounts =
    currency === "INR"
      ? { monthly: "1499.00", annual: "14990.00" }
      : currency === "USD"
        ? { monthly: "39.00", annual: "390.00" }
        : { monthly: "99.00", annual: "990.00" };
  const monthly = formatMarketingMoneyFromDecimal(amounts.monthly, currency, locale);
  const annual = formatMarketingMoneyFromDecimal(amounts.annual, currency, locale);
  await expect(page.locator("#pricing").getByText(monthly, { exact: true }).first()).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.locator("#pricing").getByText(annual, { exact: true }).first()).toBeVisible();
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
  await openStarterPrice(page);
  const usd = formatMarketingMoneyFromDecimal("39.00", "USD", "en-US");
  await expect(page.locator("#pricing").getByText(usd, { exact: true }).first()).toBeVisible();
  await page.locator("#pricing").getByRole("button", { name: /Hide Price|Ocultar preço/i }).click();
  await expect(page.locator("#pricing").getByRole("button", { name: /Show Price|Ver preço/i })).toHaveCount(3);
  await openStarterPrice(page);
  await expect(page.locator("#pricing").getByText(usd, { exact: true }).first()).toBeVisible();
});

for (const row of matrix) {
  test(`geo ${row.country ?? "none"} ${row.path} → ${row.currency}`, async ({ page }) => {
    await page.setExtraHTTPHeaders(trustedGeoHeaders(row.country));
    await page.goto(`${row.path}#pricing`, { waitUntil: "domcontentloaded" });
    await assertStarterMonthly(page, row.currency, row.locale);
    await expect(page.locator("#pricing")).toContainText(TAX_SNIPPET[row.locale]);
    await expect(page.locator("#pricing")).not.toContainText("%");
  });
}

test("spoofed cf-ipcountry without geo token does not change currency", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "cf-ipcountry": "IN" });
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await openStarterPrice(page);
  const usd = formatMarketingMoneyFromDecimal("39.00", "USD", "en-US");
  await expect(page.locator("#pricing").getByText(usd, { exact: true }).first()).toBeVisible();
});

test("India with English shows INR; Portuguese UI in India still INR", async ({ page }) => {
  await page.setExtraHTTPHeaders(trustedGeoHeaders("IN"));
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await assertStarterMonthly(page, "INR", "en-US");

  await page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "Português (Brasil)", exact: true }).click();
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await assertStarterMonthly(page, "INR", "pt-BR");
});
