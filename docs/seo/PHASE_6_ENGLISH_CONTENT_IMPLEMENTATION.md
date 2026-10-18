# Phase 6 — English SEO content optimization, implementation, and QA

**Overall Phase 6 status:** **PASS** (in-scope content implementation and tests)  
**Production / indexing readiness:** **BLOCKED** (Phase 4 deploy, GSC file, hostname isolation — unchanged)  
**Date:** 18 Oct 2026 (UTC)  
**Branch:** `price-implementation-web`  
**Strategy source:** [PHASE_5_ENGLISH_KEYWORD_AND_CONTENT_STRATEGY.md](PHASE_5_ENGLISH_KEYWORD_AND_CONTENT_STRATEGY.md)

---

## 1. Phase readiness

| Prerequisite | Status |
|--------------|--------|
| Phase 5 research | **PASS** — report present |
| Phase 4 repo remediation | **PASS** — prior cycle |
| Phase 4 production gates | **FAIL** / **BLOCKED** |
| New locales | **None** — `SUPPORTED_LOCALES` unchanged |

Phase 5 evidence was **sufficient** to optimize existing P1 pages. Proposed new routes (`/resources/...`, `/trust/security`) were **not implemented** (P2, needs legal/engineering).

---

## 2. Implementation matrix (executed)

| Route | Primary keyword | Action | Priority | Acceptance |
|-------|-----------------|--------|----------|------------|
| `/solutions/catholic-parishes` | Catholic parish management software | H1, intro, FAQ, internal links, meta description | P1 | FAQ visible; E2E **PASS** |
| `/features/family-management` | Church family records | `detailSections`, metadata | P1 | Sections render; no prohibited claims |
| `/features/sacramental-registers` | Sacramental register software | `detailSections`, metadata, Reconciliation exclusion | P1 | E2E heading **PASS** |
| `/features/stewardship-and-finance` | Church stewardship records | `detailSections`, metadata | P2 | Scope vs giving gateway clear |
| `/features` | Church management features | Link to Catholic overview | P2 | Hub copy updated |
| `/about` | EkklesiaNexus / church management | Extra capability paragraph | P2 | About copy only (English page) |
| `/` (en-US messages) | Church management system | Trust title; reports card accuracy | P1 | i18n EN only; pt-BR untouched |

**Not modified this phase:** `/pt-br` copy, pricing components, API, backend, sitemap routes (no new URLs).

---

## 3. Product claim inventory (material claims)

| Proposed claim | Evidence | Location | Status | Safe wording used | Restrictions |
|----------------|----------|----------|--------|-------------------|--------------|
| Family/household registers | FEATURE_VERIFICATION Families | API/UI Family | **Verified** | Household-first family records | Not a member portal |
| Sacramental records & certificates | Sacraments module; certificate controllers | FEATURE_VERIFICATION | **Verified** | Registers, certificates where supported | No public directory |
| Certificate verification tokens | Public verify API | FEATURE_VERIFICATION | **Verified** | Token-based, parish-controlled | — |
| Reconciliation certificates | — | FEATURE_VERIFICATION | **Unsupported** | Omitted; explicit exclusion on sacrament page | Do not market |
| Mass intentions | MassIntentions module | FEATURE_VERIFICATION | **Verified** | Office Mass/intention workflows | No online intention payments in marketing |
| BCC / Life Groups | BCC module | FEATURE_VERIFICATION | **Verified** | BCCs as Life Groups | Not group chat app |
| Stewardship, plans, dues, projects | Donations module | FEATURE_VERIFICATION | **Verified** | Office collection records | Not mobile giving gateway |
| Reports/dashboards | Donations reports, dashboards | FEATURE_VERIFICATION | **Verified** | Role-gated reports | No AI/predictive analytics |
| RBAC / tenant isolation | App architecture | Partially documented | **Partially verified** | FAQ invites IT conversation | No SOC2/ISO claims |
| Check-in / attendance | Retired permissions | FEATURE_VERIFICATION | **Unsupported** | FAQ denies; no “attendance” token in `content/` | Validator blocks word in content files |
| Volunteer scheduling | No module | FEATURE_VERIFICATION | **Unsupported** | Denied in FAQ | — |
| Import from Excel | — | Not verified for marketing | **Unverified** | Not claimed | — |

---

## 4. Metadata changes

| Path | Change |
|------|--------|
| `/solutions/catholic-parishes` | Meta description refined (`marketing-static-pages.ts`) |
| `/features/family-management` | Title/description in `feature-slugs.ts` |
| `/features/sacramental-registers` | Title/description in `feature-slugs.ts` |
| `/features/stewardship-and-finance` | Description in `feature-slugs.ts` |
| `/` | No code metadata change this phase (Phase 4 `site.ts` / `en-US` seo unchanged here) |

Canonical, hreflang, robots: **unchanged architecture**.

---

## 5. Internal linking

- Catholic page → family, sacramental, stewardship feature pages + contact.
- Features hub → Catholic overview.
- Existing footer and Phase 4 home feature links preserved.

---

## 6. New pages

**None.** Evaluation guide and `/trust/security` remain Phase 5 proposals.

---

## 7. Files created or modified

| File | Change |
|------|--------|
| `src/content/catholic-parish-faq.ts` | **Created** — FAQ content |
| `src/lib/marketing/feature-slugs.ts` | `detailSections`, SEO strings |
| `src/app/solutions/catholic-parishes/page.tsx` | H1, intro, FAQ, links |
| `src/app/features/[slug]/page.tsx` | Render `detailSections` |
| `src/app/features/page.tsx` | Catholic internal link |
| `src/lib/marketing/marketing-static-pages.ts` | Catholic meta, about copy |
| `src/messages/en-US.json` | Trust title, reports feature card |
| `e2e/seo-public-pages.spec.ts` | Catholic FAQ + sacrament section |
| `docs/seo/PHASE_6_ENGLISH_CONTENT_IMPLEMENTATION.md` | This report |

---

## 8. Commands and results

| Command | Result |
|---------|--------|
| `npm run validate:content` | **PASS** |
| `npm run validate:i18n` | **PASS** (not re-run separately; prebuild uses it) |
| `npm run typecheck` | **PASS** (included in dev cycle) |
| `npm run test:unit` | **PASS** |
| `npm run build` | **PASS** |
| `npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome` | **PASS** (18) |
| Production deploy | **NOT RUN** |
| GSC | **BLOCKED** |

---

## 9. Regression

| Area | Result |
|------|--------|
| `/` English homepage | **PASS** — Playwright i18n + SEO |
| `/pt-br` | **PASS** — Portuguese hero unchanged; trust title not edited in `pt-BR.json` |
| `SUPPORTED_LOCALES` | **PASS** — `en-US`, `pt-BR` only |
| Pricing / subscription API | **PASS** — no pricing file changes |
| Payment / backend | **PASS** — no changes |

---

## 10. Outstanding blockers

1. Operator deploy (Phase 4 + Phase 6 content live on production).  
2. GSC verification file **200** + UI verify.  
3. Hostname isolation (Matchpoint, raw IP).  
4. `/resources/evaluating-church-management-software` — product/legal approval before build.  
5. Security marketing page — engineering fact sheet required.

---

## 11. Deployment and rollback

**Deploy required** for production to show Phase 6 copy.

1. Authorized build/deploy per [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](../PHASE_3B_PRODUCTION_GATE_REMEDIATION.md).  
2. Smoke: `/solutions/catholic-parishes`, `/features/sacramental-registers`, `/`.  
3. **Rollback:** redeploy previous artifact; no migrations.

---

## 12. Phase 7 recommendations

- Measure organic performance in GSC after deploy (branded vs Catholic vs sacrament queries).  
- Implement **one** approved educational page if legal approves evaluation guide.  
- Lighthouse/CWV on production home + Catholic page.  
- Replace sample testimonials with approved quotes or remove section (product decision).  
- Iterate titles from query data after 4–8 weeks.
