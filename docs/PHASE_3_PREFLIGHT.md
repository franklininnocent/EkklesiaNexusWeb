# Phase 3 preflight — production gates and `/es` readiness

**Last updated:** 18 Oct 2026 04:37 UTC (Phase 4 English technical SEO production recheck; deploy not applied)  
**Release decision:** **BLOCKED** — do not publish `/es`. See [PHASE_4_RELEASE_DECISION.md](PHASE_4_RELEASE_DECISION.md).

Related: [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](PHASE_3B_PRODUCTION_GATE_REMEDIATION.md), [PHASE_2_PREFLIGHT_AND_GAP_ASSESSMENT.md](PHASE_2_PREFLIGHT_AND_GAP_ASSESSMENT.md), [ES_LOCALE_IMPLEMENTATION_SPEC.md](ES_LOCALE_IMPLEMENTATION_SPEC.md), [GOOGLE_DOMAIN_ATTRIBUTION_INCIDENT_REPORT.md](GOOGLE_DOMAIN_ATTRIBUTION_INCIDENT_REPORT.md).

---

## Git (Fact (repo))

`EkklesiaNexusWeb` branch `price-implementation-web`. Phase 1/2A/3A SEO work present; unrelated changes not discarded.

---

## Production GET — Phase 4 (Fact (production GET), 2026-10-18 04:33 UTC)

| Label | URL | HTTP | Final URL / notes | Marketing HTML |
|-------|-----|------|-------------------|----------------|
| Official home HTTPS | `https://ekklesianexus.com/` | **200** | canonical `https://ekklesianexus.com` | yes (expected) |
| Official home HTTP | `http://ekklesianexus.com/` | **200** | final `https://ekklesianexus.com/` | yes (expected) |
| www HTTPS | `https://www.ekklesianexus.com/` | **200** | final `https://ekklesianexus.com/` (apex) | yes (expected) |
| Portuguese home | `https://ekklesianexus.com/pt-br` | **200** | canonical `https://ekklesianexus.com/pt-br` | yes (expected) |
| GSC file | `https://ekklesianexus.com/google161c1efd34d8a358.html` | **404** | — | **FAIL** |
| Unauthorized-host HTTP | `the unauthorized hostname` | **200** | canonical → `https://ekklesianexus.com` | **FAIL** (leak) |
| Unauthorized-host HTTPS (verify-peer) | `the unauthorized hostname` | TLS error | hostname mismatch | not marketing over valid TLS |
| Unauthorized-host HTTPS (insecure) | `the unauthorized hostname` | **200** | canonical → official home | **FAIL** (leak) |
| Raw IP HTTP | `http://139.59.18.151/` | **200** | canonical → official home | **FAIL** (leak) |
| Raw IP HTTPS | `https://139.59.18.151/` | **200** | canonical → official home | **FAIL** (leak) |

Parish app / API: unchanged from Phase 3B (`app.ekklesianexus.com` noindex; `api.ekklesianexus.com/up` **200**).

---

## Mandatory release gates — Phase 4 (A–G)

| Gate | Requirement | Status | Evidence | Verified (UTC) | Outstanding action |
|------|-------------|--------|----------|----------------|-------------------|
| **A** | Explicit operator authorization (deploy, Apache, GSC, `/es`) | **FAIL** | [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](PHASE_3B_PRODUCTION_GATE_REMEDIATION.md) §1 — all **No** | 2026-10-18 04:33 | Operator signs authorization log |
| **B** | Hostname isolation (the unauthorized host, raw IP ≠ indexable marketing) | **FAIL** | GET **200** marketing on Unauthorized-host HTTP, Unauthorized-host HTTPS-insecure, raw IP HTTP/HTTPS | 2026-10-18 04:33 | Deploy + Apache catch-all; `record-production-gates.sh` |
| **C** | HTTPS + canonical (`https://ekklesianexus.com`; www policy; canonical tags) | **PASS** | Official + `/pt-br` canonicals correct; www → apex; HTTP → HTTPS apex | 2026-10-18 04:33 | Re-check after B fix (leak hosts) |
| **D** | Google Search Console (file **200** + UI verified) | **FAIL** / **BLOCKED** | File URL **404** on production; repo file OK locally; no GSC UI evidence | 2026-10-18 04:33 | Deploy file; operator verifies in GSC |
| **E** | `/`, `/pt-br`, `SUPPORTED_LOCALES` integrity | **PASS** | Production GET; repo `en-US` + `pt-BR` only; no `/es` | 2026-10-18 04:33 | None until Spanish authorized |
| **F** | Native Spanish + product-owner content approval | **FAIL** | Spec draft only | 2026-10-18 04:33 | Approval table in [ES_LOCALE_IMPLEMENTATION_SPEC.md](ES_LOCALE_IMPLEMENTATION_SPEC.md) |
| **G** | Regression and build readiness | **PASS** | `test:unit`, `build`, Playwright chrome **18 passed** | 2026-10-18 04:33 | Re-run after any locale work |

**Gate decision:** **BLOCKED** — no `src/app/es`, no `SUPPORTED_LOCALES` Spanish, no Spanish sitemap/hreflang, no deploy for `/es`.

Legacy tracker (Phase 3B numbering): gates 1=B, 2=C, 3–4=D, 5=E, 6=F, 7=G, 8–9=A.

**Operator after deploy:** run `bash scripts/record-production-gates.sh` and update this file with PASS/FAIL evidence.

---

## Repo vs production

| Item | Status |
|------|--------|
| `effectiveMarketingRequestHost` | **Fact (repo)** — in tree; **Hypothesis** on droplet until deploy |
| GSC file in `public/` | **Fact (repo)** — `scripts/check-gsc-verification-file.sh` |
| `SUPPORTED_LOCALES` | `en-US`, `pt-BR` only |
| `src/app/es` | **Absent** |

---

## Tests (Phase 3B cycle)

| Command | Result |
|---------|--------|
| `npm run test:unit` | **Pass** (includes GSC file check) |
| `npm run build` | **Pass** (no `/es` route) |
| `npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome` | **18 passed** (Phase 4 cycle) — [PHASE_4_RELEASE_DECISION.md](PHASE_4_RELEASE_DECISION.md) |

Do **not** claim host isolation, GSC verification, or SERP correction until independently verified after operator work.
