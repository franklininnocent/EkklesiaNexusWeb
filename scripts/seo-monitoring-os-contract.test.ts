/**
 * SEO Monitoring OS — deliverable contract (deterministic).
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SEO = path.join(ROOT, "docs/seo");

const REQUIRED_DOCS = [
  "SEO_MONITORING_OPERATING_PROCEDURE.md",
  "SEO_MONITORING_COMMANDS.md",
  "SEO_ALERTING_AND_ESCALATION.md",
  "SEO_MONITORING_IMPLEMENTATION_REPORT.md",
  "templates/WEEKLY_SEO_HEALTH_CHECK.md",
  "templates/MONTHLY_SEO_PERFORMANCE_REPORT.md",
  "templates/QUARTERLY_SEO_AUDIT.md",
  "templates/NEXT_90_DAY_SEO_ROADMAP.md",
];

function run(): void {
  for (const f of REQUIRED_DOCS) {
    assert.ok(fs.existsSync(path.join(SEO, f)), `Missing: docs/seo/${f}`);
  }

  assert.ok(fs.existsSync(path.join(ROOT, "src/lib/seo-monitoring/config.ts")));
  assert.ok(fs.existsSync(path.join(ROOT, "scripts/run-weekly-seo-health-check.ts")));

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")) as {
    scripts: Record<string, string>;
  };
  assert.ok(pkg.scripts["monitor:weekly"], "monitor:weekly script required");
  assert.ok(pkg.scripts["monitor:weekly:production"], "monitor:weekly:production required");
  assert.ok(
    pkg.scripts["test:unit"].includes("weekly-seo-health-check.test.ts"),
    "test:unit must include weekly-seo-health-check.test.ts",
  );
  assert.ok(
    pkg.scripts["test:unit"].includes("seo-monitoring-os-contract.test.ts"),
    "test:unit must include seo-monitoring-os-contract.test.ts",
  );

  console.log("seo-monitoring-os-contract.test.ts passed.");
}

run();
