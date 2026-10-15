import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parsePricingMarketCookie } from "./market-preference";

describe("parsePricingMarketCookie", () => {
  it("defaults invalid cookie to IN", () => {
    assert.equal(parsePricingMarketCookie(undefined), "IN");
    assert.equal(parsePricingMarketCookie(""), "IN");
    assert.equal(parsePricingMarketCookie("EU"), "IN");
  });

  it("accepts valid markets", () => {
    assert.equal(parsePricingMarketCookie("BR"), "BR");
    assert.equal(parsePricingMarketCookie(" US "), "US");
  });
});
