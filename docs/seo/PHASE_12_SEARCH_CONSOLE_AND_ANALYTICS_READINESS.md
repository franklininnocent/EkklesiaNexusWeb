# Phase 12 — Search Console and analytics readiness

## Google Search Console

| Item | Repo | Production (2026-10-18) | Status |
|------|------|-------------------------|--------|
| Verification file | `public/google161c1efd34d8a358.html` | **404** | **NOT READY** |
| Sitemap URL | `https://ekklesianexus.com/sitemap.xml` | 200, 13 URLs | Ready to submit after verify |
| Runbook | [GOOGLE_SEARCH_CONSOLE_RUNBOOK.md](GOOGLE_SEARCH_CONSOLE_RUNBOOK.md) | — | **PASS** (docs) |
| Account access | None in engineering | — | **BLOCKED** |

**Do not** paste verification token contents in tickets.

## Operator checklist (post-deploy)

1. Confirm verification URL returns **200**.
2. Verify domain or URL-prefix property in GSC UI.
3. Submit sitemap once.
4. URL Inspection: `/`, `/pt-br`, `/solutions/catholic-parishes`, `/contact`.
5. Monitor Coverage and Links reports.

## Analytics

- `MarketingAnalytics` + GA4 when env/CMS enabled — **not verified on production** (SEO-006).
- No new tracker added in Phase 12.
