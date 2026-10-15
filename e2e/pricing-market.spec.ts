import { expect, test } from "@playwright/test";
import { formatMarketingMoney } from "../src/lib/marketing-money";
import { getPlanPrice, type PricingMarket } from "../src/data/regional-pricing";

const TAX_SNIPPET = {
  "en-US": "Prices exclude applicable taxes",
  "pt-BR": "Os preços não incluem os impostos aplicáveis",
};

async function openStarterPrice(page: import("@playwright/test").Page) {
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Show Price|Ver preço/i }).first().click();
}

async function assertStarterPrices(
  page: import("@playwright/test").Page,
  market: PricingMarket,
  locale: "en-US" | "pt-BR",
) {
  await openStarterPrice(page);
  const row = getPlanPrice(market, "seed");
  if (!row) throw new Error("missing plan");
  const currency = market === "IN" ? "INR" : market === "US" ? "USD" : "BRL";
  const monthly = formatMarketingMoney(row.monthlyAmount, currency, locale);
  const annual = formatMarketingMoney(row.annualAmount, currency, locale);
  await expect(page.locator("#pricing").getByText(monthly, { exact: true }).first()).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.locator("#pricing").getByText(annual, { exact: true }).first()).toBeVisible();
}

const matrix: Array<{
  country: string | null;
  path: string;
  locale: "en-US" | "pt-BR";
  market: PricingMarket;
}> = [
  { country: "IN", path: "/", locale: "en-US", market: "IN" },
  { country: "IN", path: "/pt-br", locale: "pt-BR", market: "BR" },
  { country: "BR", path: "/", locale: "en-US", market: "BR" },
  { country: "BR", path: "/pt-br", locale: "pt-BR", market: "BR" },
  { country: "US", path: "/", locale: "en-US", market: "US" },
  { country: "US", path: "/pt-br", locale: "pt-BR", market: "BR" },
  { country: "DE", path: "/", locale: "en-US", market: "US" },
  { country: null, path: "/", locale: "en-US", market: "US" },
  { country: null, path: "/pt-br", locale: "pt-BR", market: "BR" },
];

for (const row of matrix) {
  test(`geo ${row.country ?? "none"} ${row.path} → ${row.market}`, async ({ page }) => {
    const headers: Record<string, string> = {};
    if (row.country) {
      headers["cf-ipcountry"] = row.country;
    }
    await page.setExtraHTTPHeaders(headers);
    await page.goto(`${row.path}#pricing`, { waitUntil: "domcontentloaded" });
    await assertStarterPrices(page, row.market, row.locale);
    await expect(page.locator("#pricing")).toContainText(TAX_SNIPPET[row.locale]);
    await expect(page.locator("#pricing")).not.toContainText("%");
  });
}

test("language switch updates price region when country is not India or Brazil", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "cf-ipcountry": "US" });
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await openStarterPrice(page);
  await expect(page.locator("#pricing").getByText("$39", { exact: true }).first()).toBeVisible();

  await page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "Português (Brasil)", exact: true }).click();
  await expect(page).toHaveURL(/\/pt-br/);
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await openStarterPrice(page);
  await expect(page.locator("#pricing").getByText("R$", { exact: false }).first()).toBeVisible();
});

test("India with English shows INR; Portuguese site shows BRL", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "cf-ipcountry": "IN" });
  await page.goto("/#pricing", { waitUntil: "domcontentloaded" });
  await openStarterPrice(page);
  await expect(page.locator("#pricing").getByText("₹1,499", { exact: true }).first()).toBeVisible();

  await page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "Português (Brasil)", exact: true }).click();
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await openStarterPrice(page);
  await expect(page.locator("#pricing").getByText("R$", { exact: false }).first()).toBeVisible();
});
