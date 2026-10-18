# Phase 0–14 — Findings register

Maps legacy [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md) IDs where applicable.

| ID | Sev | Category | Phases | Title | Evidence | Impact | In-scope fix | Status |
|----|-----|----------|--------|-------|----------|--------|--------------|--------|
| SEO-AUDIT-001 | **High** | Technical / GSC | 8,12,13 | GSC verification 404 on apex | Live curl 2026-10-18; file in `public/` | Cannot verify property | **No** — deploy | **Open** |
| SEO-AUDIT-002 | **High** | Crawl / host | 1,3,12,13 | Matchpoint host serves marketing | `http://dwm.matchpointgps.in/` 200 + EkklesiaNexus HTML | Duplicate indexing risk | **No** — Apache | **Open** |
| SEO-AUDIT-003 | **High** | Crawl / host | 1,3,12,13 | Raw IP serves marketing | `http://139.59.18.151/` 200 | Same as 002 | **No** — Apache | **Open** |
| SEO-AUDIT-004 | **High** | Content / drift | 4,11,13 | Live home meta 360° / old title | Live: “Next-Generation”, 360° description; repo without 360° | Snippet mismatch, trust | **No** — deploy | **Open** |
| SEO-AUDIT-005 | Medium | Measurement | 8,14 | No GSC access in engineering | SEO-004 | No organic baseline | **No** — owner access | **Open** |
| SEO-AUDIT-006 | Medium | Analytics | 8,14 | GA4 production not verified | SEO-006, `ga4-events.ts` | Conversion reporting gap | **No** — env review | **Open** |
| SEO-AUDIT-007 | Medium | Release | 12,13 | SEO bundle undeployed | Git dirty vs live metadata | Phases 4–11 not on prod | **No** — deploy | **Open** |
| SEO-AUDIT-008 | Low | CI | I | Playwright not in `web-quality` CI | `.github/workflows/ci.yml` | Regression risk on PRs | **Deferred** — needs approval | **Open** |
| SEO-AUDIT-009 | Low | Quality | 12 | ESLint unused messages prop | `i18n-provider.tsx` | Noise | **Yes** | **Fixed** |
| SEO-AUDIT-010 | Informational | Tests | 14 | phase14 test was doc-only | Prior phase14 contract | False confidence | **Yes** — audit contract | **Fixed** |
| SEO-AUDIT-011 | Informational | Off-page | 10 | No verified editorial backlinks | Phase 10/14 registers | Expected at launch | Monitor monthly | **Open** |
| SEO-AUDIT-012 | Informational | Perf | 7 | Field Core Web Vitals unavailable | No CrUX/GSC access | Cannot claim CWV pass | Collect post-GSC | **Open** |

### Verification methods

| Finding | Reproduce |
|---------|-----------|
| 001 | `curl -sS -o /dev/null -w "%{http_code}" https://ekklesianexus.com/google161c1efd34d8a358.html` |
| 002–003 | `bash scripts/check-production-seo-baseline.sh` |
| 004 | Compare live `meta description` to `src/messages/en-US.json` `seo.homeDescription` |
| 005–006 | Operator GSC / GA4 UI |
| 009–010 | `npm run lint`; `npm run test:unit` |
