# Phase 8 — Automated SEO checks

## Level A — Local / CI (no network)

| Command | Purpose | Expected |
|---------|---------|----------|
| `npm run validate:content` | Marketing copy + SEO validators | Exit 0 |
| `npm run validate:i18n` | Locale key parity | Exit 0 |
| `npm run test:unit` | Includes `phase1-seo-contract`, `phase8-seo-measurement`, `seo-metadata`, GSC file in `public/` | Exit 0 |
| `npm run typecheck` | TypeScript | Exit 0 |
| `npm run lint` | ESLint | Exit 0 |
| `npm run build` | Production build | Exit 0 |
| `npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome` | Routes, metadata smoke, CTAs | All pass |

### `phase8-seo-measurement.test.ts` covers

- `SUPPORTED_LOCALES` = `en-US`, `pt-BR` only
- Sitemap entries: apex HTTPS only; no `/es`, `/api/`, `/preview/`, legal pages
- JSON-LD graph types and Organization URL
- GA4 event name allowlist (mapping only)
- GSC file present in `public/`
- `robots.ts` references sitemap and disallows `/api/`

---

## Level B — Production read-only (operator, network)

| Command | Purpose |
|---------|---------|
| `bash scripts/check-production-seo-baseline.sh` | HTML canonicals, robots, sitemap, GSC file, hostname leak |
| `bash scripts/record-production-gates.sh` | Phase 3B gate table (subset overlap) |

**Not run in CI by default** — avoids flaky network and does not prove GSC indexing.

---

## Level C — Google Search Console

Manual — see [GOOGLE_SEARCH_CONSOLE_RUNBOOK.md](GOOGLE_SEARCH_CONSOLE_RUNBOOK.md).

---

## CI integration

`test:unit` is suitable for pre-merge gates. Optional: add `npm run build` to CI if not already present.

Do **not** add Lighthouse to CI without stable Chrome infrastructure (Phase 7 used local `next start`).

---

## Troubleshooting

| Symptom | Check |
|---------|--------|
| Sitemap test fails | `indexableLocalizedSitemapEntries` in `localized-metadata.ts` |
| GSC file test fails | `public/google161c1efd34d8a358.html` missing from branch |
| Production GSC 404 | Deploy artifact; not fixed by tests alone |
| the unauthorized host 200 marketing | Apache host guard — not application-only |
