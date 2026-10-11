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

Public plan amounts for India, United States, and Brazil live in `src/data/regional-pricing.ts`. They are **pre-tax marketing prices**, separate from message catalogs and from the Laravel subscription catalog used on `/preview/plans`.

| Concern | Mechanism |
| --- | --- |
| Interface language | URL path (`en-US` / `pt-BR`) and `en_locale` cookie when switching language |
| Pricing market | Derived on each request from CDN country headers + URL locale |
| India + English (`/`) | INR |
| Brazil (`BR` header) or Portuguese (`/pt-br`) | BRL |
| Any other country + English (`/`) | USD |
| Currency display | `formatMarketingMoney()` — `Intl.NumberFormat`, currency from catalog, locale from UI |
| Tax copy | `home.pricing.taxDisclaimer` in each locale catalog (tax-exclusive; no rates) |

Language and pricing market are independent: e.g. Portuguese UI with INR prices is valid.

Country for pricing (`visitorCountryForPricing`): CDN headers (`CF-IPCountry`, etc., normalized in `src/proxy.ts` as `x-en-country`), else `MARKETING_VISITOR_COUNTRY` in server env (required for `localhost` in India). Without country, English defaults to USD.

Billing period (monthly vs annual) is client state only. This is **marketing display only** — not tenant billing. Subscription onboarding must use the confirmed tenant country and the Laravel catalog.

Local dev without country headers: English site shows USD; `/pt-br` shows BRL.
