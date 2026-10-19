# Phase 0–14 — Monitoring readiness

**Superseded for day-to-day operations by:** [SEO_MONITORING_OPERATING_PROCEDURE.md](SEO_MONITORING_OPERATING_PROCEDURE.md).

**Readiness:** Procedures are **actionable in documentation**; **live measurement** remains **blocked** until P0 deploy, GSC verify, and host isolation.

## Weekly (operator)

| Task | Command / source | Escalate if |
|------|------------------|-------------|
| Availability + crawl | `bash scripts/check-production-seo-baseline.sh` | Apex non-200, sitemap ≠13, GSC file non-200 post-deploy |
| Host leak | Same script leak section | the unauthorized host/IP return marketing HTML |
| Issue triage | [PHASE_0_14_FINDINGS_REGISTER.md](PHASE_0_14_FINDINGS_REGISTER.md) | New P0/P1 |

## Monthly

| Task | Source | Template |
|------|--------|----------|
| GSC Performance 28d vs prior 28d | Search Console (owner) | [templates/PHASE_14_MONTHLY_SEO_REPORT.md](templates/PHASE_14_MONTHLY_SEO_REPORT.md) |
| Legacy template (optional) | — | [templates/MONTHLY_SEO_REPORT_TEMPLATE.md](templates/MONTHLY_SEO_REPORT_TEMPLATE.md) |
| Experiments | [PHASE_14_CTR_AND_SERP_EXPERIMENT_REGISTER.md](PHASE_14_CTR_AND_SERP_EXPERIMENT_REGISTER.md) | |
| Off-page | [PHASE_14_OFF_PAGE_MONITORING_REGISTER.md](PHASE_14_OFF_PAGE_MONITORING_REGISTER.md) | |

Workflow detail: [PHASE_14_SEARCH_CONSOLE_MONITORING_WORKFLOW.md](PHASE_14_SEARCH_CONSOLE_MONITORING_WORKFLOW.md), [PHASE_14_REPORTING_GOVERNANCE.md](PHASE_14_REPORTING_GOVERNANCE.md).

## Quarterly

- Re-run technical checklist from [PHASE_0_14_REQUIREMENT_TRACEABILITY_MATRIX.md](PHASE_0_14_REQUIREMENT_TRACEABILITY_MATRIX.md) sample (sitemap, locales, prohibited claims).
- Full read-only production capture: `bash scripts/record-phase0-14-production-verification.sh`.
- Security scan: `bash scripts/scan-marketing-security.sh` (repo).
- Update [PHASE_14_90_DAY_SEO_IMPROVEMENT_ROADMAP.md](PHASE_14_90_DAY_SEO_IMPROVEMENT_ROADMAP.md) next window.

## Data prerequisites

| Metric | Source | Status |
|--------|--------|--------|
| Impressions/clicks | GSC | **UNAVAILABLE** |
| Organic sessions | GA4 | **UNVERIFIED** |
| Field CWV | GSC / CrUX | **UNAVAILABLE** |
| Backlinks | GSC Links + manual | **UNAVAILABLE** |

**Rule:** Mark **UNAVAILABLE**; never zero-fill.

## Issue management

1. Log in [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md) and [PHASE_0_14_FINDINGS_REGISTER.md](PHASE_0_14_FINDINGS_REGISTER.md).
2. Assign owner role (DevOps, SEO operator, Marketing).
3. Verify fix with scripted evidence before closing.

## Escalation

| Severity | Response |
|----------|----------|
| Critical | Apex down, pricing wrong on site, site-wide accidental noindex |
| High | GSC file missing after deploy, leak hosts, sitemap failure |
| Medium | Single-page meta regression |
| Low | Documentation / CI gaps |
