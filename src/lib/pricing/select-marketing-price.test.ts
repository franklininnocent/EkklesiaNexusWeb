import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { PublicPlanCard } from "@/types/subscription-plans";
import { buildCardPricesByPlanId, selectMarketingPrice } from "./select-marketing-price";

const starter: PublicPlanCard = {
  code: "STARTER",
  name: "Starter",
  pricing_type: "FIXED",
  currency_code: "INR",
  monthly_price: "1499.00",
  annual_price: "14990.00",
  regional_prices: {
    INR: { monthly_price: "1499.00", annual_price: "14990.00" },
    USD: { monthly_price: "39.00", annual_price: null },
    BRL: { monthly_price: "99.00", annual_price: null },
  },
};

describe("selectMarketingPrice", () => {
  it("picks configured regional amounts without FX", () => {
    assert.deepEqual(selectMarketingPrice(starter, "USD"), {
      monthly: "39.00",
      annual: null,
      currencyCode: "USD",
    });
  });

  it("falls back to top-level INR only for INR when regional block is absent", () => {
    const legacy: PublicPlanCard = {
      code: "STARTER",
      name: "Starter",
      pricing_type: "FIXED",
      currency_code: "INR",
      monthly_price: "1499.00",
      annual_price: "14990.00",
    };
    assert.equal(selectMarketingPrice(legacy, "INR")?.monthly, "1499.00");
    assert.equal(selectMarketingPrice(legacy, "USD"), null);
  });

  it("does not substitute USD for missing BRL", () => {
    const partial: PublicPlanCard = {
      ...starter,
      regional_prices: { INR: starter.regional_prices!.INR! },
    };
    assert.equal(selectMarketingPrice(partial, "BRL"), null);
  });
});

describe("buildCardPricesByPlanId", () => {
  it("maps API plan codes to homepage card ids", () => {
    const plans = [starter, { ...starter, code: "STANDARD" }, { ...starter, code: "PROFESSIONAL" }];
    const cards = buildCardPricesByPlanId(plans, "USD");
    assert.equal(cards.seed?.monthly, "39.00");
    assert.equal(cards.growth?.monthly, "39.00");
    assert.equal(cards.summit?.monthly, "39.00");
  });
});
