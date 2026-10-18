# Phase 14 — Automated test results

**Date:** 2026-10-18 (UTC)

| Command | Result | Notes |
|---------|--------|-------|
| `npm run validate:content` | **PASS** | |
| `npm run validate:i18n` | **PASS** | 303 keys, 2 locales |
| `npm run test:unit` | **PASS** | Includes `phase14-monitoring-contract.test.ts` |
| `npm run lint` | **NOT RUN** | Prior: 1 warning `_serverMessages` |
| `npm run build` | **PASS** | Next.js 16.4.2 (sandbox retry with full perms) |
| Playwright `e2e/i18n.spec.ts` + `e2e/seo-public-pages.spec.ts --project=chrome` | **PASS** | 18 passed, ~5.9m; Chrome only |
| `bash scripts/check-production-seo-baseline.sh` | **NOT RUN** | Requires network; operator |
| Full `npm run qa` | **NOT RUN** | API + remote smoke |

## Limitations

- Production curls not executed in this document refresh pass unless noted in final report.
- No GSC or GA4 API tests (no credentials in repo).
