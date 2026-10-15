import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEFAULT_PRICING_MARKET,
  derivedFreeMonths,
  getMarketCatalog,
  getPlanPrice,
  PRICING_MARKETS,
  PRICING_PLAN_IDS,
  resolvePricingMarket,
} from "./regional-pricing";

const EXPECTED: Record<
  string,
  { currency: string; seed: [number, number]; growth: [number, number]; summit: [number, number] }
> = {
  IN: { currency: "INR", seed: [1499, 14990], growth: [2999, 29990], summit: [4999, 49990] },
  US: { currency: "USD", seed: [39, 390], growth: [59, 590], summit: [89, 890] },
  BR: { currency: "BRL", seed: [99, 990], growth: [199, 1990], summit: [399, 3990] },
};

describe("regional pricing catalog", () => {
  for (const market of PRICING_MARKETS) {
    it(`market ${market} has all plans and currency`, () => {
      const catalog = getMarketCatalog(market);
      assert.equal(catalog.market, market);
      assert.equal(catalog.currencyCode, EXPECTED[market].currency);
      for (const planId of PRICING_PLAN_IDS) {
        const row = getPlanPrice(market, planId);
        assert.ok(row);
        const [monthly, annual] = EXPECTED[market][planId];
        assert.equal(row!.monthlyAmount, monthly);
        assert.equal(row!.annualAmount, annual);
        assert.equal(row!.annualAmount, row!.monthlyAmount * 10);
        assert.equal(derivedFreeMonths(row!.monthlyAmount, row!.annualAmount), 2);
      }
    });
  }

  it("resolvePricingMarket ignores invalid values", () => {
    assert.equal(resolvePricingMarket(null), DEFAULT_PRICING_MARKET);
    assert.equal(resolvePricingMarket("XX"), DEFAULT_PRICING_MARKET);
    assert.equal(resolvePricingMarket("US"), "US");
  });

  it("derivedFreeMonths returns null when annual equals 12 months", () => {
    assert.equal(derivedFreeMonths(100, 1200), null);
  });

  it("derivedFreeMonths returns null for uneven free months", () => {
    assert.equal(derivedFreeMonths(100, 1050), null);
  });
});
