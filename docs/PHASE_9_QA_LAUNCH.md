# Phase 9 — QA & launch readiness

**Updated:** 8 Oct 2026  
**Depends on:** Phases 1–8

---

## 1. Automated gate (CI / pre-release)

```bash
cd EkklesiaSoftWeb
npm run qa              # content, SEO, typecheck, lint, build, security, PHPUnit
npm run smoke           # HTTP smoke on production server (starts next if needed)
```

| Script | What it proves |
|--------|----------------|
| `npm run qa` | Copy contract, prohibited claims, SEO rules, compile, Marketing API tests |
| `npm run smoke` | Routes 200, OG asset, security headers, BFF 422 validation + honeypot |

**Last automated run (dev):** `npm run qa` and `npm run smoke` — run locally before each release.

---

## 2. Manual gate (required for V1 sign-off)

[MANUAL_QA_CHECKLIST.md](MANUAL_QA_CHECKLIST.md):

- Responsive: 390 / 768 / 1280 / 1920
- Navigation, showcase keyboard, demo form **with Laravel running** (success, rate limit, API down)
- Product/marketing sign-off on copy and screenshots

---

## 3. Production launch

[DEPLOY.md](DEPLOY.md) + [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)

| Item | Owner |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` = public HTTPS URL | Ops |
| `LARAVEL_API_URL` internal to Next host | Ops |
| Marketing migration on API DB | Ops |
| `EMAIL_SUPPORT_ADDRESS` on API | Ops |
| `TENANT_API_RATE_LIMIT_ENABLED=true` | Ops |
| TLS + reverse proxy to `next start` | Ops |
| Legal review of `/privacy` and `/terms` | Legal |

---

## 4. V1 acceptance

When **automated** (`qa` + `smoke`) and **manual** checklist are done, and production env is configured, V1 marketing website is **launch-ready** (CMS remains Phase 10).

---

## 5. Sign-off

| Gate | Status |
|------|--------|
| `npm run qa` | Automate in release process |
| `npm run smoke` | Automate after build |
| Manual QA checklist | Pending operator |
| Production deploy | Pending operator |
