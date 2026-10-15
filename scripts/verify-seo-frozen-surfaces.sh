#!/usr/bin/env bash
# Fails if protected homepage SEO surfaces change (checksum baseline).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BASELINE="$ROOT/scripts/seo-protected-baseline.sha256"
if [ ! -f "$BASELINE" ]; then
  echo "ERROR: missing $BASELINE"
  exit 1
fi

if sha256sum -c "$BASELINE" --quiet 2>/dev/null; then
  echo "OK   protected SEO surfaces match baseline (testimonials, feature cards, pricing, regional-pricing)."
  exit 0
fi

# Fallback: git diff when available
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  cd "$ROOT/.."
  PROTECTED=(
    "EkklesiaNexusWeb/src/components/mockup/testimonials.tsx"
    "EkklesiaNexusWeb/src/components/mockup/features.tsx"
    "EkklesiaNexusWeb/src/components/mockup/pricing.tsx"
    "EkklesiaNexusWeb/src/data/regional-pricing.ts"
  )
  fail=0
  for path in "${PROTECTED[@]}"; do
    if git diff --name-only HEAD -- "$path" 2>/dev/null | grep -q .; then
      echo "FAIL protected surface modified: $path"
      fail=1
    fi
  done
  if [ "$fail" -eq 0 ]; then
    echo "OK   protected surfaces unchanged (git)."
    exit 0
  fi
fi

echo "FAIL protected SEO surface checksum mismatch. Update baseline only with explicit product approval."
sha256sum -c "$BASELINE" || true
exit 1
