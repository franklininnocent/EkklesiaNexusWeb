# Phase 2A preflight and gap assessment

**Cycle:** Phase 2A — production identity and international readiness  
**Date:** 18 Oct 2026 (Phase 2A baseline GET)  
**Later re-GET:** [PHASE_3_PREFLIGHT.md](PHASE_3_PREFLIGHT.md) (same calendar day; production leak and GSC 404 still failed).  
**Evidence classes:** Fact (repo), Fact (production GET), Hypothesis, Assumption, External

---

## Phase 1 completion status

| Area | Status | Evidence class |
|------|--------|----------------|
| Home hreflang only on `/` and `/pt-br` | **Fact (repo)** | `src/app/layout.tsx`, `phase1-seo-contract.test.ts` |
| Legal noindex without hreflang | **Fact (repo)** | `legal-metadata.ts` |
| Host allowlist in `proxy.ts` | **Fact (repo)** | `marketing-request-host.ts` (Phase 2A extends with Host-authoritative effective host) |
| GSC HTML file in repo | **Fact (repo)** | `public/google161c1efd34d8a358.html` |
| Phase 1 docs | **Fact (repo)** | `SEO_AUDIT_REPORT.md`, `SEO_TECHNICAL_IMPLEMENTATION_REPORT.md`, etc. |
| Production host isolation | **Not done** | **Fact (production GET)** below |
| GSC verification live | **Not done** | **Fact (production GET)** GSC file **404** |
| Google SERP correction | **Not done** | No live search verification in this environment |

Do not treat Phase 1 repository work as production closure. See [GOOGLE_DOMAIN_ATTRIBUTION_INCIDENT_REPORT.md](GOOGLE_DOMAIN_ATTRIBUTION_INCIDENT_REPORT.md) and [SEO_AUDIT_REPORT.md](SEO_AUDIT_REPORT.md).

---

## Git workspace (Fact (repo))

Repository root for marketing: `EkklesiaNexusWeb` on branch `price-implementation-web` tracking `origin/development-web`. Phase 1 SEO files include both committed-tracked and untracked paths; unrelated work was not reverted for Phase 2A.

---

## Baseline GET — this cycle (Fact (production GET))

| Label | URL | HTTP | Final URL | Canonical (if HTML) | Robots (if HTML) | Marketing HTML |
|-------|-----|------|-----------|---------------------|------------------|----------------|
| Official home | `https://ekklesianexus.com/` | 200 | same | `https://ekklesianexus.com` | index, follow | yes |
| Portuguese home | `https://ekklesianexus.com/pt-br` | 200 | same | `https://ekklesianexus.com/pt-br` | index, follow | yes |
| Unauthorized-host HTTP | `the unauthorized hostname` | 200 | same | `https://ekklesianexus.com` | index, follow | yes |
| Unauthorized-host HTTPS (strict TLS) | `the unauthorized hostname` | — | — | — | — | TLS verify failed (cert mismatch) |
| Unauthorized-host HTTPS (insecure) | `the unauthorized hostname` | 200 | same | `https://ekklesianexus.com` | index, follow | yes |
| Raw IP | `http://139.59.18.151/` | 200 | same | `https://ekklesianexus.com` | index, follow | yes |
| GSC file | `https://ekklesianexus.com/google161c1efd34d8a358.html` | **404** | same | — | — | no |

**Freeze URLs:** `/` and `/pt-br` remain **200** with expected canonicals. **Leak and GSC remain open** until operator deploy and Apache work.

---

## Host isolation — repo vs production

### Fact (repo) — prior defect

`parseMarketingRequestHost` preferred `X-Forwarded-Host` over `Host`, so a request with `Host: unrelated.example` and `X-Forwarded-Host: ekklesianexus.com` could be allowlisted.

### Phase 2A fix (Fact (repo) after this cycle)

`effectiveMarketingRequestHost` uses **public `Host`** unless loopback (`localhost`, `127.0.0.1`, `::1`), then first `X-Forwarded-Host`. Used for allowlist, `www` 301, and apex HTTP 301 in `proxy.ts`.

### Hypothesis (not confirmed on droplet)

Production Apache may use a catch-all vhost that proxies to Next.js and/or overwrites `X-Forwarded-Host` to the apex. **`apache2ctl -S` was not run** from this environment.

### Residual leak (documented)

Loopback `Host` + official `X-Forwarded-Host` still allowlists marketing for local reverse-proxy patterns. **Durable production fix:** default vhost **404** without proxying to Next.js per [deploy/apache-ekklesianexus.conf.example](deploy/apache-ekklesianexus.conf.example).

### External — operator checklist

1. Deploy latest `EkklesiaNexusWeb` build; restart Next.js (`NODE_ENV=production`).
2. `GET https://ekklesianexus.com/google161c1efd34d8a358.html` → **200**.
3. On server `139.59.18.151`: `sudo apache2ctl -S`; backup sites; apply catch-all that does **not** proxy; `apache2ctl configtest`; reload only if OK.
4. Re-GET `http://139.59.18.151/` and confirm unknown `Host` values — must **not** be 200 full marketing HTML.
5. GSC: domain property, HTML-file verification, submit `https://ekklesianexus.com/sitemap.xml`.

**Not isolated until post-change GET proves it.** Do not redirect an unauthorized host to EkklesiaNexus. No DNS changes from engineering laptop.

Details: [SEO_OPERATOR_RUNBOOK.md](SEO_OPERATOR_RUNBOOK.md).

---

## Phase 2A scope gaps (intentional)

- No new locale URLs (`/es`, `/it`, `/fr`, country folders).
- No footer IA links to `/features` (frozen empty `FOOTER_LINKS`; sitemap already lists English routes on official host).
- No GSC/GA data (no account access).
- No metadata/copy rewrites unless a false product claim is proven (none identified).

---

## Release gate before Phase 2B (first `/es`)

All required:

- the unauthorized host and raw IP not serving indexable marketing HTML
- GSC verification file **200** and GSC property verified
- Explicit approval to deploy and to add `/es`
- Approved Spanish homepage copy + native review

See [PHASE_2_INTERNATIONAL_SEO_ROADMAP.md](PHASE_2_INTERNATIONAL_SEO_ROADMAP.md).
