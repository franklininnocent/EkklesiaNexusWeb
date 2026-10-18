# Phase 12 — Release readiness and rollback plan

## Pre-release (authorized owner)

- [ ] Review `git diff` on branch `price-implementation-web` (or release branch)
- [ ] `npm run qa` or minimum: `validate:content`, `validate:i18n`, `test:unit`, `build`, Playwright SEO+i18n
- [ ] **Zero open P0** in [PHASE_12_ISSUE_REGISTER.md](PHASE_12_ISSUE_REGISTER.md)
- [ ] P1 disposition documented (deploy stale prod, GSC access)
- [ ] `NEXT_PUBLIC_SITE_URL=https://ekklesianexus.com` on production
- [ ] Deploy includes `public/google161c1efd34d8a358.html`
- [ ] Apache default vhost per Phase 3B (operator)

## Deploy

Follow [DEPLOYMENT.md](../DEPLOYMENT.md) — symlink release, `systemctl restart`, **no** automated deploy from this phase.

## Post-release smoke (15–30 min)

1. `bash scripts/check-production-seo-baseline.sh`
2. `curl -I https://ekklesianexus.com/google161c1efd34d8a358.html` → **200**
3. View-source `/` and `/pt-br` — canonical + hreflang
4. Spot-check `#pricing` with test country headers (operator)
5. GSC verify + sitemap submit (operator)
6. Re-check `dwm.matchpointgps.in` and raw IP — must **not** serve marketing HTML

## Rollback triggers

- Marketing 5xx or wrong site on apex
- Accidental `noindex` on `/` or `/pt-br`
- Pricing shows static/mock plans
- Host guard regression exposing wrong tenant content

## Rollback procedure

1. Point `current` symlink to previous release directory ([DEPLOYMENT.md](../DEPLOYMENT.md)).
2. `systemctl restart` marketing Node service.
3. Re-run `check-production-seo-baseline.sh`.
4. **Do not** roll back API DB migrations from marketing rollback alone.

## Version identification

Record git commit SHA deployed (e.g. include Phases 4–12 bundle) in operator log.
