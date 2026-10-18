# Phase 0–14 — Requirement traceability matrix

**Legend:** VER = verified | PART = partial | DOC = documented only | FAIL = failed verification | BLOCK = blocked | N/A = not applicable

| Req ID | Phase | Requirement | Implementation | Tests / validation | Live (2026-10-18) | Disposition |
|--------|-------|-------------|----------------|-------------------|-------------------|-------------|
| R0-01 | 0 | No attendance/import/Reconciliation cert claims | `validate-content`, `seo-prohibited`, `feature-slugs` | `validate:content` | Not fully re-checked per page | **VER** |
| R0-02 | 0 | Feature truth from FEATURE_VERIFICATION | `docs/FEATURE_VERIFICATION.md` | Manual | N/A | **VER** |
| R1-01 | 1 | `/` and `/pt-br` only localized homes | `layout.tsx`, `localized-metadata.ts` | `phase1-seo-contract` | 200 indexable | **VER** |
| R1-02 | 1 | Unauthorized prod host → noindex 404 | `proxy.ts`, `marketing-request-host.ts` | `marketing-request-host.test` | Leak hosts **200** marketing | **PART** |
| R1-03 | 1 | GSC HTML file in artifact | `public/google161c1efd34d8a358.html` | phase8, phase12, audit contract | **404** | **FAIL** |
| R2-01 | 2 | No `/es` locale | `locale.ts` | `locale.test`, phase8 | No `/es` in sitemap | **VER** |
| R2-02 | 2 | Language switcher paths | `locale.ts` `publicPagePath` | Playwright i18n | Not re-run live | **VER** (repo) |
| R3-01 | 3 | Apex canonical HTTPS | `site.ts`, redirects in proxy | smoke scripts | Apex 200, canon OK | **VER** |
| R3-02 | 3 | Apache example catch-all | `deploy/apache-ekklesianexus.conf.example` | N/A | Not applied | **BLOCK** |
| R4-01 | 4 | EN home SEO without 360° | `en-US.json`, `site.ts` | audit contract | Live desc has **360°** | **PART** |
| R5-06 | 5–6 | English feature/solution copy | content modules, messages | `validate:content` | Features title OK on live | **VER** repo |
| R7-01 | 7 | Lab perf baseline | `docs/performance/PHASE_7_*` | `lighthouse-seo.sh` optional | Field CWV **UNAVAILABLE** | **DOC** |
| R8-01 | 8 | Sitemap 13 URLs apex HTTPS | `localized-metadata.ts` | phase8, audit contract | loc_count=13 | **VER** |
| R8-02 | 8 | robots disallow `/api/` | `robots.ts` | phase8 | 200 Allow / | **VER** |
| R8-03 | 8 | JSON-LD no Offer/Rating | `seo-metadata.ts` | phase12 | Not re-parsed live | **VER** repo |
| R9-01 | 9 | EN footer Catholic parishes link | `footer.tsx` | phase9 | Not checked live | **VER** repo |
| R10-01 | 10 | Off-page governance only | Phase 10 docs | N/A | N/A | **DOC** |
| R11-01 | 11 | hreflang on home + legal | `localized-metadata`, `legal-metadata` | phase11 | Live home hreflang not re-audited line-by-line | **VER** repo |
| R11-02 | 11 | pt-BR SEO desc aligned | `pt-BR.json` | audit contract | Live pt-br title OK; desc drift likely | **PART** |
| R12-01 | 12 | Release gate tests | `phase12-release-gate` | `test:unit` | Production NOT READY | **FAIL** live |
| R13-01 | 13 | Live verification procedure | `record-phase13/0-14` scripts | Operator | Executed this audit | **VER** procedure |
| R14-01 | 14 | Monitoring docs + UNAVAILABLE metrics | `PHASE_14_*` | phase14 contract | GSC metrics N/A | **VER** process |
| R-D-01 | D | DB-driven pricing unchanged | `src/lib/pricing/*` | pricing unit tests | Not country-tested live | **VER** repo |
| R-F-01 | F | No secrets in client bundle | `secrets.test`, scan script | `test:unit` | Not re-run scan | **VER** repo |
| R-I-01 | I | CI runs unit + build | `.github/workflows/ci.yml` web-quality | CI config | Playwright **not** in CI | **PART** |
| R-ES | — | Spanish locale | `ES_LOCALE_IMPLEMENTATION_SPEC.md` gated | N/A | Not implemented | **N/A** |
