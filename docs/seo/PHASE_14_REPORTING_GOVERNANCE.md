# Phase 14 — Reporting governance

## Artifacts

| Artifact | Location | Owner role |
|----------|----------|------------|
| Monthly report | [templates/PHASE_14_MONTHLY_SEO_REPORT.md](templates/PHASE_14_MONTHLY_SEO_REPORT.md) | Marketing / growth lead |
| Baseline register | [PHASE_14_SEO_PERFORMANCE_BASELINE.md](PHASE_14_SEO_PERFORMANCE_BASELINE.md) | SEO operator |
| Issues | [PHASE_14_ISSUE_REGISTER.md](PHASE_14_ISSUE_REGISTER.md) | Engineering + ops |
| Experiments | [PHASE_14_CTR_AND_SERP_EXPERIMENT_REGISTER.md](PHASE_14_CTR_AND_SERP_EXPERIMENT_REGISTER.md) | Content + SEO |

Legacy template: [templates/MONTHLY_SEO_REPORT_TEMPLATE.md](templates/MONTHLY_SEO_REPORT_TEMPLATE.md) — may coexist; prefer Phase 14 template for new cycles.

## Cadence

| Activity | When |
|----------|------|
| GSC + GA4 pull | 1st business week each month |
| Production smoke | Weekly |
| Issue register review | Monthly + after deploy |
| 90-day roadmap checkpoint | Day 30 / 60 / 90 |

## Rules

- Mark **UNAVAILABLE**; never zero-fill missing GSC.
- Separate deploy events from SEO experiments in narrative.
- No ranking/traffic success claims without exported numbers.
- Store raw exports outside git if they contain query-level data (policy TBD).
