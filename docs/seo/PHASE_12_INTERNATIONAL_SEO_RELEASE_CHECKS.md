# Phase 12 — International SEO release checks

| Check | Result | Evidence |
|-------|--------|----------|
| `SUPPORTED_LOCALES` = en-US, pt-BR | **PASS** | locale.ts + phase12 gate |
| No `/es` route | **PASS** | phase8/12 sitemap tests |
| `/` and `/pt-br` render | **PASS** | Playwright i18n (18 tests) |
| `html lang` en vs pt-BR | **PASS** | Playwright |
| Home self-canonical + hreflang | **PASS** | phase11 |
| Legal hreflang reciprocal | **PASS** | phase11 + phase1 |
| EN-only deep pages omit hreflang | **PASS** | By design |
| `x-default` → `/` | **PASS** | localized-metadata |
| Switcher privacy mapping | **PASS** | Playwright |
| Switcher on `/features` stays EN path | **PASS** | locale.test.ts |
| Locale ≠ country pricing | **PASS** | `resolve-pricing-market.test.ts` unchanged |
| pt-BR native copy approval | **BLOCKED** | Phase 11 — pending reviewer |

See [PHASE_11_HREFLANG_CANONICAL_SITEMAP_VALIDATION.md](PHASE_11_HREFLANG_CANONICAL_SITEMAP_VALIDATION.md).
