# Phase 8 — SEO measurement, GSC, indexing validation & continuous improvement

**Status:** Measurement-ready in repository; **production GSC data and indexing claims blocked** until operator deploy + GSC access + hostname remediation.  
**Branch context (at implementation):** `price-implementation-web` — uncommitted Phase 4–8 work may not be on production.  
**Baseline UTC:** 2026-10-18 04:47 — see [PHASE_8_BASELINE.md](PHASE_8_BASELINE.md).

---

## Scope

- Establish repeatable production baseline checks, GSC operator procedures, monthly reporting template, issue register.
- Add automated regression tests (`phase8-seo-measurement.test.ts`) and production curl script.
- **Out of scope without authorization:** deploy, DNS/Apache, GSC ownership changes, new analytics IDs, bulk indexing requests.

---

## Repository findings

| Area | Finding |
|------|---------|
| Stack | Next.js App Router (`EkklesiaNexusWeb`) |
| Locales | `en-US`, `pt-BR`; `/` and `/pt-br` frozen |
| Sitemap | `src/app/sitemap.ts` + `indexableLocalizedSitemapEntries` |
| Robots | `src/app/robots.ts` |
| Canonical / hreflang | `localized-metadata.ts`, `site.ts` |
| Structured data | JSON-LD on localized marketing pages |
| Analytics | GA4 via `MarketingAnalytics`, env-gated; `trackEvent` + `ga4-events.ts` |
| Prior phases | Phase 3–7 docs under `docs/`, `docs/seo/`, `docs/performance/` |

---

## Production observations (verified read-only)

- **Pass:** Apex HTTPS marketing routes, sitemap (13 URLs), robots, canonicals on sampled pages.
- **Fail (P0):** GSC HTML file **404**; the unauthorized hostname and raw IP **200** with marketing HTML.
- **Not verified:** Google indexing, impressions, GA4 on production.

---

## Implemented changes (this phase)

| File | Purpose |
|------|---------|
| `scripts/phase8-seo-measurement.test.ts` | Sitemap allowlist, locale guard, JSON-LD, GA4 mapping smoke, GSC file in repo |
| `scripts/check-production-seo-baseline.sh` | Operator production GET checks |
| `package.json` | `test:unit` includes phase8 test |
| `docs/seo/PHASE_8_*.md` | Baseline, automated checks, this report |
| `docs/seo/GOOGLE_SEARCH_CONSOLE_RUNBOOK.md` | Operator GSC procedures |
| `docs/seo/templates/MONTHLY_SEO_REPORT_TEMPLATE.md` | Reporting template with placeholders |
| `docs/seo/SEO_ISSUE_REGISTER.md` | P0/P1 tracked issues |

No changes to pricing, payments, auth, tenant APIs, or locale routes.

---

## Continuous monitoring (three levels)

| Level | What | Where documented |
|-------|------|------------------|
| A | Build, unit SEO tests, Playwright public pages | [PHASE_8_AUTOMATED_CHECKS.md](PHASE_8_AUTOMATED_CHECKS.md) |
| B | Periodic production curls | `check-production-seo-baseline.sh` |
| C | GSC weekly/monthly | [GOOGLE_SEARCH_CONSOLE_RUNBOOK.md](GOOGLE_SEARCH_CONSOLE_RUNBOOK.md) |

---

## Query / landing-page framework

Use GSC **Performance** with Phase 5 categories ([PHASE_5_ENGLISH_KEYWORD_AND_CONTENT_STRATEGY.md](PHASE_5_ENGLISH_KEYWORD_AND_CONTENT_STRATEGY.md)): branded, Catholic parish software, ChMS, sacramental registers, stewardship/finance (only where product supports). Record 28-day windows; avoid CTR-only title rewrites without position and intent context.

---

## Conversion events (existing — do not invent)

| Event (repo) | Business use | Notes |
|--------------|--------------|-------|
| `contact_form_submit` | Enquiry success | On successful API response only |
| `demo_request_submit` / `demo_form_*` | Demo funnel | Verify in `ga4-events.ts` |
| `login_click` | App intent | Not a lead |

Proposed future events (`contact_form_start`, `pricing_section_view`) require product approval before implementation.

---

## Operator actions (required)

1. **Deploy** marketing site including `public/google161c1efd34d8a358.html` and latest SEO/perf commits.
2. **Verify GSC** (Domain or URL-prefix) — runbook §1.
3. **Submit sitemap** `https://ekklesianexus.com/sitemap.xml`.
4. **Remediate SEO-002/003** — Apache host isolation (Phase 3B).
5. **Grant read-only GSC** to reporting owner; complete first monthly template.
6. **Confirm GA4** env vars on production if conversion reporting is required.

---

## Rollback

- Revert `package.json` test line and delete `phase8-seo-measurement.test.ts` if tests block release (unlikely).
- Documentation-only rollback: remove `docs/seo/PHASE_8*` files; no runtime impact.

---

## Risks and limitations

- Cannot claim improved rankings from monitoring alone.
- Production baseline ages; re-run script after each deploy.
- Hostname leak is infrastructure — app host guard helps post-deploy but does not replace Apache.

---

## Recommended next phase

**Phase 8B — Post-deploy verification:** After authorized deploy, re-run baseline, close SEO-001 if GSC file 200, URL Inspection on priority URLs, first real 28-day GSC report. **Parallel P0:** Apache hostname isolation before scaling content or locales.
