# Phase 14 — SEO regression monitoring

## Level A — CI / pre-merge (`npm run test:unit`)

| Script | Monitors |
|--------|----------|
| `phase1-seo-contract.test.ts` | Home/legal/features metadata |
| `phase8-seo-measurement.test.ts` | Sitemap allowlist, locales, JSON-LD |
| `phase9-internal-linking.test.ts` | EN footer Catholic link |
| `phase11-international-seo.test.ts` | hreflang, switcher paths |
| `phase12-release-gate.test.ts` | GSC file in repo, no price in schema |
| `phase14-monitoring-contract.test.ts` | Phase 14 docs present |
| Pricing / locale suite | Commercial integrity |

Also: `validate:content`, `validate:i18n`, `npm run build`, Playwright i18n + seo-public-pages.

## Level B — Operator schedule (read-only production)

| Frequency | Command / action | Alert if |
|-----------|------------------|----------|
| Weekly | `bash scripts/check-production-seo-baseline.sh` | GSC 404, leak hosts, sitemap ≠13 |
| Post-deploy | `bash scripts/record-phase13-live-verification.sh` | Title/desc drift |
| Monthly | GSC workflow | See Phase 14 GSC doc |

**Do not** add external uptime SaaS without approval.

## Severity

| Sev | Example |
|-----|---------|
| Critical | Apex 5xx, pricing mock data, site-wide noindex |
| High | Sitemap fail, `/pt-br` 404, GSC file 404 at release |
| Medium | Missing meta on one route |
| Low | Editorial |

## CI integration note

Safe to run `test:unit` on PRs; production curls remain **manual** (network, not in default CI).
