import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  extractLocsFromSitemapXml,
  isMarketingLeakBody,
  parseRobotsSitemapUrl,
  validateSitemapXml,
  aggregateExitCode,
} from "../src/lib/seo-monitoring/checks";
import { isAllowedMonitoringUrl } from "../src/lib/seo-monitoring/config";

const FIX = path.join(process.cwd(), "scripts/fixtures/seo-monitoring");

function run(): void {
  const robots = "User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://ekklesianexus.com/sitemap.xml\n";
  assert.equal(parseRobotsSitemapUrl(robots), "https://ekklesianexus.com/sitemap.xml");

  const good = fs.readFileSync(path.join(FIX, "sitemap-good.xml"), "utf8");
  const locs = extractLocsFromSitemapXml(good);
  assert.equal(locs.length, 2);
  assert.ok(locs.every((u) => isAllowedMonitoringUrl(u)));

  const badCount = validateSitemapXml(good, 13);
  assert.ok(badCount.some((r) => r.id === "sitemap-loc-count" && !r.passed));

  assert.equal(isMarketingLeakBody("<html>EkklesiaNexus marketing</html>"), true);
  assert.equal(isMarketingLeakBody("<html>other</html>"), false);

  const exit = aggregateExitCode([
    { id: "a", name: "a", severity: "warning", passed: false, detail: "" },
  ]);
  assert.equal(exit, 2);

  console.log("weekly-seo-health-check.test.ts passed.");
}

run();
