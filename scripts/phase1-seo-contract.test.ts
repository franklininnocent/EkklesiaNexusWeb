import assert from "node:assert/strict";

async function run(): Promise<void> {
  process.env.NEXT_PUBLIC_SITE_URL = "https://ekklesianexus.com";

  const { publicPagePath, SUPPORTED_LOCALES } = await import("../src/lib/i18n/locale");
  assert.deepEqual([...SUPPORTED_LOCALES], ["en-US", "pt-BR"]);
  assert.equal(publicPagePath("en-US", "home").includes("/es"), false);
  assert.equal(publicPagePath("pt-BR", "home"), "/pt-br");
  const { buildLocalizedHomeMetadata } = await import("../src/lib/marketing/localized-metadata");
  const { legalPageMetadataForLocale } = await import("../src/lib/marketing/legal-metadata");
  const { getMarketingContent } = await import("../src/lib/marketing/get-content");
  const { buildStaticPageMetadata } = await import("../src/lib/marketing/marketing-static-pages");

  assert.equal(publicPagePath("pt-BR", "home"), "/pt-br");
  assert.equal(publicPagePath("en-US", "home"), "/");

  const content = getMarketingContent();
  const ptHome = buildLocalizedHomeMetadata(content, "pt-BR");
  assert.equal(ptHome.alternates?.canonical, "https://ekklesianexus.com/pt-br");
  const ptBrAlternate = ptHome.alternates?.languages?.["pt-BR"];
  assert.equal(typeof ptBrAlternate, "string");
  assert.ok((ptBrAlternate as string).includes("/pt-br"));

  const enHome = buildLocalizedHomeMetadata(content, "en-US");
  assert.equal(enHome.alternates?.canonical, "https://ekklesianexus.com/");

  const privacyEn = legalPageMetadataForLocale("/privacy", "en-US");
  assert.equal(privacyEn.alternates?.canonical, "https://ekklesianexus.com/privacy");
  assert.equal(privacyEn.alternates?.languages?.["pt-BR"], "https://ekklesianexus.com/pt-br/privacy");

  const privacyPt = legalPageMetadataForLocale("/privacy", "pt-BR");
  assert.equal(privacyPt.alternates?.canonical, "https://ekklesianexus.com/pt-br/privacy");

  const featuresMeta = buildStaticPageMetadata(content, "/features");
  assert.ok(featuresMeta);
  assert.equal(featuresMeta?.alternates?.canonical, "https://ekklesianexus.com/features");
  assert.equal(featuresMeta?.alternates?.languages, undefined);

  console.log("phase1-seo-contract.test.ts passed.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
