import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { PublicPlanCard } from "@/types/subscription-plans";
import {
  buildCardNamesByPlanId,
  buildCardPricesByPlanId,
  pickHomepagePricingPlans,
  pricingCatalogStateFromFetch,
  selectMarketingPrice,
} from "./select-marketing-price";

const starter: PublicPlanCard = {
  code: "STARTER",
  name: "Starter",
  pricing_type: "FIXED",
  currency_code: "INR",
  monthly_price: "1499.00",
  annual_price: "14990.00",
  regional_prices: {
    INR: { monthly_price: "1499.00", annual_price: "14990.00" },
    USD: { monthly_price: "39.00", annual_price: "390.00" },
    BRL: { monthly_price: "99.00", annual_price: "990.00" },
  },
};

describe("selectMarketingPrice", () => {
  it("picks configured regional amounts without FX", () => {
    assert.deepEqual(selectMarketingPrice(starter, "USD"), {
      monthly: "39.00",
      annual: "390.00",
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

describe("pickHomepagePricingPlans", () => {
  it("keeps only name and price fields for the homepage", () => {
    const slim = pickHomepagePricingPlans([
      {
        ...starter,
        features: [{ code: "X", name: "Ignored" }],
        limits: [{ code: "Y", name: "Limit", value: 1, unlimited: false }],
      },
    ]);
    assert.deepEqual(slim, [
      {
        code: "STARTER",
        name: "Starter",
        pricing_type: "FIXED",
        currency_code: "INR",
        monthly_price: "1499.00",
        annual_price: "14990.00",
        regional_prices: starter.regional_prices,
      },
    ]);
    assert.equal("features" in slim[0], false);
  });
});

describe("pricingCatalogStateFromFetch", () => {
  it("distinguishes unavailable, unpublished, and ready catalogs", () => {
    assert.equal(pricingCatalogStateFromFetch({ ok: false, status: 503, message: "down" }), "unavailable");
    assert.equal(pricingCatalogStateFromFetch({ ok: true, plans: [] }), "unpublished");
    assert.equal(pricingCatalogStateFromFetch({ ok: true, plans: [starter] }), "ready");
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

  it("uses API plan names and leaves prices null when the catalog is empty", () => {
    assert.deepEqual(buildCardPricesByPlanId([], "USD"), { seed: null, growth: null, summit: null });
    assert.deepEqual(buildCardNamesByPlanId([{ ...starter, name: "Starter Parish" }]), {
      seed: "Starter Parish",
      growth: null,
      summit: null,
    });
  });
});
