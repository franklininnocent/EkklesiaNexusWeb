import assert from "node:assert/strict";
import { visitorIpFromRequest } from "./client-ip";

const previous = process.env.MARKETING_TRUST_PROXY;
process.env.MARKETING_TRUST_PROXY = "false";
assert.equal(
  visitorIpFromRequest(new Request("http://localhost/api/contact-enquiries", {
    headers: { "x-forwarded-for": "203.0.113.9" },
  })),
  "unknown",
);

process.env.MARKETING_TRUST_PROXY = "false";
assert.equal(
  visitorIpFromRequest(new Request("http://localhost/api/contact-enquiries", {
    headers: { "x-forwarded-for": "198.51.100.1, 203.0.113.9" },
  })),
  "unknown",
);

process.env.MARKETING_TRUST_PROXY = "true";
assert.equal(
  visitorIpFromRequest(new Request("http://localhost/api/contact-enquiries", {
    headers: { "x-forwarded-for": "203.0.113.9" },
  })),
  "203.0.113.9",
);

if (previous === undefined) {
  delete process.env.MARKETING_TRUST_PROXY;
} else {
  process.env.MARKETING_TRUST_PROXY = previous;
}

console.log("client-ip.test.ts passed.");
