# International SEO architecture — Phase 1 decision record

**Status:** Current production contract. **Phase 2A:** no new locale routes. **Phase 2B:** first new prefix `/es` only after production gates in [PHASE_2_PREFLIGHT_AND_GAP_ASSESSMENT.md](PHASE_2_PREFLIGHT_AND_GAP_ASSESSMENT.md).  
**Official site:** `https://ekklesianexus.com`  
**Locales in app:** `en-US` (default), `pt-BR` ([`src/lib/i18n/locale.ts`](../src/lib/i18n/locale.ts))

---

## URL contract (frozen for Phase 1)

| Locale | Public home path | Canonical (HTTPS) | Hreflang |
|--------|------------------|-------------------|----------|
| English (en-US) | `/` | `https://ekklesianexus.com/` (metadata may omit trailing slash on live HTML) | `en-US`, `pt-BR`, `x-default` among **home equivalents only** |
| Portuguese (Brazil) | `/pt-br` | `https://ekklesianexus.com/pt-br` | Same cluster; canonical for PT home is **`/pt-br`**, not `/` |

**Rules:**

- `x-default` → English homepage (`https://ekklesianexus.com`).
- **English-only routes** (`/features`, `/features/*`, `/about`, `/contact`, `/solutions/*`) carry **self canonical only** — no `pt-BR` alternate.
- **Legal** (`/privacy`, `/terms`, `/pt-br/privacy`, `/pt-br/terms`): **noindex**; canonical per locale path; **no hreflang** (noindex + alternates conflict avoided).
- Root layout emits home hreflang **only** when pathname is `/` or `/pt-br` ([`src/app/layout.tsx`](../src/app/layout.tsx)).
- Pricing: public catalog + visitor country resolution; **no** indexable `?market=` or per-country pricing URLs.

---

## Market table (documentation — not implemented routes)

| Market | Phase 1 URL | Rationale |
|--------|-------------|-----------|
| Global English (e.g. India, Philippines, United States, Nigeria) | `/` | Single language; no approved country-specific marketing page |
| Brazil | `/pt-br` | Existing localized homepage; do not relocate |
| Mexico, Colombia | none | No approved Spanish marketing copy; do not split one thin Spanish URL by country |
| Italy | none | No Italian copy |
| France, DRC | none | No French copy; shared language is not a reason for duplicate thin URLs |

---

## Sitemap and robots

- Sitemap host: `https://ekklesianexus.com` only — includes `/`, `/pt-br`, indexable marketing paths; excludes `app.`, `api.`, the unauthorized host, privacy/terms (see `indexableLocalizedSitemapEntries` / unit tests).
- `robots.txt` on official host allows marketing crawl; unauthorized production hosts should return disallow or 404 at edge (operator Apache + deployed proxy guard).

---

## Implementation references

| Concern | Module |
|---------|--------|
| Home + alternates | [`localized-metadata.ts`](../src/lib/marketing/localized-metadata.ts) |
| Static English pages | [`marketing-static-pages.ts`](../src/lib/marketing/marketing-static-pages.ts) |
| Legal noindex | [`legal-metadata.ts`](../src/lib/marketing/legal-metadata.ts) |
| SEO validation | [`validate-seo.ts`](../src/lib/marketing/validate-seo.ts) |
| Regression tests | [`scripts/phase1-seo-contract.test.ts`](../scripts/phase1-seo-contract.test.ts), [`scripts/seo-metadata.test.ts`](../scripts/seo-metadata.test.ts) |

---

## Host handling (Phase 2A)

Production allowlist uses `effectiveMarketingRequestHost` in [`marketing-request-host.ts`](../src/lib/marketing/marketing-request-host.ts): public `Host` wins unless loopback, then `X-Forwarded-Host`. Applied in [`proxy.ts`](../src/proxy.ts) before preview-token exchange. Apache catch-all must not proxy to Next.js (see [deploy/apache-ekklesianexus.conf.example](deploy/apache-ekklesianexus.conf.example)).

## Future locale URL convention (not implemented)

| Locale | Planned prefix | Notes |
|--------|----------------|-------|
| Spanish (MX + CO) | `/es` | Single language URL; no `/es-mx` + `/es-co` |
| Italian | `/it` | After `/es` when copy exists |
| French (FR + DRC) | `/fr` | Single language URL |

Extension point: existing `SUPPORTED_LOCALES`, `publicPagePath`, message JSON catalogs, `localizedAlternates()`, and contract tests — **not** a second metadata framework.

## Phase 2B+ launch criteria (each locale)

Explicit product approval plus: meaningful localized copy, native review, hreflang only among true equivalents, pricing claims aligned with live catalog, no fabricated local office/compliance claims, no per-country `LocalBusiness` doorway JSON-LD, and post-launch crawl verification.
