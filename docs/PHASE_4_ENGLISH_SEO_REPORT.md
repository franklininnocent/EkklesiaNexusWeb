# Phase 4 — English technical SEO audit, remediation, and validation

**Overall Phase 4 status:** **FAIL** (production prerequisites) — **Repository remediation: PASS**  
**Justification:** In-repo canonical/metadata/sitemap/robots/structured-data/internal-link fixes are implemented and tested, but **production** still has **GSC verification 404** and **hostname isolation FAIL** (the unauthorized host + raw IP). Phase 4 cannot be marked fully PASS until operator deploy + Apache per [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](PHASE_3B_PRODUCTION_GATE_REMEDIATION.md).

**Last verified (production GET):** 2026-10-18 04:37 UTC  
**Stack:** Next.js App Router (`src/app`), `siteConfig.url` / `officialBrand.websiteUrl` for canonical origin, middleware `src/proxy.ts` + `marketing-request-host.ts`  
**Branch:** `price-implementation-web` (uncommitted SEO work preserved; no commit/push/deploy this phase)

Related: [PHASE_3_PREFLIGHT.md](PHASE_3_PREFLIGHT.md), [PHASE_4_RELEASE_DECISION.md](PHASE_4_RELEASE_DECISION.md), [SEO_AUDIT_REPORT.md](SEO_AUDIT_REPORT.md), [FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md).

---

## 0. Production verification (fresh, read-only)

| Request | Status | Final URL | Marketing HTML | Canonical in HTML | Notes |
|---------|--------|-----------|----------------|-------------------|--------|
| `https://ekklesianexus.com/` | 200 | same | yes | `https://ekklesianexus.com` | `robots`: index,follow |
| `http://ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | yes | apex | HTTP→HTTPS |
| `https://www.ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | yes | apex | www→apex |
| `http://www.ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | yes | apex | |
| `https://ekklesianexus.com/pt-br` | 200 | same | yes | `https://ekklesianexus.com/pt-br` | PT unchanged |
| `https://ekklesianexus.com/robots.txt` | 200 | same | n/a | — | Allows `/`, disallows `/api/`, `/preview/` |
| `https://ekklesianexus.com/sitemap.xml` | 200 | same | n/a | — | **13** `<loc>` URLs (official host only) |
| GSC file URL | **404** | same | 404 page (noindex) | points to apex | **FAIL** — file in repo `public/` |
| Unauthorized hostname (HTTP) | 200 | same | yes | **apex** | **FAIL** — leak host indexable body |
| Unauthorized hostname (HTTPS, verify peer) | TLS error | — | — | — | Cert hostname mismatch (expected) |
| Unauthorized hostname (HTTPS, insecure) | 200 | same | yes | apex | **FAIL** |
| `http://139.59.18.151/` | 200 | same | yes | apex | **FAIL** |
| `https://139.59.18.151/` (-k) | 200 | same | yes | apex | **FAIL** |

Canonical tags on leak hosts point at official apex (reduces wrong-host canonical in HTML) but **200 marketing HTML on wrong hosts remains HIGH/CRITICAL** for indexing duplication until Apache catch-all.

**GSC:** Method = HTML file `google161c1efd34d8a358.html`; body line `google-site-verification: google161c1efd34d8a358.html` in repo. UI verification: **BLOCKED** (no account access).

---

## 0b. Repository baseline — English metadata (source of truth after remediation)

| Path | Title (repo) | Index | Hreflang |
|------|----------------|-------|----------|
| `/` | EkklesiaNexus — The Next Generation of Church Management System | yes | en-US, pt-BR, x-default (home only) |
| `/features` | Church management features — EkklesiaNexus | yes | canonical only |
| `/features/*` | Per `feature-slugs.ts` | yes | canonical only |
| `/solutions/catholic-parishes` | Catholic parish management software — EkklesiaNexus | yes | canonical only |
| `/about`, `/contact` | About / Contact EkklesiaNexus | yes | canonical only |
| `/privacy`, `/terms` | Legal titles | **noindex** | no hreflang |

Canonical construction: `buildPageMetadata` in `seo-metadata.ts`; home `/` uses trailing slash in metadata (`https://ekklesianexus.com/`); production HTML observed without trailing slash on canonical — single document, not competing 200 variants.

**Locales:** `SUPPORTED_LOCALES` = `en-US`, `pt-BR` only. No `/es`. **PASS** (contract test).

---

## 0c. Acceptance criteria matrix

| Check | Result | Evidence |
|-------|--------|----------|
| TypeScript `npm run typecheck` | **PASS** | Run 18 Oct 2026 |
| Lint `npm run lint` | **PASS** | 1 pre-existing warning |
| `npm run validate:content` | **PASS** | |
| `npm run validate:i18n` | **PASS** | 302 keys |
| `npm run test:unit` | **PASS** | SEO, robots, GSC file, pricing, host guard |
| `npm run build` | **PASS** | |
| Playwright i18n + seo-public-pages (chrome) | **PASS** | 18 tests |
| Production GSC file 200 | **FAIL** | GET 404 |
| Production hostname isolation | **FAIL** | See table §0 |
| GSC UI / indexing reports | **BLOCKED** | |
| Lighthouse / CWV | **NOT RUN** | |
| Rich Results Test (live) | **NOT RUN** | Post-deploy |

**Pricing / API regression:** No diff to pricing modules; `map-public-plans`, `resolve-pricing-market`, `regional-pricing` unit tests **PASS**.

---

## 1. Baseline findings (severity)

| ID | Issue | Severity | Search impact | User impact | Risk | Status |
|----|--------|----------|---------------|-------------|------|--------|
| E1 | GSC HTML file **404** on production; present in repo `public/google161c1efd34d8a358.html` | **Critical** | Cannot verify domain; weak indexing signals | Operator cannot use GSC | Low (deploy only) | **FAIL** — deploy required |
| E2 | the unauthorized host + raw IP serve **200** marketing HTML (hostname leak) | **Critical** | Duplicate indexable copies, wrong-host attribution | Brand confusion | Infra (Apache) | **FAIL** — operator Apache + deploy |
| E3 | English hero visible copy duplicated slogan (no value prop / keywords) | **High** | Weak relevance for “church management software” intents | Unclear offer above fold | Low | **Fixed** (repo) |
| E4 | Homepage meta title omitted “The” from brand line; description long / generic | **Medium** | CTR and snippet quality | — | Low | **Fixed** (repo) |
| E5 | Minimal footer (no crawlable links to `/features`, `/about`, `/contact`) | **Medium** | Weak internal PageRank to English hubs | Harder discovery | Low | **Fixed** (en-US footer) |
| E6 | `SoftwareApplication` JSON-LD `url` pointed at marketing origin instead of app | **Low** | Minor schema clarity | — | Low | **Fixed** (repo) |
| E7 | Testimonial section copy implied broad adoption; awkward subtitles | **Medium** | Trust if misread as claims | — | Low | **Clarified** (labeled sample voices) |
| E8 | GSC UI verification / query performance data | **High** | Cannot measure queries | — | — | **BLOCKED** (no console access) |
| E9 | Lighthouse / CWV scores | **Medium** | Performance ranking factor | UX | — | **NOT RUN** (no CI Lighthouse in repo this cycle) |

**Production vs repo (18 Oct 2026 04:37 UTC GET):** Live home title still **old** copy until deploy (`Next-Generation` without updated description). Local build reflects new metadata and hero.

---

## 2. Indexable English pages (repo contract)

| URL | Index | Primary intent (qualitative) |
|-----|-------|----------------------------|
| `https://ekklesianexus.com/` | yes | Church management system / software — brand + evaluation |
| `https://ekklesianexus.com/features` | yes | Feature hub — parish management capabilities |
| `https://ekklesianexus.com/features/*` | yes | Module-specific (families, sacraments, stewardship, etc.) |
| `https://ekklesianexus.com/solutions/catholic-parishes` | yes | Catholic parish management software |
| `https://ekklesianexus.com/about` | yes | About / trust |
| `https://ekklesianexus.com/contact` | yes | Contact / demo intent |
| `https://ekklesianexus.com/privacy`, `/terms` | **noindex** | Legal (correct) |
| `https://ekklesianexus.com/pt-br` | yes (locale) | **Out of scope** — preserved, not edited |
| `/preview/*`, `/api/*` | disallowed in `robots.ts` | Correct |

Sitemap: `indexableLocalizedSitemapEntries` — home, `/pt-br`, static English marketing URLs; excludes legal.

---

## 3. Keyword research methodology and findings

**Method:** Qualitative intent analysis from public SERP/education pages (competitor positioning, OSV buyer guide, industry reports). **No** keyword volume, difficulty, rank, or traffic numbers — not measured in this environment.

**Observed intent clusters (English):**

1. **Category:** church management software / church management system (ChMS) — evaluation and comparison.
2. **Catholic-specific:** parish management software, sacramental records, Mass intentions, family-based registers.
3. **Operational:** church administration software, membership/family records, stewardship and finance **records** (not mobile giving app).
4. **Buyer role:** parish secretary, pastor, treasurer, diocesan evaluator, IT decision-maker.

**Competitive note (qualitative):** Incumbents emphasize census, giving, scheduling, and mobile apps. EkklesiaNexus should differentiate on **verified** parish office workflows (families, sacraments, BCCs, Mass intentions, catalog-driven pricing) without claiming attendance, volunteer modules, or member portals ([FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md)).

---

## 4. Keyword-to-page mapping (existing pages only)

| Target phrases (intent) | Primary URL | Secondary URLs |
|-------------------------|-------------|----------------|
| Church management system / software | `/` | `/about`, `/features` |
| Church management features | `/features` | `/features/*` slugs |
| Catholic parish management software | `/solutions/catholic-parishes` | `/`, `/features/sacramental-registers` |
| Parish family / member records | `/features/family-management`, `/features/member-management` | `/` |
| Sacramental register software | `/features/sacramental-registers` | Catholic solutions |
| Mass intentions | `/features/mass-intentions` | `/` slider copy |
| Church stewardship / finance records | `/features/stewardship-finance` | `/` (pricing section — API-driven) |
| Ministries, BCCs / life groups | `/features/ministries-and-bccs` | `/` |
| Parish reports | `/features/reports-and-insights` | `/` |
| Contact / demo | `/contact`, `/#contact` | — |

**No new URLs created** this phase. Optional future pages (e.g. diocese tier) require separate product approval.

---

## 5. Content and metadata changes (implemented)

### Homepage hero (`src/content/hero.ts`, `en-US` messages)

- **Before:** Visible subtitle repeated slogan only.
- **After:** Value proposition with natural phrases *church management software*, *parish administrators*, *sacramental registers*, *stewardship*, *Mass intentions* — aligned with [FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md).
- Brand line remains in logo / `titleLead` and contract slogan; **sr-only** `h1` combines lead + subtitle.

### Site SEO defaults (`src/content/site.ts`, `seo.*` in `en-US.json`, export JSON)

- Title: **EkklesiaNexus — The Next Generation of Church Management System**
- Description: ~155 characters, software-focused, verified capability list (no attendance, no fake scale).

### Features section (English only)

- Subtitle refined for administrator intent.
- Links to `/features` and `/solutions/catholic-parishes` (internal linking).

### Testimonials (English copy only)

- Subtitles reframed as **sample** perspectives; no new quotes or adoption statistics.

### Structured data

- `SoftwareApplication.url` → `https://app.ekklesianexus.com` (factual product entry).
- `Organization` / `WebSite` unchanged on canonical marketing origin.

### Footer (English homepage)

- Crawlable links: Features, About, Contact, Privacy, Terms.
- Portuguese home footer: legal + contact only (no change to pt-BR body copy).

---

## 6. Technical SEO verification (local / repo)

| Check | Result |
|-------|--------|
| `npm run validate:content` | **PASS** |
| `npm run validate:i18n` | **PASS** (302 keys) |
| `npm run lint` | **PASS** (1 pre-existing warning in `i18n-provider.tsx`) |
| `npm run test:unit` | **PASS** (incl. SEO contract, GSC file in `public/`) |
| `npm run build` | **PASS** |
| Playwright `e2e/i18n.spec.ts` + `e2e/seo-public-pages.spec.ts` (chrome) | **PASS** (18 tests) |
| Canonical on `/` (unit) | **PASS** — `https://ekklesianexus.com/` |
| Robots / sitemap policy tests | **PASS** |
| Pricing unit tests | **PASS** (unchanged integration) |
| Lighthouse / CWV | **NOT RUN** |
| Rich Results Test (live URL) | **NOT RUN** (post-deploy recommended) |

---

## 7. Search Console and production

| Item | Evidence | Status |
|------|----------|--------|
| Verification method | HTML file `google161c1efd34d8a358.html` | Documented |
| Repo artifact | `scripts/check-gsc-verification-file.sh` | **PASS** |
| Production URL | `GET https://ekklesianexus.com/google161c1efd34d8a358.html` | **FAIL** (404) |
| GSC UI “Verified” | — | **BLOCKED** |
| Sitemap on production | `GET /sitemap.xml` **200** (prior audit) | **PASS** (assumed until redeploy) |
| Host leak | Unauthorized-host HTTP **200** marketing (18 Oct 2026) | **FAIL** |

**Operator checklist after deploy:** file 200 + exact body → GSC verify → submit sitemap → monitor Page indexing.

---

## 8. Files changed (this phase)

| File | Reason |
|------|--------|
| `src/content/hero.ts`, `src/content/site.ts` | English homepage + SEO source of truth |
| `src/messages/en-US.json` | Hero, features, testimonials, SEO strings |
| `src/messages/pt-BR.json` | i18n key parity only (`exploreLink` keys unused on pt-BR UI) |
| `src/components/mockup/features.tsx` | English internal links to feature hub + Catholic solution |
| `src/components/mockup/footer.tsx` | English crawlable footer IA |
| `src/lib/marketing/seo-metadata.ts` | SoftwareApplication URL |
| `marketing-content.export.json` | CMS/export alignment |
| `scripts/seo-metadata.test.ts` | Assert app URL in JSON-LD |
| `e2e/i18n.spec.ts`, `e2e/seo-public-pages.spec.ts` | Hero + footer expectations |
| `docs/PHASE_4_ENGLISH_SEO_REPORT.md` | This report |

**Not changed:** `SUPPORTED_LOCALES`, `/pt-br` page content, pricing API, Laravel, Apache, DNS.

---

## 9. Deployment and rollback

**Deployment required** for production to reflect English copy, metadata, footer links, and JSON-LD.

1. Operator authorization per [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](PHASE_3B_PRODUCTION_GATE_REMEDIATION.md).
2. `npm run build` from approved commit; deploy artifact; `NODE_ENV=production`; restart Next.js.
3. Post-deploy: `curl -sS -o /dev/null -w "%{http_code}\n" https://ekklesianexus.com/` → 200; spot-check title/description; GSC file 200.
4. **Rollback:** redeploy previous artifact; no DB migration.

---

## 10. Recommended next steps (evidence-based)

1. **Deploy** marketing build + GSC file (unblocks E1, surfaces new English SEO).
2. **Apache hostname isolation** (E2) — see preflight gate B.
3. **GSC:** verify property, submit sitemap, review Coverage and canonical reports (**BLOCKED** until operator).
4. **Measure:** run Lighthouse on production home + `/features` after deploy; track CWV in field data if available.
5. **Content:** human review of testimonial section strategy (replace samples with approved quotes or remove section in a future approved change).
6. **Research:** with GSC access, export queries for `/` and `/features` to refine titles — do not add thin keyword pages.

---

## 11. Assumptions and non-claims

- No ranking, indexing timeline, or traffic guarantees.
- No fabricated search volumes or competitor rankings.
- Spanish `/es` remains **blocked** per [PHASE_4_RELEASE_DECISION.md](PHASE_4_RELEASE_DECISION.md).

---

## 12. Phase 5 readiness (English keyword research & content strategy)

| Prerequisite | Status |
|--------------|--------|
| Repo technical SEO baseline | **PASS** — ready to merge/deploy after review |
| Production reflects latest metadata/footer/JSON-LD | **FAIL** — deploy pending |
| GSC property verified | **FAIL** / **BLOCKED** |
| Hostname isolation | **FAIL** |
| Query/impression data for data-driven keyword work | **BLOCKED** until GSC |

**Recommendation:** Proceed to Phase 5 **planning** using qualitative intent mapping (§3–4 in this doc) while operators close E1/E2; use GSC exports as soon as verification is evidenced.

**Phase 5 deliverable:** [seo/PHASE_5_ENGLISH_KEYWORD_AND_CONTENT_STRATEGY.md](seo/PHASE_5_ENGLISH_KEYWORD_AND_CONTENT_STRATEGY.md)

---

## 13. Operator actions (ordered)

1. Authorize deploy + Apache scope ([PHASE_3B](PHASE_3B_PRODUCTION_GATE_REMEDIATION.md) §1).
2. Deploy marketing artifact (includes `public/google161c1efd34d8a358.html` + host guard).
3. `bash scripts/record-production-gates.sh` — expect GSC **200**, leak hosts **not** 200 marketing.
4. Complete GSC HTML verification in UI; submit `sitemap.xml`.
5. Re-GET `/` and confirm updated title/description post-deploy.

**Rollback:** Previous build artifact; Apache `*.bak`; no database changes.
