import assert from "node:assert/strict";
import { consumeMemoryRateLimit, consumeSharedRateLimit } from "./rate-limit";

async function main() {
  const unique = () => `k-${Date.now()}-${Math.random()}`;

  const first = consumeMemoryRateLimit(unique(), 2, 60_000);
  assert.equal(first.allowed, true);
  assert.equal(first.remaining, 1);

  const key = unique();
  assert.equal(consumeMemoryRateLimit(key, 2, 60_000).allowed, true);
  assert.equal(consumeMemoryRateLimit(key, 2, 60_000).allowed, true);
  const denied = consumeMemoryRateLimit(key, 2, 60_000);
  assert.equal(denied.allowed, false);
  assert.equal(denied.remaining, 0);

  const previousSecret = process.env.MARKETING_BFF_SECRET;
  const previousApi = process.env.LARAVEL_API_URL;
  const previousNodeEnv = process.env.NODE_ENV;
  Reflect.set(process.env, "NODE_ENV", "production");
  delete process.env.MARKETING_BFF_SECRET;
  delete process.env.LARAVEL_API_URL;
  const unconfigured = await consumeSharedRateLimit("marketing_bff_forms", "203.0.113.10", 1, 60_000);
  assert.equal(unconfigured.allowed, true);
  const unconfiguredDenied = await consumeSharedRateLimit("marketing_bff_forms", "203.0.113.10", 1, 60_000);
  assert.equal(unconfiguredDenied.allowed, false);

  process.env.MARKETING_BFF_SECRET = "test-secret";
  process.env.LARAVEL_API_URL = "http://127.0.0.1:1";
  const unknownIp = await consumeSharedRateLimit("marketing_bff_captcha", "unknown", 1, 60_000);
  assert.equal(unknownIp.allowed, true);
  const unknownDenied = await consumeSharedRateLimit("marketing_bff_captcha", "unknown", 1, 60_000);
  assert.equal(unknownDenied.allowed, false);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ success: false }), {
      status: 429,
      headers: { "Retry-After": "42" },
    })) as typeof fetch;
  try {
    const limited = await consumeSharedRateLimit("marketing_bff_captcha", "203.0.113.80", 20, 60_000);
    assert.equal(limited.allowed, false);
    if (!limited.allowed) {
      assert.equal(limited.retryAfterSeconds, 42);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }

  if (previousNodeEnv === undefined) {
    Reflect.deleteProperty(process.env, "NODE_ENV");
  } else {
    Reflect.set(process.env, "NODE_ENV", previousNodeEnv);
  }
  if (previousSecret === undefined) delete process.env.MARKETING_BFF_SECRET;
  else process.env.MARKETING_BFF_SECRET = previousSecret;
  if (previousApi === undefined) delete process.env.LARAVEL_API_URL;
  else process.env.LARAVEL_API_URL = previousApi;

  console.log("rate-limit.test.ts passed.");
}

void main();
