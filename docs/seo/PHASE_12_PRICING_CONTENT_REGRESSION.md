# Phase 12 — Pricing content regression

**Business logic:** **Not modified** in Phases 3–12 SEO work.

## Automated evidence

| Test / area | Result |
|-------------|--------|
| `map-public-plans.test.ts` | **PASS** — no hardcoded plan count; ISO currency |
| `regional-pricing.test.ts` | **PASS** |
| `marketing-money.test.ts` | **PASS** |
| `resolve-pricing-market.test.ts` | **PASS** — country headers vs locale |
| `phase12-release-gate.test.ts` | **PASS** — no dollar amounts in `marketing-static-pages.ts` |
| Structured data | **PASS** — no Offer/price in JSON-LD |

## SEO surface

- Pricing on homepage `#pricing` uses public plan API / catalog mapping (unchanged).
- Marketing copy references country-aware pricing without numeric literals (Phase 9 contact/about).
- No indexable standalone `/pricing` URL — pricing is section of home (intentional).

## Manual / production

Country-specific price display on live site **not** re-verified per country in Phase 12 (no production env change). Use post-deploy smoke on IN/US/BR headers per operator checklist.
