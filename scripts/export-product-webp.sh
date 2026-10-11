#!/usr/bin/env bash
# WebP companions for product screenshots (Phase 5).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
for f in "$ROOT/public/images/product/"*.png; do
  [ -f "$f" ] || continue
  convert "$f" -quality 82 "${f%.png}.webp"
  echo "Wrote ${f%.png}.webp"
done
