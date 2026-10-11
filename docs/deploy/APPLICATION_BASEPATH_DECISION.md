# `/application` SaaS entry — decision record

**Status:** Superseded for the intended production topology.  
**Target production:** Marketing at `https://ekklesianexus.com/`, SaaS at `https://app.ekklesianexus.com/`, API at `https://api.ekklesianexus.com/`. The `/application` path is no longer the planned SaaS entry.

## Current evidence (repository)

- Angular [`EkklesiaSoftUi/src/index.html`](../../../EkklesiaSoftUi/src/index.html): `<base href="/">`.
- No `baseHref` / `deployUrl` in `angular.json`.
- Marketing Next.js app (`EkklesiaSoftWeb`) serves `/` with no `basePath`.
- No in-repo nginx vhost for `ekklesianexus.com` (only an example proxy for Next on port 3000).

## Recommended approach (Option B)

Build and deploy Angular with `--base-href /application/` and configure nginx:

- `location /` → Next.js (marketing).
- `location /application/` → Angular static bundle + SPA fallback to `/application/index.html`.
- API on a separate host or `/api` prefix (must not collide with marketing or app routes).

## Risks to verify in staging

- Asset URLs (`/application/*.js`), lazy chunks, favicon.
- Direct navigation and refresh on nested routes (`/application/dashboard/...`).
- Passport login, logout, token refresh, OAuth/callback URLs if any.
- Upload/download URLs and PDF links.
- Cache headers for `index.html` vs hashed assets.

## SEO policy when `/application` exists

- Marketing routes: indexable when published and allowed.
- `/application` and authenticated child routes: `noindex` (not a security control).
- Private APIs and tenant data: server-side auth only.

## Rollback

- Revert nginx to prior vhost; redeploy Angular with `base href="/"` if that was the previous production layout.

## Completed in SEO milestone

- `websiteUrl` in Angular production environment → `https://ekklesianexus.com` (Contact Support link).
- CMS-driven marketing SEO does not depend on `/application` routing.
