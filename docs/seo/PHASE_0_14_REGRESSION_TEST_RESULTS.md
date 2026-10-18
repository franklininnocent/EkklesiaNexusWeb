# Phase 0–14 — Regression test results

**Date:** 2026-10-18  
**Working directory:** `EkklesiaNexusWeb`

| Command | Exit | Result | Notes |
|---------|------|--------|-------|
| `npm run validate:content` | 0 | **PASS** | |
| `npm run validate:i18n` | 0 | **PASS** | 303 keys, 2 locales |
| `npm run lint` | 0 | **PASS** | No warnings after `i18n-provider` fix |
| `npm run typecheck` | 0 | **PASS** | |
| `npm run test:unit` | 0 | **PASS** | Includes phase0-14 audit + phase14 monitoring contracts |
| `npm run build` | 0 | **PASS** | Next.js 16 production build |
| `npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome` | 0 | **PASS** | 18 passed (~9.7s) |
| `bash scripts/check-production-seo-baseline.sh` | 0 | **PASS** | Via record-phase0-14 capture |
| `bash scripts/scan-marketing-security.sh` | **NOT RUN** | — | Optional; run quarterly |
| Full `npm run qa` | **NOT RUN** | — | API + extended smoke |

## Playwright

| Spec | Tests | Result |
|------|-------|--------|
| `e2e/i18n.spec.ts` | 10 | **PASS** (prior run ~18 total with seo-public-pages) |
| `e2e/seo-public-pages.spec.ts` | 8 | **PASS** |

Re-run after material marketing changes: `npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome`

## Coverage gaps

- Marketing Playwright **not** in GitHub `web-quality` CI job (SEO-AUDIT-008).
- Live country pricing matrix not automated against production API.
- GSC / GA4 — no automated tests (by design).

## Pre-existing failures

None observed in this audit pass after deliverable files and audit test fixes.
