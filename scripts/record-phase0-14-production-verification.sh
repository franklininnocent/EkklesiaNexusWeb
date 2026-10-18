#!/usr/bin/env bash
# Phase 0–14 — Read-only production verification (operator). Wraps Phase 13 capture.
set -euo pipefail
DIR="$(dirname "$0")"
echo "# Phase 0–14 production verification capture"
echo ""
bash "$DIR/record-phase13-live-verification.sh"
