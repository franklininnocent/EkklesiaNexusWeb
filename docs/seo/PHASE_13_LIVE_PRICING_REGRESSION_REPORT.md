# Phase 13 — Live pricing regression

**Pricing surface:** `/#pricing` on `/` and `/pt-br` (no standalone `/pricing` URL).

## Live inspection (2026-10-18)

| Check | Method | Result |
|-------|--------|--------|
| Hardcoded plan prices in live home HTML | grep sample of `/` body | Plans section present; amounts loaded client-side from API pattern (not audited per-country on live) |
| Static mock prices in SEO metadata | Production GET `/` | No prices in title/description/canonical |
| JSON-LD Offer/price | Not observed in quick audit | **PASS** (no price schema in live head sample) |
| Repo pricing tests | `npm run test:unit` | **PASS** — unchanged |

## Country-aware behavior

**NOT TESTED** on production with `CF-IPCountry` / `X-EN-Country` headers in Phase 13 (avoid unintended side effects). Operator post-deploy:

1. Open `https://ekklesianexus.com/#pricing` with VPN or documented test headers per `resolve-pricing-market` docs.
2. Confirm currency/plan labels change by country without static dollar amounts in page source.

## Drift

Home marketing copy on live still shows legacy **360°** positioning; pricing **component code** on server is unknown commit — treat as **deployment inconclusive** for plan API version.

## Business logic

**No repository changes** to pricing in Phase 13.
