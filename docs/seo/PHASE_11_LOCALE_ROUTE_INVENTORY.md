# Phase 11 — Locale route inventory

**Date:** 2026-10-18 (UTC)  
**Locales:** `en-US`, `pt-BR` only

| Purpose | English route | pt-BR route | Indexable | Sitemap | hreflang pair | Content status | Notes |
|---------|---------------|-------------|-----------|---------|---------------|----------------|-------|
| Homepage | `/` | `/pt-br` | Yes | Both | **Yes** | EN: primary; PT: **Technically validated** (SEO copy aligned Phase 11) | Hash sections shared |
| Privacy | `/privacy` | `/pt-br/privacy` | **No** | No | **Yes** (noindex) | Localized titles/descriptions | Legal review pending |
| Terms | `/terms` | `/pt-br/terms` | **No** | No | **Yes** (noindex) | Localized | Legal review pending |
| Features hub | `/features` | — | Yes | EN only | **No** | EN only | Switcher stays on `/features` |
| Feature detail (×7) | `/features/[slug]` | — | Yes | EN only | **No** | EN only | By design |
| Catholic solution | `/solutions/catholic-parishes` | — | Yes | EN only | **No** | EN only | Phase 9 internal links |
| About | `/about` | — | Yes | EN only | **No** | EN only | |
| Contact | `/contact` | — | Yes | EN only | **No** | EN only | Form i18n on pt-br **home** only |
| Pricing | `/#pricing` | `/pt-br#pricing` | Part of home | Via home URLs | Via home hreflang | API-driven | Country ≠ locale |
| APIs / preview | `/api/*`, `/preview/*` | — | No | No | No | — | robots disallow |

**Gap (documented, not auto-fixed):** No `/pt-br` equivalents for deep English SEO pages — intentional; do not add hreflang without real localized content.
