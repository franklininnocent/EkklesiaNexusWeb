import assert from "node:assert/strict";

async function main() {
  process.env.NEXT_PUBLIC_SITE_URL = "https://ekklesianexus.com";
  const { isProductionMarketingHost } = await import("../src/lib/marketing/site-host");
  assert.equal(isProductionMarketingHost(), true);
  console.log("robots-policy.test.ts passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
