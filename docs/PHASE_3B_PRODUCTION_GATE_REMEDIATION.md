# Phase 3B — Production gate remediation and operator authorization

**Goal:** Close gates in [PHASE_3_PREFLIGHT.md](PHASE_3_PREFLIGHT.md) before any `/es` release.  
**Engineering laptop:** documents and repo checks only unless authorization below is completed on the server.

---

## 1. Authorize production changes

Before any deploy or Apache reload, record:

| Field | Value |
|-------|--------|
| **Authorized by** | _(name / role)_ |
| **Timestamp (UTC)** | _(ISO-8601)_ |
| **Scope approved** | Marketing `EkklesiaNexusWeb` deploy; Apache vhost isolation per [deploy/apache-ekklesianexus.conf.example](deploy/apache-ekklesianexus.conf.example) on `139.59.18.151` |
| **Out of scope (unless separate approval)** | DNS changes; TLS/certificate changes for third-party hostnames; unrelated vhosts; Matchpoint → EkklesiaNexus redirect; publish `/es` |
| **Rollback plan** | Restore Apache `*.bak` after `apache2ctl configtest`; redeploy previous marketing artifact; restart Next.js |

### Authorization log

| Action | Authorized? | By whom | Date (UTC) | Rollback reference |
|--------|-------------|---------|------------|-------------------|
| Marketing site deploy + Next restart (`NODE_ENV=production`) | **No** | — | — | Previous build artifact tag/commit |
| Apache `configtest` + reload (hostname isolation) | **No** | — | — | Timestamped `sites-available/*.bak` |
| DNS / TLS for Matchpoint or other domains | **No** | — | — | N/A — not in scope |
| Google Search Console UI verification | **No** | — | — | Remove property only if wrongly added |
| Publish `/es` or add `SUPPORTED_LOCALES` | **No** | — | — | Revert locale commit |

---

## 2. Deploy the marketing site (operator)

1. Build from approved commit on `EkklesiaNexusWeb` (`npm run build` in CI or on server).
2. Deploy static/server output per existing operator procedure.
3. Confirm process env: **`NODE_ENV=production`**.
4. Restart Next.js (PM2/systemd — existing runbook).
5. Smoke: `curl -sS -o /dev/null -w "%{http_code}\n" https://ekklesianexus.com/` → **200**.
6. Logs: no crash loop; homepage loads in browser.

**Preserve:** `app.ekklesianexus.com`, `api.ekklesianexus.com`, Laravel, unrelated vhosts.

---

## 3. Correct Apache hostname isolation (operator)

Adapt [deploy/apache-ekklesianexus.conf.example](deploy/apache-ekklesianexus.conf.example) to live config:

1. `sudo apache2ctl -S` — list defaults and `ServerName` order.
2. Backup each touched file: `*.bak-$(date -u +%Y%m%dT%H%M%SZ)`.
3. **Catch-all** `*:80` / `*:443`: must **not** `ProxyPass` to Next.js; must **not** set `X-Forwarded-Host: ekklesianexus.com`.
4. **Named** `ekklesianexus.com`: `ProxyPreserveHost On`, `X-Forwarded-Proto https`, proxy to Next (confirm port, e.g. `3000`).
5. `sudo apache2ctl configtest` → **Syntax OK** only then `sudo systemctl reload apache2`.
6. **Matchpoint / other domains:** must serve their intended application or **404** — not full EkklesiaNexus marketing HTML. Do not break unrelated services.

**Canonical domain:** `https://ekklesianexus.com` remains the marketing HTTPS origin.

---

## 4. Recheck production responses (operator)

After deploy + Apache, run and paste output into [PHASE_3_PREFLIGHT.md](PHASE_3_PREFLIGHT.md):

```bash
cd EkklesiaNexusWeb
bash scripts/record-production-gates.sh
```

Required URLs:

- `http://dwm.matchpointgps.in/`
- `https://dwm.matchpointgps.in/` (note TLS vs `-k` insecure separately)
- `http://139.59.18.151/` and `https://139.59.18.151/` where applicable
- `https://ekklesianexus.com/google161c1efd34d8a358.html`
- `https://ekklesianexus.com/` and `https://ekklesianexus.com/pt-br`

**Gate rule:** Matchpoint and raw IP must **not** return **200** with full EkklesiaNexus marketing HTML. GSC URL must **200** with body `google-site-verification: google161c1efd34d8a358.html`.

### Latest engineering read-only recheck (no deploy)

**2026-10-18 04:33 UTC (Phase 4):** Matchpoint HTTP/HTTPS-insecure and raw IP HTTP/HTTPS still **200** marketing HTML; GSC file **404**; `/`, `/pt-br`, `www`→apex **200**. Gates **B** and **D** (file) remain **FAIL**. Authorization log unchanged (**No**).

---

## 5. Verify Google Search Console (operator)

| Step | Evidence to record |
|------|-------------------|
| Property type | Domain `ekklesianexus.com` or URL-prefix |
| Method | HTML file |
| Token / filename | `google161c1efd34d8a358.html` (must match repo) |
| File GET | Status **200** + exact body line |
| GSC UI | Screenshot or note: “Verified” with date |

**FAIL** if only file is 200 but UI not verified. **BLOCKED** if no console access.

---

## 6. Approve Spanish content (product / linguist)

Use approval table in [ES_LOCALE_IMPLEMENTATION_SPEC.md](ES_LOCALE_IMPLEMENTATION_SPEC.md).

- Native Spanish review of proposed homepage copy (not machine-only).
- Product owner sign-off vs [FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md).
- **Do not** create `src/app/es`, `es.json`, or indexable `/es` until this row is complete **and** all production gates above pass.

---

## Root cause summary

Shared IP `139.59.18.151`; Apache routes unknown `Host` to marketing Next.js. Repo guard helps only after deploy with real `Host`. Durable fix: Apache catch-all **404** without Next proxy.

Do **not** 301 Matchpoint → `ekklesianexus.com`.

---

## Release decision

| Item | Status |
|------|--------|
| `/` and `/pt-br` | Unchanged; keep **200** after any deploy |
| `SUPPORTED_LOCALES` | `en-US`, `pt-BR` only until explicit `/es` authorization |
| `/es` | **Unpublished** until gates 1–5 (and 8 authorization) pass + Spanish approval + `/es` release sign-off |

---

## Local repo checks (engineering)

```bash
cd EkklesiaNexusWeb
npm run test:unit
npm run build
npx playwright test e2e/i18n.spec.ts e2e/seo-public-pages.spec.ts --project=chrome
bash scripts/check-gsc-verification-file.sh
```
