# Phase 5 — English keyword research, competitor analysis, and SEO content strategy

**Phase 5 status:** **PASS** (research and planning deliverable complete)  
**Phase 4 technical readiness:** **FAIL** (production) / **PASS** (repository remediation) — see §2  
**Research date:** 18 Oct 2026 (UTC)  
**Geography of SERP samples:** Global English web results (not US-only; personalization may vary)  
**Branch:** `price-implementation-web` — documentation-only phase; no application code, locale, pricing, or deploy changes.

**Supporting data:** [phase5-keyword-universe.csv](phase5-keyword-universe.csv)

Related: [PHASE_4_ENGLISH_SEO_REPORT.md](../PHASE_4_ENGLISH_SEO_REPORT.md), [PHASE_3_PREFLIGHT.md](../PHASE_3_PREFLIGHT.md), [FEATURE_VERIFICATION.md](../FEATURE_VERIFICATION.md), [SEO_INTENT_AND_COMPETITOR_NOTES.md](../SEO_INTENT_AND_COMPETITOR_NOTES.md), [PROHIBITED_MARKETING_CLAIMS.md](../PROHIBITED_MARKETING_CLAIMS.md).

---

## 1. Executive summary

EkklesiaNexus should compete in English search on **Catholic parish office workflows** and **honest church management system (ChMS) positioning**, not on attendance apps, parishioner mobile portals, or online-giving gateways that dominate generic “church management software” SERPs.

**Highest-value clusters (evidence-based, no volume data):**

1. **Catholic parish management software** — aligns with `/solutions/catholic-parishes` and sacramental/Mass/BCC modules.  
2. **Sacramental register / family-first parish records** — aligns with `/features/sacramental-registers`, `/features/family-management`.  
3. **Parish stewardship and finance records** (office workflows) — `/features/stewardship-and-finance` with strict scope (not mobile giving).  
4. **Core ChMS category** — `/` and `/features` with differentiated copy vs generic competitors.  
5. **Branded discovery** — `EkklesiaNexus` is crowded by similarly named products; technical deploy + consistent entity signals are **P0** prerequisites.

**Top five content improvements (Phase 6 execution order):** see §10.

**Blocked for data-driven iteration:** Google Search Console (verification **404** on production), hostname isolation on Matchpoint/IP, no GSC/analytics access in engineering environment.

---

## 2. Repository and Phase 4 readiness assessment

### 2.1 Repository state (18 Oct 2026)

| Item | Finding |
|------|---------|
| Git branch | `price-implementation-web` |
| Uncommitted work | Phase 1–4 SEO (host guard, metadata, English copy, footer links, docs) — preserved |
| Next.js marketing routes | `src/app`: `/`, `/pt-br`, `/features`, `/features/[slug]`, `/solutions/catholic-parishes`, `/about`, `/contact`, `/privacy`, `/terms`, APIs, `/preview/*` |
| `SUPPORTED_LOCALES` | `en-US`, `pt-BR` only — **unchanged in Phase 5** |
| Indexable English URLs in sitemap (production sample) | 13 URLs on `https://ekklesianexus.com` (home, pt-br, features hub, 7 feature slugs, Catholic solution, about, contact) |

### 2.2 Phase 4 completion truth

| Layer | Status | Evidence |
|-------|--------|----------|
| Repo technical SEO remediation | **PASS** | [PHASE_4_ENGLISH_SEO_REPORT.md](../PHASE_4_ENGLISH_SEO_REPORT.md) §0c — tests pass |
| Production parity | **FAIL** | GSC file 404; leak hosts 200 marketing; live home title still pre-deploy copy |
| GSC performance data | **BLOCKED** | No account access |

**Implication for Phase 5:** Keyword and content strategy is **valid to execute in planning and copy drafts**, but **measuring rankings, impressions, and indexing** depends on operator deploy + GSC verification (**P0**). Do not claim the site is technically SEO-ready on production until gates close.

### 2.3 Homepage and conversion architecture (English)

| Section | ID / route | SEO role |
|---------|------------|----------|
| Hero | `#home` | Brand + category; primary CTAs (demo, Open Application) |
| Trust | — | Soft trust (avoid false adoption stats) |
| Features cards | `#features` | Module themes; links to `/features` + Catholic solution (repo) |
| Product slider | — | Visual proof; verified screenshots |
| Tech / security | — | Enterprise evaluation themes |
| Testimonials | `#testimonials` | Sample voices — not verified case studies |
| Pricing | `#pricing` | **Catalog API** — country-aware; not hardcoded |
| CTA + contact | `#contact` | Lead gen; captcha-backed forms |

Navigation remains **hash-based** for primary nav (Features, Pricing, Demo, Contact); crawlable depth relies on **`/features*`, `/solutions/*`, `/about`, `/contact`** and English footer links (repo).

---

## 3. Ideal customer and search audiences

Prioritized by **product fit** ([FEATURE_VERIFICATION.md](../FEATURE_VERIFICATION.md)) and likely **parish buying process** (office-led, not consumer app download).

### 3.1 Primary audiences (prioritize content here)

| Audience | Operational problems | Likely search language | Evaluation criteria | Purchase triggers | Objections | Truthful EkklesiaNexus angles | Evidence needed |
|----------|---------------------|------------------------|---------------------|-------------------|------------|------------------------------|-----------------|
| **Parish secretary / administrator** | Scattered registers, phone inquiries, sacramental lookups | parish management software, sacramental records, church member database | Ease of use, family records, sacraments, certificates | Old spreadsheets failing; new secretary | “Another complex system”; training time | Family-first directory, sacraments, Mass intentions, BCCs | Product walkthrough; FEATURE_VERIFICATION |
| **Parish priest / pastor** | Pastoral time vs admin burden | Catholic church management software | Sacramental integrity, pastoral workflows | Diocesan recommendation; peer referral | Cost; change management | Catholic solution page; Mass intentions; registers | Diocesan references if approved |
| **Treasurer / stewardship lead** | Outstanding balances, receipt questions, campaign tracking | church stewardship software, parish finance records | Audit trail, family-linked giving, reports | Treasurer turnover; audit pressure | “Is this a payment processor?” | Donations module, dues, projects — **office recording**, not advertised mobile giving | Clarify payment boundaries in copy |
| **IT / operations evaluator** | Security, access control, SaaS reliability | secure church management software, multi-user church software | RBAC, tenant isolation, hosting | Security incident; diocesan IT policy | Data residency; integration | Multi-tenant isolation, RBAC, cloud SaaS copy (verify specifics) | Security architecture doc for `/trust` proposal |

### 3.2 Secondary audiences (targeted pages only)

| Audience | Notes |
|----------|--------|
| **Diocesan evaluator** | Mention diocese hierarchy in product only if sales-approved; no fake diocesan logos. Compete on parish office depth first. |
| **Enterprise CTO** | Security/trust content — **proposal** only with engineering sign-off. |

### 3.3 Deprioritize (mismatch risk)

- Seekers of **attendance/check-in**, **volunteer scheduling suites**, **parishioner mobile apps**, **event calendars**, **generic messaging platforms** — competitors own these SERPs; product does not ship ([PROHIBITED_MARKETING_CLAIMS.md](../PROHIBITED_MARKETING_CLAIMS.md)).

---

## 4. Keyword research methodology

1. **Repository audit** — routes, titles, `feature-slugs.ts`, `marketing-static-pages.ts`, Phase 4 report.  
2. **Product truth** — [FEATURE_VERIFICATION.md](../FEATURE_VERIFICATION.md); feature landing `limitations` strings.  
3. **Qualitative SERP sampling** — web search on 18 Oct 2026 for category and Catholic queries (observed result types, not rankings).  
4. **Competitor public pages** — positioning and content format only (no traffic/backlink claims).  
5. **Internal notes** — [SEO_INTENT_AND_COMPETITOR_NOTES.md](../SEO_INTENT_AND_COMPETITOR_NOTES.md).

**Not used (unavailable or not authorized):** Google Keyword Planner, Ahrefs, Semrush, GSC query export, GA4 organic baselines.

**Metrics rule:** Volume, difficulty, CPC, rank position, CTR, and conversion rates are **`Not measured`** unless later supplied with source, geography, and date.

---

## 5. Keyword universe and topic clusters

See [phase5-keyword-universe.csv](phase5-keyword-universe.csv) for the structured list.

### 5.1 Clusters

| Cluster | Example phrases | Primary routes today |
|---------|-----------------|----------------------|
| **A. Core ChMS** | church management software/system; church administration software | `/`, `/features`, `/about` |
| **B. Catholic parish** | Catholic parish management software; parish administration | `/solutions/catholic-parishes` |
| **C. Membership & family** | church member management; family records | `/features/family-management`, `/features/member-management` |
| **D. Sacraments & worship** | sacramental register software; Mass intentions | `/features/sacramental-registers`, `/features/mass-intentions` |
| **E. Ministries & community** | ministries; life groups; BCC | `/features/ministries-and-groups` |
| **F. Stewardship & finance** | stewardship management; donation records (careful) | `/features/stewardship-and-finance` |
| **G. Reporting** | parish reports; church analytics | `/features/church-analytics` |
| **H. Evaluation** | church software comparison; how to choose ChMS | **Proposed** content (§11) |
| **I. Branded** | EkklesiaNexus, EkklesiaNexus pricing, app login | `/`, `app.ekklesianexus.com` |
| **X. Excluded** | church attendance software; volunteer scheduling ChMS | **Do not target** |

---

## 6. Search intent classification (by cluster)

| Cluster | Primary intent | SERP tends to reward | Best page type | CTA |
|---------|----------------|---------------------|----------------|-----|
| A Core ChMS | Commercial investigation | Vendor homepages, feature lists, pricing | Product home + features hub | Request demo / contact |
| B Catholic | Commercial investigation | Catholic-specific vendors (ParishSOFT, OSV, Camino) | Solution landing + sacrament features | Demo; Catholic workflow questions |
| C–G Module | Commercial / informational mix | Feature pages, how-to content | Existing `/features/*` | Contact; explore app (staff) |
| H Evaluation | Informational → commercial | Buyer's guides, comparisons | **Proposed** long-form guide | Checklist download / contact |
| I Branded | Navigational | Official site, app login | Home; app URL | Open Application |
| X Excluded | Transactional for other products | Attendance/check-in vendors | **None** | — |

**Cannibalization rule:** One primary keyword per URL; Catholic phrases consolidate on `/solutions/catholic-parishes`, not duplicate home URLs.

---

## 7. Search-result and competitor analysis

### 7.1 Method

Queries run **18 Oct 2026** (English web index sample). Results vary by location and personalization — treat as **samples**, not universal rankings.

### 7.2 Generic “church management software”

**Observed leaders (sample):** [ChurchTrac](https://www.churchtrac.com/), [ChMeetings](https://www.chmeetings.com/), [Rock RMS](https://www.rockrms.com/), [TouchPoint](https://www.touchpointsoftware.com/), open-source [ChurchCMS](https://churchcms.app/).

**Recurring themes:** all-in-one, attendance/check-in, volunteer scheduling, events, mobile app, online giving, websites, low price anchors.

**EkklesiaNexus differentiation (truthful):** parish **office** system; family-first registers; sacraments; Mass intentions; BCCs; stewardship **recording**; tenant-scoped RBAC — **without** claiming attendance apps or parishioner portals.

### 7.3 “Catholic parish management software”

**Observed leaders (sample):** [ParishSOFT](https://www.parishsoft.com/), [eCatholic ChMS](https://ecatholic.com/chms), [OSV Church Manager](https://www.osv.com/parish-diocese/digital-solutions/church-manager/), [Pushpay ParishStaq](https://pushpay.com/product/parishstaq/), [Camino (Diocesan)](https://diocesan.com/camino/).

**Recurring themes:** sacramental records, census/families, diocesan reporting, faith formation, giving, mobile engagement.

**Gap opportunity:** Clear, honest **office workflow** copy with explicit **limitations** (no attendance module, no mobile giving gateway marketing) — reduces unqualified leads.

### 7.4 Branded “EkklesiaNexus church management”

**Sample:** Official `ekklesianexus.com` **not** prominent; confusable brands ([Ekklesia Solutions](https://www.ekklesiasolutions.com/), [Ekklesia Manager](https://ekklesia-manager.com/), [myekklesia.io](https://myekklesia.io/), [ekklesia.com.ng](https://ekklesia.com.ng/)).

**Actions:** Deploy Phase 4 metadata; maintain Organization/WebSite/SoftwareApplication JSON-LD; consistent titles; About/Contact clarity — **not** trademark bidding on competitor names.

### 7.5 Competitor shortlist (direct relevance)

| Vendor | Category emphasis | Overlap with EkklesiaNexus | EkklesiaNexus edge (if true in product) |
|--------|-------------------|----------------------------|----------------------------------------|
| ParishSOFT | Catholic suite, diocesan | High | Modern SaaS UX; BCC/Mass intentions depth (verify vs their modules) |
| Camino / OSV | Catholic parish office | High | Family-first donations workflow; tenant model |
| eCatholic | Web + ChMS | Medium | Full office ChMS vs website-first |
| Pushpay / Tithely | Giving + ChMS bundles | Medium (giving SERPs) | Stewardship **records** without mobile-giving promise |
| ChurchTrac / Breeze / Planning Center | Protestant-leaning all-in-one | Low–medium | Catholic sacramental + BCC focus |
| Rock / TouchPoint | Large church enterprise | Low | Parish office scale; avoid enterprise claims |

**Do not copy** competitor copy, pricing tables, or feature matrices without verification.

---

## 8. English page-to-keyword mapping

| Existing route | Page purpose | Primary keyword | Secondary keywords | Intent | Audience | Content status | SEO issue (verified) | Action | Internal links | Conversion goal | Priority | Evidence |
|----------------|--------------|-----------------|-------------------|--------|----------|----------------|----------------------|--------|----------------|-----------------|----------|----------|
| `/` | Brand + category evaluation | church management system | church management software; parish software | Commercial | Pastor, secretary, IT | Improved in repo; **not live** | Production meta stale; brand SERP weak | Deploy Phase 4; monitor GSC | `/features`, `/solutions/catholic-parishes`, `/contact` | Request demo | P1 | Phase 4 report |
| `/features` | Capability overview | church management features | parish administration software | Commercial | Evaluator | Adequate hub | Could add module grid intros | Expand intro paragraph | All `/features/*` | Contact | P1 | Repo |
| `/solutions/catholic-parishes` | Catholic positioning | Catholic parish management software | Catholic church management software | Commercial | Catholic parish staff | Good foundation | Needs FAQ + internal links from home | Optimize H2s, FAQs | Sacrament + Mass feature pages | Demo | P1 | SERP sample |
| `/features/family-management` | Household registers | church family records management | family parish database | Commercial | Secretary | Good + limitations | — | Add 2–3 FAQ; link stewardship | `/features/member-management` | Contact | P1 | FEATURE_VERIFICATION |
| `/features/member-management` | Member profiles | church member management software | member database church | Commercial | Secretary | Good | Clarify no member app | Keep limitations prominent | family, sacraments | Contact | P2 | Repo |
| `/features/sacramental-registers` | Sacraments | sacramental register software | Catholic sacramental records | Commercial | Secretary | Good | High competitor interest | FAQ on certificates/verification | mass-intentions | Contact | P1 | SERP + product |
| `/features/mass-intentions` | Mass workflow | Mass intentions software | parish Mass scheduling records | Commercial | Sacristan | Adequate | Niche; thin vs Camino | Workflow bullets | sacramental-registers | Contact | P2 | Repo |
| `/features/ministries-and-groups` | Ministries/BCC | church ministries software | BCC life groups parish | Commercial | Coordinator | Good differentiator | — | Catholic terminology in meta | family-management | Contact | P2 | Repo |
| `/features/stewardship-and-finance` | Stewardship records | church stewardship management software | contribution records parish | Commercial | Treasurer | Good limitations | SERP conflates with giving gateways | Strengthen “office records” language | family, analytics | Contact | P2 | SERP risk note |
| `/features/church-analytics` | Reports | parish reports dashboard | church data management | Commercial | Leadership | Adequate | “Analytics” can imply AI | Reinforce no AI claim | stewardship | Contact | P2 | FEATURE_VERIFICATION |
| `/about` | Trust / vendor identity | EkklesiaNexus church management | about EkklesiaNexus | Navigational / commercial | Evaluator | Thin | Brand confusion | Add category sentence + link app | contact, features | Contact | P2 | Brand SERP |
| `/contact` | Lead gen | contact EkklesiaNexus | church software demo request | Transactional | Buyer | Functional | — | Meta already OK | home | Submit form | P1 | Repo |
| `/#pricing` | Pricing evaluation | church management software pricing | subscription plans parish | Commercial | Treasurer | API-driven | Not separate URL; index follows home | Improve section headings only | contact | View plans / contact | P2 | PUBLIC_SUBSCRIPTION_CATALOG |
| `/privacy`, `/terms` | Legal | — | — | — | — | noindex | Correct | No change | — | — | — | Repo |

**Proposed routes (not implemented):** labeled in §11.

---

## 9. Content gaps and opportunities

| Opportunity | Intent | Why justified | Risk if done poorly |
|-------------|--------|---------------|---------------------|
| **Catholic parish buyer FAQ** on solution page | Commercial | OSV/ParishSOFT answer sacrament/diocesan questions | Thin FAQ stuffed with keywords |
| **Evaluating church management software** (guide) | Informational → commercial | Committee searches “comparison”; honest checklist | Fake comparison grids vs trademarks |
| **What is church management software** (guide) | Informational | ChurchTrac-style definitional SERP features | Duplicate homepage |
| **Security & data handling** (`/trust/security` proposal) | Commercial (IT) | Enterprise evaluators | Unsupported compliance claims |
| **Sacramental records deep guide** | Informational | Secretary how-to + product tie-in | Must stay parish-office accurate |
| **Stewardship office workflow** | Commercial | Differentiate from Pushpay | Implies online giving |

**Reject:** city-named doorway pages; “best church software 2026” without substance; attendance/import/reconciliation certificate pages.

---

## 10. Prioritization model (1–5 scale)

| Factor | Weight | Meaning |
|--------|--------|---------|
| Product relevance | High | Feature exists in FEATURE_VERIFICATION |
| Commercial intent | High | Likely to drive demo/contact |
| Audience fit | Medium | Parish office vs wrong seeker |
| SERP evidence | Medium | Competitor/sample alignment |
| Content gap | Medium | Existing page weak vs missing |
| Useful content feasible | High | Can write substantive copy |
| Implementation effort | Low–medium | Prefer optimize existing URL |
| Cannibalization risk | Penalty | Duplicate intent URLs |
| Data confidence | Gate | Unknown volume → cap priority |

**Scores do not predict rankings.**

### P0 (prerequisites)

1. Production deploy of Phase 4 SEO + GSC file.  
2. Apache hostname isolation (Matchpoint, raw IP).  
3. GSC property verification and sitemap submission.

### P1 (highest content/SEO value after P0)

1. **`/solutions/catholic-parishes`** — expand FAQs, sacramental workflow, internal links (Catholic SERP match).  
2. **`/` + deploy** — live category metadata and hero (core ChMS queries).  
3. **`/features/sacramental-registers`** — deepen content; primary Catholic differentiator.  
4. **`/features/family-management`** — family-first story for membership cluster.  
5. **`/contact` + CTAs** — conversion path from all P1 pages (already functional; tune copy in Phase 6).

### P2

- Feature pages: stewardship, analytics, Mass intentions, ministries.  
- `/about` brand clarity.  
- Proposed evaluation guide (new URL).  
- Pricing section headings (no API change).

### P3

- Generic donation-management targeting (intent mismatch).  
- Experimental long-tail unless GSC shows impressions post-verify.

---

## 11. Content roadmap (Phase 6 inputs)

### 11.1 Optimize existing — Catholic solution page (P1)

| Field | Value |
|-------|--------|
| Route | `/solutions/catholic-parishes` (existing) |
| Primary keyword | Catholic parish management software |
| Format | Landing + FAQ |
| H1 | Keep existing or refine to match Catholic intent |
| Proposed H2s | Who this is for; Parish office workflows; Sacraments & registers; Mass intentions; Life Groups / BCCs; Stewardship records; Security & roles; What we do not replace (attendance, member app, giving gateway) |
| Claims to verify | Diocesan hierarchy features; any integration statements |
| CTA | Request demo; contact |
| Effort | Medium |
| Dependencies | Product sign-off on limitations paragraph |

### 11.2 Optimize existing — Sacramental registers (P1)

| Field | Value |
|-------|--------|
| Route | `/features/sacramental-registers` |
| H2s | Register integrity; Certificates; Verification tokens; Staff workflows; Data not public web |
| Effort | Low–medium |

### 11.3 Proposed — Evaluating church management software (P2)

| Field | Value |
|-------|--------|
| **Proposed route** | `/resources/evaluating-church-management-software` |
| Intent | Informational → commercial |
| Outline | Buyer roles; Catholic-specific requirements (OSV-style questions); family vs individual records; stewardship vs giving gateway; security checklist; how to run a demo |
| Why separate URL | Distinct intent from product home; supports committees |
| Effort | High |
| Approval | Legal review (comparison tone); no competitor logos without permission |

### 11.4 Proposed — Security & tenant isolation (P2)

| Field | Value |
|-------|--------|
| **Proposed route** | `/trust/security` |
| Dependencies | Engineering fact sheet (RBAC, encryption, audit, multi-tenant) |
| Effort | Medium |

**Phase 5 does not implement these routes.**

---

## 12. Product-claim verification requirements

Before publishing expanded copy, confirm against [FEATURE_VERIFICATION.md](../FEATURE_VERIFICATION.md):

| Claim area | Status |
|------------|--------|
| Attendance / check-in | **Prohibited** |
| Mobile giving / UPI / card gateway as parish product | **Do not market** |
| Import workflows | Verify before any “import” SEO |
| Reconciliation certificate workflows | **Not approved** |
| AI / predictive analytics | **Prohibited** |
| Customer counts, testimonials as real cases | Require product-owner approval |
| SOC2 / ISO / GDPR compliance badges | **Not stated** without legal |

---

## 13. Branded search assessment

| Query family | Expected destination | Current gap |
|--------------|---------------------|-------------|
| EkklesiaNexus | `https://ekklesianexus.com/` | Weak SERP presence; confusable brands |
| EkklesiaNexus pricing | `/#pricing` | Ensure catalog loads; deploy meta |
| EkklesiaNexus login / app | `https://app.ekklesianexus.com` | Open Application link — tested in E2E |
| Misspellings | — | **Not measured**; do not create typo pages |

Separate branded vs non-branded reporting in GSC **after verification**.

---

## 14. Measurement and reporting plan

### 14.1 Google Search Console (after P0)

| Report | Use |
|--------|-----|
| Performance → Queries | Non-branded vs branded clusters |
| Performance → Pages | `/`, `/solutions/*`, `/features/*` |
| Indexing → Pages | Ensure no leak-host URLs indexed |
| Sitemaps | Processing status for official sitemap |
| Settings → Ownership | Verification evidence |

**Cadence:** Monthly snapshot; quarterly content review.

### 14.2 Analytics (existing GA4 hooks if configured)

| Event / metric | Purpose |
|----------------|---------|
| `login_click` (existing) | App interest |
| Contact form submissions | Lead gen |
| Organic landing pages | Channel report in GA4 |

**Baseline:** **Not available** in engineering — document post-deploy.

### 14.3 Success indicators (non-promissory)

- Impressions/clicks on Catholic + sacrament queries (relative trend).  
- Contact/demo conversions from organic landing pages.  
- Reduction in indexed URLs on wrong hosts (after Apache fix).

---

## 15. Research sources and retrieval dates

| Source | URL / location | Date |
|--------|----------------|------|
| ChurchTrac SERP sample | https://www.churchtrac.com/ | 2026-10-18 |
| ChMeetings SERP sample | https://www.chmeetings.com/ | 2026-10-18 |
| Rock RMS | https://www.rockrms.com/ | 2026-10-18 |
| ParishSOFT | https://www.parishsoft.com/ | 2026-10-18 |
| OSV Church Manager | https://www.osv.com/parish-diocese/digital-solutions/church-manager/ | 2026-10-18 |
| Camino | https://diocesan.com/camino/ | 2026-10-18 |
| Pushpay ParishStaq | https://pushpay.com/product/parishstaq/ | 2026-10-18 |
| OSV buyer questions (themes) | https://www.osv.com/what-to-ask-when-comparing-church-software-providers/ | 2026-10-18 |
| EkklesiaNexus repo | `EkklesiaNexusWeb` | 2026-10-18 |
| Production GET audit | [PHASE_4_ENGLISH_SEO_REPORT.md](../PHASE_4_ENGLISH_SEO_REPORT.md) | 2026-10-18 04:37 UTC |

---

## 16. Unknown metrics and evidence gaps

| Metric | Status |
|--------|--------|
| Search volume | **Not measured** |
| Keyword difficulty | **Not measured** |
| EkklesiaNexus rank positions | **Not measured** |
| Organic traffic baseline | **Not measured** |
| Conversion rate from SEO | **Not measured** |
| GSC impressions/clicks | **BLOCKED** |
| Backlink profile | **Not measured** |

---

## 17. Risks and dependencies

| Risk | Mitigation |
|------|------------|
| Production leak hosts indexed | Apache + Search Console URL inspection after fix |
| Intent mismatch (giving/attendance seekers) | Limitations copy; qualify leads in forms |
| Cannibalization home vs Catholic page | Single primary keyword per URL |
| Deploy delay | Phase 6 copy in repo until production matches |
| Unverified security claims | `/trust` only with engineering input |

---

## 18. Phase 6 recommendations (actionable)

**Implemented:** See [PHASE_6_ENGLISH_CONTENT_IMPLEMENTATION.md](PHASE_6_ENGLISH_CONTENT_IMPLEMENTATION.md).

1. **Operator:** Close Phase 4 P0 (deploy + GSC + hostname isolation).  
2. **Content:** Implement P1 page expansions (Catholic solution, sacramental, family) with product review.  
3. **Technical:** Re-run Playwright + production GET checklist; submit sitemap in GSC.  
4. **Research:** After 4–8 weeks of GSC data, refine titles for top impression queries.  
5. **Evaluate** proposed `/resources/evaluating-church-management-software` with legal/comms.  
6. **Do not** launch new locale routes or thin keyword pages.

---

## 19. Phase 5 change control

| Check | Result |
|-------|--------|
| Application code modified | **No** |
| New public routes | **No** |
| `SUPPORTED_LOCALES` changed | **No** |
| `/pt-br` modified | **No** |
| Pricing / API / backend | **No** |
| Deploy / commit / push | **No** |
| Files added | `docs/seo/PHASE_5_ENGLISH_KEYWORD_AND_CONTENT_STRATEGY.md`, `docs/seo/phase5-keyword-universe.csv` |

Tests: **NOT RUN** (no code changes). Repository inspection and prior Phase 4 test results referenced for readiness only.
