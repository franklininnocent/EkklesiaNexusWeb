#!/usr/bin/env bash
# Phase 8 — Read-only production SEO baseline (operator/CI with network).
# Canonical weekly monitor: npm run monitor:weekly:production (structured exit codes).
# This script remains for backward-compatible markdown tables.
set -euo pipefail

TS="$(date -u +"%Y-%m-%d %H:%M UTC")"
GSC_URL="https://ekklesianexus.com/google161c1efd34d8a358.html"
GSC_EXPECTED="google-site-verification: google161c1efd34d8a358.html"

echo "# Production SEO baseline — ${TS}"
echo ""
echo "## Core URLs"
echo "| URL | HTTP | Final | Canonical (if HTML) | Robots meta | Notes |"
echo "|-----|------|-------|---------------------|-------------|-------|"

check_html() {
  local url="$1"
  local code final body canon robots note=""
  code=$(curl -sS -o /tmp/p8-body.html -w "%{http_code}" -L --max-redirs 10 "$url" 2>/dev/null || echo ERR)
  final=$(curl -sS -o /dev/null -w "%{url_effective}" -L --max-redirs 10 "$url" 2>/dev/null || echo "$url")
  body="$(head -c 80000 /tmp/p8-body.html 2>/dev/null || true)"
  canon="$(echo "$body" | grep -oP 'rel="canonical" href="\K[^"]+' | head -1 || true)"
  robots="$(echo "$body" | grep -oP 'name="robots" content="\K[^"]+' | head -1 || true)"
  if echo "$body" | grep -q "EkklesiaNexus"; then note="marketing"; fi
  echo "| \`$url\` | $code | $final | ${canon:-—} | ${robots:-—} | $note |"
}

check_html "https://ekklesianexus.com/"
check_html "https://ekklesianexus.com/pt-br"
check_html "https://ekklesianexus.com/features"
check_html "https://ekklesianexus.com/solutions/catholic-parishes"
check_html "https://ekklesianexus.com/contact"

echo ""
echo "## robots.txt and sitemap"
code=$(curl -sS -o /tmp/p8-robots.txt -w "%{http_code}" "https://ekklesianexus.com/robots.txt")
echo "| robots.txt | $code | $(head -3 /tmp/p8-robots.txt | tr '\n' ' ') |"
code=$(curl -sS -o /tmp/p8-sitemap.xml -w "%{http_code}" "https://ekklesianexus.com/sitemap.xml")
loc_count=$(grep -c "<loc>" /tmp/p8-sitemap.xml 2>/dev/null || echo 0)
locs=$(grep -oP '(?<=<loc>)[^<]+' /tmp/p8-sitemap.xml 2>/dev/null || true)
bad=$(printf '%s\n' "$locs" | grep -E '/es|localhost|127\.0\.0\.1|/api/|/preview/|139\.59' || true)
offhost=$(printf '%s\n' "$locs" | grep -Ev '^https://ekklesianexus.com(/|$)' || true)
bad=$(printf '%s\n%s\n' "$bad" "$offhost" | sed '/^$/d' | paste -sd ' ' - || true)
echo "| sitemap.xml | $code | loc_count=$loc_count bad_urls=${bad:-none} |"

echo ""
echo "## GSC verification file"
code=$(curl -sS -o /tmp/p8-gsc.html -w "%{http_code}" "$GSC_URL" 2>/dev/null || echo ERR)
if [ "$code" = "200" ] && grep -qF "$GSC_EXPECTED" /tmp/p8-gsc.html 2>/dev/null; then
  echo "| GSC file | 200 | body OK |"
else
  echo "| GSC file | $code | FAIL — deploy public/google161c1efd34d8a358.html |"
fi

echo ""
echo "## Hostname isolation (raw IP must not serve marketing)"
for url in "http://139.59.18.151/"; do
  code=$(curl -sS -o /tmp/p8-leak.html -w "%{http_code}" -L "$url" 2>/dev/null || echo ERR)
  if echo "$(head -c 2000 /tmp/p8-leak.html)" | grep -q "EkklesiaNexus"; then
    echo "| \`$url\` | $code | **FAIL** — marketing HTML on non-canonical host |"
  else
    echo "| \`$url\` | $code | PASS — not marketing leak |"
  fi
done

echo ""
echo "GSC UI verification and indexing status require Search Console access — not proven by this script."
