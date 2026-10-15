import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatMarketingMoney } from "./marketing-money";

describe("formatMarketingMoney", () => {
  it("formats en-US INR", () => {
    assert.equal(formatMarketingMoney(1499, "INR", "en-US"), "₹1,499");
    assert.equal(formatMarketingMoney(14990, "INR", "en-US"), "₹14,990");
  });

  it("formats pt-BR INR with locale grouping", () => {
    assert.equal(formatMarketingMoney(1499, "INR", "pt-BR"), "₹\u00a01.499");
  });

  it("formats USD", () => {
    assert.equal(formatMarketingMoney(39, "USD", "en-US"), "$39");
    assert.equal(formatMarketingMoney(39, "USD", "pt-BR"), "US$\u00a039");
  });

  it("formats BRL without fraction digits", () => {
    assert.equal(formatMarketingMoney(1990, "BRL", "en-US"), "R$1,990");
    assert.equal(formatMarketingMoney(1990, "BRL", "pt-BR"), "R$\u00a01.990");
  });
});
