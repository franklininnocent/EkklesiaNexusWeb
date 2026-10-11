# Phase 10 — CMS foundation (V2 start)

**Started:** 8 Oct 2026  
**Scope:** Compatibility layer only — **not** a full CMS in V1.

---

## 1. Goal

Replace file-based copy with Laravel-managed content **without** rewriting React sections. UI keeps consuming `MarketingContent`.

---

## 2. Delivered (foundation)

| Piece | Location |
|-------|----------|
| File provider (V1) | `src/lib/marketing/providers/file-provider.ts` |
| API provider (fetch) | `src/lib/marketing/providers/api-provider.ts` |
| Source switch | `MARKETING_CONTENT_SOURCE=file\|api` |
| Async loader | `getMarketingContentAsync()` — homepage uses this |
| Sync loader | `getMarketingContent()` — metadata / validators |
| API contract doc | [MARKETING_CMS_API_CONTRACT.md](MARKETING_CMS_API_CONTRACT.md) |
| Laravel public read | `GET /api/public/marketing-content` → published JSON or **404** |
| Laravel admin publish | `POST /api/admin/marketing/content/publish` (Super Admin) |
| Storage | `marketing_content_revisions` + `marketing:import-content` CLI |
| Export file content | `npm run export:content` → `marketing-content.export.json` |

---

## 3. Super Admin UI (MVP)

See [PHASE_10_CMS_ADMIN_UI.md](PHASE_10_CMS_ADMIN_UI.md) — JSON upload/publish at `/settings/marketing-website`.

## 4. Not in scope yet

- Visual section editors (WYSIWYG per block)
- Testimonials, FAQ, pricing blocks
- Replacing `src/content/*` in production (`MARKETING_CONTENT_SOURCE` stays `file` for V1 launch)

---

## 5. Verification

```bash
# Next.js
npm run qa

# Laravel CMS API
cd ../EkklesiaSoftApi
php artisan test --filter=MarketingContent

# Angular Super Admin UI
cd ../EkklesiaSoftUi && npx ng build --configuration=development
```

---

## 6. Next V2 milestones

1. ~~Hero visual editor~~ — [PHASE_10_HERO_EDITOR.md](PHASE_10_HERO_EDITOR.md)  
2. ~~Draft vs publish workflow~~ — drafts + publish draft API + Angular UI (`npm run prepublish:cms`)  
3. ~~Staging CMS mode~~ — [STAGING_CMS.md](STAGING_CMS.md) (`MARKETING_CONTENT_SOURCE=api`, optional `MARKETING_CONTENT_STRICT`)  
4. ~~CI validator against live API payload~~ — `validate:export` + runtime `validateMarketingContentPayload` on API mode  
5. ~~SEO management (Wave 1)~~ — Super Admin SEO tab + `seo` payload + Next `generateMetadata`  
6. ~~CMS-driven shell (Wave 2)~~ — Homepage loads `getMarketingContentAsync()`; header nav, hero CTA copy, footer, final CTA from published JSON; Navigation + Footer editors; fabricated testimonials removed from homepage  
7. **Next:** Final CTA editor, features/screenshots metadata forms, optional `NEXT_PUBLIC_APPLICATION_URL` Sign in in production
