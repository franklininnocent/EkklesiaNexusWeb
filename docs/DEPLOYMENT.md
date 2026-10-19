# EkklesiaNexusWeb deployment

This document is the deployment procedure for the Next.js marketing site only. It was written from the repository on 15 Oct 2026. It does not mean a UAT or Production server has been provisioned or that a release has been deployed.

Shorter notes and the existing unit examples remain in `docs/DEPLOY.md`, `docs/deploy/ekklesianexus-web.service.example`, and `docs/deploy/nginx-ekklesianexus-web.conf.example`. Those examples use development-style paths under `/var/www/html`. This document uses the versioned release layout.

The API procedure is in `EkklesiaNexusApi/docs/DEPLOYMENT.md`. The parish application procedure is in `EkklesiaNexusUi/docs/DEPLOYMENT.md`.

## What this application is

| Item | Value in this repository |
| --- | --- |
| Package | `ekklesianexus-web` |
| Next.js | 16.4.0 |
| React | 19.3.0 |
| TypeScript | 5.9.3 |
| Lockfile | `package-lock.json` |
| Node engines | `>=20.9.0` (`.nvmrc` says `20`, which is end of life) |
| Build | `npm run build` (`next build --webpack`). `prebuild` runs content and i18n validation |
| Start | `npm run start` (`next start`) |
| Router | App Router under `src/app` |
| Static export | Not compatible. `output: 'export'` is not set |

Server features that require a Node process:

- `src/app/api/contact-enquiries/route.ts`
- `src/app/api/demo-requests/route.ts`
- `src/app/api/contact-captcha/route.ts`
- `src/app/api/revalidate-plans/route.ts`
- `src/proxy.ts` for host redirects and preview cookies
- `headers()` and `cookies()` usage, including preview plans
- `next/image` optimization
- Security headers from `next.config.ts`

Do not publish this site as a directory of HTML files. Nginx proxies to the Node process.

There is no `/health` route. The smoke script requests `GET /` and other public pages.

## Node.js

Install **Node.js 24 LTS**, latest 24.x patch on https://nodejs.org. Next.js 16 requires Node 20.9 or newer ([Next.js installation](https://nextjs.org/docs/app/getting-started/installation)). Node 24 satisfies that. Do not install Node 26 Current. Do not use Node 20 from `.nvmrc` for a new server; that line is end of life as of 30 Apr 2026.

Use `npm ci`. Do not run `npm update`.

## How the site talks to the API

The browser posts to this Next.js process (`/api/contact-enquiries`, `/api/demo-requests`, `/api/contact-captcha`). The server then calls Laravel at `LARAVEL_API_URL`. On a host where Nginx and PHP-FPM are local, set:

```dotenv
LARAVEL_API_URL=https://<API_HOST>
```

Use `http://127.0.0.1` only when the API is bound on localhost without TLS and the Next.js host is the same machine. Do not point a public form at a developer URL.

`MARKETING_BFF_SECRET` must match the API. It is server-only. Never prefix it with `NEXT_PUBLIC_`. `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APPLICATION_URL`, and `NEXT_PUBLIC_ANALYTICS_ENABLED` are visible in the browser bundle.

## Placeholders

| Placeholder | Meaning |
| --- | --- |
| `<MARKETING_HOST>` | Production: `ekklesianexus.com`. UAT: approved UAT marketing hostname |
| `<APP_HOST>` | Production: `app.ekklesianexus.com` |
| `<API_HOST>` | Production: `api.ekklesianexus.com` |
| `<GIT_REMOTE_WEB>` | Approved Git remote |
| `<RELEASE_SHA>` | Full commit SHA |
| `<RELEASE_ID>` | Release directory name |
| `<WEB_PORT>` | Loopback port. Default `3000`. UAT can use another loopback port if both ever shared a host, which they must not |

UAT uses UAT values for every host and secret. Do not copy Production `.env` onto UAT. UAT contact submissions must reach the UAT API only.

## 1. Directories and code

Run on the target server as `ekklesia` after that user exists (see the API document for user creation when this is the same server). Marketing can also run on its own VM. PostgreSQL is not installed for this application; the API owns the database.

```bash
mkdir -p /srv/ekklesianexus/web/releases /srv/ekklesianexus/web/shared
cd /srv/ekklesianexus/web/releases
git clone --no-checkout <GIT_REMOTE_WEB> <RELEASE_ID>
cd <RELEASE_ID>
git checkout --detach <RELEASE_SHA>
git rev-parse HEAD
git status --short
ln -sfn /srv/ekklesianexus/web/shared/.env .env
```

Create `/srv/ekklesianexus/web/shared/.env` mode `640`, owner `ekklesia`.

Production:

```dotenv
NODE_ENV=production
LARAVEL_API_URL=https://api.ekklesianexus.com
MARKETING_BFF_SECRET=<MATCHES_API>
MARKETING_TRUST_PROXY=true
MARKETING_REVALIDATE_SECRET=<MATCHES_API_IF_CMS_REVALIDATION_IS_ENABLED>
MARKETING_CONTENT_SOURCE=file
NEXT_PUBLIC_SITE_URL=https://ekklesianexus.com
NEXT_PUBLIC_APPLICATION_URL=https://app.ekklesianexus.com
NEXT_PUBLIC_ANALYTICS_ENABLED=false
MARKETING_CONTACT_EMAIL=contact@ekklesianexus.com
MARKETING_GEO_HEADER_SECRET=<LONG_RANDOM_SECRET_MATCHES_APACHE_X_EN_GEO_TOKEN>
```

Set `MARKETING_CONTENT_SOURCE=api` only after a super admin has published CMS content on that environment. Optional keys from `env.example`: `MARKETING_CONTENT_API_PATH`, `MARKETING_CONTENT_STRICT`, `MARKETING_CONTACT_PHONE`, `MARKETING_CONTACT_ADDRESS`, `MARKETING_PREVIEW_FRAME_ANCESTORS`.

**Regional pricing (`#pricing`):** amounts come from `GET /api/public/subscription-plans` (`regional_prices`). Currency is chosen from the visitor country: IN→INR, BR→BRL, otherwise USD. Preferred source is trusted **`X-EN-Geo-Country`** plus **`X-EN-Geo-Token`** equal to `MARKETING_GEO_HEADER_SECRET`, set by Apache/Nginx (see `docs/deploy/apache-ekklesianexus.conf.example` or `docs/deploy/nginx-ekklesianexus.conf.example`). When those headers are absent, Production uses the rightmost public address in `X-Forwarded-For` (Apache’s client IP) and the bundled DB-IP country database. Do not use `MARKETING_VISITOR_COUNTRY` in Production unless the whole site should use one country’s prices for every visitor (dev-only override).

`MARKETING_TRUST_PROXY=true` is correct only when Nginx overwrites `X-Forwarded-For`. Do not enable it if clients can reach the Node port directly.

UAT uses the same key names with UAT URLs and a different `MARKETING_BFF_SECRET`.

Build-time public variables are read when `next build` runs. Changing `NEXT_PUBLIC_*` requires a new build. Server secrets such as `MARKETING_BFF_SECRET` are read by the Node process. Restart the service after changing them. Do not commit either file.

## 2. Install, check, and build

Run inside the release directory as `ekklesia`.

```bash
node -v
npm ci
npm run lint
npm run typecheck
npm run test:unit
npm run build
```

`npm run build` already runs `prebuild` validation. Expected: `.next` exists and the command exits 0.

Switch the live directory only after the build succeeds:

```bash
ln -sfn /srv/ekklesianexus/web/releases/<RELEASE_ID> /srv/ekklesianexus/web/current
```

## 3. systemd

Create `/etc/systemd/system/ekklesia-web.service` as root. `next` must be the binary from this release, not a global install.

```ini
[Unit]
Description=EkklesiaNexus marketing website
After=network.target

[Service]
Type=simple
User=ekklesia
Group=ekklesia
WorkingDirectory=/srv/ekklesianexus/web/current
Environment=NODE_ENV=production
EnvironmentFile=/srv/ekklesianexus/web/shared/.env
ExecStart=/usr/bin/npm run start -- --hostname 127.0.0.1 --port 3000
Restart=on-failure
RestartSec=5
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
```

If `npm` is not `/usr/bin/npm`, use the absolute path from `command -v npm`.

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now ekklesia-web
sudo systemctl status ekklesia-web --no-pager
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/
```

Expected: service active and local HTTP 200. The Node port must not be reachable from the public internet. Confirm with `ss -lnt` that port 3000 is on `127.0.0.1` only.

After a new release:

```bash
sudo systemctl restart ekklesia-web
```

`Restart=on-failure` brings the process back if it exits. `systemctl restart` is the graceful replacement for a new release. Keep the previous release directory so you can point `current` back at it.

## 4. Nginx

Back up any existing site file first. Replace `<MARKETING_HOST>`.

```nginx
server {
    listen 80;
    server_name <MARKETING_HOST>;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name <MARKETING_HOST>;

    ssl_certificate     /etc/letsencrypt/live/<MARKETING_HOST>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<MARKETING_HOST>/privkey.pem;

    add_header Strict-Transport-Security "max-age=31536000" always;

    access_log /var/log/nginx/ekklesia-web.access.log;
    error_log  /var/log/nginx/ekklesia-web.error.log warn;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Regional pricing — see docs/deploy/nginx-ekklesianexus.conf.example (strip client geo, set X-EN-Geo-* + token).
    }
}
```

Production on Apache uses the same `X-EN-Geo-Country` / `X-EN-Geo-Token` pattern in `docs/deploy/apache-ekklesianexus.conf.example`.

Next.js already sends content-security policy and related headers from `next.config.ts`. Leave those in the application. Add HSTS at Nginx as shown.

If `www.<MARKETING_HOST>` is used, give it its own server block that returns 301 to `https://<MARKETING_HOST>$request_uri`. The product hostname for Production is the apex `ekklesianexus.com`.

Preview URLs carry a token once. Do not log `$request_uri` for `/preview/`. A redacted log format is described in `docs/DEPLOY.md`.

```bash
sudo certbot --nginx -d <MARKETING_HOST>
sudo nginx -t && sudo systemctl reload nginx
```

## 5. Checks

Run inside the release, or point smoke at the public origin.

```bash
cd /srv/ekklesianexus/web/current
SMOKE_BASE_URL=https://<MARKETING_HOST> npm run smoke
```

Record the result. Also confirm manually:

- Home page returns 200 over HTTPS
- Regional pricing: a public request from an Indian IP renders Starter around `1499` (INR). A request from Brazil renders BRL. Other countries render USD. Trusted `X-EN-Geo-Country` still overrides the IP lookup when Apache sets it with `X-EN-Geo-Token`.
- Contact submission is stored by the API for this environment and does not send parish mail from UAT
- Demo request, when that form is routed, uses the same rule
- Images and canonical URLs use `<MARKETING_HOST>`
- `curl -s https://<MARKETING_HOST>/ | grep -c MARKETING_BFF_SECRET` is 0
- `systemctl status ekklesia-web` stays active after a restart

Certificate issue only after DNS for `<MARKETING_HOST>` points at this server.

## 6. Rollback

```bash
readlink -f /srv/ekklesianexus/web/current
ln -sfn /srv/ekklesianexus/web/releases/<PREVIOUS_RELEASE_ID> /srv/ekklesianexus/web/current
sudo systemctl restart ekklesia-web
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/
```

The previous directory must still contain its `.next` build. Environment stays in `shared/.env` and is not rolled back by the symlink. Rolling back the site does not roll back API migrations that stored contact or demo rows.

## 7. What is still unknown

- `<GIT_REMOTE_WEB>`, `<SSH_HOST>`, and UAT hostnames
- Whether this site shares a VM with the API or has its own VM. Both are valid. The API database is never installed from this document
- `MARKETING_BFF_SECRET` and mail behaviour for UAT
- No deployment command in this document has been executed against UAT or Production
