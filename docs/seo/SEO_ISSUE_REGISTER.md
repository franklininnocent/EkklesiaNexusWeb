# SEO issue register

**Authoritative register** for SEO monitoring. Update weekly/monthly as findings occur. Procedure: [SEO_MONITORING_OPERATING_PROCEDURE.md](SEO_MONITORING_OPERATING_PROCEDURE.md).

### Status glossary

`OPEN` | `INVESTIGATING` | `PLANNED` | `IN PROGRESS` | `BLOCKED` | `FIXED — AWAITING VERIFICATION` | `VERIFIED — CLOSED` | `ACCEPTED RISK` | `NOT REPRODUCIBLE`

Close only with verification evidence (script output, GSC date, or test). Map legacy rows to `SEO-AUDIT-*` in [PHASE_0_14_FINDINGS_REGISTER.md](PHASE_0_14_FINDINGS_REGISTER.md) when adding detail.

Update when discovering or resolving issues. Link evidence (GSC screenshots, curl output, commit).

| ID | Discovered | URL / component | Description | Evidence | Impact | Severity | Priority | Fix | Approval | Status | Verified |
|----|------------|-----------------|-------------|----------|--------|----------|----------|-----|----------|--------|----------|
| SEO-001 | 2026-10-18 | `google161c1efd34d8a358.html` | GSC verification file **404** on production; present in repo `public/` | Phase 8 + **Phase 12** curl 404 | Cannot verify GSC; weak ownership signals | P0 | P0 | Authorized marketing deploy | Operator | **Open** | — |
| SEO-002 | 2026-10-18 | `the unauthorized hostname` | Non-canonical host serves indexable marketing HTML | **Phase 12** GET 200 + canonical to apex | Duplicate indexing / wrong-host attribution | P0 | P0 | Apache catch-all per Phase 3B | Operator | **Open** | — |
| SEO-003 | 2026-10-18 | `http://139.59.18.151/` | Raw IP serves marketing HTML | **Phase 12** GET 200 | Same as SEO-002 | P0 | P0 | Apache + deploy host guard | Operator | **Open** | — |
| SEO-004 | 2026-10-18 | GSC Performance | No GSC access in engineering environment | N/A | No query/click baseline | — | P1 | Operator grants read-only GSC access | Business | **Open** | — |
| SEO-005 | 2026-10-18 | Production content | Phase 4–7 repo improvements may not be deployed | Prior GET old home title | Stale metadata/perf fixes | P1 | P1 | Deploy approved artifact | Operator | **Open** | — |
| SEO-006 | 2026-10-18 | Analytics | GA4 production load not verified | Repo-only review | Conversion reporting gap | P2 | P2 | Confirm `NEXT_PUBLIC_ANALYTICS_ENABLED` + measurement ID in prod | Operator | **Open** | — |

**Phase 0–14 audit (2026-10-18):** Consolidated register with evidence and disposition — [PHASE_0_14_FINDINGS_REGISTER.md](PHASE_0_14_FINDINGS_REGISTER.md) (`SEO-AUDIT-001` … `012`). Legacy SEO-001–006 remain authoritative IDs; map 001→AUDIT-001, 002/003→AUDIT-002/003, 004→AUDIT-005, 005→AUDIT-007, 006→AUDIT-006.

**Resolved issues:**

| ID | Resolved | Notes |
|----|----------|-------|
| SEO-AUDIT-009 | 2026-10-18 | ESLint unused prop — `i18n-provider.tsx` |
| SEO-AUDIT-010 | 2026-10-18 | Added `phase0-14-audit-contract.test.ts` |
