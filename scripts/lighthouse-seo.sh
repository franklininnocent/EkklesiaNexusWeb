#!/usr/bin/env bash
# Optional P3 performance check. Requires Google Lighthouse CLI and a running marketing server.
# Usage: ./scripts/lighthouse-seo.sh http://localhost:3000
set -euo pipefail

BASE="${1:-http://localhost:3000}"
BASE="${BASE%/}"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/tmp/lighthouse"
mkdir -p "$OUT_DIR"

if ! command -v lighthouse >/dev/null 2>&1; then
  echo "Skip: lighthouse CLI not installed (npm i -g lighthouse)."
  exit 0
fi

PATHS=("/" "/features" "/contact")
for path in "${PATHS[@]}"; do
  slug="${path//\//_}"
  [ "$slug" = "_" ] && slug="_home"
  mobile_out="$OUT_DIR/${slug}-mobile.json"
  desktop_out="$OUT_DIR/${slug}-desktop.json"
  echo "Lighthouse $BASE$path (mobile) -> $mobile_out"
  lighthouse "$BASE$path" \
    --only-categories=performance,accessibility,seo \
    --form-factor=mobile \
    --output=json \
    --output-path="$mobile_out" \
    --quiet \
    --chrome-flags="--headless=new" || true
  echo "Lighthouse $BASE$path (desktop) -> $desktop_out"
  lighthouse "$BASE$path" \
    --only-categories=performance,accessibility,seo \
    --screenEmulation.disabled \
    --throttling.cpuSlowdownMultiplier=1 \
    --output=json \
    --output-path="$desktop_out" \
    --quiet \
    --chrome-flags="--headless=new" || true
done

echo "Lighthouse artifacts in $OUT_DIR (scores are environment-specific; paste into ENTERPRISE_SEO_IMPLEMENTATION_REPORT.md if needed)."
