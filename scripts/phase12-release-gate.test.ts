/**
 * Phase 12 — Release gate regression (deterministic, local).
 * Aggregates critical SEO invariants before authorized deploy.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APEX = "https://ekklesianexus.com";

async function run(): Promise<void> {
  process.env.NEXT_PUBLIC_SITE_URL = APEX;

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")) as {
    scripts: { "test:unit": string };
  };
  for (const script of [
    "phase8-seo-measurement.test.ts",
    "phase11-international-seo.test.ts",
    "phase12-release-gate.test.ts",
  ]) {
    assert.ok(pkg.scripts["test:unit"].includes(script), `test:unit must include ${script}`);
  }

  const gscPath = path.join(ROOT, "public/google161c1efd34d8a358.html");
  assert.ok(fs.existsSync(gscPath), "GSC verification file must exist in public/ for deploy");

  const { SUPPORTED_LOCALES } = await import("../src/lib/i18n/locale");
  assert.deepEqual([...SUPPORTED_LOCALES], ["en-US", "pt-BR"]);

  const { indexableLocalizedSitemapEntries } = await import("../src/lib/marketing/localized-metadata");
  const { getMarketingContent } = await import("../src/lib/marketing/get-content");
  const urls = indexableLocalizedSitemapEntries(getMarketingContent()).map((e) => e.url);
  assert.ok(urls.every((u) => u.startsWith(APEX)));
  assert.ok(!urls.some((u) => /\/es\b|localhost|127\.0\.0\.1/.test(u)));

  const { buildStructuredDataGraph } = await import("../src/lib/marketing/seo-metadata");
  const graph = buildStructuredDataGraph(getMarketingContent()) as { "@graph": Array<Record<string, unknown>> };
  const json = JSON.stringify(graph);
  assert.ok(!json.includes("aggregateRating"));
  assert.ok(!json.includes("Offer"));
  const app = graph["@graph"].find((n) => n["@type"] === "SoftwareApplication");
  assert.equal(String(app?.url), "https://app.ekklesianexus.com");

  const marketingTs = fs.readFileSync(path.join(ROOT, "src/lib/marketing/marketing-static-pages.ts"), "utf8");
  assert.ok(!marketingTs.match(/\$\d+|\bUSD\s+\d|INR\s+\d|R\$\s*\d/));

  console.log("phase12-release-gate.test.ts passed.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
