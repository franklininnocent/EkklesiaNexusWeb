# SEO technical implementation report — Phase 1

**Date:** 18 Oct 2026  
**Repository:** `EkklesiaNexusWeb` (+ one-line parish `index.html` for marketing build gate)

---

## Summary

Phase 1 locked SEO contracts in code and tests: home hreflang only on `/` and `/pt-br`, no hreflang on noindex legal pages, production host rejection in `proxy.ts`, and regression tests for `/pt-br` paths and sitemaps. **Production duplicate-host leak, GSC verification file, and Google index updates remain operator-owned.**

---

## Files changed

| File | Change |
|------|--------|
| `src/app/layout.tsx` | `isLocalizedHomePath()` — spread `buildLocalizedHomeMetadata` only for `/` and `/pt-br`. |
| `src/lib/marketing/legal-metadata.ts` | `alternates` = canonical only; no `localizedAlternates()` / hreflang on legal pages. |
| `src/lib/marketing/marketing-request-host.ts` | (Prior) Production host allowlist; 404 + `X-Robots-Tag` for unauthorized hosts. |
| `src/proxy.ts` | (Prior) Host check before preview-token handling. |
| `public/google161c1efd34d8a358.html` | (Prior) GSC HTML-file verification asset. |
| `scripts/phase1-seo-contract.test.ts` | **New** — `/pt-br` path, PT home canonical, legal/features metadata contracts. |
| `scripts/marketing-request-host.test.ts` | TypeScript-safe `NODE_ENV` toggling for `next build` typecheck. |
| `package.json` | `test:unit` includes `phase1-seo-contract.test.ts`. |
| `../EkklesiaNexusUi/src/index.html` | Neutral `<title>EkklesiaNexus</title>` so `validate:content` passes (robots noindex unchanged). |
| `docs/SEO_AUDIT_REPORT.md` | This cycle audit. |
| `docs/SEO_TECHNICAL_IMPLEMENTATION_REPORT.md` | This document. |
| `docs/INTERNATIONAL_SEO_ARCHITECTURE.md` | Phase 1 URL decision record. |
| `docs/PHASE_2_INTERNATIONAL_SEO_ROADMAP.md` | Deferred international work. |

**Not changed:** pricing modules, feature copy, homepage/`/pt-br` path strings, trailing-slash policy, DNS, Apache on `139.59.18.151`.

---

## Host isolation (repository vs production)

| Layer | Status |
|-------|--------|
| **Repo** | `shouldRejectUnauthorizedMarketingHost()` rejects every host outside the official allowlist, including the raw IP, in **production** `NODE_ENV`. Unit tests in `marketing-request-host.test.ts` use a synthetic host. |
| **Production** | **18 Oct 2026 GET:** the unauthorized host and `139.59.18.151` still **200** marketing HTML. Apache default vhost fix **not applied** from this environment (SSH/operator). |
| **Documentation** | [`deploy/apache-ekklesianexus.conf.example`](deploy/apache-ekklesianexus.conf.example), [`SEO_OPERATOR_RUNBOOK.md`](SEO_OPERATOR_RUNBOOK.md), [incident report](GOOGLE_DOMAIN_ATTRIBUTION_INCIDENT_REPORT.md). |

**Caveat:** Next.js guard applies only when Apache forwards the real `Host`. If the proxy uses `127.0.0.1`, localhost is allowlisted. Durable fix = Apache catch-all **404** without proxying to Next.js.

---

## Verification commands (18 Oct 2026)

| Command | Result |
|---------|--------|
| `npm run test:unit` | **Pass** (includes `seo-metadata.test.ts`, `marketing-request-host.test.ts`, `phase1-seo-contract.test.ts`) |
| `npm run build` | **Pass** (`validate:content`, `validate:i18n`, `next build --webpack`) |
| `npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome` | **17 passed, 1 failed** — failure: `footer links to features hub` (footer link role/name vs `/features` href); **not** introduced by metadata layout change |
| Full Playwright matrix (chrome/firefox/webkit/mobile) | **34 failed** (browser install / environment); chrome subset used per plan |

Sandbox note: first `next build` attempt without network failed on Google Fonts fetch; build with normal network succeeded.

---

## Analytics (inspect only)

- `src/lib/marketing/ga4-events.ts` maps allowlisted events (`demo_request_submit`, `login_click`, `contact_form_submit`, etc.); no Phase 1 tag changes.
- GSC verification: file in repo; production **404** until deploy ([audit](SEO_AUDIT_REPORT.md)).
- Operator checklist: [`SEO_OPERATOR_RUNBOOK.md`](SEO_OPERATOR_RUNBOOK.md) §3 (GSC domain property, sitemap submit).

---

## Rollback

1. Revert Phase 1 commits under `EkklesiaNexusWeb` (and parish `index.html` if desired).
2. Redeploy previous marketing artifact.
3. Apache: restore `*.bak` from operator backup; `apache2ctl configtest` then reload.
4. **Do not** add a redirect from an unauthorized host to EkklesiaNexus.

---

## Operator next steps (explicit approval required)

1. Deploy marketing build; restart Next.js on production.
2. Confirm `https://ekklesianexus.com/google161c1efd34d8a358.html` → **200**.
3. `apache2ctl -S`, backup, apply default vhost pattern, `configtest`, reload.
4. Re-GET the raw IP and a synthetic unknown `Host` — expect **404** or a non-marketing body.
5. Complete GSC verification and submit `https://ekklesianexus.com/sitemap.xml`.
6. Monitor Search Console; do not claim SERP fix until observed.
