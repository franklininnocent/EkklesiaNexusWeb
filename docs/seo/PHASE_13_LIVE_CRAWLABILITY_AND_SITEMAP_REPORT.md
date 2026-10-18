# Phase 13 — Live crawlability and sitemap

**Verified:** 2026-10-18T04:59:06Z

## robots.txt

- **200** `text/plain`
- `User-Agent: *` / `Allow: /` / `Disallow: /api/`
- Sitemap: `https://ekklesianexus.com/sitemap.xml`
- **PASS** — does not block `/` or `/pt-br`; API disallow is not access control

## sitemap.xml

- **200** `application/xml`
- **13** `<loc>` entries, all `https://ekklesianexus.com` host
- Includes `/`, `/pt-br`, features hub, 7 slugs, catholic, about, contact
- **No** `/es`, localhost, or leak hostnames
- **PASS**

## GSC verification path

- `https://ekklesianexus.com/google161c1efd34d8a358.html` → **404** (HTML error page, noindex)
- Repo: file exists under `public/`
- **FAIL P0** — deploy required

## Indexing assumption

Sitemap presence ≠ Google index. No GSC coverage data in Phase 13.
