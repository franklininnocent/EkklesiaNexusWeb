# Phase 0–14 — Production verification (read-only)

**Capture time:** 2026-10-18T05:09:40Z  
**Command:** `bash scripts/record-phase0-14-production-verification.sh`  
**GSC UI / indexing:** **UNAVAILABLE** (no engineering access)

## Distinction

| Evidence type | Status |
|---------------|--------|
| Local code + `test:unit` | Verified this audit |
| Live HTTP/HTML | Verified below |
| Search Console metrics | **UNAVAILABLE** |

---

## Core URLs

| URL | HTTP | Canonical | Robots |
|-----|------|-----------|--------|
| `https://ekklesianexus.com/` | 200 | `https://ekklesianexus.com` | index, follow |
| `https://ekklesianexus.com/pt-br` | 200 | `https://ekklesianexus.com/pt-br` | index, follow |
| `https://ekklesianexus.com/features` | 200 | `https://ekklesianexus.com/features` | index, follow |
| `https://ekklesianexus.com/solutions/catholic-parishes` | 200 | OK | index, follow |
| `https://ekklesianexus.com/contact` | 200 | OK | index, follow |

## robots.txt and sitemap

- `robots.txt`: **200** — Allow `/`, Disallow `/api/`
- `sitemap.xml`: **200** — **13** `<loc>` entries, no bad hosts in locs

## GSC verification file

| URL | Result |
|-----|--------|
| `https://ekklesianexus.com/google161c1efd34d8a358.html` | **404** — **FAIL** (file exists in repo `public/`) |

## Hostname isolation

| URL | Result |
|-----|--------|
| `the unauthorized hostname` | **200** — marketing HTML — **FAIL** |
| `http://139.59.18.151/` | **200** — marketing HTML — **FAIL** |

## Metadata snapshot (SSR)

| URL | lang | title (live) | Drift vs repo |
|-----|------|--------------|---------------|
| `/` | en | EkklesiaNexus — **Next-Generation** Church Management System | Title/desc — **yes** |
| `/pt-br` | pt-BR | Sistema de gestão paroquial de nova geração | Desc likely **yes** (360°) |
| `/features` | en | Church management features — EkklesiaNexus | Acceptable |
| `/contact` | en | Contact EkklesiaNexus | May lag Phase 9 meta |

**Live home meta description (sample):** contains **“complete 360° Church Management System”** — repo `seo.homeDescription` does not include 360°.

## Pricing

Live country-aware pricing not exercised in this script; repo pricing unit tests pass. See [PHASE_13_LIVE_PRICING_REGRESSION_REPORT.md](PHASE_13_LIVE_PRICING_REGRESSION_REPORT.md).

## Pending checks

- URL Inspection in GSC for `/` and `/pt-br` after deploy.
- GA4 DebugView on production.
- Optional Lighthouse on staging post-deploy.
