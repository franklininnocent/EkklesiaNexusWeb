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

const regionalTriple = {
  INR: { monthly_price: "1499.00", annual_price: "14990.00" },
  USD: { monthly_price: "39.00", annual_price: "390.00" },
  BRL: { monthly_price: "99.00", annual_price: "990.00" },
} as const;

const starter: PublicPlanCard = {
  code: "STARTER",
  name: "Starter",
  pricing_type: "FIXED",
  currency_code: "INR",
  monthly_price: "1499.00",
  annual_price: "14990.00",
  regional_prices: { ...regionalTriple },
};

const standard: PublicPlanCard = {
  code: "STANDARD",
  name: "Standard",
  pricing_type: "FIXED",
  currency_code: "INR",
  monthly_price: "2999.00",
  annual_price: "29990.00",
  regional_prices: {
    INR: { monthly_price: "2999.00", annual_price: "29990.00" },
    USD: { monthly_price: "59.00", annual_price: "590.00" },
    BRL: { monthly_price: "199.00", annual_price: "1990.00" },
  },
};

const professional: PublicPlanCard = {
  code: "PROFESSIONAL",
  name: "Professional",
  pricing_type: "FIXED",
  currency_code: "INR",
  monthly_price: "4999.00",
  annual_price: "49990.00",
  regional_prices: {
    INR: { monthly_price: "4999.00", annual_price: "49990.00" },
    USD: { monthly_price: "89.00", annual_price: "890.00" },
    BRL: { monthly_price: "399.00", annual_price: "3990.00" },
  },
};

describe("selectMarketingPrice", () => {
  it("picks configured regional amounts without FX", () => {
    assert.deepEqual(selectMarketingPrice(starter, "USD"), {
      monthly: "39.00",
      annual: "390.00",
      currencyCode: "USD",
    });
    assert.deepEqual(selectMarketingPrice(standard, "BRL"), {
      monthly: "199.00",
      annual: "1990.00",
      currencyCode: "BRL",
    });
    assert.deepEqual(selectMarketingPrice(professional, "INR"), {
      monthly: "4999.00",
      annual: "49990.00",
      currencyCode: "INR",
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
  it("maps API plan codes to homepage card ids with distinct regional amounts", () => {
    const plans = [starter, standard, professional];
    const cards = buildCardPricesByPlanId(plans, "USD");
    assert.equal(cards.seed?.monthly, "39.00");
    assert.equal(cards.seed?.annual, "390.00");
    assert.equal(cards.growth?.monthly, "59.00");
    assert.equal(cards.growth?.annual, "590.00");
    assert.equal(cards.summit?.monthly, "89.00");
    assert.equal(cards.summit?.annual, "890.00");
  });

  it("selects BRL and INR per plan without cross-region substitution", () => {
    const plans = [starter, standard, professional];
    const brl = buildCardPricesByPlanId(plans, "BRL");
    assert.equal(brl.seed?.monthly, "99.00");
    assert.equal(brl.growth?.monthly, "199.00");
    assert.equal(brl.summit?.monthly, "399.00");
    const inr = buildCardPricesByPlanId(plans, "INR");
    assert.equal(inr.seed?.monthly, "1499.00");
    assert.equal(inr.growth?.monthly, "2999.00");
    assert.equal(inr.summit?.monthly, "4999.00");
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
