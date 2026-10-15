# i18n verification (2026-10-11)

Catalog parity and per-string review tracking: `docs/i18n/review-matrix.md` (295 keys; `npm run generate:review-matrix`).

Portuguese layout screenshots: `docs/i18n/evidence/` (`npm run test:e2e:i18n-evidence`).

## Regional pricing (marketing homepage)

- Catalog: `src/data/regional-pricing.ts` (IN / US / BR, pre-tax amounts)
- Market cookie: `pricing_market` (default `IN`; independent of `en_locale`)
- UI: `MockupPricing` + pill radiogroups for market and billing period
- Formatter: `formatMarketingMoney` in `src/lib/marketing-money.ts`

## Commands (regional pricing implementation)

| Command | Result |
| --- | --- |
| `npm run validate:i18n` | OK — 295 keys, 2 locales |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed (0 errors; pre-existing warning in `i18n-provider.tsx`) |
| `npm run test:unit` | Passed (includes regional-pricing, marketing-money, market-preference) |
| `npm run test:e2e -- e2e/pricing-market.spec.ts --project=chrome` | 15 passed (1 retry on en-US IN annual; stabilized with longer timeout) |
| `npm run build` | Passed (Next.js 16.4.0, webpack) |

## Routes exercised (pricing)

| Route | Locale | Notes |
| --- | --- | --- |
| `/`, `/pt-br` | en-US / pt-BR | 12 market × billing × language combinations in `e2e/pricing-market.spec.ts` |
| `/preview/plans` | en-US | Unchanged Laravel catalog path |

## Issue register (pricing)

| ID | Severity | Status | Notes |
| --- | --- | --- | --- |
| PRICE-001 | Low | IMPLEMENTED — HUMAN REVIEW REQUIRED | New `pt-BR` pricing strings (markets, billing, tax disclaimer) |
| PRICE-002 | Low | FIXED AND VERIFIED | Exact approved amounts in catalog + unit tests |
| PRICE-003 | Low | FIXED AND VERIFIED | Language and `pricing_market` independence covered in e2e |

Manual browser pass: verify all 12 combinations at `http://localhost:3010/` and capture evidence under `docs/i18n/evidence/` if needed.
