# International SEO prioritization matrix (Phase 2A)

**No search-volume data** — GSC not available in engineering environment. Rows use **evidence class**, not traffic forecasts.

| Market | Language | Phase 2A public URL | Sequence | Evidence | Effort | Phase 2A action |
|--------|----------|---------------------|----------|----------|--------|-----------------|
| India | English | `/` + English `/features*`, `/solutions/catholic-parishes`, etc. | Now (preserve) | **Fact (repo)** routes exist; **Assumption** English sufficient until GSC country data | Low | None (host guard + docs only) |
| Philippines | English | Same as India | Now (preserve) | Same | Low | None |
| United States | English | Same | Now (preserve) | Same | Low | None |
| Nigeria | English | Same | Now (preserve) | Same | Low | None |
| Brazil | pt-BR | `/pt-br` (frozen path) | Now (preserve) | **Fact (repo)** only localized home | Low | Preserve `/pt-br` exactly |
| Mexico | Spanish | none | After 2B gates | **Assumption** shared language; **Fact (repo)** no Spanish copy | High | Brief only (below) |
| Colombia | Spanish | none (future **one** `/es` with Mexico) | After 2B gates | Do not split `/es-mx` + `/es-co` (thin duplicates) | High | Brief only |
| Italy | Italian | none | After `/es` | No Italian messages in repo | High | Deferred |
| France | French | none | After `/es` | No French messages | High | Deferred |
| DRC | French | none (future **one** `/fr` with France) | After `/es` | Shared language ≠ two country URLs | High | Deferred |

**Product fit (Assumption):** Catholic parish office workflows (families, sacraments, stewardship, Mass intentions, BCC/Life Groups) per [FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md) and [SEO_INTENT_AND_COMPETITOR_NOTES.md](SEO_INTENT_AND_COMPETITOR_NOTES.md). Do not claim attendance apps, UPI, or competitor feature parity.

**Pricing:** Public catalog via `GET /api/public/subscription-plans` only. No hardcoded prices on localized pages. No indexable `?market=` URLs.

---

## Future `/es` content brief (documentation only — not published in 2A)

| Item | Requirement |
|------|-------------|
| Target | Mexico + Colombia (one URL) |
| Primary intent | Catholic church / parish management software (honest capability set) |
| Audience | Parish office staff, diocesan evaluators |
| URL | Single prefix `/es` (not country microsites) |
| Hreflang | Reciprocal with `/` and `/pt-br` on **homepage equivalents only**; English-only routes stay without false `pt-BR`/`es` alternates until real Spanish equivalents exist |
| Canonical | Self-referencing `https://ekklesianexus.com/es` |
| Sitemap | Include only when indexable and 200 |
| Structured data | Organization/WebSite on official domain only; **no** per-country `LocalBusiness`, fake addresses, or compliance claims |
| Pricing | Catalog-driven; no invented amounts |
| Gates | Production host isolation + GSC + native review + explicit approval |

---

## Forbidden patterns

- Ten country-specific homepages in one language
- Machine-translated or placeholder indexable pages
- Doorway keyword pages without differentiated value
- Invented testimonials, counts, certifications, or legal indexing without counsel

---

## Phase 4 — Market readiness (research and evidence; no new routes)

**Unverified:** keyword volumes, rankings, competitor SERP share, conversion rates. Rows below define **requirements before an indexable country- or language-specific URL**, not commitments to build one URL per country.

| Market | Primary audience language(s) | Planned / existing locale coverage | Country-specific landing need | Search-intent & keyword work (required) | Terminology & product language | Evidence before indexable route | Duplicate / thin-content risk |
|--------|------------------------------|------------------------------------|------------------------------|----------------------------------------|--------------------------------|-------------------------------|------------------------------|
| **India** | English (office); regional languages for support only unless approved | `/` English marketing | Unlikely separate `/in` unless legal/tax copy diverges | Parish/church management, stewardship, sacrament records — **research not run** | INR pricing via catalog; avoid UPI/payment claims unless product-verified | GSC country impressions post-verification; counsel on any India-specific compliance copy | Low if single English site; high if machine-translated regional pages |
| **Philippines** | English | Same as India | Unlikely `/ph` without differentiated offer | Catholic parish software, diocese — **research not run** | PHP/catalog currency if sold; honest feature set | Same as India | Same |
| **United States** | English | `/` | State/diocese landing only if unique value + approval | Parish management, PLEDGE/stewardship terms — **research not run** | USD catalog; tax messaging per existing API | Product + legal review for US-specific claims | Medium for many geo doorways |
| **Nigeria** | English | `/` | Unlikely `/ng` without payment/local proof points | Church administration software — **research not run** | NGN/catalog; no fake local offices | Payment method truthfulness | Medium |
| **Brazil** | Portuguese (pt-BR) | **`/pt-br` (live)** | Keep single path; no `/br` | Brazilian parish intent — **research not run** | BRL via catalog; Brazilian Portuguese review ongoing for future edits | Any copy change: native review + regression tests | Low if one `/pt-br`; high if duplicate `pt` variants |
| **Mexico** | Spanish | Future shared **`/es`** with Colombia (spec) | One language URL, not `/mx` | Software parroquial / gestión parroquial — **research not run** | MXN display via catalog; Latin American Spanish review | Gates A–G + [ES_LOCALE_IMPLEMENTATION_SPEC.md](ES_LOCALE_IMPLEMENTATION_SPEC.md) approval | High if split MX/CO URLs with same copy |
| **Colombia** | Spanish | Same **`/es`** as Mexico when authorized | Do not create `/co` | Same intent cluster as MX — **research not run** | COP via catalog; terminology alignment with MX Spanish | Same as Mexico | High if country microsites without unique content |
| **Italy** | Italian | None | `/it` only after Italian catalog + legal review | Gestione parrocchiale — **research not run** | EUR; Italian product strings | Full locale gate pack (mirror Phase 4) | Medium |
| **France** | French | None; future one `/fr` with DRC if ever needed | Avoid `/fr-fr` + `/fr-cd` duplicates | Logiciel paroisse — **research not run** | EUR/CDF display honesty | Same | High if FR + CD split without differentiation |
| **DRC** | French | None (share `/fr` if approved) | Country page only with real local proof | **research not run** | No fabricated Kinshasa addresses | Product + legal | High for thin geo pages |

**Language vs country:** Localization = translated product marketing (`/es`, `/pt-br`). Country localization = pricing, tax, payment methods, and optionally legal — driven by **visitor country + API**, not extra homepaths unless explicitly approved.

**Phase 4 action:** Document only. Do **not** add `/it`, `/fr`, `/fil`, `/sw`, or country slugs until each passes the same gate model as Spanish.
