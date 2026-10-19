# Phase 13 — Production verification report (master)

## Final classification

**BLOCKED**

Live apex marketing site is **technically accessible** and **crawlable** (robots + sitemap OK), but **Search Console verification is impossible** (404), **duplicate-host serving persists**, and **material metadata drift** proves the SEO release bundle is **not deployed**. Local regression tests **pass**; they do not override production blockers.

This status does **not** authorize deploy; it documents that production SEO release steps remain incomplete.

---

## Phase 12 review

| Phase 12 conclusion | Phase 13 independent check |
|---------------------|----------------------------|
| **NOT READY** | **Confirmed** |
| P0 GSC 404 | **Reconfirmed** 2026-10-18T04:59:06Z |
| P0 leak hosts | **Reconfirmed** |
| Apex/www redirects PASS | **Reconfirmed** |
| Repo tests PASS | **Reconfirmed** `test:unit` |

---

## Live URLs checked

See [PHASE_13_LIVE_PRODUCTION_BASELINE.md](PHASE_13_LIVE_PRODUCTION_BASELINE.md).

---

## Domain, robots, sitemap

[PHASE_13_CANONICAL_HOST_AND_REDIRECT_VERIFICATION.md](PHASE_13_CANONICAL_HOST_AND_REDIRECT_VERIFICATION.md)  
[PHASE_13_LIVE_CRAWLABILITY_AND_SITEMAP_REPORT.md](PHASE_13_LIVE_CRAWLABILITY_AND_SITEMAP_REPORT.md)

---

## Metadata and international

[PHASE_13_LIVE_METADATA_AND_RENDERING_AUDIT.md](PHASE_13_LIVE_METADATA_AND_RENDERING_AUDIT.md)  
[PHASE_13_LIVE_INTERNATIONAL_SEO_VALIDATION.md](PHASE_13_LIVE_INTERNATIONAL_SEO_VALIDATION.md)

---

## Pricing

[PHASE_13_LIVE_PRICING_REGRESSION_REPORT.md](PHASE_13_LIVE_PRICING_REGRESSION_REPORT.md) — repo tests pass; live country pricing not exercised.

---

## Search Console

[PHASE_13_SEARCH_CONSOLE_VERIFICATION_AND_OPERATOR_RUNBOOK.md](PHASE_13_SEARCH_CONSOLE_VERIFICATION_AND_OPERATOR_RUNBOOK.md) — **blocked** on verification file.

---

## Indexing

[PHASE_13_INDEXING_READINESS_REGISTER.md](PHASE_13_INDEXING_READINESS_REGISTER.md) — eligibility only; **no** indexed/not-indexed claims.

---

## Drift

[PHASE_13_PRODUCTION_SOURCE_DRIFT_REPORT.md](PHASE_13_PRODUCTION_SOURCE_DRIFT_REPORT.md)

---

## Source changes (Phase 13)

| File | Purpose |
|------|---------|
| `scripts/record-phase13-live-verification.sh` | Operator re-verification |
| `docs/seo/PHASE_13_*.md` | Evidence reports |

**No application logic, pricing, or locale changes.**

---

## Tests

[PHASE_13_AUTOMATED_REGRESSION_RESULTS.md](PHASE_13_AUTOMATED_REGRESSION_RESULTS.md)

---

## Issues

[PHASE_13_ISSUE_REGISTER.md](PHASE_13_ISSUE_REGISTER.md)

---

## Owner manual steps (ordered)

1. **Apache:** stop serving marketing on `the unauthorized hostname` and raw IP (P13-002/003).  
2. **Deploy** current `EkklesiaNexusWeb` marketing build; record git SHA on server.  
3. **Verify** GSC file → **200**; complete GSC property verification.  
4. **Re-run** `bash scripts/record-phase13-live-verification.sh` — confirm home title/description match repo.  
5. Submit sitemap **once** in GSC; URL Inspection on `/` and `/pt-br`.  
6. pt-BR native review + optional live pricing country smoke.  
7. Re-classify release: target **CONDITIONALLY VERIFIED** after P0 clear and drift resolved.

---

## Phase 13 document index

1. [PHASE_13_LIVE_PRODUCTION_BASELINE.md](PHASE_13_LIVE_PRODUCTION_BASELINE.md)  
2. [PHASE_13_CANONICAL_HOST_AND_REDIRECT_VERIFICATION.md](PHASE_13_CANONICAL_HOST_AND_REDIRECT_VERIFICATION.md)  
3. [PHASE_13_LIVE_METADATA_AND_RENDERING_AUDIT.md](PHASE_13_LIVE_METADATA_AND_RENDERING_AUDIT.md)  
4. [PHASE_13_LIVE_CRAWLABILITY_AND_SITEMAP_REPORT.md](PHASE_13_LIVE_CRAWLABILITY_AND_SITEMAP_REPORT.md)  
5. [PHASE_13_LIVE_INTERNATIONAL_SEO_VALIDATION.md](PHASE_13_LIVE_INTERNATIONAL_SEO_VALIDATION.md)  
6. [PHASE_13_LIVE_PRICING_REGRESSION_REPORT.md](PHASE_13_LIVE_PRICING_REGRESSION_REPORT.md)  
7. [PHASE_13_SEARCH_CONSOLE_VERIFICATION_AND_OPERATOR_RUNBOOK.md](PHASE_13_SEARCH_CONSOLE_VERIFICATION_AND_OPERATOR_RUNBOOK.md)  
8. [PHASE_13_INDEXING_READINESS_REGISTER.md](PHASE_13_INDEXING_READINESS_REGISTER.md)  
9. [PHASE_13_LIVE_PERFORMANCE_AND_ACCESSIBILITY_SMOKE_TESTS.md](PHASE_13_LIVE_PERFORMANCE_AND_ACCESSIBILITY_SMOKE_TESTS.md)  
10. [PHASE_13_PRODUCTION_SOURCE_DRIFT_REPORT.md](PHASE_13_PRODUCTION_SOURCE_DRIFT_REPORT.md)  
11. [PHASE_13_AUTOMATED_REGRESSION_RESULTS.md](PHASE_13_AUTOMATED_REGRESSION_RESULTS.md)  
12. [PHASE_13_ISSUE_REGISTER.md](PHASE_13_ISSUE_REGISTER.md)  
13. This report
