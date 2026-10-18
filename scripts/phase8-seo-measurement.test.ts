/**
 * Phase 8 — SEO measurement regression (local, deterministic).
 * Does not call production or GSC APIs.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APEX = "https://ekklesianexus.com";

async function run(): Promise<void> {
  process.env.NEXT_PUBLIC_SITE_URL = APEX;

  const { SUPPORTED_LOCALES } = await import("../src/lib/i18n/locale");
  assert.deepEqual([...SUPPORTED_LOCALES], ["en-US", "pt-BR"]);

  const { getMarketingContent } = await import("../src/lib/marketing/get-content");
  const { indexableLocalizedSitemapEntries } = await import("../src/lib/marketing/localized-metadata");
  const { buildStructuredDataGraph } = await import("../src/lib/marketing/seo-metadata");
  const { ga4EventName } = await import("../src/lib/marketing/ga4-events");
  const { FEATURE_SLUGS } = await import("../src/lib/marketing/feature-slugs");

  const content = getMarketingContent();
  const entries = indexableLocalizedSitemapEntries(content);
  const urls = entries.map((e) => e.url);

  assert.ok(urls.length >= 10, "expected indexable sitemap entries");
  for (const url of urls) {
    assert.ok(url.startsWith(`${APEX}/`) || url === `${APEX}/`, `sitemap must use apex HTTPS: ${url}`);
    assert.ok(!url.includes("/es"), `no Spanish sitemap URL: ${url}`);
    assert.ok(!url.includes("localhost"), url);
    assert.ok(!url.includes("/api/"), url);
    assert.ok(!url.includes("/preview/"), url);
  }
  assert.ok(urls.includes(`${APEX}/`));
  assert.ok(urls.includes(`${APEX}/pt-br`));
  assert.ok(urls.includes(`${APEX}/features`));
  for (const slug of FEATURE_SLUGS) {
    assert.ok(urls.includes(`${APEX}/features/${slug}`), `missing feature slug in sitemap: ${slug}`);
  }
  assert.ok(!urls.includes(`${APEX}/privacy`), "legal pages must not be in sitemap");
  assert.ok(!urls.includes(`${APEX}/terms`), "legal pages must not be in sitemap");

  const graph = buildStructuredDataGraph(content) as { "@graph": Array<Record<string, unknown>> };
  const types = graph["@graph"].map((n) => n["@type"]);
  assert.deepEqual(types, ["Organization", "WebSite", "SoftwareApplication"]);
  const org = graph["@graph"][0] as { url?: string };
  assert.equal(String(org.url), APEX);

  assert.equal(ga4EventName({ event: "contact_form_submit" }), "contact_form_submit");
  assert.equal(ga4EventName({ event: "login_click" }), "login_click");
  assert.equal(ga4EventName({ event: "cta_click", label: "header_demo" }), null);

  const gscPath = path.join(ROOT, "public", "google161c1efd34d8a358.html");
  assert.ok(fs.existsSync(gscPath), "GSC verification file must exist in repo artifact");
  const gscBody = fs.readFileSync(gscPath, "utf8").trim();
  assert.ok(gscBody.includes("google-site-verification:"), "GSC file format");

  const robotsSrc = fs.readFileSync(path.join(ROOT, "src/app/robots.ts"), "utf8");
  assert.ok(robotsSrc.includes("sitemap:"), "robots must reference sitemap");
  assert.ok(robotsSrc.includes("/api/"), "robots must disallow API");

  console.log("phase8-seo-measurement.test.ts passed.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
