#!/usr/bin/env bash
# Phase 9: HTTP smoke tests against a running Next.js production server (next start).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Use a dedicated port so we don't hit `next dev` (security headers differ).
PORT="${SMOKE_PORT:-3099}"
BASE="${SMOKE_BASE_URL:-http://127.0.0.1:${PORT}}"
STARTED_SERVER=0
SERVER_PID=""

cleanup() {
  if [ "$STARTED_SERVER" -eq 1 ] && [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

wait_for_server() {
  local i=0
  while [ "$i" -lt 60 ]; do
    if curl -sf -o /dev/null "$BASE/"; then
      return 0
    fi
    sleep 0.5
    i=$((i + 1))
  done
  echo "ERROR: Server did not respond at $BASE within 30s"
  return 1
}

if [ -z "${SMOKE_BASE_URL:-}" ]; then
  if [ ! -d "$ROOT/.next" ]; then
    echo "ERROR: No .next build. Run npm run build first."
    exit 1
  fi
  if curl -sf -o /dev/null "$BASE/" 2>/dev/null; then
    echo "Port $PORT already in use; reusing existing server at $BASE"
  else
    echo "Starting next start on port $PORT..."
    npx next start -p "$PORT" >/tmp/ekklesiasoft-web-smoke.log 2>&1 &
    SERVER_PID=$!
    STARTED_SERVER=1
    wait_for_server
  fi
else
  wait_for_server
fi

fail=0

check_status() {
  local path="$1"
  local expected="$2"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
  if [ "$code" != "$expected" ]; then
    echo "FAIL $path expected HTTP $expected got $code"
    fail=1
  else
    echo "OK   $path → $code"
  fi
}

check_body_contains() {
  local path="$1"
  local needle="$2"
  local body
  body=$(curl -sf "$BASE$path")
  if ! echo "$body" | grep -qF "$needle"; then
    echo "FAIL $path body missing: $needle"
    fail=1
  else
    echo "OK   $path contains expected snippet"
  fi
}

check_header() {
  local path="$1"
  local header="$2"
  local value
  value=$(curl -sI "$BASE$path" | tr -d '\r' | grep -i "^${header}:" | head -1 | sed 's/^[^:]*: *//')
  if [ -z "$value" ]; then
    echo "FAIL $path missing header $header"
    fail=1
  else
    echo "OK   $path $header present"
  fi
}

echo "== Smoke: static routes ($BASE) =="
check_status "/" "200"
check_status "/privacy" "200"
check_status "/terms" "200"
check_status "/robots.txt" "200"
check_status "/sitemap.xml" "200"
check_status "/images/og/og-preview.png" "200"

echo "== Smoke: homepage content =="
check_body_contains "/" "The Next Generation of Church Management System"
check_body_contains "/" "id=\"contact\""

echo "== Smoke: security headers =="
check_header "/" "X-Content-Type-Options"
check_header "/" "Content-Security-Policy"

echo "== Smoke: BFF validation =="
code=$(curl -s -o /tmp/smoke-demo.json -w "%{http_code}" \
  -X POST "$BASE/api/demo-requests" \
  -H "Content-Type: application/json" \
  -d '{}')
if [ "$code" != "422" ]; then
  echo "FAIL POST /api/demo-requests empty body expected 422 got $code"
  fail=1
else
  echo "OK   POST /api/demo-requests empty → 422"
fi

code=$(curl -s -o /tmp/smoke-honeypot.json -w "%{http_code}" \
  -X POST "$BASE/api/demo-requests" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","church_parish":"Parish","country":"India","email":"t@example.com","role":"Priest","message":"Hello","company_website":"http://spam.test"}')
if [ "$code" != "422" ]; then
  echo "FAIL honeypot expected 422 got $code"
  fail=1
else
  echo "OK   POST /api/demo-requests honeypot → 422"
fi

if [ "$fail" -ne 0 ]; then
  echo ""
  echo "Smoke tests failed."
  exit 1
fi

echo ""
echo "Smoke tests passed. Complete docs/MANUAL_QA_CHECKLIST.md for responsive + Laravel-backed form success."
