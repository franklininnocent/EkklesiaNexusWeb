#!/usr/bin/env bash
# Phase 8 baseline: fail if marketing site exposes Laravel URL or DB clients to the browser.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail=0

if rg -q 'NEXT_PUBLIC_LARAVEL' src .env.example env.example 2>/dev/null; then
  echo "ERROR: NEXT_PUBLIC_LARAVEL* must not exist (server-only LARAVEL_API_URL)."
  fail=1
fi

if rg -q '@prisma/client' src 2>/dev/null; then
  echo "ERROR: Next.js must not import Prisma."
  fail=1
fi

if rg -q "from 'pg'" src 2>/dev/null || rg -q 'from "pg"' src 2>/dev/null; then
  echo "ERROR: Next.js must not import pg."
  fail=1
fi

if rg -q 'console\.(log|debug|info)' src/app/api 2>/dev/null; then
  echo "ERROR: Do not log in marketing API routes."
  fail=1
fi

if [ "$fail" -ne 0 ]; then
  exit 1
fi

echo "Marketing security scan passed."
