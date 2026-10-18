# SEO monitoring — command reference

**Working directory:** `EkklesiaNexusWeb`

## Weekly automation

| Command | Network | Exit codes |
|---------|---------|------------|
| `npm run monitor:weekly` | No | `0` pass; `1` critical local failure |
| `npm run monitor:weekly:production` | Yes (public URLs only) | `0` pass; `1` critical; `2` warnings only (e.g. host leak) |

Implementation: [`scripts/run-weekly-seo-health-check.ts`](../../scripts/run-weekly-seo-health-check.ts)

## Regression (local, no production)

```bash
npm run validate:content && npm run validate:i18n
npm run lint && npm run typecheck
npm run test:unit
npm run build
```

## Legacy operator scripts

| Command | Purpose |
|---------|---------|
| `bash scripts/check-production-seo-baseline.sh` | Markdown tables for core URLs |
| `bash scripts/record-phase0-14-production-verification.sh` | Baseline + metadata snapshot |
| `bash scripts/scan-marketing-security.sh` | Quarterly security scan |

## Playwright (optional)

```bash
npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome
```

## Troubleshooting

| Symptom | Action |
|---------|--------|
| Exit `1` GSC file live | Deploy `public/google161c1efd34d8a358.html` |
| Exit `2` leak hosts | Apache catch-all — [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](../PHASE_3B_PRODUCTION_GATE_REMEDIATION.md) |
| Fetch timeout | Retry; check network; do not increase poll frequency |
| `seo-monitoring-os-contract.test.ts` fails | Ensure monitoring docs exist under `docs/seo/` |
