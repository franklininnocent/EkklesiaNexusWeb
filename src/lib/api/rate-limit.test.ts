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
  Reflect.set(process.env, "NODE_ENV", "production");
  delete process.env.MARKETING_BFF_SECRET;
  delete process.env.LARAVEL_API_URL;
  const closed = await consumeSharedRateLimit("marketing_bff_forms", "203.0.113.10", 5, 60_000);
  assert.equal(closed.allowed, false);
  Reflect.set(process.env, "NODE_ENV", "test");
  if (previousSecret === undefined) delete process.env.MARKETING_BFF_SECRET;
  else process.env.MARKETING_BFF_SECRET = previousSecret;
  if (previousApi === undefined) delete process.env.LARAVEL_API_URL;
  else process.env.LARAVEL_API_URL = previousApi;

  console.log("rate-limit.test.ts passed.");
}

void main();
