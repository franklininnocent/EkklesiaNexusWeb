# Phase 10 — Off-page SEO baseline

**Verification date (UTC):** 2026-10-18 (production curls + repository review)  
**Timezone for reporting:** UTC unless GSC UI specifies otherwise

---

## 1. Data availability summary

| Signal | Status | Source | Notes |
|--------|--------|--------|-------|
| Referring domains (third-party SEO tool) | **Not measured** | No authorized Ahrefs/Moz/Semrush in repo | Do not report “0 backlinks” |
| GSC **Links** report | **Unavailable** | No GSC account in engineering | SEO-004 |
| Verified earned editorial links | **None recorded** | [PHASE_10_EARNED_LINKS_AND_MENTIONS.md](PHASE_10_EARNED_LINKS_AND_MENTIONS.md) | Empty until verified |
| Brand web mentions (systematic) | **Not measured** | Automated Google SERP not reliable without JS/tools | Manual GSC + brand search when authorized |
| Historical link-building in repo | **None documented** | Git/docs search | Phase 10 starts register |
| Social `sameAs` in JSON-LD | **Not present** | `seo-metadata.ts` Organization graph | Only add verified official profile URLs |

---

## 2. Production technical context (off-page impact)

Re-checked via `scripts/check-production-seo-baseline.sh`:

| Check | Result | Off-page implication |
|-------|--------|----------------------|
| `https://ekklesianexus.com/` marketing | 200, indexable | Correct target for earned links |
| Sitemap | 13 apex URLs | Outreach should cite canonical URLs |
| GSC verification file | **404** | Weak property verification; links report blocked |
| Matchpoint / raw IP host | **200 marketing** | **P0** — splits signals; fix before aggressive PR |
| Phase 4–9 repo deploy | **Unverified on prod** | Third parties may see stale copy |

---

## 3. Prior phase readiness (for off-page)

| Phase | Documented | Blocks off-page? |
|-------|------------|------------------|
| 3 / 3B hostname | Partial | **Yes** — P0 duplicate host |
| 4–7 on-page / perf | Repo yes / prod uncertain | Medium — credibility |
| 8 measurement | Runbooks yes | GSC needed for link report |
| 9 growth content | Repo yes | Strengthens link-worthy destinations |

---

## 4. In-repository “linkable” assets today

| Asset | URL | Link-worthy? |
|-------|-----|----------------|
| Catholic parish overview + FAQ | `/solutions/catholic-parishes` | **High** — evaluation intent |
| Feature depth pages | `/features/*` | **Medium–high** — topic-specific |
| Contact / demo | `/contact`, `/#contact` | **CTA** — not primary citation target |
| Dedicated downloadable checklist | **None** | Proposed — see [PHASE_10_LINK_WORTHY_RESOURCES.md](PHASE_10_LINK_WORTHY_RESOURCES.md) |

---

## 5. Limitations (explicit)

- No paid SEO tool exports in this baseline.  
- No claim that EkklesiaNexus has **no** backlinks globally.  
- Competitor link counts are **not** benchmarks for manipulation.  
- Directory/review platform presence **not verified** in Phase 10 automation.

**Next baseline action (operator):** After GSC verify → export Links report; optional authorized backlink tool snapshot with retrieval date stored in monthly off-page report.
