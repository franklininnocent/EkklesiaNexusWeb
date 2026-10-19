#!/usr/bin/env bash
# Operator: run AFTER deploy and Apache changes. Records HTTP evidence for PHASE_3_PREFLIGHT.md.
# Does not modify production. Read-only GETs.
set -euo pipefail

TS="$(date -u +"%Y-%m-%d %H:%M UTC")"
GSC_URL="https://ekklesianexus.com/google161c1efd34d8a358.html"
GSC_EXPECTED="google-site-verification: google161c1efd34d8a358.html"

echo "# Production gate recheck — ${TS}"
echo ""
echo "| URL | HTTP | Final URL | Notes |"
echo "|-----|------|-----------|-------|"

check() {
  local label="$1"
  local url="$2"
  local extra="${3:-}"
  local code final body
  if [ -n "$extra" ]; then
    code=$(curl -sS -k -o /tmp/gate-body.txt -w "%{http_code}" -L --max-redirs 10 "$url" 2>/dev/null || echo ERR)
    final=$(curl -sS -k -o /dev/null -w "%{url_effective}" -L --max-redirs 10 "$url" 2>/dev/null || echo "$url")
  else
    code=$(curl -sS -o /tmp/gate-body.txt -w "%{http_code}" -L --max-redirs 10 "$url" 2>/dev/null || echo ERR)
    final=$(curl -sS -o /dev/null -w "%{url_effective}" -L --max-redirs 10 "$url" 2>/dev/null || echo "$url")
  fi
  body="$(head -c 500 /tmp/gate-body.txt 2>/dev/null || true)"
  local note=""
  if echo "$body" | grep -q "EkklesiaNexus\|__variable_d1912b"; then
    note="marketing HTML"
  fi
  if [ "$url" = "$GSC_URL" ] && [ "$code" = "200" ]; then
    if grep -qF "$GSC_EXPECTED" /tmp/gate-body.txt 2>/dev/null; then
      note="GSC body OK"
    else
      note="200 but body mismatch"
    fi
  fi
  if [ "$code" = "404" ] && [ "$url" = "$GSC_URL" ]; then
    note="GSC file missing"
  fi
  echo "| \`$url\` | $code | $final | $note |"
}

check "ip" "http://139.59.18.151/"
check "ip" "https://139.59.18.151/" "-k"
check "gsc" "$GSC_URL"
check "home" "https://ekklesianexus.com/"
check "pt" "https://ekklesianexus.com/pt-br"

echo ""
echo "Paste this table into docs/PHASE_3_PREFLIGHT.md and set PASS/FAIL per gate rules."
