# Phase 12 — Metadata and structured data audit

**Scope:** Repository metadata builders + `seo-metadata.test.ts` + `phase12-release-gate.test.ts`

## Metadata (representative)

| Page | Title/description | Canonical | OG locale | Result |
|------|-------------------|-------------|-----------|--------|
| `/` | `site.ts` / CMS home | apex `/` | en_US | **PASS** |
| `/pt-br` | `seo.homeTitle` pt messages | `/pt-br` | pt_BR | **PASS** |
| `/features` | `marketing-static-pages` | `/features` | default | **PASS** |
| Feature slugs | `feature-slugs.ts` | per path | default | **PASS** |
| `/contact` | static + Phase 9 description | `/contact` | default | **PASS** |

No localhost in production metadata when `NEXT_PUBLIC_SITE_URL` set (tests force apex).

## Structured data (JSON-LD)

- Types: `Organization`, `WebSite`, `SoftwareApplication` on localized homes via `StructuredData`
- **No** `aggregateRating`, `Offer`, or price fields (phase12 gate)
- `SoftwareApplication.url` → `https://app.ekklesianexus.com` (**PASS**)
- Organization `url` → marketing apex (**PASS**)
- Breadcrumb JSON-LD on static feature/solution pages (syntax via page render)

## Rich results

Eligibility **not** confirmed — syntax/structure checks only.

## Production HTML

Not fully re-scraped in Phase 12; deploy gap may leave old titles on live site (P12-004).
