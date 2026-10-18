# SEO operator runbook (post-engineering)

Complete these after deploying the marketing site build. Engineering cannot finish them in-repo.

## 1. Production environment

Template: [`SEO_PRODUCTION_ENV.example`](SEO_PRODUCTION_ENV.example)

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://ekklesianexus.com` |
| `MARKETING_CONTENT_SOURCE` | `api` |
| `LARAVEL_API_URL` | `https://api.ekklesianexus.com` (server-only) |
| `MARKETING_REVALIDATE_SECRET` | Shared secret with Laravel `marketing.plan_catalog.revalidate_secret` |
| Marketing BFF secret | Matches Laravel `marketing.bff.secret` |

Parish app (`EkklesiaNexusUi`) and API hosts should keep **noindex** / `robots Disallow: /`.

## 2. Edge / CDN

- Redirect `www.ekklesianexus.com` → `https://ekklesianexus.com` (301).
- Redirect HTTP → HTTPS on the marketing host.
- Next.js `proxy.ts` also enforces apex HTTPS; CDN should align.
- **Apache (production):** use an explicit default vhost that does **not** proxy to Next.js for unknown `Host` values or the raw server IP. See [`deploy/apache-ekklesianexus.conf.example`](deploy/apache-ekklesianexus.conf.example). Inspect with `sudo apache2ctl -S`, backup configs, `apache2ctl configtest`, then reload. Do not 301 unauthorized domains to the marketing site.

## 3. Production gate remediation (Phase 3B)

Full steps: [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](PHASE_3B_PRODUCTION_GATE_REMEDIATION.md). Gate status: [PHASE_3_PREFLIGHT.md](PHASE_3_PREFLIGHT.md).

## 4. Google Search Console

1. Add **domain** property for `ekklesianexus.com`.
2. Paste verification token into Web Management → SEO → Google (if using HTML tag method).
3. Submit sitemap: `https://ekklesianexus.com/sitemap.xml`.
4. Monitor Coverage; separate branded vs non-branded queries when data exists.

## 5. CMS publish

In **Settings → Marketing website** (Super Admin):

- Publish content with SEO for `home`, optional overrides for `features`, `about`, `contact`, `solutionsCatholicParishes`.
- Keep `privacy` / `terms` **noindex** until legal approves copy.

## 6. Analytics

- Approve consent banner copy with stakeholders.
- Set `NEXT_PUBLIC_ANALYTICS_ENABLED=true` only on production.
- Configure GA4 measurement ID in published CMS SEO.

## 7. Legal

- Replace privacy/terms placeholders after counsel review.
- Only then consider indexing legal pages (product decision + CMS flags).

## 8. Off-page SEO and ethical link building (Phase 10)

- Governance: [`seo/LINK_BUILDING_GOVERNANCE.md`](seo/LINK_BUILDING_GOVERNANCE.md)
- Baseline, opportunities, outreach templates: [`seo/PHASE_10_OFF_PAGE_SEO_IMPLEMENTATION.md`](seo/PHASE_10_OFF_PAGE_SEO_IMPLEMENTATION.md)
- **No outreach or directory submission from engineering**—owner approval required.
- Trademark review vs other “Ekklesia*” products (legal).
- Permissioned customer stories and directory listings—no fake reviews or purchased links.

## Engineering verification commands

```bash
cd EkklesiaNexusWeb
npm run qa
bash scripts/smoke-production-host.sh
bash scripts/lighthouse-seo.sh http://127.0.0.1:3098   # after next start with production SITE_URL
```
