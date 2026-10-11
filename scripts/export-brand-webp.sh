#!/usr/bin/env bash
# Export WebP companions for static brand PNGs (Phase 2).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
for f in "$ROOT/public/logos/"*.png; do
  [ -f "$f" ] || continue
  convert "$f" -quality 88 "${f%.png}.webp"
  echo "Wrote ${f%.png}.webp"
done
