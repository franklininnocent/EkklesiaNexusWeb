# Phase 10 — Super Admin CMS UI (MVP)

**Completed:** 8 Oct 2026  
**Path:** Angular product app → Settings → **Marketing website** (Super Admin only)

---

## 1. Route

| URL | Guard |
|-----|--------|
| `/settings/marketing-website` | `marketingSuperAdminGuard` (`isSuperAdmin()`) |

API enforces the same on `POST /api/admin/marketing/content/publish`.

---

## 2. Workflow

1. In `EkklesiaSoftWeb`: `npm run export:content` → `marketing-content.export.json`
2. Super Admin opens **Settings → Marketing website**
3. Run `npm run validate:export` on the JSON before publish
4. Upload or paste JSON, optional notes → **Publish to public API**
5. Review **Publication history** on the same page
6. On staging/production Web: set `MARKETING_CONTENT_SOURCE=api` when ready (invalid API payloads fall back to file)

---

## 3. Code map (`EkklesiaSoftUi`)

| Piece | Path |
|-------|------|
| Guard | `features/marketing-admin/guards/marketing-super-admin.guard.ts` |
| Service | `features/marketing-admin/services/marketing-admin.service.ts` |
| Page | `features/marketing-admin/pages/marketing-content-publish/` |
| Settings entry | `settings.component.ts` + `settings.routes.ts` |

---

## 4. Hero editor

See [PHASE_10_HERO_EDITOR.md](PHASE_10_HERO_EDITOR.md) — **Hero section** tab on the same page.

## 5. Not included (later)

- Visual editors for features, screenshots, navigation
- Draft vs live preview
- Prohibited-claim validation in UI (still use `npm run validate:content` on export JSON)

---

## 5. Verification

- Log in as Super Admin → Settings → Marketing website loads
- Publish test payload → `GET /api/public/marketing-content` returns 200
