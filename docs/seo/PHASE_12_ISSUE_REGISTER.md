# Phase 12 — SEO release issue register

Consolidates defects found during release readiness (2026-10-18 UTC). See linked workstream docs for detail.

| ID | Sev | Finding | Evidence | Fix owner | Status |
|----|-----|---------|----------|-----------|--------|
| SEO-001 | **P0** | GSC verification file 404 on production | `curl` 404; file in `public/` locally | Deploy + operator | **Open** |
| SEO-002 | **P0** | `dwm.matchpointgps.in` serves marketing HTML | Phase 12 `curl` HTTP 200, canon apex | Apache Phase 3B | **Open** |
| SEO-003 | **P0** | Raw IP `139.59.18.151` serves marketing HTML | Phase 12 `curl` HTTP 200 | Apache + host guard deploy | **Open** |
| P12-004 | **P1** | SEO Phases 4–11 changes not on production | Git dirty vs prod GSC 404 | Authorized deploy | **Open** |
| SEO-004 | P1 | No GSC access in engineering | N/A | Business | **Open** |
| SEO-005 | P1 | Stale production marketing copy | Historical GET | Deploy | **Open** |
| P12-006 | P2 | pt-BR native marketing review pending | Phase 11 report | Native reviewer | **Open** |
| SEO-006 | P2 | GA4 on production unverified | Config review only | Operator | **Open** |
| P12-007 | P3 | ESLint warning `_serverMessages` unused | `npm run lint` | Dev cleanup (optional) | **Open** |

**Release blocker:** Any **P0** open → **NOT READY** for production SEO release.

Legacy register: [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md) (sync IDs SEO-001–006).
