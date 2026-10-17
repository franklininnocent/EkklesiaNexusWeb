import assert from "node:assert/strict";
import { normalizeIpToken, visitorIpFromRequest } from "./client-ip";

const previousTrust = process.env.MARKETING_TRUST_PROXY;
const previousNodeEnv = process.env.NODE_ENV;

function requestWith(headers: Record<string, string>): Request {
  return new Request("http://localhost/api/contact-captcha", { headers });
}

process.env.MARKETING_TRUST_PROXY = "false";
assert.equal(visitorIpFromRequest(requestWith({ "x-forwarded-for": "203.0.113.9" })), "unknown");
assert.equal(
  visitorIpFromRequest(requestWith({ "x-forwarded-for": "198.51.100.1, 203.0.113.9" })),
  "unknown",
);

process.env.MARKETING_TRUST_PROXY = "true";
assert.equal(visitorIpFromRequest(requestWith({ "x-forwarded-for": "203.0.113.9" })), "203.0.113.9");
assert.equal(
  visitorIpFromRequest(requestWith({ "x-forwarded-for": "198.51.100.1, 203.0.113.9" })),
  "198.51.100.1",
);
assert.equal(visitorIpFromRequest(requestWith({ "x-real-ip": "203.0.113.9:443" })), "203.0.113.9");
assert.equal(visitorIpFromRequest(requestWith({ "cf-connecting-ip": "2001:db8::1" })), "2001:db8::1");
assert.equal(visitorIpFromRequest(requestWith({ "x-forwarded-for": "::ffff:203.0.113.9" })), "203.0.113.9");
assert.equal(normalizeIpToken("not-an-ip"), null);

Reflect.set(process.env, "NODE_ENV", "production");
delete process.env.MARKETING_TRUST_PROXY;
assert.equal(
  visitorIpFromRequest(requestWith({ "x-forwarded-for": "203.0.113.50" })),
  "203.0.113.50",
);
process.env.MARKETING_TRUST_PROXY = "false";
assert.equal(visitorIpFromRequest(requestWith({ "x-forwarded-for": "203.0.113.50" })), "unknown");

if (previousNodeEnv === undefined) {
  Reflect.deleteProperty(process.env, "NODE_ENV");
} else {
  Reflect.set(process.env, "NODE_ENV", previousNodeEnv);
}
if (previousTrust === undefined) {
  delete process.env.MARKETING_TRUST_PROXY;
} else {
  process.env.MARKETING_TRUST_PROXY = previousTrust;
}

console.log("client-ip.test.ts passed.");
