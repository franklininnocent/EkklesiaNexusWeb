# Phase 12 — Technical SEO route inventory

**Audit date:** 2026-10-18 (UTC)  
**Source:** `src/app` routes + `marketing-static-pages.ts` + production GET sample

| Route | Locale | Index | Sitemap | Canonical (expected) | hreflang | Evidence | Sev | Status |
|-------|--------|-------|---------|----------------------|----------|----------|-----|--------|
| `/` | en-US | Yes | Yes | `https://ekklesianexus.com/` | ↔ `/pt-br` | Unit + Playwright | — | **PASS** (repo) |
| `/pt-br` | pt-BR | Yes | Yes | `.../pt-br` | ↔ `/` | phase11 test | — | **PASS** (repo) |
| `/features` | en | Yes | Yes | `.../features` | None | phase1 | — | **PASS** |
| `/features/*` (7) | en | Yes | Yes | self | None | feature-slugs | — | **PASS** |
| `/solutions/catholic-parishes` | en | Yes | Yes | self | None | E2E | — | **PASS** |
| `/about`, `/contact` | en | Yes | Yes | self | None | E2E | — | **PASS** |
| `/privacy`, `/terms` | en | **No** | No | self | ↔ pt legal | legal-metadata | — | **PASS** |
| `/pt-br/privacy`, `/pt-br/terms` | pt-BR | **No** | No | self | ↔ en legal | Phase 11 | — | **PASS** |
| `/#pricing` | both homes | Part of home | via `/`, `/pt-br` | home canonical | via home | API pricing UI | — | **PASS** (no hardcoded price in SEO) |
| `/api/*` | — | No | No | — | — | robots Disallow | — | **PASS** |
| `/preview/*` | — | No | No | — | — | preview gate | — | **PASS** |
| `/es` | — | — | — | — | — | phase8 test | — | **N/A** (absent) |

**Production parity:** Indexable routes return **200** on apex (Phase 12 baseline); **content** may lag repo (P12-004).
