import assert from "node:assert/strict";

async function run(): Promise<void> {
  const {
    effectiveMarketingHostFromHeaders,
    isProductionMarketingRequestHost,
    shouldRejectUnauthorizedMarketingHost,
    isWwwMarketingHost,
    isApexHttpMarketingHost,
  } = await import("../src/lib/marketing/marketing-request-host");

  const apex = "ekklesianexus.com";

  assert.equal(
    effectiveMarketingHostFromHeaders("unrelated.example", apex),
    "unrelated.example",
  );
  assert.equal(
    effectiveMarketingHostFromHeaders("www.ekklesianexus.com", apex),
    "www.ekklesianexus.com",
  );
  assert.equal(effectiveMarketingHostFromHeaders("127.0.0.1", apex), apex);
  assert.equal(
    effectiveMarketingHostFromHeaders("127.0.0.1", "unrelated.example"),
    "unrelated.example",
  );
  assert.equal(effectiveMarketingHostFromHeaders("::1", null), "::1");

  assert.equal(isProductionMarketingRequestHost(apex), true);
  assert.equal(isProductionMarketingRequestHost("www.ekklesianexus.com"), true);
  assert.equal(isProductionMarketingRequestHost("localhost"), true);
  assert.equal(isProductionMarketingRequestHost("127.0.0.1"), true);
  assert.equal(isProductionMarketingRequestHost("::1"), true);
  assert.equal(isProductionMarketingRequestHost("unrelated.example"), false);
  assert.equal(isProductionMarketingRequestHost("139.59.18.151"), false);
  assert.equal(isProductionMarketingRequestHost(""), false);

  const env = process.env as NodeJS.ProcessEnv & { NODE_ENV?: string };
  const prevNodeEnv = env.NODE_ENV;
  env.NODE_ENV = "production";

  const reject = (host: string | null, xfh: string | null) =>
    shouldRejectUnauthorizedMarketingHost(effectiveMarketingHostFromHeaders(host, xfh));

  assert.equal(reject("unrelated.example", apex), true);
  assert.equal(reject(apex, null), false);
  assert.equal(reject("127.0.0.1", apex), false);
  assert.equal(reject("127.0.0.1", "unrelated.example"), true);
  assert.equal(reject("139.59.18.151", null), true);
  assert.equal(reject("unrelated.example", null), true);

  env.NODE_ENV = "development";
  assert.equal(reject("unrelated.example", apex), false);

  env.NODE_ENV = prevNodeEnv;

  assert.equal(isWwwMarketingHost("www.ekklesianexus.com"), true);
  assert.equal(
    isWwwMarketingHost(effectiveMarketingHostFromHeaders("www.ekklesianexus.com", apex)),
    true,
  );
  assert.equal(isWwwMarketingHost(apex), false);
  assert.equal(isApexHttpMarketingHost(apex, "http"), true);
  assert.equal(isApexHttpMarketingHost(apex, "https"), false);

  console.log("marketing-request-host.test.ts passed.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
