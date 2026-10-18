# Phase 13 — Live metadata and rendering audit

**Source:** SSR HTML from production GET (2026-10-18T04:59:06Z)  
**Not verified:** Google-rendered DOM; client-only metadata injection

| Route | lang | Title (live) | robots | Canonical | hreflang links | vs repo (local) |
|-------|------|--------------|--------|-----------|----------------|-----------------|
| `/` | en | EkklesiaNexus — **Next-Generation** Church Management System | index,follow | apex | 3 | **DRIFT** — repo: "The Next Generation **of** Church Management System" |
| `/` | en | meta desc contains **360°** | | | | **DRIFT** — repo `site.ts` / en `seo.homeDescription` without 360° |
| `/pt-br` | pt-BR | Sistema de gestão paroquial de nova geração | index,follow | `/pt-br` | 3 | Title OK; desc **360°** on live — **DRIFT** vs Phase 11 pt `seo.homeDescription` |
| `/features` | en | Church management features — EkklesiaNexus | index,follow | `/features` | 0 | **MATCH** repo static pages |
| `/contact` | en | Contact EkklesiaNexus | index,follow | `/contact` | 0 | **DRIFT** — live desc pre–Phase 9; repo has Catholic/evaluation wording |
| `/solutions/catholic-parishes` | en | Catholic parish management software… | index,follow | self | 0 | **MATCH** (Phase 6+ deployed or CMS) |
| `/about` | en | About EkklesiaNexus | index,follow | `/about` | 0 | **MATCH** |
| GSC file URL | en | 404 page title | **noindex** | apex (404 template) | 3 | **FAIL** — not verification file |

## Structured data

Live home HTML includes `application/ld+json` in SSR output (grep confirmed). Types not fully parsed in this audit; repo expects Organization / WebSite / SoftwareApplication without Offer/ratings.

## Classification

| Discrepancy | Likely cause |
|-------------|--------------|
| Home title/description 360° | **Deployment/version mismatch** (older build on server) |
| Contact meta | **Undeployed** Phase 9 |
| pt-br SEO description | **Undeployed** Phase 11 |
| Features/catholic/about | Aligned with current repo static metadata |

## Rendering

Marketing pages return full HTML with title/canonical in `<head>` at first response — **crawlable SSR** for tested URLs. No claim about Googlebot rendering queue.
