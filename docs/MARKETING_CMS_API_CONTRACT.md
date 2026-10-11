# Marketing CMS API contract (V2 / Phase 10)

**Status:** V2 storage live — public read returns **404** until a revision is published.

---

## Endpoint

| Method | Path | Auth |
|--------|------|------|
| `GET` | `/api/public/marketing-content` | None (throttle `public_forms`) |

## Response envelope

Same convention as other public APIs:

```json
{
  "success": true,
  "message": "OK",
  "data": { /* MarketingContent */ }
}
```

`data` must match the TypeScript type `MarketingContent` in  
`EkklesiaSoftWeb/src/types/marketing.ts` (versioned when CMS ships).

Optional `seo` object (schema version 1): global canonical origin (allowlisted), per-page metadata for `/`, `/privacy`, `/terms`, verification tokens, optional GA4 id. Privacy/terms remain noindex until legal approval. On publish, `site.seoTitle` / `site.seoDescription` sync from `seo.pages.home`.

## Next.js integration

| Env | Value |
|-----|--------|
| `MARKETING_CONTENT_SOURCE` | `file` (default) or `api` |
| `MARKETING_CONTENT_API_PATH` | Optional; default `/api/public/marketing-content` |

- `file` — `src/content/*` (V1)
- `api` — server fetch via `getMarketingContentAsync()`; **falls back to file** until API returns `success: true`

Server-only: uses `LARAVEL_API_URL` (never `NEXT_PUBLIC_*`).

## V2 implementation notes (Laravel)

- Super Admin CMS for hero, features, screenshots metadata, SEO fields, CTAs
- Publish workflow + audit; no tenant_id on public marketing payload (platform marketing site)
- Validate payload against schema before publish; reuse prohibited-claim rules from Phase 0
- CDN/storage for CMS-managed images; do not accept arbitrary URLs from editors without allowlist

## Admin CMS (Super Admin)

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/admin/marketing/content/revisions` | History (draft + published) |
| `GET` | `/api/admin/marketing/content/drafts/latest` | Load latest draft |
| `POST` | `/api/admin/marketing/content/drafts` | Save draft (not public) |
| `GET` | `/api/admin/marketing/content/published` | Current live payload |
| `POST` | `/api/admin/marketing/content/publish` | Publish JSON immediately |
| `POST` | `/api/admin/marketing/content/revisions/{id}/publish` | Publish saved draft |

Body for draft/publish: `{ "payload": { ...MarketingContent }, "notes": "optional" }`

## CLI import (ops)

```bash
cd EkklesiaSoftWeb && npm run export:content
cd ../EkklesiaSoftApi
php artisan marketing:import-content ../EkklesiaSoftWeb/marketing-content.export.json
```

## Database

Table `marketing_content_revisions` — latest `published_at` wins for public read.
