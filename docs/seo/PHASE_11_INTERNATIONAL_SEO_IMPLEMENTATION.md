# Phase 11 — International SEO, pt-BR optimization & localization QA

**Executive status:** **Partially complete** — hreflang/canonical fixes, pt-BR SEO copy alignment, regression tests, and governance docs delivered. **Blocked** on native pt-BR marketing review, P0 production host/GSC issues, and deploy. **Not** claiming international ranking success.

**Date:** 2026-10-18 (UTC)

---

## 1. Scope

- Audit locale architecture and route matrix.
- Fix verified metadata defects (home canonical helper, legal hreflang).
- Align pt-BR **SEO** descriptions with English product scope.
- Add `phase11-international-seo.test.ts`.
- Document gaps (English-only deep pages, no `/pt-br` features).

**Out of scope:** New locales, `/es`, pt-BR feature routes, pricing/API changes, deploy, IP language redirects.

---

## 2. Locale architecture (actual)

| Layer | Implementation |
|-------|----------------|
| Locales | `SUPPORTED_LOCALES`: `en-US`, `pt-BR` (`src/lib/i18n/locale.ts`) |
| Routing | `/` = EN home; `/pt-br` = PT home; `/pt-br/privacy|terms` |
| English-only | `isEnglishOnlyMarketingPath` — `/features`, `/about`, `/contact`, `/solutions/*` |
| Messages | `src/messages/en-US.json`, `pt-BR.json` |
| Home metadata | `buildLocalizedHomeMetadata` + root layout for `/` and `/pt-br` |
| Static EN pages | `marketing-static-pages.ts` + per-route `generateMetadata` |
| Legal | `legalPageMetadata` + localized paths |
| hreflang | Next.js `metadata.alternates.languages` via `localizedLanguageAlternates` |
| Pricing | Visitor country via existing pricing modules — independent of locale |
| Switcher | `LanguageSwitcher` + `switchLocalePath` (no geo redirect) |

---

## 3. Changes implemented

| File | Change |
|------|--------|
| `localized-metadata.ts` | `localizedLanguageAlternates`; `localizedAlternates(page, locale)` self-canonical |
| `seo-metadata.ts` | Home alternates use locale-aware helper |
| `legal-metadata.ts` | hreflang for privacy/terms (noindex preserved) |
| `pt-BR.json` | `seo.homeDescription`, `seo.manifestDescription` scope-aligned |
| `phase11-international-seo.test.ts` | International SEO regression |
| `phase1-seo-contract.test.ts` | Legal hreflang expectations |
| `package.json` | Wire phase11 into `test:unit` |
| `docs/seo/PHASE_11_*`, `LOCALIZATION_CONTENT_REVIEW_CHECKLIST.md` | Deliverables |

---

## 4. Prior phases / prerequisites

| Item | Status |
|------|--------|
| P0 hostname leak | **Open** — hurts international consolidation |
| GSC | **No access** |
| Phase 9 EN deep content | Not localized to pt-BR (documented) |

---

## 5. Tests (executed)

| Command | Result |
|---------|--------|
| `npm run validate:content` | **Pass** |
| `npm run validate:i18n` | **Pass** (303 keys) |
| `npm run test:unit` | **Pass** (includes phase11) |
| `npm run build` | **Pass** |
| Playwright `e2e/i18n.spec.ts` | **Pass** (10 tests) |

---

## 6. Pricing regression

No changes to `map-public-plans`, regional pricing, or pricing UI. Locale tests unchanged in pricing modules.

---

## 7. Approval requirements

1. **Native pt-BR reviewer** for `seo.*` and hero marketing copy.  
2. **Legal** for privacy/terms body text indexing decision.  
3. **Deploy** for live hreflang + copy.  
4. **P0 remediation** before trusting international signals in GSC.

---

## 8. Rollback

Revert Phase 11 file list; legal hreflang removal restores prior phase1 expectations only if reverting tests too.

---

## 9. Next phase recommendation

**Phase 11B:** After deploy — GSC International targeting report; decide if selected pt-BR pages need translation (features hub summary only) with native review; optional Playwright hreflang assertion on `/` and `/pt-br`.
