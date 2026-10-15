import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  resolvePricingMarketFromContext,
  visitorCountryForPricing,
  visitorCountryFromRequestHeaders,
} from "./resolve-pricing-market";

describe("resolvePricingMarketFromContext", () => {
  it("uses INR only for India with English", () => {
    assert.equal(resolvePricingMarketFromContext("IN", "en-US"), "IN");
    assert.equal(resolvePricingMarketFromContext("IN", "pt-BR"), "BR");
  });

  it("uses BRL for Brazil or Portuguese", () => {
    assert.equal(resolvePricingMarketFromContext("BR", "en-US"), "BR");
    assert.equal(resolvePricingMarketFromContext("BR", "pt-BR"), "BR");
    assert.equal(resolvePricingMarketFromContext("US", "pt-BR"), "BR");
    assert.equal(resolvePricingMarketFromContext(null, "pt-BR"), "BR");
  });

  it("uses USD for other countries with English", () => {
    assert.equal(resolvePricingMarketFromContext("US", "en-US"), "US");
    assert.equal(resolvePricingMarketFromContext(null, "en-US"), "US");
    assert.equal(resolvePricingMarketFromContext("DE", "en-US"), "US");
    assert.equal(resolvePricingMarketFromContext("IN", "pt-BR"), "BR");
  });
});

describe("visitorCountryFromRequestHeaders", () => {
  it("reads cf-ipcountry and x-en-country", () => {
    const h = new Headers({ "cf-ipcountry": "in" });
    assert.equal(visitorCountryFromRequestHeaders(h), "IN");
    const h2 = new Headers({ "x-en-country": "BR" });
    assert.equal(visitorCountryFromRequestHeaders(h2), "BR");
  });
});

describe("visitorCountryForPricing", () => {
  it("uses MARKETING_VISITOR_COUNTRY when headers are absent", () => {
    const prev = process.env.MARKETING_VISITOR_COUNTRY;
    process.env.MARKETING_VISITOR_COUNTRY = "IN";
    try {
      assert.equal(visitorCountryForPricing(new Headers()), "IN");
    } finally {
      process.env.MARKETING_VISITOR_COUNTRY = prev;
    }
  });
});
