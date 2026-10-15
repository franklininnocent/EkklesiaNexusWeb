#!/usr/bin/env bash
# Evidence gate for the enterprise SEO plan (engineering items).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
API_ROOT="$(cd "$ROOT/../EkklesiaNexusApi" && pwd)"

echo "== P0–P3 engineering verification =="

npm run validate:content
npm run validate:i18n
npm run test:unit
npm run typecheck
npm run lint
npm run build

bash "$ROOT/scripts/verify-seo-frozen-surfaces.sh"

echo "== Playwright SEO =="
npm run test:e2e -- e2e/seo-public-pages.spec.ts e2e/seo-mobile-a11y.spec.ts --project=chrome

echo "== HTTP smoke =="
bash "$ROOT/scripts/smoke-production.sh"
bash "$ROOT/scripts/smoke-production-host.sh"

if [ -d "$API_ROOT" ]; then
  echo "== Laravel Marketing =="
  (cd "$API_ROOT" && php artisan test --filter=Marketing)
fi

echo ""
echo "SEO implementation verification passed."
echo "See docs/ENTERPRISE_SEO_IMPLEMENTATION_REPORT.md and docs/SEO_OPERATOR_RUNBOOK.md for operator items."
