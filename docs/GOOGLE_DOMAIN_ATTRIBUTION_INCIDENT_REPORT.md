# Google domain attribution incident report

**Product:** EkklesiaNexus marketing website  
**Official domain:** `https://ekklesianexus.com`  
**Report date:** 18 Oct 2026  
**Status:** Repository remediation implemented; **production deploy and Apache vhost lock pending** on server `139.59.18.151`. **Google SERP not re-verified** (do not claim index fixed until observed).

---

## A. Executive summary

Google search for **EkklesiaNexus** can show the correct title and description while displaying **an unauthorized host** / `the unauthorized hostname` as the apparent source. Live investigation confirms:

1. **Root cause:** The production server at `139.59.18.151` serves the full EkklesiaNexus Next.js marketing site for **unauthorized** `Host` values (`the unauthorized hostname`, raw IP), not because canonical tags point at an unauthorized host.
2. **Canonical/metadata on duplicate URLs** already declare `https://ekklesianexus.com` (correct user-declared signals).
3. **Google’s sitename** for the duplicate URL is derived from the **crawl hostname** (the unauthorized host), not from `og:site_name` (`EkklesiaNexus`).
4. **Remediation in repo:** Production host allowlist in Next.js `proxy.ts`, GSC HTML verification file, Apache example config, tests, and operator runbook updates.
5. **Still required on production:** Deploy marketing build, restart Next.js, apply Apache default-vhost isolation per [`deploy/apache-ekklesianexus.conf.example`](deploy/apache-ekklesianexus.conf.example), then re-test. **No DNS changes** were made.

---

## B. Root cause

| Evidence | Detail |
|----------|--------|
| DNS | The unauthorized hostname resolved to `139.59.18.151` (same address as `ekklesianexus.com`, `app`, and `api`). Its parent apex had no A record. |
| HTTP duplicate | HTTP GET of the unauthorized hostname returned **200**, with the same homepage title as the official site (~150 KB HTML). |
| HTTPS duplicate | HTTPS GET of the unauthorized hostname returned **200** using the official certificate (`ekklesianexus.com` SAN only). |
| Raw IP | `GET http://139.59.18.151/` → **200** marketing homepage. |
| Canonical on duplicate | `<link rel="canonical" href="https://ekklesianexus.com"/>` — not an unauthorized host. |
| Repo | No unauthorized-hostname strings in EkklesiaNexus codebase. |
| Apache | `Server: Apache/2.4.58 (Ubuntu)` on all responses; default/catch-all behavior serves marketing for unmatched hosts. |
| App gap (before fix) | [`src/proxy.ts`](../src/proxy.ts) passed unknown hosts through; only `www` and HTTP-on-apex redirected. |

**Why it occurred:** Shared infrastructure IP plus vhost/proxy configuration that routes any `Host` to the marketing Next.js app. Historical or mistaken DNS on `the unauthorized hostname` pointed at this server. Google crawled and indexed the duplicate URL; algorithm selected that URL for display despite canonical pointing to the official domain.

---

## C. Before-and-after findings

| SEO signal | Before (production, pre-deploy) | Expected after deploy + Apache | Verification (18 Oct 2026) |
|------------|----------------------------------|--------------------------------|----------------------------|
| Official HTTPS homepage | 200, canonical official | Unchanged 200 | **Pass** — 200, marketing title |
| Official HTTP | 301 → HTTPS | Unchanged | **Pass** — 301 |
| www HTTPS | 301 → apex HTTPS | Unchanged | **Pass** — 301 |
| Canonical on official `/` | `https://ekklesianexus.com` | Unchanged | **Pass** (live) |
| `og:url` / `og:site_name` | Official / EkklesiaNexus | Unchanged | **Pass** (prior full HTML audit) |
| Sitemap | Only `ekklesianexus.com` URLs | Unchanged | **Pass** (prior audit) |
| robots.txt | Allow `/`, official Host/Sitemap | Unchanged | **Pass** (prior audit) |
| JSON-LD | Organization/WebSite on official URLs | Unchanged | **Pass** (prior audit) |
| Unauthorized-host HTTP | 200 full marketing HTML | **404**, no marketing body | **Fail** — still 200 (not deployed) |
| Unauthorized-host HTTPS | 200 marketing HTML | **404** at edge/app | **Fail** — still 200 (not deployed) |
| Raw IP HTTP | 200 marketing HTML | **404** at Apache default | **Fail** — still 200 (not deployed) |
| GSC HTML file | 404 | 200, verification body | **Fail** — still 404 (not deployed) |
| Google SERP domain | May show an unauthorized host | May improve after recrawl | **Not verified** |

---

## D. Files changed

| File | Why | Effect |
|------|-----|--------|
| [`src/lib/marketing/marketing-request-host.ts`](../src/lib/marketing/marketing-request-host.ts) | Centralize host parsing and production allowlist | Testable 404 + `X-Robots-Tag` for unauthorized hosts |
| [`src/proxy.ts`](../src/proxy.ts) | Host check **before** preview token; reject unknown production hosts | Defense in depth when `Host` / `X-Forwarded-Host` reaches Next.js |
| [`public/google161c1efd34d8a358.html`](../public/google161c1efd34d8a358.html) | GSC HTML-file verification | Serves verification token at site root after deploy |
| [`scripts/marketing-request-host.test.ts`](../scripts/marketing-request-host.test.ts) | Unit tests for allowlist | CI/regression |
| [`src/lib/marketing/validate-seo.ts`](../src/lib/marketing/validate-seo.ts) | SEO gate for host isolation | `verify:seo` fails if guard removed |
| [`package.json`](../package.json) | Wire new unit test | `npm run test:unit` |
| [`docs/deploy/apache-ekklesianexus.conf.example`](deploy/apache-ekklesianexus.conf.example) | Production Apache pattern | Default vhost 404; named official hosts only |
| [`docs/SEO_OPERATOR_RUNBOOK.md`](SEO_OPERATOR_RUNBOOK.md) | Operator steps | Apache inspect/backup/configtest |
| This report | Deliverable | Evidence and checklist |

**Not changed:** Pricing, CMS contracts, Angular app, Laravel API business logic, canonical origin in [`src/config/brand.ts`](../src/config/brand.ts).

---

## E. Production/server actions (separate from git)

1. **Deploy** `EkklesiaNexusWeb` build to production with `NEXT_PUBLIC_SITE_URL=https://ekklesianexus.com`.
2. **Restart** marketing Node process (`next start` on loopback; confirm port from live Apache `ProxyPass`).
3. **Apache on `139.59.18.151`:**
   - `sudo apache2ctl -S` — list all `ServerName` / `ServerAlias`.
   - Backup each file to edit (`*.bak-<UTC timestamp>`).
   - Add default `:80` / `:443` vhosts that **do not** proxy to Next (404 only).
   - Keep `ekklesianexus.com`, `www`, `app`, `api` named vhosts; preserve ACME paths on official names.
   - `sudo apache2ctl configtest` → `sudo systemctl reload apache2` only if OK.
4. **Do not** change DNS for an unauthorized host or add redirects from an unauthorized host to EkklesiaNexus.
5. **Do not** edit unrelated vhosts on developer laptops.

---

## F. Test results

| Check | Method | Result |
|-------|--------|--------|
| `npm run test:unit` | Local shell | **Pass** (includes `marketing-request-host.test.ts`, `seo-metadata.test.ts`, `robots-policy.test.ts`) |
| SEO validate strings | `validate-seo.ts` via unit suite | **Pass** |
| Production official HTTP/HTTPS/www | GET from audit script | **Pass** |
| Production unauthorized host / IP leak | GET from audit script | **Fail** (expected until deploy + Apache) |
| GSC file on production | GET verification URL | **Fail** (expected until deploy) |
| Google SERP shows `ekklesianexus.com` | Manual search | **Not verified** |
| Apache `configtest` on production | SSH | **Not run** (no SSH in this session) |

---

## G. Deployment instructions

From [`docs/DEPLOYMENT.md`](DEPLOYMENT.md) (abbreviated):

```bash
cd /path/to/EkklesiaNexusWeb
git pull   # or deploy approved release SHA
npm ci
export NEXT_PUBLIC_SITE_URL=https://ekklesianexus.com
npm run build
# restart systemd unit for next start (e.g. ekklesianexus-web.service)
sudo systemctl restart ekklesianexus-web   # name per server

# After Apache vhost changes:
sudo apache2ctl configtest && sudo systemctl reload apache2
```

Smoke after deploy:

```bash
curl -sS -o /dev/null -w '%{http_code} %{redirect_url}\n' http://ekklesianexus.com/
curl -sS -o /dev/null -w '%{http_code}\n' https://ekklesianexus.com/
curl -sS -o /dev/null -w '%{http_code}\n' -H 'Host: unrelated.example' http://127.0.0.1/   # on server, expect 404 after Apache fix
curl -sS https://ekklesianexus.com/google161c1efd34d8a358.html
```

---

## H. Google Search Console checklist

1. Deploy `public/google161c1efd34d8a358.html` and confirm **200** on `https://ekklesianexus.com/google161c1efd34d8a358.html`.
2. In Search Console, verify property for `https://ekklesianexus.com/` using the **HTML file** method.
3. URL Inspection → `https://ekklesianexus.com/` → confirm **user-declared canonical** is official → **Test live URL** → **Request indexing** (after production fix is live).
4. Submit sitemap: `https://ekklesianexus.com/sitemap.xml`.
5. Repeat URL Inspection for `/features`, `/about`, `/contact` as needed.
6. If `the unauthorized hostname` appears in Coverage/Removals, note it may drop after the URL returns **404** and recrawl; you **cannot** change third-party DNS without the domain owner.
7. Do **not** rely on Temporary Removals as the primary canonical fix.
8. Re-check Google search for **EkklesiaNexus** periodically; **do not claim success** until the visible URL is `ekklesianexus.com`.

---

## I. Remaining risks

- **Apache still default-routes** until production vhost change — the unauthorized host may remain crawlable at HTTP/HTTPS.
- **Next.js guard** only applies when the original `Host` reaches Node; if Apache strips/replaces `Host` with loopback only, **Apache default vhost is mandatory**.
- **Stale Google index** may persist weeks after technical fix.
- **Unauthorized-host DNS** may remain pointed at this IP until the DNS owner removes it; a 404 on this server limits harm but does not remove the DNS record.
- **HTTPS certificate mismatch** on an unauthorized host may still confuse some clients until edge returns 404 without marketing body.

---

## J. Final verdict

| Classification | Supported? |
|----------------|------------|
| Confirmed incorrect canonical on official site | **No** — official canonical is correct |
| Confirmed metadata/configuration issue in repo | **No** — metadata targets official domain |
| Confirmed duplicate-domain / hosting issue | **Yes** |
| Confirmed redirect or proxy issue (default vhost) | **Yes** |
| Confirmed stale Google index / display URL | **Likely** (not independently re-checked in SERP today) |
| Inconclusive pending external verification | **Google SERP** and **production Apache apply** |

---

*Engineering remediation complete in repository. Production isolation and GSC verification require deploy and server steps in section E.*
