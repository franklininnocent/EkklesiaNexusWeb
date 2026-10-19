# Phase 14 — 90-day SEO improvement roadmap

**Start reference:** 2026-10-18 (planning; not a ranking guarantee)

## Days 1–30 — Data and P0

| Pri | Task | Evidence | Owner | Success metric | Review |
|-----|------|----------|-------|----------------|--------|
| P0 | Deploy marketing build with GSC file + SEO copy | Phase 13 | DevOps | GSC file 200; live title matches repo | Deploy +1d |
| P0 | Fix host leak (unauthorized host / IP) | Phase 13 | DevOps | Leak URLs not 200 marketing | Phase 3B |
| P0 | Verify GSC property | Phase 13 runbook | Owner | Property verified | Week 2 |
| P1 | First GSC 28d export | Baseline doc | SEO operator | CSV stored | Week 4 |
| P1 | Confirm GA4 on production | SEO-006 | Owner | Events in DebugView | Week 3 |
| P2 | Weekly `check-production-seo-baseline.sh` | Phase 14 | Operator | Log retained | Ongoing |

## Days 31–60 — Measure and refine

| Pri | Task | Evidence | Owner | Success metric | Review |
|-----|------|----------|-------|----------------|--------|
| P1 | Evaluate EXP-P14-001 home CTR | GSC | SEO | CTR vs baseline | Day 45+ |
| P2 | Query-level opportunities | GSC export | SEO | Update OPP register | Day 45 |
| P2 | pt-BR performance slice | GSC | Content | Clicks on `/pt-br` | Day 50 |
| P3 | Internal linking review | Phase 9 | Content | No broken links | Day 55 |

## Days 61–90 — Iterate

| Pri | Task | Evidence | Owner | Success metric | Review |
|-----|------|----------|-------|----------------|--------|
| P1 | Close or extend experiments | EXP register | SEO | Documented outcome | Day 75 |
| P2 | Off-page register update | GSC links | Marketing | ≥1 verified link or honest zero | Day 80 |
| P2 | Lighthouse on post-deploy staging | Phase 7 | Engineering | LCP trend | Day 85 |
| P3 | R-001 resource page decision | Phase 10 | Product | Approve/defer | Day 90 |

## Dependencies

No reliable growth optimization until **P0 deploy + GSC verify** complete.
