# SEO monitoring — implementation report

**Date:** 2026-10-18  
**Overall status:** **CONDITIONALLY READY** — operating system delivered; production P0 blockers remain.

## Git baseline (EkklesiaNexusWeb)

- **Branch:** `price-implementation-web` @ `323a869e36658bfb07ab646f2b72dad37f4f53e6` (+ uncommitted SEO/monitoring work)
- **Separate repos:** `EkklesiaNexusUi` for Super Admin runbook page

## Gap analysis (before → after)

| Gap | Resolution |
|-----|------------|
| No single operating procedure | [SEO_MONITORING_OPERATING_PROCEDURE.md](SEO_MONITORING_OPERATING_PROCEDURE.md) |
| Bash-only smoke, no exit codes | [run-weekly-seo-health-check.ts](../../scripts/run-weekly-seo-health-check.ts) + `monitor:weekly*` |
| Fragmented monthly/quarterly templates | New templates under `docs/seo/templates/` |
| No contract test for monitoring OS | [seo-monitoring-os-contract.test.ts](../../scripts/seo-monitoring-os-contract.test.ts) |
| No Super Admin runbook UI | `/settings/marketing-website/seo-monitoring` |

## Capabilities implemented

- **Layer A:** `src/lib/seo-monitoring/*`, unit tests, wired in `test:unit`
- **Layer B:** `npm run monitor:weekly:production` (allowlisted URLs, retries, timeouts)
- **Layer C:** Documented in operating procedure + GSC runbook links in app
- **Layer D:** GA4/PSI links only — no new tracking
- **Layer E:** Issue register status glossary, weekly/monthly/quarterly templates

## Files created or modified

**EkklesiaNexusWeb:** `src/lib/seo-monitoring/`, `scripts/run-weekly-seo-health-check.ts`, `scripts/weekly-seo-health-check.test.ts`, `scripts/seo-monitoring-os-contract.test.ts`, `package.json`, `docs/seo/SEO_*`, `docs/seo/templates/*`, `scheduling.example.cron`, `check-production-seo-baseline.sh` comment

**EkklesiaNexusUi:** `marketing-seo-monitoring-runbook/*`, `marketing-admin.routes.ts`, `settings-nav.config.ts`, section tabs on content/plans pages

## Commands and results

| Command | Result |
|---------|--------|
| `npm run monitor:weekly` | **PASS** (exit 0) — local invariants |
| `npm run monitor:weekly:production` | **exit 1** (2026-10-18) — GSC file 404 critical; leak hosts warning |
| `npm run test:unit` | **PASS** after implementation report present |
| `npm run build` | Run in verify step |
| Angular runbook spec | `marketing-seo-monitoring-runbook.page.spec.ts` — run with project test runner when CI allows |

## Scheduling

- **Not installed** — see [scheduling.example.cron](scheduling.example.cron)
- **CI:** unchanged (`web-quality` = unit + build only)

## Manual steps still required

- Google Search Console weekly/monthly data entry
- GA4 if enabled on production
- Apache host isolation + marketing deploy for P0 closure

## Next weekly review

1. `cd EkklesiaNexusWeb && npm run monitor:weekly:production`
2. Fill [templates/WEEKLY_SEO_HEALTH_CHECK.md](templates/WEEKLY_SEO_HEALTH_CHECK.md)
3. Update [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md)

## Top 5 owner actions

1. Deploy marketing site (GSC file + SEO bundle)  
2. Fix host leak (Apache Phase 3B)  
3. Verify GSC property; first 28-day export  
4. Schedule weekly `monitor:weekly:production` on operator host  
5. Use Super Admin **SEO monitoring** runbook under Settings → Web Management
