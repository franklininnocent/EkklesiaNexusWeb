# Staging: CMS-driven marketing site

Use this when the public site should read copy from Laravel instead of `src/content/`.

## 1. Publish content

```bash
cd EkklesiaNexusWeb
npm run prepublish:cms
cd ../EkklesiaNexusApi
php artisan marketing:import-content ../EkklesiaNexusWeb/marketing-content.export.json
# or Super Admin → Settings → Marketing website → Publish
```

Verify: `curl -s http://127.0.0.1:8000/api/public/marketing-content | jq .success`

## 2. Next.js environment (staging)

```env
LARAVEL_API_URL=http://127.0.0.1:8000
MARKETING_CONTENT_SOURCE=api
# Optional: fail loudly instead of file fallback
MARKETING_CONTENT_STRICT=true
NEXT_PUBLIC_SITE_URL=https://staging-marketing.example.com
```

Rebuild/restart `next start` after env changes.

## 3. Rollback

Set `MARKETING_CONTENT_SOURCE=file` and redeploy — file-based `src/content` is the safety net.

## 4. Checks

- `npm run validate:export` before every publish
- `npm run smoke` on the Next host after deploy
- Public site must not expose `LARAVEL_API_URL` to the browser
