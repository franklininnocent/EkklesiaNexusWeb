#!/usr/bin/env bash
# Phase 9 automated checks (frontend + Marketing API tests).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
API_ROOT="$(cd "$ROOT/../EkklesiaNexusApi" && pwd)"

echo "== EkklesiaNexusWeb =="
cd "$ROOT"
npm run validate:content
npm run validate:i18n
bash "$ROOT/scripts/verify-seo-frozen-surfaces.sh"
npm run test:unit
npm run typecheck
npm run lint
npm run build

echo "== Playwright SEO journey =="
npm run test:e2e -- e2e/seo-public-pages.spec.ts --project=chrome

echo "== Security scan (marketing web) =="
bash "$ROOT/scripts/scan-marketing-security.sh"

if [ -d "$API_ROOT" ]; then
  echo "== EkklesiaNexusApi (Marketing module) =="
  cd "$API_ROOT"
  php artisan test --filter=Marketing
else
  echo "Skip API tests: EkklesiaNexusApi not found at $API_ROOT"
fi

echo "== HTTP smoke (production server) =="
bash "$ROOT/scripts/smoke-production.sh"

echo "== Smoke: production marketing host (robots/sitemap policy) =="
bash "$ROOT/scripts/smoke-production-host.sh"

echo ""
echo "Marketing QA automation passed. Complete manual steps in docs/MANUAL_QA_CHECKLIST.md"
