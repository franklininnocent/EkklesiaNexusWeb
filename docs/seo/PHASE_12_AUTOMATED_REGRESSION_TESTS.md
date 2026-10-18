# Phase 12 — Automated regression tests

## Commands executed (Phase 12)

| Command | Result |
|---------|--------|
| `npm run lint` | **PASS** (1 warning: unused `_serverMessages`) |
| `npm run typecheck` | **PASS** |
| `npm run validate:content` | **PASS** |
| `npm run validate:i18n` | **PASS** (303 keys) |
| `npm run test:unit` | **PASS** (includes phase1, 8, 9, 11, **12**) |
| `npm run build` | **PASS** |
| Playwright `e2e/i18n.spec.ts` + `e2e/seo-public-pages.spec.ts` | **18 passed** |

## Blocked / not run

| Command | Reason |
|---------|--------|
| `npm run qa` full | Includes API tests + `smoke-production.sh` — run by operator before release |
| Lighthouse | Not re-run Phase 12 |
| GSC URL Inspection | No account |
| Live hreflang HTML scrape | Relies on deploy |

## Test scripts map

| Script | Coverage |
|--------|----------|
| `phase12-release-gate.test.ts` | GSC file in repo, locales, sitemap host, JSON-LD safety, no price in static SEO |
| `phase11-international-seo.test.ts` | hreflang, switcher paths |
| `phase8-seo-measurement.test.ts` | Sitemap allowlist, JSON-LD types |
| `phase1-seo-contract.test.ts` | Home/legal/features metadata contract |
| `seo-metadata.test.ts` | Canonical home, privacy noindex |
| `marketing-request-host.test.ts` | Host guard |
| `map-public-plans.test.ts` + pricing suite | Commercial integrity |

## CI recommendation

Use `npm run test:unit` + `npm run build` on every marketing PR; `npm run qa` before release candidate.
