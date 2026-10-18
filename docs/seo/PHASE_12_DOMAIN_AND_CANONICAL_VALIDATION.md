# Phase 12 — Domain and canonical validation

**Test date:** 2026-10-18 (UTC)  
**User-Agent:** `EkklesiaNexus-Phase12/1.0`  
**Method:** `curl -L` (follow redirects)

| Requested URL | Status (after redirects) | Final URL | Canonical in HTML | Result |
|---------------|--------------------------|-----------|-------------------|--------|
| `http://ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | `https://ekklesianexus.com` | **PASS** — upgrades to HTTPS apex |
| `https://ekklesianexus.com/` | 200 | same | `https://ekklesianexus.com` | **PASS** |
| `http://www.ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | apex | **PASS** — www → apex |
| `https://www.ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | apex | **PASS** |
| `http://dwm.matchpointgps.in/` | 200 | `http://dwm.matchpointgps.in/` | `https://ekklesianexus.com` | **FAIL P0** — wrong host indexable HTML |
| `http://139.59.18.151/` | 200 | `http://139.59.18.151/` | apex canonical in body | **FAIL P0** |

**Remediation (authorized infra only):** [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](../PHASE_3B_PRODUCTION_GATE_REMEDIATION.md), `docs/deploy/apache-ekklesianexus.conf.example`.

**Repo mitigation:** `marketing-request-host.ts` + `proxy.ts` — effective after deploy; does not replace Apache default vhost.
