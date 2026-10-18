/**
 * Phase 14 — Monitoring and reporting contract (repo artifacts, deterministic).
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SEO = path.join(ROOT, "docs/seo");

function mustExist(rel: string): void {
  const p = path.join(SEO, rel);
  assert.ok(fs.existsSync(p), `Missing Phase 14 deliverable: docs/seo/${rel}`);
}

function run(): void {
  const required = [
    "PHASE_14_SEO_PERFORMANCE_BASELINE.md",
    "PHASE_14_SEARCH_CONSOLE_MONITORING_WORKFLOW.md",
    "PHASE_14_ORGANIC_SEARCH_OPPORTUNITY_REGISTER.md",
    "PHASE_14_CONTENT_OPTIMIZATION_LOG.md",
    "PHASE_14_CTR_AND_SERP_EXPERIMENT_REGISTER.md",
    "PHASE_14_SEO_REGRESSION_MONITORING.md",
    "PHASE_14_ORGANIC_CONVERSION_MEASUREMENT.md",
    "PHASE_14_PERFORMANCE_MONITORING_AND_UX_LOG.md",
    "PHASE_14_OFF_PAGE_MONITORING_REGISTER.md",
    "PHASE_14_REPORTING_GOVERNANCE.md",
    "PHASE_14_90_DAY_SEO_IMPROVEMENT_ROADMAP.md",
    "PHASE_14_ISSUE_REGISTER.md",
    "PHASE_14_FINAL_IMPLEMENTATION_REPORT.md",
    "templates/PHASE_14_MONTHLY_SEO_REPORT.md",
  ];
  for (const f of required) mustExist(f);

  const auditMasters = [
    "PHASE_0_14_COMPREHENSIVE_AUDIT_REPORT.md",
    "PHASE_0_14_FINAL_ACCEPTANCE_REPORT.md",
  ];
  for (const f of auditMasters) mustExist(f);

  const baseline = fs.readFileSync(path.join(SEO, "PHASE_14_SEO_PERFORMANCE_BASELINE.md"), "utf8");
  assert.ok(baseline.includes("UNAVAILABLE"), "Baseline must not fake metrics");

  assert.ok(fs.existsSync(path.join(ROOT, "scripts/record-phase13-live-verification.sh")));
  assert.ok(fs.existsSync(path.join(ROOT, "scripts/check-production-seo-baseline.sh")));

  console.log("phase14-monitoring-contract.test.ts passed.");
}

run();
