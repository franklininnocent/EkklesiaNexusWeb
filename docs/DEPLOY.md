# Deploying EkklesiaSoftWeb

## Stack

- **Next.js** (marketing UI, port 3000 by default)
- **Laravel API** (demo form persistence only for public marketing)

Browser → Next.js → Laravel → PostgreSQL. Never expose Laravel directly to marketing visitors for form posts.

## Environment

| Variable | Scope | Purpose |
|----------|--------|---------|
| `LARAVEL_API_URL` | Server only | Internal URL to Laravel (e.g. `http://127.0.0.1:8000`) |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical HTTPS URL in production |
| `MARKETING_CONTACT_*` | Server | Optional footer/contact display |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Public | `false` by default |
| `NEXT_PUBLIC_APPLICATION_URL` | Public | Optional SaaS sign-in URL (e.g. `https://app.ekklesianexus.com`) |
| `MARKETING_CONTENT_SOURCE` | Server | `api` in production when using Super Admin CMS |

## Build & run

```bash
npm ci
npm run build
npm run start
```

Use a process manager (systemd, PM2) to keep `next start` running.

Examples:

- [deploy/ekklesiasoft-web.service.example](deploy/ekklesiasoft-web.service.example)
- [deploy/nginx-ekklesiasoft-web.conf.example](deploy/nginx-ekklesiasoft-web.conf.example)

## Laravel (required for demo form)

```bash
php artisan migrate --path=Modules/Marketing/database/migrations
```

Set `EMAIL_SUPPORT_ADDRESS` in the API `.env`.

Ensure `TENANT_API_RATE_LIMIT_ENABLED=true` in production so `public_forms` throttle applies.

Set matching `MARKETING_BFF_SECRET` on the API and Next.js. Production Next.js fail-closes public form rate limits if Laravel is unreachable or the secret is missing. Laravel cache should be Redis (`CACHE_STORE=redis`) so counters are shared across API instances.

Set `MARKETING_TRUST_PROXY=true` on Next.js only when nginx (or equivalent) overwrites `X-Forwarded-For`. Do not trust raw client-supplied forwarding headers.

## Database migrations (Marketing)

Additive, tenant-safe migrations (no tenant, subscription, or financial tables):

- `2026_10_11_160000_add_source_ip_hash_to_marketing_demo_requests` — nullable hash column
- `2026_10_11_170000_clear_plaintext_demo_source_ip` — nulls leftover demo `source_ip` values only
- `2026_10_11_180000_add_session_hash_to_marketing_plan_preview_tokens` — nullable unique session hash

Do **not** run these against production without an authorized backup and change window.

```bash
# Precheck
php artisan migrate:status --no-ansi | grep marketing

# Backup (PostgreSQL example — adjust host/db from your ops config, never paste passwords into tickets)
pg_dump --format=custom --file=ekklesia-pre-marketing-$(date +%Y%m%d).dump "$DATABASE_URL"

# Apply (API app directory)
php artisan migrate --path=Modules/Marketing/database/migrations --force

# Postcheck
php artisan migrate:status --no-ansi | grep marketing
```

Rollback of `170000` cannot restore plaintext IPs (by design). `160000` / `180000` down drop the added columns only.

## Preview tokens

Admin still opens `/preview/plans?token=…` once. Next.js (`src/proxy.ts`) exchanges the token server-side for an HttpOnly, `SameSite=Lax` cookie (`Secure` in production) and redirects to `/preview/plans` without the query string. Reusing the URL token fails. Session cookies remain valid until the original preview expiry so iframe remounts keep working. Preview responses send `Referrer-Policy: no-referrer` and do not load analytics.

Redact `token` and `session` query values in access logs, for example nginx:

```
log_format main_redacted '$remote_addr "$request_method $uri" $status';
```

Do not log `$request_uri` for `/preview/` or `/api/public/marketing-plan-catalog/preview`.

## Production debug

Laravel production boot forces `app.debug=false` even if the env file is wrong. Confirm at runtime:

```bash
php artisan platform:production-check --strict
```

API 500s in production return generic JSON. Next.js `global-error` does not render stack traces.

## Reverse proxy

Point your marketing domain to Next.js. Do not terminate marketing form traffic at Laravel from the browser.

Next.js already sends baseline security headers (including CSP) from `next.config.ts`. At the reverse proxy, add TLS, HSTS, and tune CSP only if you add third-party scripts or analytics domains.

## Health check

```bash
npm run smoke
# or against an already-running server:
SMOKE_BASE_URL=https://your-marketing-domain npm run smoke
```

- `GET /` returns 200 with security headers
- `POST /api/demo-requests` from the site succeeds when Laravel is reachable (manual / staging)

See [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) for full go-live steps.
