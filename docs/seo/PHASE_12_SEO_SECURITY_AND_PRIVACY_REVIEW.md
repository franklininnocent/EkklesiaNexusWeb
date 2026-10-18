# Phase 12 — SEO security and privacy review

## Scope reviewed

- Sitemap / robots generation (no API secrets in URLs)
- JSON-LD (email `contact@ekklesianexus.com` only — public)
- `public/` GSC file (token — do not echo in logs)
- Marketing BFF routes `/api/contact-*` — disallowed in robots; rate limiting in tests
- `validate-payload` / `seo-prohibited` block localhost in CMS payloads
- No secrets in new Phase 12 docs

## Findings

| ID | Severity | Finding | Action |
|----|----------|---------|--------|
| SEC-SEO-01 | Info | robots.txt discloses `/api/` path | Acceptable; not access control |
| SEC-SEO-02 | **P0** (infra) | Wrong host serves full marketing site | Apache isolation — SEO-002/003 |
| SEC-SEO-03 | None | No auth tokens in sitemap | — |

## Not performed

- Penetration testing
- Production server config audit (out of scope)
