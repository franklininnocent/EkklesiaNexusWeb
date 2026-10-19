# Phase 13 — Live production baseline (evidence log)

**Verification UTC:** 2026-10-18T04:59:06Z  
**User-Agent:** `EkklesiaNexus-Phase13/1.0`  
**Method:** `curl -L` read-only  
**GSC / indexing in Google:** **Not verified** (no account access)

| Requested URL | HTTP | Final URL | Content-Type | Expected? | Reproducible |
|---------------|------|-----------|--------------|-----------|--------------|
| `http://ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | text/html | Yes — HTTPS upgrade | Yes |
| `https://ekklesianexus.com/` | 200 | same | text/html | Marketing home | Yes |
| `https://www.ekklesianexus.com/` | 200 | `https://ekklesianexus.com/` | text/html | www → apex | Yes |
| `https://ekklesianexus.com/pt-br` | 200 | same | text/html | PT home | Yes |
| `https://ekklesianexus.com/features` | 200 | same | text/html | Features hub | Yes |
| `https://ekklesianexus.com/contact` | 200 | same | text/html | Contact | Yes |
| `https://ekklesianexus.com/solutions/catholic-parishes` | 200 | same | text/html | Catholic solution | Yes |
| `https://ekklesianexus.com/about` | 200 | same | text/html | About | Yes |
| `https://ekklesianexus.com/robots.txt` | 200 | same | text/plain | Crawl policy | Yes |
| `https://ekklesianexus.com/sitemap.xml` | 200 | same | application/xml | 13 URLs | Yes |
| `https://ekklesianexus.com/google161c1efd34d8a358.html` | **404** | same | text/html (404 page) | **No** — verification missing | Yes |
| `the unauthorized hostname` | 200 | same (HTTP) | text/html | **Unexpected** — EkklesiaNexus HTML | Yes |
| `http://139.59.18.151/` | 200 | same (HTTP) | text/html | **Unexpected** — EkklesiaNexus HTML | Yes |

Re-run: `bash scripts/record-phase13-live-verification.sh`
