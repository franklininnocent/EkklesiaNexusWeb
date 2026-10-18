# Phase 14 — Google Search Console monitoring workflow

**Property access:** **UNAVAILABLE** in engineering (Phase 13).  
**Verification:** **BLOCKED** — `https://ekklesianexus.com/google161c1efd34d8a358.html` returned **404** on 2026-10-18.

## Property alignment (when verified)

| URL | Should be covered by |
|-----|---------------------|
| `https://ekklesianexus.com/` | Domain property `ekklesianexus.com` **or** URL-prefix `https://ekklesianexus.com/` |
| `/pt-br` | Same property (domain preferred) |
| www | Redirects to apex — domain property includes subdomains |

Do not create duplicate properties without owner approval.

## Monthly cadence (operator)

| Step | Action | Record |
|------|--------|--------|
| 1 | Performance → last **28 days** vs previous **28 days** | Impressions, clicks, CTR, position |
| 2 | Queries → filter branded (`ekklesia`) vs non-branded | Top 20 each |
| 3 | Pages → landing URLs | Map to `/`, `/features/*`, Catholic page |
| 4 | Indexing → Pages | Critical exclusions only |
| 5 | Sitemaps | Last read, errors |
| 6 | URL Inspection | `/`, `/pt-br` after each deploy |
| 7 | Links → external (sample) | Compare to [PHASE_14_OFF_PAGE_MONITORING_REGISTER.md](PHASE_14_OFF_PAGE_MONITORING_REGISTER.md) |
| 8 | Export CSV optional | Store off-repo per privacy policy |

## Interpretation (mandatory)

- CTR drops may reflect query mix, not snippet failure alone.
- Position is averaged; low impressions → unstable CTR.
- Clicks ≠ GA4 sessions.
- Request indexing only after fixing blockers.

Full procedures: [GOOGLE_SEARCH_CONSOLE_RUNBOOK.md](GOOGLE_SEARCH_CONSOLE_RUNBOOK.md), [PHASE_13_SEARCH_CONSOLE_VERIFICATION_AND_OPERATOR_RUNBOOK.md](PHASE_13_SEARCH_CONSOLE_VERIFICATION_AND_OPERATOR_RUNBOOK.md).
