/**
 * Phase 0–14 — Comprehensive SEO audit contract (deterministic, local).
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SEO = path.join(ROOT, "docs/seo");
const APEX = "https://ekklesianexus.com";

const AUDIT_DELIVERABLES = [
  "PHASE_0_14_COMPREHENSIVE_AUDIT_REPORT.md",
  "PHASE_0_14_REQUIREMENT_TRACEABILITY_MATRIX.md",
  "PHASE_0_14_FINDINGS_REGISTER.md",
  "PHASE_0_14_OPTIMIZATION_AND_REMEDIATION_PLAN.md",
  "PHASE_0_14_IMPLEMENTATION_CHANGELOG.md",
  "PHASE_0_14_REGRESSION_TEST_RESULTS.md",
  "PHASE_0_14_PRODUCTION_VERIFICATION.md",
  "PHASE_0_14_MONITORING_READINESS.md",
  "PHASE_0_14_FINAL_ACCEPTANCE_REPORT.md",
];

async function run(): Promise<void> {
  for (const f of AUDIT_DELIVERABLES) {
    assert.ok(fs.existsSync(path.join(SEO, f)), `Missing audit deliverable: docs/seo/${f}`);
  }

  process.env.NEXT_PUBLIC_SITE_URL = APEX;

  const { SUPPORTED_LOCALES } = await import("../src/lib/i18n/locale");
  assert.deepEqual([...SUPPORTED_LOCALES], ["en-US", "pt-BR"]);

  const en = JSON.parse(fs.readFileSync(path.join(ROOT, "src/messages/en-US.json"), "utf8")) as {
    seo?: { homeDescription?: string; manifestDescription?: string };
  };
  const pt = JSON.parse(fs.readFileSync(path.join(ROOT, "src/messages/pt-BR.json"), "utf8")) as {
    seo?: { homeDescription?: string; manifestDescription?: string };
  };
  for (const [label, msg] of [["en-US", en], ["pt-BR", pt]] as const) {
    const desc = msg.seo?.homeDescription ?? "";
    assert.ok(!desc.includes("360"), `${label} seo.homeDescription must not contain 360° marketing`);
    assert.ok(!/\battendance\b/i.test(desc), `${label} seo.homeDescription must not claim attendance`);
  }

  const { getMarketingContent } = await import("../src/lib/marketing/get-content");
  const { buildLocalizedHomeMetadata } = await import("../src/lib/marketing/localized-metadata");
  const { indexableLocalizedSitemapEntries } = await import("../src/lib/marketing/localized-metadata");
  const { getHomePageSeo } = await import("../src/lib/marketing/seo-metadata");
  const content = getMarketingContent();

  const homeSeo = getHomePageSeo(content);
  assert.equal(homeSeo.robotsIndex, true, "EN home must be indexable");
  assert.equal(homeSeo.robotsFollow, true, "EN home must allow follow");
  assert.ok(buildLocalizedHomeMetadata(content, "en-US").title);
  assert.ok(buildLocalizedHomeMetadata(content, "pt-BR").title);

  const urls = indexableLocalizedSitemapEntries(content).map((e) => e.url);
  assert.equal(urls.length, 13, "expected 13 indexable sitemap URLs (en + pt-br localized set)");
  assert.ok(urls.every((u) => u.startsWith(APEX)), "sitemap must use production apex host");

  const gscPath = path.join(ROOT, "public/google161c1efd34d8a358.html");
  const gscBody = fs.readFileSync(gscPath, "utf8").trim();
  assert.ok(gscBody.length > 10, "GSC verification file must be non-empty");

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")) as {
    scripts: { "test:unit": string };
  };
  assert.ok(
    pkg.scripts["test:unit"].includes("phase0-14-audit-contract.test.ts"),
    "test:unit must include phase0-14-audit-contract.test.ts",
  );

  console.log("phase0-14-audit-contract.test.ts passed.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
