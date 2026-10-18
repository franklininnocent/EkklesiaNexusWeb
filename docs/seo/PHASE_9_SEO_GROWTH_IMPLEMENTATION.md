# Phase 9 — SEO growth, content authority, search intent & organic lead generation

**Overall status:** **Partially complete** — repository improvements and planning deliverables done; **blocked** on P0 production gates (GSC file, hostname leak, deploy) and GSC/analytics data for measured outcomes.

**Date:** 18 Oct 2026 (UTC)  
**Commit reviewed:** `323a869` (working tree includes Phases 4–9 uncommitted changes)  
**GSC / analytics:** [Awaiting verified access]

---

## 1. Prior phase status

| Phase | Status | Notes |
|-------|--------|-------|
| 3 / 3B | Partial | Host guard in repo; production leak **open** |
| 4 EN SEO | Repo PASS / prod FAIL | Deploy pending |
| 5 | PASS | Strategy + CSV |
| 6 | PASS | P1 content on existing routes |
| 7 | PASS | Perf optimizations local |
| 8 | Partial | Measurement docs + tests; GSC blocked |

**Prerequisite:** Phase 9 content work proceeded because it does not worsen P0 issues and improves evaluation journeys on canonical URLs. **P0 remediation remains mandatory** before trusting organic growth metrics.

---

## 2. Growth baseline

| Source | Available? | Finding |
|--------|------------|---------|
| GSC impressions/clicks | **No** | SEO-004 open |
| GSC queries / landing pages | **No** | — |
| GA4 conversions | **Not verified** | SEO-006 |
| Phase 8 production GET | **Yes** | Apex routes 200; sitemap 13 URLs; GSC file 404; leak hosts FAIL |
| Phase 5 keyword strategy | **Yes** | Hypothesis until GSC |

See [PHASE_8_BASELINE.md](PHASE_8_BASELINE.md), [PHASE_9_KEYWORD_CONTENT_OPPORTUNITIES.md](PHASE_9_KEYWORD_CONTENT_OPPORTUNITIES.md).

---

## 3. Scope and exclusions

**In scope:** Improve existing English pages, internal linking, metadata (contact), member/Mass feature depth, documentation, tests.

**Out of scope:** New locales, `/es`, new route families, pricing/API changes, structured-data price markup, deploy, Apache/DNS, new analytics IDs, fabricated social proof.

**New pages created:** **None.**

---

## 4. Files changed (Phase 9)

| File | Purpose |
|------|---------|
| `src/components/mockup/footer.tsx` | EN footer → Catholic solution |
| `src/messages/en-US.json` | `footer.catholicParishes` label |
| `src/messages/pt-BR.json` | Same key for i18n parity only (not used in pt footer) |
| `src/app/about/page.tsx` | Evaluation journey links + pricing accuracy note |
| `src/app/contact/page.tsx` | Pre-form links to features, Catholic guide, pricing |
| `src/app/features/[slug]/page.tsx` | Catholic overview link in feature footer |
| `src/lib/marketing/feature-slugs.ts` | `detailSections` for member + Mass intentions |
| `src/lib/marketing/marketing-static-pages.ts` | Contact meta description |
| `scripts/phase9-internal-linking.test.ts` | Footer / i18n regression |
| `package.json` | `test:unit` includes phase9 test |
| `e2e/seo-public-pages.spec.ts` | Footer Catholic link assertion |
| `docs/seo/PHASE_9_*.md` | Deliverables A–F |
| `docs/seo/CONTENT_QUALITY_AND_SEO_REVIEW_CHECKLIST.md` | Editorial governance |

---

## 5. Content improvements by page

| Page | Change | Rationale |
|------|--------|-----------|
| `/` (footer only) | Catholic parishes crawl link | Phase 5 cluster; pt-BR footer unchanged |
| `/about` | Links to Catholic overview, features, contact; pricing accuracy | E-E-A-T + evaluation path |
| `/contact` | Educational links + meta description | Intent alignment; organic lead path |
| `/features/member-management` | Two detail sections | Phase 5 content gap |
| `/features/mass-intentions` | Two detail sections | Evaluation clarity |
| All feature detail pages | Footer link to Catholic overview | Topic cluster |

**Not changed:** Homepage hero body, pt-BR messages, pricing components, JSON-LD graph, sitemap URL list.

---

## 6. Metadata change log

| Path | Field | Date | Rationale |
|------|-------|------|-----------|
| `/contact` | `seoDescription` | 2026-10-18 | Evaluation + Catholic parish software intent (EXP-003) |

---

## 7. Structured data

**No changes.** Existing Organization / WebSite / SoftwareApplication validated in unit tests; no price or review markup added.

---

## 8. Tests performed

| Command | Result |
|---------|--------|
| `npm run validate:content` | **Pass** |
| `npm run validate:i18n` | **Pass** (303 keys) |
| `npm run test:unit` | **Pass** (includes phase8 + phase9) |
| `npm run build` | **Pass** |
| Playwright `i18n` + `seo-public-pages` | **Pass** (18/18) |

---

## 9. Pricing and product integrity

- No changes to `map-public-plans`, regional pricing, or homepage pricing UI.
- Copy references “country-aware pricing” without numeric amounts.
- Feature limitations unchanged in spirit; member/Mass sections avoid attendance, import, Reconciliation certificates, online intention payments.

---

## 10. Production approval

Deploy required for any live effect. Until deploy:

- Production may lack Phase 9 footer/links and contact meta.
- P0 issues SEO-001–003 remain — see [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md).

**Rollback:** Revert Phase 9 file list above; no migrations.

---

## 11. Operator actions

1. Remediate P0 hostname + deploy GSC file (Phase 3B / 8).  
2. Deploy marketing artifact with Phase 9 changes.  
3. Verify GSC + submit sitemap; start [PHASE_9_EXPERIMENT_REGISTER.md](PHASE_9_EXPERIMENT_REGISTER.md) clocks.  
4. Complete first [MONTHLY_SEO_REPORT_TEMPLATE.md](templates/MONTHLY_SEO_REPORT_TEMPLATE.md) with real data.

---

## 12. Recommended next phase

**Phase 9B / 10 (evidence-led):** After GSC baseline — CTR/snippet tests on URLs with impressions; consider `/trust` security content only with engineering sign-off; pt-BR native review if Brazilian organic growth matters. **Do not** add thin `/resources` pages without editorial ownership.

**Success statement:** Phase 9 improves **evaluation clarity and internal discovery** on existing routes; it does **not** guarantee higher rankings or leads until measured post-deploy.
