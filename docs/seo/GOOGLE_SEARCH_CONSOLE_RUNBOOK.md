# Google Search Console — operator runbook

**Property:** `ekklesianexus.com` (prefer **Domain** property when DNS TXT verification is available)  
**HTML file token (repo):** `google161c1efd34d8a358.html` → `https://ekklesianexus.com/google161c1efd34d8a358.html`  
**Never** paste verification tokens, passwords, or service-account keys into chat or git.

---

## 1. Property verification

| Step | Action | Evidence to record |
|------|--------|-------------------|
| 1 | Sign in to [Google Search Console](https://search.google.com/search-console) with an org-controlled Google account | Account owner email (not password) |
| 2 | Add **Domain** property `ekklesianexus.com` OR URL-prefix `https://ekklesianexus.com/` | Property type chosen |
| 3 | If using **HTML file**: deploy `public/google161c1efd34d8a358.html` to production | `curl -sS https://ekklesianexus.com/google161c1efd34d8a358.html` → **200** and body line `google-site-verification: google161c1efd34d8a358.html` |
| 4 | Click **Verify** in GSC UI | Screenshot or note “Verified” + **date (UTC)** |

**Important:** HTTP **200** on the file proves **accessibility only**, not UI verification.

Grant **Full** access only to trusted operators; use **Owner** sparingly.

---

## 2. Sitemap submission

| Step | Action |
|------|--------|
| 1 | Confirm production sitemap: `https://ekklesianexus.com/sitemap.xml` → **200**, valid XML |
| 2 | GSC → **Sitemaps** → submit `https://ekklesianexus.com/sitemap.xml` |
| 3 | Wait for processing (hours–days); record **Last read** status and errors |

**Expected URLs (13):** `/`, `/pt-br`, `/features`, `/features/*` (7 slugs), `/solutions/catholic-parishes`, `/about`, `/contact`.  
**Must not appear:** `/privacy`, `/terms`, `/api/*`, `/preview/*`, `/es`, localhost, raw IP.

Do **not** resubmit repeatedly without fixing errors.

---

## 3. URL Inspection (priority URLs)

Inspect each URL once after major deploy; record **Page indexing** status:

1. `https://ekklesianexus.com/`
2. `https://ekklesianexus.com/pt-br`
3. `https://ekklesianexus.com/solutions/catholic-parishes`
4. `https://ekklesianexus.com/features/sacramental-registers`
5. `https://ekklesianexus.com/contact`

**Interpretation:**

| GSC state | Meaning |
|-----------|---------|
| URL is on Google | Discovered/crawled; not necessarily ranking |
| Indexed | Eligible for search (subject to quality) |
| Crawled – currently not indexed | Technical or quality gate |
| Discovered – currently not indexed | Discovery without index |

**Request indexing** only after fixing blockers (GSC file, hostname leak, deploy). Not a substitute for fixes.

---

## 4. Weekly checklist (15–20 min)

- [ ] **Pages** → Indexing: new critical exclusions?
- [ ] **Sitemaps**: processing errors?
- [ ] **Performance** (28 days): sudden drop in clicks/impressions (>30% vs prior week) — investigate deploy or hostname issues
- [ ] Spot-check URL Inspection on `/` if a release shipped

---

## 5. Monthly checklist

- [ ] Export or note **Performance** totals (impressions, clicks, CTR, position) for last **28 days** vs previous **28 days**
- [ ] Review **Queries** — branded vs non-branded (filter query containing `ekklesia`)
- [ ] Review **Pages** — top landing URLs
- [ ] Complete [MONTHLY_SEO_REPORT_TEMPLATE.md](templates/MONTHLY_SEO_REPORT_TEMPLATE.md)
- [ ] Update [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md)

---

## 6. Documenting and resolving issues

When closing an issue:

1. Root cause evidence (URL Inspection, server response, or code fix commit).
2. Re-inspect affected URLs after deploy.
3. Date resolved (UTC).

Hostname leak resolution requires **Apache** operator work — see [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](../PHASE_3B_PRODUCTION_GATE_REMEDIATION.md). GSC alone cannot fix duplicate hosts.
