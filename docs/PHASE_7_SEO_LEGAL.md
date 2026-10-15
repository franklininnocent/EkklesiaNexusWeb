# Phase 7 — SEO, legal, and discoverability

**Completed:** 8 Oct 2026  
**Depends on:** Phase 1, Phase 3

---

## 1. Global metadata (`layout.tsx`)

| Item | Implementation |
|------|----------------|
| Title / description | From `getMarketingContent().site` |
| `metadataBase` + canonical `/` | `siteConfig.url` |
| Open Graph + Twitter | Title, description, `/images/og/og-preview.png` |
| Icons | `/favicon/favicon.ico`, apple touch mark |
| JSON-LD | `Organization`, `WebSite`, `SoftwareApplication` only |

**Excluded (V1):** `Review`, `AggregateRating`, `Offer`, pricing `Product` schema.

Automated guard: `validateMarketingSeo()` in `npm run validate:content`.

---

## 2. Discoverability

| Route | File | Indexable |
|-------|------|-----------|
| `/`, `/pt-br` | `sitemap.ts` / `localized-metadata.ts` | Yes (home) |
| `/features`, `/features/[slug]`, `/about`, `/contact`, `/solutions/catholic-parishes` | Static app routes + code SEO defaults | Yes (English-only; optional CMS overrides) |
| `/privacy`, `/terms`, `/pt-br/privacy`, `/pt-br/terms` | `legal-metadata.ts` | **No** — omitted from sitemap until legal review |
| `/preview/plans` | Preview | **No** — `robots` disallow `/preview/` |

`robots.ts`: on `https://ekklesianexus.com`, allow `/`, disallow `/api/` and `/preview/`; on other `NEXT_PUBLIC_SITE_URL` values, disallow `/`. Points to `sitemap.xml`.

See also `docs/ENTERPRISE_SEO_IMPLEMENTATION_REPORT.md` and `docs/SEO_INTENT_AND_COMPETITOR_NOTES.md`.

---

## 3. Legal pages

| Path | Metadata helper | Status |
|------|-----------------|--------|
| `/privacy` | `legalPageMetadata("/privacy", …)` | Placeholder copy + amber notice |
| `/terms` | `legalPageMetadata("/terms", …)` | Placeholder copy + amber notice |

Both: `robots: { index: false, follow: false }`, canonical URL set.

---

## 4. Errors

`not-found.tsx`: branded message, link to `/`, `noindex` metadata.

---

## 5. Verification

```bash
npm run validate:content   # includes SEO rules
npm run build
```

Manual: view source on `/` for OG tags; confirm `/privacy` has `noindex`.

---

## 6. Sign-off

Phase 7 complete for V1. Replace legal placeholders after counsel review; then optionally add `/privacy` and `/terms` to `sitemap.ts` and set `robots.index: true`.

---

## 7. Super Admin Web Management (marketing CMS SEO)

| Surface | Route | Auth |
|---------|-------|------|
| Web Management | Angular `/settings/marketing-website` | Strict Super Admin (`EnsureSuperAdmin`) |
| Public read | `GET /api/public/marketing-content` | None (published revision only) |
| Publish / draft | `POST /api/admin/marketing/content/*` | Super Admin only (Ekklesia Admin **cannot** publish) |

**Payload:** single JSON in `marketing_content_revisions.payload` with optional `seo` object. Required pages: `home`, `privacy`, `terms`. Optional overrides: `features`, `about`, `contact`, `solutionsCatholicParishes`. Privacy/terms **noindex** enforced in API until legal workflow exists.

**Rendering:** Next.js `generateMetadata`, `sitemap.ts`, `robots.ts`, and JSON-LD read published CMS with file-provider fallbacks. Canonical URLs use `NEXT_PUBLIC_SITE_URL`; CMS `canonicalOrigin` is validation-only.

**Ops (not in repo):** set `MARKETING_CONTENT_SOURCE=api` on marketing deploy; submit `https://ekklesianexus.com/sitemap.xml` in Search Console; serve SaaS at `/application` per `docs/deploy/APPLICATION_BASEPATH_DECISION.md`. Angular `index.html` includes `noindex` for the app shell.
