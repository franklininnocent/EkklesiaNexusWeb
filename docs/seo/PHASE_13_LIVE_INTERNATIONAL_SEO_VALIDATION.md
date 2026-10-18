# Phase 13 — Live international SEO validation

**Verified:** 2026-10-18T04:59:06Z (production HTML)

| Check | Live result | Repo expectation | Status |
|-------|-------------|------------------|--------|
| `/` `lang` | `en` | `en` | **PASS** |
| `/pt-br` `lang` | `pt-BR` | `pt-BR` | **PASS** |
| Home canonical | apex / apex path | self per locale | **PASS** |
| Home hreflang count | 3 link elements | en-US, pt-BR, x-default | **PASS** (presence) |
| `/features` hreflang | none | none (EN-only) | **PASS** |
| Sitemap pt-br | listed | yes | **PASS** |
| `/es` | absent | absent | **PASS** |

## Live vs repo hreflang on legal pages

Not re-fetched in this pass; Phase 11 added legal alternates in **repo only** — expect **drift** on `/privacy` until deploy.

## Locale switcher

Not exercised on production in Phase 13; Playwright on local build: **PASS** (Phase 12).

## Google canonical selection

**Unknown** — requires GSC URL Inspection.
