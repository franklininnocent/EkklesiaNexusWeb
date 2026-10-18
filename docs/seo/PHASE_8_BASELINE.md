# Phase 8 — Production SEO baseline

**Verified at (UTC):** 2026-10-18 04:47 (re-run `check-production-seo-baseline.sh`)  
**Method:** Read-only GET (`User-Agent: EkklesiaNexus-Phase8-Baseline/1.0`)  
**GSC query data:** **[Awaiting verified Google Search Console access]**  
**CrUX / field CWV:** **Not measured**

Re-run: `bash scripts/check-production-seo-baseline.sh` or `bash scripts/record-production-gates.sh`

---

## Canonical site URLs (production)

| URL | HTTP | Final | Canonical | Robots meta | Indexability | Sitemap | Locale | Status |
|-----|------|-------|-----------|-------------|--------------|---------|--------|--------|
| `https://ekklesianexus.com/` | 200 | same | `https://ekklesianexus.com` | index, follow | Indexable | Yes | en-US | **Pass** |
| `https://ekklesianexus.com/pt-br` | 200 | same | `https://ekklesianexus.com/pt-br` | index, follow | Indexable | Yes | pt-BR | **Pass** |
| `https://ekklesianexus.com/features` | 200 | same | `/features` | index, follow | Indexable | Yes | en | **Pass** |
| `https://ekklesianexus.com/solutions/catholic-parishes` | 200 | same | self | index, follow | Indexable | Yes | en | **Pass** |
| `https://ekklesianexus.com/contact` | 200 | same | self | index, follow | Indexable | Yes | en | **Pass** |
| `https://ekklesianexus.com/robots.txt` | 200 | same | — | — | Crawl policy | — | — | **Pass** |
| `https://ekklesianexus.com/sitemap.xml` | 200 | same | — | — | 13 `<loc>` URLs, apex only | — | — | **Pass** |

**Structured data (repo + typical home):** Organization, WebSite, SoftwareApplication JSON-LD on localized homes — syntax validated in `phase8-seo-measurement.test.ts`. Rich-result eligibility **not verified**.

---

## High-priority risks (rechecked)

| URL | HTTP | Issue | Severity | Status |
|-----|------|-------|----------|--------|
| `https://ekklesianexus.com/google161c1efd34d8a358.html` | **404** | GSC HTML file not on production | **P0** measurement | **Fail** |
| `http://dwm.matchpointgps.in/` | 200 | Serves EkklesiaNexus marketing HTML | **P0** duplicate host | **Fail** |
| `http://139.59.18.151/` | 200 | Serves EkklesiaNexus marketing HTML | **P0** duplicate host | **Fail** |

**GSC property verified in UI:** **Not verified** (no account access). File **200 ≠ verified**.

---

## Analytics status (repository)

| Item | Status |
|------|--------|
| GA4 loader | `MarketingAnalytics` when `content.seo.analytics.ga4MeasurementId` valid + `NEXT_PUBLIC_ANALYTICS_ENABLED=true` |
| Events mapped to GA4 | `login_click`, `contact_form_submit`, `demo_request_submit` (see `ga4-events.ts`) |
| Production GA4 loading | **Not verified** in this phase |
| New provider / IDs | **Not implemented** — requires authorization |

---

## Evidence gaps

- Search impressions, clicks, CTR, position — **GSC blocked**
- Indexed URL count in Google — **GSC blocked**
- Organic sessions / conversions — **analytics not verified on production**
- Whether latest Phase 4–7 code is deployed — **assumed not** (GSC 404, old home title in prior checks)
