# Production launch checklist (EkklesiaSoftWeb)

Use with [DEPLOY.md](DEPLOY.md) immediately before and after go-live.

## Pre-deploy

- [ ] `npm run qa` passes on release commit
- [ ] `npm run smoke` passes against staging build
- [ ] `NEXT_PUBLIC_SITE_URL` set to production HTTPS origin (no trailing slash issues in metadata)
- [ ] `LARAVEL_API_URL` reachable from Next.js host only (not public)
- [ ] API: `php artisan migrate --path=Modules/Marketing/database/migrations`
- [ ] API: `EMAIL_SUPPORT_ADDRESS` set and mail transport tested
- [ ] API: rate limiting enabled for `public_forms`
- [ ] Manual QA checklist completed on staging URL

## Deploy

- [ ] `npm ci && npm run build`
- [ ] Process manager runs `next start` (or platform equivalent)
- [ ] Reverse proxy TLS certificate valid
- [ ] Homepage loads over HTTPS

## Post-deploy smoke

- [ ] `curl -I https://<domain>/` → 200 + security headers
- [ ] Submit demo form from `#contact` → success message
- [ ] Confirm row in `marketing_demo_requests`
- [ ] Open Graph preview shows `/images/og/og-preview.png`

## Rollback

- [ ] Previous `next start` artifact or container image tagged
- [ ] Revert env vars if URL misconfigured
