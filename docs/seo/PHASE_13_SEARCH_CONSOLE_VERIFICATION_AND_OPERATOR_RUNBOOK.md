# Phase 13 — Search Console verification and operator runbook

## Repository state

| Mechanism | Repo | Production (2026-10-18) |
|-----------|------|-------------------------|
| HTML file `google161c1efd34d8a358.html` | **Present** in `public/` | **404** at `https://ekklesianexus.com/google161c1efd34d8a358.html` |
| Token in report | **Do not publish** | — |

**Verification readiness:** **BLOCKED** until deploy returns **200** and body contains `google-site-verification: google161c1efd34d8a358.html`.

## GSC access

Engineering environment: **no** Search Console account. No indexing or performance metrics in Phase 13.

## Operator steps (after deploy + P0 host fix)

1. Sign in to [Google Search Console](https://search.google.com/search-console).
2. Add **Domain** property `ekklesianexus.com` (preferred) or URL-prefix `https://ekklesianexus.com/`.
3. Confirm verification file URL returns **200** (do not share token publicly).
4. **Sitemaps** → submit `https://ekklesianexus.com/sitemap.xml` once.
5. **URL Inspection** → `/` and `/pt-br` — record *Page indexing* status (not the same as ranking).
6. **Pages** → review exclusions; **Links** → external/internal after 2–4 weeks.
7. Distinguish: crawled ≠ indexed ≠ ranking.

Do **not** bulk "Request indexing" as a substitute for GSC file + host remediation.

Extended procedures: [GOOGLE_SEARCH_CONSOLE_RUNBOOK.md](GOOGLE_SEARCH_CONSOLE_RUNBOOK.md).

## Analytics

GA4 via CMS/env — production load **not verified** in Phase 13.
