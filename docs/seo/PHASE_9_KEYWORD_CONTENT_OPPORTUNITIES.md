# Phase 9 — Keyword and content opportunity matrix

**Data status:** Search volume and rankings **unverified** — no GSC access. Phase 5 strategy used as **hypothesis** until Performance data exists.

## Scoring model (transparent)

| Factor | Weight | Score 1–3 guide |
|--------|--------|------------------|
| Product relevance (FEATURE_VERIFICATION) | High | 3 = core module; 1 = unsupported |
| Demand evidence | High | 3 = GSC impressions; 2 = Phase 5 SERP sample; 1 = hypothesis only |
| Business relevance | Medium | 3 = direct evaluation path |
| Content quality / intent fit | Medium | 3 = dedicated page satisfies intent |
| Technical readiness | High | 3 = indexable on apex; 0 = blocked by P0 host/GSC |
| Effort | Low | 1 = large new route |

**Priority:** P1 when relevance ≥3 and technical ≥2; deprioritize when product fit <2.

---

## Topic clusters

| Topic / query group | Intent | Demand evidence | Visibility evidence | Landing page(s) | Gap | Action | Confidence | Priority |
|---------------------|--------|-----------------|---------------------|-----------------|-----|--------|------------|----------|
| Branded (EkklesiaNexus) | Navigational | Hypothesis | [Awaiting GSC] | `/` | Entity confusion with similarly named products | Keep; fix P0 deploy + host | Medium | P1 (technical) |
| Church management system / software | Commercial | Phase 5 SERP | [Awaiting GSC] | `/`, `/features` | Generic SERP dominated by giving/attendance apps | Differentiate in home + hub copy (Phases 4–6) | Medium | P1 |
| Catholic church management software | Commercial | Phase 5 | [Awaiting GSC] | `/solutions/catholic-parishes` | Needs internal links + deploy | **Improve links** (Phase 9); measure post-GSC | Medium | P1 |
| Parish management software | Commercial | Phase 5 | [Awaiting GSC] | Catholic + family features | Overlap with ChMS generic | **Keep** separate pages; monitor cannibalization in GSC | Low | P2 |
| Sacramental register management | Commercial | Phase 5 | [Awaiting GSC] | `/features/sacramental-registers` | Strong page; FAQ on Catholic | **Keep** | Medium | P1 |
| Church family / member records | Commercial | Phase 5 | [Awaiting GSC] | family + member features | Member page thinner historically | **Improve** member copy (Phase 9) | Medium | P1 |
| Mass intentions | Commercial | Phase 5 | [Awaiting GSC] | `/features/mass-intentions` | Evaluation questions | **Improve** (Phase 9) | Medium | P2 |
| Stewardship / parish finance records | Commercial | Phase 5 | [Awaiting GSC] | `/features/stewardship-and-finance` | vs payment processors | **Keep** limitations clear | High | P1 |
| Parish reports / dashboards | Commercial | Phase 5 | [Awaiting GSC] | `/features/church-analytics` | “Analytics” ambiguity | **Keep** no-AI limits | Medium | P2 |
| Secure church software / IT evaluation | Informational | Phase 5 proposal | [Awaiting GSC] | — (no `/trust` page) | Needs engineering/legal | **Create for review** only | Low | P3 |
| Attendance / volunteer / mobile giving | Mismatch | Phase 5 | N/A | — | Product does not ship | **Do not target** | High | — |

---

## Data still required

1. GSC Performance (28d / 90d) — impressions, clicks, CTR, position by query and page.  
2. URL Inspection for priority URLs after deploy.  
3. GA4 organic landing + `contact_form_submit` if production analytics confirmed.  
4. Third-party volume tools — optional; mark unverified if used.

---

## Cannibalization watch

Monitor in GSC (not actionable without data):

- `/` vs `/features` for generic “church management software”.
- `/solutions/catholic-parishes` vs `/features/sacramental-registers` for Catholic sacramental queries.

**Rule:** Do not merge URLs without GSC evidence of harmful overlap.
