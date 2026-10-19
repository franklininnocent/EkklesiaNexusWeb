# Phase 11 — hreflang, canonical, sitemap validation

**Validation date:** 2026-10-18 (UTC)  
**Method:** Unit tests (`phase1-seo-contract`, `phase11-international-seo`) + code review

---

## Canonical URLs

| URL | Expected canonical | Implementation | Result |
|-----|------------------|----------------|--------|
| `/` | `https://ekklesianexus.com/` | `buildLocalizedHomeMetadata` en-US | **Pass** |
| `/pt-br` | `https://ekklesianexus.com/pt-br` | `buildLocalizedHomeMetadata` pt-BR | **Pass** |
| `/features` | `https://ekklesianexus.com/features` | `buildStaticPageMetadata` | **Pass** |
| `/privacy` | `https://ekklesianexus.com/privacy` | `legalPageMetadata` | **Pass** |
| `/pt-br/privacy` | `https://ekklesianexus.com/pt-br/privacy` | `legalPageMetadata` pt-BR | **Pass** |

English-only pages: **self-canonical** only — no false pt-BR canonical.

---

## hreflang / `alternates.languages`

| Page pair | en-US URL | pt-BR URL | x-default | Reciprocal | Result |
|-----------|-----------|-----------|-----------|------------|--------|
| Home | `/` | `/pt-br` | `/` | Yes | **Pass** |
| Privacy | `/privacy` | `/pt-br/privacy` | `/` (EN home policy) | Yes | **Pass** (Phase 11 added) |
| Terms | `/terms` | `/pt-br/terms` | `/` | Yes | **Pass** (Phase 11 added) |
| Features | `/features` | — | — | N/A | **Correctly omitted** |

**Phase 11 fix:** Legal pages now export `localizedLanguageAlternates` while remaining `noindex`.

**Home fix:** `localizedAlternates(page, canonicalLocale)` sets self-referencing canonical for pt-BR without duplicating merge logic in `buildPageMetadata`.

---

## Sitemap (`indexableLocalizedSitemapEntries`)

- Host: apex HTTPS from `siteConfig.url`
- Includes: `/`, `/pt-br`, English static marketing pages (13 URLs in production sample)
- Excludes: `/privacy`, `/terms`, `/api/*`, `/es`
- **No** per-URL hreflang in sitemap XML (page-level metadata only) — consistent single source

---

## Robots

- Public marketing: index where `robotsIndex` true
- Legal: noindex (unchanged)
- Non-production host: disallow all (existing test)

---

## Unsupported locales

- No `/es` in sitemap, routes, or `SUPPORTED_LOCALES`
- `phase11-international-seo.test.ts` asserts no `/es` URLs

---

## Production verification

Re-run after deploy: view-source on `/` and `/pt-br` for `<link rel="alternate" hreflang="...">` — **not executed in Phase 11 automation** (local metadata tests are source of truth for generation).

P0 host leak (unauthorized host / IP) can still affect which host Google associates with hreflang targets — see [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md).
