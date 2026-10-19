# Phase 2 international SEO roadmap

## Phase 2A (repo — this cycle)

- Host-authoritative effective host guard + unit tests
- Playwright footer assertion aligned with live `MockupFooter`
- [PHASE_2_PREFLIGHT_AND_GAP_ASSESSMENT.md](PHASE_2_PREFLIGHT_AND_GAP_ASSESSMENT.md), [INTERNATIONAL_SEO_PRIORITIZATION_MATRIX.md](INTERNATIONAL_SEO_PRIORITIZATION_MATRIX.md), [PHASE_2_IMPLEMENTATION_REPORT.md](PHASE_2_IMPLEMENTATION_REPORT.md)
- **No** new locale URLs, **no** production deploy

## Phase 2B / Phase 3 (blocked)

**Prerequisite:** Phase 1 + **2A deploy** and production gates below — especially **host isolation** on `139.59.18.151` (the unauthorized host and raw IP must not serve indexable marketing) and GSC verification live. Until then, expanding locales risks indexing on duplicate hosts.

**First eligible new locale:** `/es` (Mexico + Colombia, one URL) after approved Spanish copy and native review.

**Phase 1 foundation (done in repo):** `/` + `/pt-br` contract, legal noindex without hreflang, English-only routes without bogus alternates, tests, and [international architecture record](INTERNATIONAL_SEO_ARCHITECTURE.md).

---

## 1. Production closure (operator — before new markets)

- [ ] Deploy latest `EkklesiaNexusWeb` build; restart Next.js.
- [ ] `GET https://ekklesianexus.com/google161c1efd34d8a358.html` → **200**.
- [ ] Apache: `apache2ctl -S`, backup configs, default vhost 404, `configtest`, reload ([example](deploy/apache-ekklesianexus.conf.example)).
- [ ] Re-GET `http://139.59.18.151/` and confirm unknown `Host` values — not **200** marketing.
- [ ] GSC: domain property, sitemap `https://ekklesianexus.com/sitemap.xml`, monitor Coverage.
- [ ] Optional: URL inspection for duplicate URLs; request removal only per Google guidelines if duplicates persist.

---

## 2. Research (product + SEO)

- Branded vs non-branded query baselines in GSC (after verification).
- Country priority from **real** parish pipeline and supported pricing markets — not invented volume tables in repo.
- Competitor SERP review per approved locale (parish/church management, not generic ERP).
- Content gap analysis for **Spanish, Italian, French** vs existing English/`pt-BR` depth.

---

## 3. Localization engineering (per approved locale)

Each locale is a **project**, not a config flag:

1. Copy + CMS messages + legal review.
2. `publicPagePath` and route tree (only when equivalents exist).
3. Hreflang among **equivalent** pages only; update sitemap entries.
4. `phase1`-style contract tests extended for new paths.
5. Playwright i18n/SEO specs for new home paths.
6. Pricing: catalog-backed claims only; no new indexable market URLs without product sign-off.

**Deferred markets** (no URL until copy exists): see [INTERNATIONAL_SEO_ARCHITECTURE.md](INTERNATIONAL_SEO_ARCHITECTURE.md).

---

## 4. Editorial and trust

- Blog/resource hub strategy (if approved) separate from product UI.
- Case studies and testimonials only per [`PROHIBITED_MARKETING_CLAIMS.md`](PROHIBITED_MARKETING_CLAIMS.md).
- Structured data review when new locales ship (Organization/WebSite graph stays on official domain).

---

## 5. Measurement

- GA4: existing allowlisted events in [`ga4-events.ts`](../src/lib/marketing/ga4-events.ts); no sacramental/financial PII in tags.
- GSC performance by country and query after locales go live.
- Optional later: CWV budgets in CI — **out of Phase 1**.

---

## 6. Commercial rollout alignment

- SaaS subscription catalog amounts use **record** `currency_code` (billed currency); parish marketing money uses church country resolution — no FX in SEO pages.
- Diocese rollups and cross-tenant money remain non-comparable across currencies (`money_comparable`).

---

## Explicit non-goals for Phase 2 planning doc

- Ten locale trees without copy.
- DNS or redirect changes on third-party domains.
- Indexing privacy/terms without legal approval.
- Claiming Google now shows `ekklesianexus.com` for all queries.
