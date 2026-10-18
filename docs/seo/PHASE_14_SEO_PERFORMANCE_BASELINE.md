# Phase 14 — SEO performance baseline register

**Established:** 2026-10-18 (UTC)  
**Primary window:** 28-day GSC — **UNAVAILABLE** (no property access; verification file 404 on production per Phase 13)  
**Comparison window:** Prior 28-day — **UNAVAILABLE**

## Release context (Phase 12–13)

| Check | Status |
|-------|--------|
| Phase 12 release | **NOT READY** |
| Phase 13 production | **BLOCKED** (P0 GSC 404, host leak, deploy drift) |
| Deployed commit SHA | **UNKNOWN** |

---

## Metric register

| Metric | Definition | Source | Availability | Current value | Prior period | Confidence | Next collection |
|--------|------------|--------|--------------|---------------|--------------|------------|-----------------|
| Organic impressions | GSC Performance | Search Console | **UNAVAILABLE** | — | — | — | After GSC verify |
| Organic clicks | GSC Performance | Search Console | **UNAVAILABLE** | — | — | — | Same |
| Average CTR | GSC | Search Console | **UNAVAILABLE** | — | — | — | Same |
| Average position | GSC | Search Console | **UNAVAILABLE** | — | — | — | Same |
| Top queries | GSC | Search Console | **UNAVAILABLE** | — | — | — | Same |
| Top landing pages | GSC | Search Console | **UNAVAILABLE** | — | — | — | Same |
| Indexed URL count | GSC Pages | Search Console | **UNAVAILABLE** | — | — | — | Same |
| Organic sessions | GA4 | Analytics (if enabled) | **UNVERIFIED** | — | — | — | Operator |
| `contact_form_submit` | Successful form API | GA4 via `trackEvent` | **UNVERIFIED** | — | — | — | Operator |
| `login_click` | App CTA | GA4 | **UNVERIFIED** | — | — | — | Operator |
| CrUX LCP/INP/CLS | Field CWV | GSC or CrUX API | **UNAVAILABLE** | — | — | — | Post-GSC |
| Lab Lighthouse | Local/staging | Phase 7 docs | **STALE** | See Phase 7 | — | Lab only | Post-deploy |
| Verified backlinks | Editorial links | Manual / GSC Links | **UNAVAILABLE** | 0 verified in register | — | — | Monthly |
| Apex home HTTP 200 | Smoke | `check-production-seo-baseline.sh` | **AVAILABLE** | 200 (2026-10-18) | — | High | Weekly operator |
| Sitemap loc count | Crawl | Live sitemap | **AVAILABLE** | 13 | — | High | Weekly |

**Rule:** Do not substitute **0** for missing GSC/GA4 data.

---

## Hypothesis backlog (no volume claims)

From [PHASE_9_KEYWORD_CONTENT_OPPORTUNITIES.md](PHASE_9_KEYWORD_CONTENT_OPPORTUNITIES.md) — validate when GSC exports exist: Catholic parish software, sacramental registers, ChMS branded vs non-branded.
