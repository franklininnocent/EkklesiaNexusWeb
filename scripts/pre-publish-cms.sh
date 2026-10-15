#!/usr/bin/env bash
# Export + validate marketing JSON before Super Admin CMS publish.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run export:content
npm run validate:export
echo "Ready for Settings → Marketing website → Save draft or Publish."
