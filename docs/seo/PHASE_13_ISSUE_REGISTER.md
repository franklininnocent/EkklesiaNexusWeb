# Phase 13 — Issue register

| ID | Sev | Finding | Evidence (2026-10-18 UTC) | Fix | Status |
|----|-----|---------|---------------------------|-----|--------|
| P13-001 | **P0** | GSC file 404 | Live GET 404 | Deploy `public/google*.html` | **Open** |
| P13-002 | **P0** | Matchpoint host serves marketing | Live 200 + EkklesiaNexus title | Apache Phase 3B | **Open** |
| P13-003 | **P0** | Raw IP serves marketing | Live 200 | Apache + host guard deploy | **Open** |
| P13-004 | **P1** | Home title/desc drift (360°, old title) | Live vs `site.ts` | Deploy SEO bundle | **Open** |
| P13-005 | **P1** | pt-br SEO desc drift (360°) | Live vs Phase 11 messages | Deploy | **Open** |
| P13-006 | **P1** | Contact meta undeployed | Live vs Phase 9 | Deploy | **Open** |
| P13-007 | **P1** | Unknown production commit | No build stamp | Record SHA at deploy | **Open** |
| P13-008 | **P2** | GSC indexing unknown | No account | Operator verify | **Open** |
| P13-009 | **P2** | Live pricing per-country not tested | Scope | Post-deploy header test | **Open** |
| P13-010 | **P3** | Lighthouse live not run | — | Operator optional | **Open** |

Carry-forward: SEO-001–003 identical to P13-001–003.
