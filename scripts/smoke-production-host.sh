#!/usr/bin/env bash
# Smoke robots/sitemap policy when NEXT_PUBLIC_SITE_URL is the official marketing domain.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://ekklesianexus.com}"
OFFICIAL="https://ekklesianexus.com"

if [ "$NEXT_PUBLIC_SITE_URL" != "$OFFICIAL" ]; then
  echo "ERROR: NEXT_PUBLIC_SITE_URL must be $OFFICIAL for this smoke (got $NEXT_PUBLIC_SITE_URL)"
  exit 1
fi

echo "== Build with production marketing host =="
NEXT_PUBLIC_SITE_URL="$OFFICIAL" npm run build

PORT="${SMOKE_PORT:-3098}"
BASE="http://127.0.0.1:${PORT}"
STARTED_SERVER=0
SERVER_PID=""

cleanup() {
  if [ "$STARTED_SERVER" -eq 1 ] && [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

if curl -sf -o /dev/null "$BASE/" 2>/dev/null; then
  echo "Reusing server on $BASE"
else
  echo "Starting next start on $PORT with production SITE_URL..."
  NEXT_PUBLIC_SITE_URL="$OFFICIAL" npx next start -p "$PORT" >/tmp/ekklesianexus-web-smoke-prod-host.log 2>&1 &
  SERVER_PID=$!
  STARTED_SERVER=1
  for i in $(seq 1 60); do
    curl -sf -o /dev/null "$BASE/" && break
    sleep 0.5
  done
fi

fail=0
robots=$(curl -sf "$BASE/robots.txt")
echo "$robots"

if ! echo "$robots" | grep -Eqi 'allow:\s*/'; then
  echo "FAIL robots.txt should allow / on official marketing host"
  fail=1
fi

if ! echo "$robots" | grep -q "/api/"; then
  echo "FAIL robots.txt should disallow /api/"
  fail=1
fi

if ! echo "$robots" | grep -q "/preview/"; then
  echo "FAIL robots.txt should disallow /preview/"
  fail=1
fi

if ! echo "$robots" | grep -Eqi 'sitemap:'; then
  echo "FAIL robots.txt missing sitemap reference"
  fail=1
fi

sitemap=$(curl -sf "$BASE/sitemap.xml")
if ! echo "$sitemap" | grep -q "/features"; then
  echo "FAIL sitemap.xml missing /features on production host"
  fail=1
fi

if [ "$fail" -ne 0 ]; then
  exit 1
fi

echo "OK   production-host robots and sitemap policy"
