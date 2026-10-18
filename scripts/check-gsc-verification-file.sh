#!/usr/bin/env bash
# Verify GSC HTML-file token exists in repo (not production).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FILE="$ROOT/public/google161c1efd34d8a358.html"
EXPECTED="google-site-verification: google161c1efd34d8a358.html"

if [ ! -f "$FILE" ]; then
  echo "FAIL missing $FILE"
  exit 1
fi

BODY="$(tr -d '\r' < "$FILE" | head -1)"
if [ "$BODY" != "$EXPECTED" ]; then
  echo "FAIL GSC file content mismatch"
  echo "  got:      $BODY"
  echo "  expected: $EXPECTED"
  exit 1
fi

echo "OK   GSC verification file present in public/ (deploy required for production 200)"
exit 0
