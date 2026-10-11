#!/usr/bin/env bash
# Phase 9 automated checks (frontend + Marketing API tests).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
API_ROOT="$(cd "$ROOT/../EkklesiaNexusApi" && pwd)"

echo "== EkklesiaNexusWeb =="
cd "$ROOT"
npm run validate:content
npm run typecheck
npm run lint
npm run build

echo "== Security scan (marketing web) =="
bash "$ROOT/scripts/scan-marketing-security.sh"

if [ -d "$API_ROOT" ]; then
  echo "== EkklesiaNexusApi (Marketing module) =="
  cd "$API_ROOT"
  php artisan test --filter='PublicDemoRequest|MarketingContent|MarketingSeo'
else
  echo "Skip API tests: EkklesiaNexusApi not found at $API_ROOT"
fi

echo "== HTTP smoke (production server) =="
bash "$ROOT/scripts/smoke-production.sh"

echo ""
echo "Marketing QA automation passed. Complete manual steps in docs/MANUAL_QA_CHECKLIST.md"
