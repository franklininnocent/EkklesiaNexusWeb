# EkklesiaNexusWeb i18n architecture

## Locales

- `en-US` — default URLs: `/`, `/privacy`, `/terms`
- `pt-BR` — `/pt-br`, `/pt-br/privacy`, `/pt-br/terms`

Locale is determined from the URL path (`x-en-pathname` via `src/proxy.ts`). The `en_locale` cookie is set only when the visitor uses the language switcher.

## Stack

- Message catalogs: `src/messages/en-US.json`, `src/messages/pt-BR.json`
- ICU formatting: `intl-messageformat` via `src/lib/i18n/translate.ts`
- Client context: `I18nProvider` in root layout
- Validation: `npm run validate:i18n` (wired into `prebuild`)

`next-intl` routing was not adopted to avoid moving English URLs behind a `[locale]` segment.

## Documentation

| File | Purpose |
| --- | --- |
| `glossary-pt-BR.md` | Terminology choices and brand rules |
| `review-matrix.md` | Per-key EN/PT, source, rationale, UI fit, review status (regenerate with `npm run generate:review-matrix`) |
| `verification.md` | Command results, routes, issue register |
| `evidence/` | Regenerated `/pt-br` screenshots (`npm run test:e2e:i18n-evidence`) |

## Responsibilities

| Layer | Responsibility |
| --- | --- |
| UI components | All visible copy via `t()` |
| BFF routes | Map known Laravel messages; `X-EN-Locale` header |
| Laravel API | Unchanged |

## SEO

`localizedAlternates()` emits `en-US`, `pt-BR`, and `x-default`. Sitemap includes `/` and `/pt-br` when the homepage is indexable.

## Regional marketing pricing (homepage)

Homepage plan amounts come from `GET /api/public/subscription-plans` (`regional_prices` per currency). They are **pre-tax marketing list prices**, separate from message catalogs.

| Concern | Mechanism |
| --- | --- |
| Interface language | URL path (`en-US` / `pt-BR`) and `en_locale` cookie when switching language |
| Pricing currency | Trusted visitor country only (`IN`→INR, `BR`→BRL, else USD) |
| India (any UI language) | INR |
| Brazil | BRL |
| Any other country | USD |
| Currency display | `formatMarketingMoneyFromDecimal()` — API decimal strings, `Intl.NumberFormat`, locale shapes grouping only |
| Tax copy | `home.pricing.taxDisclaimer` in each locale catalog (tax-exclusive; no rates) |

Language does not select currency: Portuguese UI with INR prices is valid when the visitor country is India.

Country for pricing (`visitorCountryForPricing`): trusted `X-EN-Geo-Country` + `X-EN-Geo-Token` from nginx, else `MARKETING_VISITOR_COUNTRY` in server env. Without trusted country, currency is USD.

Billing period (monthly vs annual) follows API data per currency (no invented annual USD/BRL). This is **marketing display only** — not tenant billing. Subscription onboarding must use the confirmed tenant country and the Laravel catalog.

Local dev without geo headers: set `MARKETING_VISITOR_COUNTRY` or USD list prices apply.
