#!/usr/bin/env bash
# Phase 13 — Read-only live production verification (paste into PHASE_13_LIVE_PRODUCTION_BASELINE.md).
set -euo pipefail
UA="EkklesiaNexus-Phase13-Live/1.0"
TS="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "# Live verification capture — ${TS}"
echo ""
bash "$(dirname "$0")/check-production-seo-baseline.sh"
echo ""
echo "## Metadata snapshot (SSR HTML)"
for url in \
  "https://ekklesianexus.com/" \
  "https://ekklesianexus.com/pt-br" \
  "https://ekklesianexus.com/features" \
  "https://ekklesianexus.com/contact"; do
  body=$(curl -sS -A "$UA" -L "$url")
  title=$(echo "$body" | grep -oP '<title[^>]*>\K[^<]+' | head -1)
  canon=$(echo "$body" | grep -oP 'rel="canonical" href="\K[^"]+' | head -1)
  lang=$(echo "$body" | grep -oP '<html[^>]*lang="\K[^"]+' | head -1)
  echo "- \`$url\` | lang=$lang | title=$title | canonical=$canon"
done
