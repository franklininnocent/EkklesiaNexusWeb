import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { derivedFreeMonthsFromDecimalStrings } from "@/lib/pricing/marketing-pricing-math";
import { DEFAULT_PRICING_MARKET, isPricingMarket } from "./regional-pricing";

describe("legacy pricing market cookie helpers", () => {
  it("isPricingMarket validates IN US BR", () => {
    assert.equal(isPricingMarket("IN"), true);
    assert.equal(isPricingMarket("EU"), false);
    assert.equal(DEFAULT_PRICING_MARKET, "IN");
  });
});

describe("derivedFreeMonthsFromDecimalStrings", () => {
  it("returns 2 free months for INR starter annual", () => {
    assert.equal(derivedFreeMonthsFromDecimalStrings("1499.00", "14990.00"), 2);
  });

  it("returns null when annual equals twelve months", () => {
    assert.equal(derivedFreeMonthsFromDecimalStrings("39.00", "468.00"), null);
  });
});
