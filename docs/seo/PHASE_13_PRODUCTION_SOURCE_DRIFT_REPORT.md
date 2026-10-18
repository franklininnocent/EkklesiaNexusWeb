# Phase 13 — Production vs source drift

**Compared:** Live HTML (2026-10-18T04:59:06Z) vs local `EkklesiaNexusWeb` working tree @ `323a869` + uncommitted SEO phases.

**Deployed commit on server:** **Unknown** (no production build label exposed).

| Area | Production (live) | Repository (local) | Classification |
|------|-------------------|--------------------|----------------|
| Home `<title>` | Next-Generation Church Management System | The Next Generation **of** Church Management System | **Deployment mismatch** |
| Home meta description | "complete 360° Church Management System" | Parish teams / no 360° (`site.ts`, en `seo.homeDescription`) | **Deployment mismatch** |
| `/pt-br` meta description | 360° paroquial copy | Phase 11 aligned pt `seo.homeDescription` | **Deployment mismatch** |
| `/contact` meta description | "Reach the EkklesiaNexus team…" (pre-Phase 9) | Catholic parish / evaluation wording | **Undeployed** Phase 9 |
| `/features`, `/about`, Catholic solution | Match current static metadata | Same | **Aligned** (or partial deploy) |
| GSC verification file | 404 | `public/google161c1efd34d8a358.html` | **Deploy gap** |
| Footer "Catholic parishes" link | **Not verified** in Phase 13 HTML parse | Phase 9 footer | **Likely undeployed** |
| Legal hreflang | **Not verified** live | Phase 11 `legal-metadata.ts` | **Likely undeployed** |
| Host guard on leak hosts | Still serves marketing | `marketing-request-host` + proxy in repo | **Infra + deploy** |

## Cause summary

Primary: **marketing release not updated** to current SEO branch artifact. Secondary: **Apache** catch-all for alien Host headers.

## Action

Authorized deploy of current build + Phase 3B Apache — not executed in Phase 13.
