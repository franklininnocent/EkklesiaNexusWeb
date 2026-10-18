import assert from "node:assert/strict";

async function run(): Promise<void> {
  process.env.NEXT_PUBLIC_SITE_URL = "https://ekklesianexus.com";

  const { getMarketingContent } = await import("../src/lib/marketing/get-content");
  const { safeJsonLdStringify } = await import("../src/lib/marketing/json-ld-safe");
  const {
    buildPageMetadata,
    buildStructuredDataGraph,
    indexableSitemapEntries,
    resolveMarketingSeo,
  } = await import("../src/lib/marketing/seo-metadata");
  const { indexableLocalizedSitemapEntries } = await import("../src/lib/marketing/localized-metadata");

  const content = getMarketingContent();
  const seo = resolveMarketingSeo(content);
  const home = seo.pages.home;

  const homeMeta = buildPageMetadata(home, seo);
  const homeRobots = homeMeta.robots;
  assert.equal(homeMeta.title, home.seoTitle);
  assert.equal(homeMeta.alternates?.canonical, "https://ekklesianexus.com/");
  assert.ok(homeRobots && typeof homeRobots === "object");
  assert.equal(homeRobots.index, true);
  assert.equal(homeRobots.follow, true);
  assert.equal(homeMeta.openGraph?.url, "https://ekklesianexus.com/");

  const privacy = seo.pages.privacy;
  const privacyMeta = buildPageMetadata(privacy, seo);
  const privacyRobots = privacyMeta.robots;
  assert.ok(privacyRobots && typeof privacyRobots === "object");
  assert.equal(privacyRobots.index, false);
  assert.equal(privacyMeta.alternates?.canonical, "https://ekklesianexus.com/privacy");

  const sitemapUrls = indexableSitemapEntries(content).map((e) => e.url);
  assert.deepEqual(sitemapUrls, ["https://ekklesianexus.com/"]);
  assert.ok(!sitemapUrls.some((u) => u.includes("/privacy") || u.includes("/terms")));

  const graph = buildStructuredDataGraph(content) as {
    "@graph": Array<Record<string, unknown>>;
  };
  const types = graph["@graph"].map((n) => n["@type"]);
  assert.deepEqual(types, ["Organization", "WebSite", "SoftwareApplication"]);
  const org = graph["@graph"][0];
  const app = graph["@graph"].find((n) => n["@type"] === "SoftwareApplication");
  assert.equal(org.email, "contact@ekklesianexus.com");
  assert.equal(String(org.url), "https://ekklesianexus.com");
  assert.equal(String(app?.url), "https://app.ekklesianexus.com");

  assert.ok(!safeJsonLdStringify({ x: "</script>" }).includes("</script>"));

  const localizedUrls = indexableLocalizedSitemapEntries(content).map((e) => e.url);
  assert.ok(localizedUrls.includes("https://ekklesianexus.com/"));
  assert.ok(localizedUrls.includes("https://ekklesianexus.com/pt-br"));
  assert.ok(localizedUrls.includes("https://ekklesianexus.com/features"));

  console.log("seo-metadata.test.ts passed.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
