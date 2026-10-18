# Phase 12 — Crawlability and indexability

## robots.txt (production GET)

- **URL:** `https://ekklesianexus.com/robots.txt` — **200**
- **Policy:** `Allow: /`, `Disallow: /api/`, sitemap declaration to apex `sitemap.xml`
- **Result:** **PASS** for intended marketing crawl; API not a security boundary

## sitemap.xml (production GET)

- **200**, **13** `<loc>` entries, apex HTTPS only (Phase 8/12 scripts)
- Includes `/` and `/pt-br`; excludes legal, api, `/es`
- **Result:** **PASS** (repo generation matches production sample)

## GSC verification file (production)

- `https://ekklesianexus.com/google161c1efd34d8a358.html` → **404**
- Repo: `public/google161c1efd34d8a358.html` present
- **Result:** **FAIL P0** until deploy

## Indexability conflicts

- No unintended `noindex` on core marketing routes in metadata tests
- Legal pages intentionally `noindex`

## Google indexing

**Not verified** — no GSC access (SEO-004).
