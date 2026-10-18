# Phase 0–14 — Optimization and remediation plan

## P0 — Immediate (operator / infra; not implemented in repo)

| Finding | Action | Owner | Rollback |
|---------|--------|-------|----------|
| SEO-AUDIT-001, 007 | Deploy `EkklesiaNexusWeb` artifact including `public/google*.html` and SEO copy | DevOps | Redeploy prior build |
| SEO-AUDIT-002, 003 | Apply Apache catch-all per [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](../PHASE_3B_PRODUCTION_GATE_REMEDIATION.md) | DevOps | Revert vhost config |

## P1 — Correctness after P0

| Finding | Action | Owner |
|---------|--------|-------|
| SEO-AUDIT-004 | Re-run `record-phase0-14-production-verification.sh`; confirm title/desc match repo | SEO operator |
| SEO-AUDIT-005 | Grant read-only GSC; export 28-day Performance | Owner |
| SEO-AUDIT-006 | Confirm `NEXT_PUBLIC_ANALYTICS_ENABLED` + measurement ID + consent | Owner |

## P2 — In-repo (completed or deferred)

| Finding | Action | Status |
|---------|--------|--------|
| SEO-AUDIT-010 | `phase0-14-audit-contract.test.ts` + wire `test:unit` | **Done** |
| SEO-AUDIT-009 | Lint fix `i18n-provider.tsx` | **Done** |
| SEO-AUDIT-008 | Add Playwright subset to CI | **Deferred** — requires workflow approval |

## P3 — Post-data optimization

- CTR experiments in [PHASE_14_CTR_AND_SERP_EXPERIMENT_REGISTER.md](PHASE_14_CTR_AND_SERP_EXPERIMENT_REGISTER.md) — **after** GSC baseline.
- Resource page R-001 — **awaiting product approval** (Phase 10).

## Explicitly excluded

- Pricing, tax, country detection, subscription API contracts.
- New locales (`/es`).
- New analytics providers.
- Speculative content rewrites without GSC evidence.

## Testing required after deploy

```bash
cd EkklesiaNexusWeb
npm run test:unit && npm run build
npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome
bash scripts/record-phase0-14-production-verification.sh
```
