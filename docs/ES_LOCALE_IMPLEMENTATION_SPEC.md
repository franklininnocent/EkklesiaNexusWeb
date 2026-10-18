# Spanish locale `/es` — implementation spec (unpublished)

**Status:** Draft for review. **Not implemented. Not indexable. Not approved.**  
**Audience:** Mexico and Colombia (one language URL). Do not add `/es-mx` and `/es-co`.  
**Depends on:** All gates in [PHASE_3_PREFLIGHT.md](PHASE_3_PREFLIGHT.md) **PASS**, plus native Spanish review.

Reuse existing i18n: [`locale.ts`](../src/lib/i18n/locale.ts), [`messages.ts`](../src/lib/i18n/messages.ts), [`localized-metadata.ts`](../src/lib/marketing/localized-metadata.ts). No second metadata framework.

---

## URL and SEO contract (when authorized)

| Item | Value |
|------|--------|
| Home path | `/es` (no trailing slash as canonical) |
| Canonical | `https://ekklesianexus.com/es` |
| `html lang` | `es` |
| Hreflang (home only) | `en-US` → `/`, `pt-BR` → `/pt-br`, `es` → `/es`, `x-default` → English `/` |
| English-only routes | `/features*`, `/about`, `/contact`, `/solutions/*` — **no** Spanish alternate until real equivalents exist |
| Legal | `/es/privacy`, `/es/terms` if localized: **noindex**, self canonical, **no** hreflang |
| Sitemap | Add `/es` only after 200 + indexable + gates pass |
| Structured data | Same Organization/WebSite/SoftwareApplication graph; **no** `LocalBusiness`, fake office, ratings |
| Pricing | `GET /api/public/subscription-plans` only; no hardcoded amounts |

Slash: if `/es/` is a second 200 document, add one redirect to `/es`. Do not make `/es/` canonical.

---

## Code touch list (do not apply until gates + copy approval)

1. `SUPPORTED_LOCALES` add `"es"` (or `"es-MX"` only if product insists on a region tag — default **`es`** for MX+CO).
2. `publicPagePath` / `localeFromPathname` prefix `/es`.
3. `src/messages/es.json` — same keys as `en-US.json` (`validate:i18n`).
4. `src/app/es/page.tsx` mirroring `pt-br/page.tsx`.
5. `localizedAlternates()` include `es` **only for equivalent pages**.
6. `isLocalizedHomePath()` include `/es`.
7. Sitemap via `indexableLocalizedSitemapEntries`.
8. Extend `phase1-seo-contract.test.ts` and Playwright i18n spec.

---

## Content brief (for native review — not published)

**Intent:** Catholic parish / church administration software (office workflows), not generic Protestant ChMS attendance apps.

**Audience:** Parish secretaries, pastors, diocesan evaluators in Spanish-speaking Latin America (MX, CO).

**Problem:** Parish records (families, sacraments, intentions, stewardship) split across notebooks and spreadsheets.

**Outline (homepage equivalent of `/` / `/pt-br`):**

1. Positioning: next-generation Catholic church management — connected parish operations.
2. Verified capabilities only ([FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md)):
   - Families and members
   - Sacramental registers and certificates (including token verification as a **parish** capability, not a public marketing microsite)
   - Mass intentions
   - Ministries and Life Groups / BCCs
   - Stewardship, collections, receipts, projects, campaigns
   - Leadership, reports, roles/permissions
3. CTA: request a demo / contact (existing forms). Open Application → parish app, not a new funnel.
4. Do **not** claim: attendance, mobile giving app, event calendar, volunteer module, messaging suite, AI analytics, parish counts, fake testimonials, local legal compliance, a Mexico or Colombia office.

**Terminology (draft for linguist — not final copy):** *software de gestión parroquial*, *registros sacramentales*, *intenciones de misa*, *comunidades eclesiales de base / grupos de vida*, *mayordomía / diezmos y ofrendas* — confirm locally; do not mix Brazilian Portuguese into Spanish.

**Metadata (draft English gloss for translators):**

- Title theme: EkklesiaNexus — sistema de gestión parroquial (Catholic parish management)
- Description: families, sacramental books, Mass intentions, ministries/BCC, stewardship — one connected office. No invented numbers.

**Internal links after launch:** language switcher among `/`, `/pt-br`, `/es` on home/legal only. Feature hub stays English until Spanish feature pages exist.

---

## Approval required before code

| Item | Status | Reviewer | Date |
|------|--------|----------|------|
| Native Spanish copy (`es.json` + homepage) | **Not approved** | — | — |
| Product claims vs [FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md) | **Not approved** | — | — |
| Production gates (isolation + GSC file) | **FAIL** — see [PHASE_3_PREFLIGHT.md](PHASE_3_PREFLIGHT.md) | Operator | — |
| Explicit authorization to add public `/es` route | **Not approved** | — | — |

**Content requiring translation when authorized:** all keys in `en-US.json` (~300 per `validate:i18n`), homepage CMS strings if used, legal pages only after counsel approves indexing.

Until every row is approved and gates pass, this file is the spec only — **no** `es.json`, **no** route.
