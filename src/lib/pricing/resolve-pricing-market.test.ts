import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { currencyForVisitorCountry } from "./marketing-currency";
import { marketingCurrencyForRequest, pricingVisitorIp, visitorCountryForPricing } from "./resolve-pricing-market";

describe("currencyForVisitorCountry", () => {
  it("maps India, Brazil, and default to USD", () => {
    assert.equal(currencyForVisitorCountry("IN"), "INR");
    assert.equal(currencyForVisitorCountry("in"), "INR");
    assert.equal(currencyForVisitorCountry("BR"), "BRL");
    assert.equal(currencyForVisitorCountry("br"), "BRL");
    assert.equal(currencyForVisitorCountry("US"), "USD");
    assert.equal(currencyForVisitorCountry("GB"), "USD");
    assert.equal(currencyForVisitorCountry("PT"), "USD");
    assert.equal(currencyForVisitorCountry(null), "USD");
    assert.equal(currencyForVisitorCountry("XX"), "USD");
    assert.equal(currencyForVisitorCountry("invalid"), "USD");
  });

  it("does not use locale for currency", () => {
    assert.equal(currencyForVisitorCountry("IN"), "INR");
    assert.equal(currencyForVisitorCountry("US"), "USD");
  });
});

describe("visitorCountryForPricing", () => {
  it("requires geo token when secret is configured", () => {
    const prevSecret = process.env.MARKETING_GEO_HEADER_SECRET;
    process.env.MARKETING_GEO_HEADER_SECRET = "test-secret";
    try {
      const spoof = new Headers({
        "x-en-geo-country": "IN",
        "cf-ipcountry": "IN",
      });
      assert.equal(visitorCountryForPricing(spoof), null);

      const trusted = new Headers({
        "x-en-geo-country": "IN",
        "x-en-geo-token": "test-secret",
      });
      assert.equal(visitorCountryForPricing(trusted), "IN");
    } finally {
      process.env.MARKETING_GEO_HEADER_SECRET = prevSecret;
    }
  });

  it("uses the rightmost public client IP when geo headers are absent", () => {
    const prevCountry = process.env.MARKETING_VISITOR_COUNTRY;
    const prevSecret = process.env.MARKETING_GEO_HEADER_SECRET;
    const prevTrust = process.env.MARKETING_TRUST_PROXY;
    delete process.env.MARKETING_VISITOR_COUNTRY;
    process.env.MARKETING_GEO_HEADER_SECRET = "";
    process.env.MARKETING_TRUST_PROXY = "true";
    try {
      assert.equal(pricingVisitorIp(new Headers({ "x-forwarded-for": "1.6.0.1, 8.8.8.8" })), "8.8.8.8");
      assert.equal(
        visitorCountryForPricing(new Headers({ "x-forwarded-for": "1.6.0.1, 8.8.8.8" })),
        "US",
      );
      assert.equal(
        visitorCountryForPricing(new Headers({ "x-forwarded-for": "8.8.8.8, 1.6.0.1" })),
        "IN",
      );
      assert.equal(
        visitorCountryForPricing(new Headers({ "x-forwarded-for": "10.1.1.1, 10.0.0.4", "x-real-ip": "1.178.32.1" })),
        "BR",
      );
      assert.equal(visitorCountryForPricing(new Headers({ "cf-ipcountry": "IN" })), null);
      assert.equal(marketingCurrencyForRequest(new Headers({ "x-forwarded-for": "1.6.0.1" })), "INR");
      assert.equal(marketingCurrencyForRequest(new Headers()), "USD");
    } finally {
      if (prevCountry === undefined) {
        delete process.env.MARKETING_VISITOR_COUNTRY;
      } else {
        process.env.MARKETING_VISITOR_COUNTRY = prevCountry;
      }
      process.env.MARKETING_GEO_HEADER_SECRET = prevSecret;
      if (prevTrust === undefined) {
        delete process.env.MARKETING_TRUST_PROXY;
      } else {
        process.env.MARKETING_TRUST_PROXY = prevTrust;
      }
    }
  });

  it("uses MARKETING_VISITOR_COUNTRY when geo is not trusted", () => {
    const prevCountry = process.env.MARKETING_VISITOR_COUNTRY;
    const prevSecret = process.env.MARKETING_GEO_HEADER_SECRET;
    process.env.MARKETING_GEO_HEADER_SECRET = "";
    process.env.MARKETING_VISITOR_COUNTRY = "IN";
    try {
      assert.equal(visitorCountryForPricing(new Headers()), "IN");
    } finally {
      process.env.MARKETING_VISITOR_COUNTRY = prevCountry;
      process.env.MARKETING_GEO_HEADER_SECRET = prevSecret;
    }
  });
});
