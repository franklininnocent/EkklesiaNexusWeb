/**
 * Phase 11 — International SEO regression (local, deterministic).
 */
import assert from "node:assert/strict";

const APEX = "https://ekklesianexus.com";

async function run(): Promise<void> {
  process.env.NEXT_PUBLIC_SITE_URL = APEX;

  const { SUPPORTED_LOCALES, switchLocalePath } = await import("../src/lib/i18n/locale");
  assert.deepEqual([...SUPPORTED_LOCALES], ["en-US", "pt-BR"]);

  const { localizedAlternates, localizedLanguageAlternates, indexableLocalizedSitemapEntries } =
    await import("../src/lib/marketing/localized-metadata");
  const { buildLocalizedHomeMetadata } = await import("../src/lib/marketing/localized-metadata");
  const { legalPageMetadataForLocale } = await import("../src/lib/marketing/legal-metadata");
  const { buildStaticPageMetadata } = await import("../src/lib/marketing/marketing-static-pages");
  const { getMarketingContent } = await import("../src/lib/marketing/get-content");

  const homeLang = localizedLanguageAlternates("home");
  assert.equal(homeLang["en-US"], `${APEX}/`);
  assert.equal(homeLang["pt-BR"], `${APEX}/pt-br`);
  assert.equal(homeLang["x-default"], `${APEX}/`);

  const enAlt = localizedAlternates("home", "en-US");
  assert.ok(enAlt);
  assert.equal(enAlt.canonical, `${APEX}/`);
  const ptAlt = localizedAlternates("home", "pt-BR");
  assert.ok(ptAlt);
  assert.equal(ptAlt.canonical, `${APEX}/pt-br`);

  const content = getMarketingContent();
  const enHome = buildLocalizedHomeMetadata(content, "en-US");
  const ptHome = buildLocalizedHomeMetadata(content, "pt-BR");
  assert.equal(enHome.alternates?.canonical, `${APEX}/`);
  assert.equal(ptHome.alternates?.canonical, `${APEX}/pt-br`);
  assert.equal(enHome.alternates?.languages?.["pt-BR"], `${APEX}/pt-br`);
  assert.equal(ptHome.alternates?.languages?.["en-US"], `${APEX}/`);

  const featuresMeta = buildStaticPageMetadata(content, "/features");
  assert.equal(featuresMeta?.alternates?.languages, undefined);
  assert.equal(featuresMeta?.alternates?.canonical, `${APEX}/features`);

  const termsPt = legalPageMetadataForLocale("/terms", "pt-BR");
  assert.equal(termsPt.alternates?.canonical, `${APEX}/pt-br/terms`);
  assert.equal(termsPt.alternates?.languages?.["en-US"], `${APEX}/terms`);

  const urls = indexableLocalizedSitemapEntries(content).map((e) => e.url);
  assert.ok(urls.includes(`${APEX}/`));
  assert.ok(urls.includes(`${APEX}/pt-br`));
  assert.ok(!urls.some((u) => u.includes("/es") || u.includes("/pt-br/features")));

  assert.equal(switchLocalePath("/features", "pt-BR"), "/features");
  assert.equal(switchLocalePath("/pt-br", "en-US"), "/");
  assert.equal(switchLocalePath("/pt-br/privacy", "en-US"), "/privacy");

  console.log("phase11-international-seo.test.ts passed.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
