# Phase 13 — Canonical host and redirect verification

**Verified:** 2026-10-18T04:59:06Z (UTC)

## Official canonical

`https://ekklesianexus.com` (apex HTTPS)

## Apex variants

| Variant | Redirect chain | Final | Canonical in HTML | Result |
|---------|----------------|-------|-------------------|--------|
| `http://ekklesianexus.com/` | → HTTPS apex | `https://ekklesianexus.com/` | `https://ekklesianexus.com` | **PASS** |
| `https://ekklesianexus.com/` | none | same | apex | **PASS** |
| `http://www.ekklesianexus.com/` | → HTTPS apex | `https://ekklesianexus.com/` | apex | **PASS** |
| `https://www.ekklesianexus.com/` | → apex | `https://ekklesianexus.com/` | apex | **PASS** |

No redirect loops observed. Trailing slash: home final URL includes `/`; canonical tag without trailing slash (consistent with prior phases).

## Non-canonical hosts (recheck)

| Host | Status | Title (sample) | Canonical declared | SEO implication |
|------|--------|----------------|-------------------|-----------------|
| `http://dwm.matchpointgps.in/` | 200 | EkklesiaNexus — Next-Generation… | `https://ekklesianexus.com` | **P0** — duplicate crawlable HTML on wrong host |
| `http://139.59.18.151/` | 200 | same | apex | **P0** — same |

**Remediation:** Apache default vhost / stop proxying marketing to catch-all Host — [PHASE_3B_PRODUCTION_GATE_REMEDIATION.md](../PHASE_3B_PRODUCTION_GATE_REMEDIATION.md). **Not performed in Phase 13.**

**Note:** Shared IP does not prove DNS misconfiguration for the unrelated domain; issue is **response content**, not IP ownership inference.
