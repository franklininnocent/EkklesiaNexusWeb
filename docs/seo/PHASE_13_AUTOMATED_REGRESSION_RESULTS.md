# Phase 13 — Automated regression results

**Date:** 2026-10-18 (UTC)

| Command | Result | Notes |
|---------|--------|-------|
| `npm run test:unit` | **PASS** | phase1, 8, 9, 11, 12 |
| `npm run validate:content` | **PASS** (prior Phase 12 run) | Not re-run in isolation |
| `npm run validate:i18n` | **PASS** (prior) | |
| `npm run build` | **PASS** (prior Phase 12) | |
| Playwright i18n + seo | **18/18** (prior Phase 12) | |
| `npm run lint` | **PASS** 1 warning (prior) | |
| `bash scripts/check-production-seo-baseline.sh` | **PASS** script; **FAIL** GSC + leak hosts | Live |
| `bash scripts/record-phase13-live-verification.sh` | Available | Operator |
| Full `npm run qa` | **NOT RUN** | API + remote smoke |
| GSC API | **BLOCKED** | No credentials |

No tests disabled. No source changes in Phase 13 (documentation + operator script only).
