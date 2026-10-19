import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { countryForIp } from "./ip-country";

describe("countryForIp", () => {
  it("maps published DB-IP ranges used by marketing currency", () => {
    assert.equal(countryForIp("1.6.0.1"), "IN");
    assert.equal(countryForIp("1.178.32.1"), "BR");
    assert.equal(countryForIp("8.8.8.8"), "US");
  });

  it("returns null for unknown or non-country ranges", () => {
    assert.equal(countryForIp("not-an-ip"), null);
    assert.equal(countryForIp("0.255.255.255"), null);
  });
});
