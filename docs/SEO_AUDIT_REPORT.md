# SEO audit report — Phase 1 (stabilization)

**Date:** 18 Oct 2026  
**Scope:** Read-only production GET audit + repository contract review. No DNS, no Apache reload, no SERP claims.  
**Related:** [Google domain attribution incident report](GOOGLE_DOMAIN_ATTRIBUTION_INCIDENT_REPORT.md)

---

## Method

- Full **GET** requests (follow redirects), record final URL, status, canonical, robots, and hreflang (`rel="alternate"` with `hrefLang`).
- Marketing HTML identified by EkklesiaNexus branding and canonical pointing at `https://ekklesianexus.com`.
- Re-measured **after** Phase 1 repo work; production marketing deploy may lag this commit.

---

## Measured status codes (18 Oct 2026)

| URL | HTTP (after redirects) | Final URL | Notes |
|-----|--------------------------|-----------|--------|
| `http://ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | HTTP → HTTPS |
| `https://ekklesianexus.com/` | 200 | same | Indexable home |
| `http://www.ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | www → apex (multi-hop via HTTP) |
| `https://www.ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | www HTTPS → apex |
| `https://ekklesianexus.com/pt-br` | 200 | same | Portuguese home preserved |
| `https://ekklesianexus.com/pt-br/` | 200 | `https://ekklesianexus.com/pt-br` | Trailing slash normalizes to `/pt-br` |
| `https://ekklesianexus.com/features` | 200 | same | English-only feature hub |
| `https://ekklesianexus.com/robots.txt` | 200 | same | Allows crawl on official host |
| `https://ekklesianexus.com/sitemap.xml` | 200 | same | Official URLs only (see unit tests) |
| `https://app.ekklesianexus.com/` | 200 | same | Parish app; `noindex` in HTML |
| `https://api.ekklesianexus.com/up` | 200 | same | Health check OK |
| `the unauthorized hostname` | 200 | same | **Unauthorized host still serves full marketing HTML** |
| `http://139.59.18.151/` | 200 | same | **Raw IP still serves full marketing HTML** |
| `https://ekklesianexus.com/google161c1efd34d8a358.html` | **404** | same | GSC file in repo; **not live** until deploy |

HTTPS on `the unauthorized hostname` was not re-tested with strict certificate validation in this pass; prior incident report documents cert mismatch and insecure **200** responses.

---

## Metadata snapshot (production, 18 Oct 2026)

| Path | Canonical | Robots | Hreflang |
|------|-----------|--------|----------|
| `/` | `https://ekklesianexus.com` (no trailing slash) | index, follow | `en-US`, `pt-BR`, `x-default` → official URLs |
| `/pt-br` | `https://ekklesianexus.com/pt-br` | index, follow | Same language cluster as `/` |
| `/features` | `https://ekklesianexus.com/features` | index, follow | **None** (English-only route) |
| `/privacy` | `https://ekklesianexus.com/privacy` | noindex, nofollow | **None** |

**Trailing slash:** Homepage canonical omits trailing slash while some sitemap entries use `https://ekklesianexus.com/` (see `seo-metadata.test.ts` / localized sitemap). **No change this cycle** — single indexable document; not two competing 200 HTML bodies.

---

## Findings

### CRITICAL-1 — Duplicate host serves indexable marketing (production)

| | |
|---|---|
| **Evidence** | GET of the unauthorized hostname and `GET http://139.59.18.151/` → **200**, canonical `https://ekklesianexus.com`, `robots: index, follow`. |
| **Impact** | Google can crawl and attribute content to the wrong hostname (see incident report). |
| **Allowed fix** | Operator: Apache default vhost **404** per [`deploy/apache-ekklesianexus.conf.example`](deploy/apache-ekklesianexus.conf.example). Deploy Next.js host guard from repo. **Do not** redirect an unauthorized host to EkklesiaNexus. **No** DNS edits from engineering laptop. |
| **Test** | `scripts/marketing-request-host.test.ts`; post-deploy GET must return **404** (or non-marketing) on an unauthorized host/IP. |
| **Rollback** | Restore timestamped Apache `*.bak`; redeploy prior marketing build. |
| **Phase 1 status** | **Open on production.** Repository guard **present**; not equivalent to production isolation. |

### HIGH-1 — GSC HTML verification file not deployed

| | |
|---|---|
| **Evidence** | `GET https://ekklesianexus.com/google161c1efd34d8a358.html` → **404**. File exists at `public/google161c1efd34d8a358.html` in repo. |
| **Impact** | Domain verification in Search Console blocked until **200** on apex. |
| **Allowed fix** | Operator deploy marketing build + restart Next.js; verify file returns **200**. |
| **Test** | `curl -sS -o /dev/null -w "%{http_code}" https://ekklesianexus.com/google161c1efd34d8a358.html` → `200`. |

### MEDIUM-1 — Hreflang on noindex legal pages (repo defect; production may already match fix)

| | |
|---|---|
| **Evidence** | Pre-cycle review: `legal-metadata.ts` spread `localizedAlternates()` while `robots.index: false`. Production **re-GET** `/privacy` shows **no** hreflang (may reflect earlier deploy or metadata path). |
| **Impact** | Conflicting signals if hreflang appears on noindex URLs. |
| **Allowed fix** | Legal pages: canonical only, no `languages` alternates. **Done in repo.** |
| **Test** | `scripts/phase1-seo-contract.test.ts` |

### MEDIUM-2 — Root layout leaked home hreflang to all routes (repo defect)

| | |
|---|---|
| **Evidence** | Root `generateMetadata` always applied `buildLocalizedHomeMetadata`; English-only `/features` could inherit `pt-BR` alternates. Production `/features` currently has **no** hreflang. |
| **Impact** | Incorrect international clustering for non-equivalent pages. |
| **Allowed fix** | Emit home hreflang only for `/` and `/pt-br`. **Done in repo** (`src/app/layout.tsx`). |
| **Test** | `scripts/phase1-seo-contract.test.ts` |

### LOW-1 — Homepage canonical vs sitemap trailing slash

| | |
|---|---|
| **Evidence** | Live canonical `https://ekklesianexus.com`; sitemap includes `https://ekklesianexus.com/` and localized paths with trailing slash on `/` only. |
| **Impact** | Cosmetic inconsistency; no second indexable home URL observed. |
| **Allowed fix** | **None this cycle** per Phase 1 plan. |

### LOW-2 — Parish app default `<title>` vs marketing validator

| | |
|---|---|
| **Evidence** | `validate-seo.ts` requires neutral `<title>EkklesiaNexus</title>` on `EkklesiaNexusUi/src/index.html` for `npm run build`. Title was sign-in specific. |
| **Impact** | Marketing prebuild failed until aligned. |
| **Allowed fix** | Neutral default title; runtime login title unchanged in Angular. **Done** (single line in parish `index.html`). |

---

## Out of scope (unchanged)

- Pricing, catalog API, Laravel, Angular feature work (except neutral app `<title>` for build gate).
- New locale URLs, country landing pages, copy rewrites, testimonial blocks.
- Google SERP re-check, index “fixed” claims, Core Web Vitals program.
- DNS, the unauthorized host certificates, laptop Apache.

---

## Acceptance mapping

| Criterion | Result |
|-----------|--------|
| Audit includes official home, `/pt-br`, the unauthorized host, raw IP | Yes (table above) |
| `/` and `/pt-br` URL shape preserved | Yes |
| Legal pages without hreflang while noindex | Repo fixed; production GET confirms no hreflang on `/privacy` |
| Production host isolation | **Not done** |
| GSC file live | **Not done** (404) |
