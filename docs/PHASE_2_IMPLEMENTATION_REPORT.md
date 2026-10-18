# Phase 2A implementation report

**Date:** 18 Oct 2026  
**Scope:** Production identity hardening (repo) + international readiness documentation. **No production deploy.**

---

## Summary

Phase 2A implemented Host-authoritative marketing host resolution so unauthorized public `Host` values cannot be laundered via `X-Forwarded-Host`, updated Apache example comments, aligned Playwright footer expectations with live `MockupFooter`, and added preflight/prioritization documentation. **Production duplicate-host leak and GSC file 404 remain open** until operator deploy and Apache work (re-GET after this cycle unchanged).

---

## Files changed

| File | Change |
|------|--------|
| `src/lib/marketing/marketing-request-host.ts` | `effectiveMarketingHostFromHeaders`, `effectiveMarketingRequestHost`, `isLoopbackMarketingHost`, IPv6-safe `normalizeHostHeader`; `parseMarketingRequestHost` delegates to effective host |
| `src/proxy.ts` | Uses `effectiveMarketingRequestHost` for allowlist and redirects |
| `scripts/marketing-request-host.test.ts` | Host vs XFH conflict cases, `www` + XFH, loopback + Matchpoint XFH |
| `docs/deploy/apache-ekklesianexus.conf.example` | Catch-all must not proxy; XFH-to-apex only on named apex vhost; `ProxyPreserveHost` note |
| `e2e/seo-public-pages.spec.ts` | Footer test: brand + copyright (no `/features` href requirement) |
| `docs/PHASE_2_PREFLIGHT_AND_GAP_ASSESSMENT.md` | **New** — baseline GET, gaps, operator checklist |
| `docs/INTERNATIONAL_SEO_PRIORITIZATION_MATRIX.md` | **New** — ten markets, `/es` brief, no volumes |
| `docs/INTERNATIONAL_SEO_ARCHITECTURE.md` | Host guard + future `/es` `/it` `/fr` convention |
| `docs/PHASE_2_INTERNATIONAL_SEO_ROADMAP.md` | Phase 2A vs 2B/3 split |

**Not changed:** `SUPPORTED_LOCALES` (still 2), `/` and `/pt-br` paths, pricing/API/auth, footer IA links, homepage frozen blocks, new locale routes.

---

## Verification (this run)

| Command | Result |
|---------|--------|
| `npm run test:unit` | **Pass** (includes `marketing-request-host.test.ts`, `phase1-seo-contract.test.ts`) |
| `npm run build` | **Pass** |
| `npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome` | **18 passed** |

---

## Production re-GET (after repo changes, no deploy)

| URL | HTTP |
|-----|------|
| `http://dwm.matchpointgps.in/` | **200** (marketing HTML — **leak still open**) |
| `http://139.59.18.151/` | **200** (marketing HTML — **leak still open**) |
| `https://ekklesianexus.com/google161c1efd34d8a358.html` | **404** (**GSC not live**) |

**Not claimed:** production host isolation complete, GSC verified, Google SERP fixed.

---

## Rollback

Revert Phase 2A commits in `EkklesiaNexusWeb`. Do not restore a Matchpoint → EkklesiaNexus redirect. Apache: restore operator `*.bak` after `configtest` if vhosts were changed separately.

---

## Operator next steps

See [PHASE_2_PREFLIGHT_AND_GAP_ASSESSMENT.md](PHASE_2_PREFLIGHT_AND_GAP_ASSESSMENT.md) and [SEO_OPERATOR_RUNBOOK.md](SEO_OPERATOR_RUNBOOK.md).
