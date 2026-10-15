# Phase 6 — Demo request (BFF + Laravel)

**Completed:** 8 Oct 2026  
**Depends on:** Phase 1 (Next), Phase 4 (contact form)

---

## 1. Architecture

```text
Browser  →  POST /api/demo-requests (Next.js BFF)
         →  POST /api/public/demo-requests (Laravel Marketing)
         →  marketing_demo_requests (PostgreSQL)
         →  queued mail → EMAIL_SUPPORT_ADDRESS
```

- No browser → Laravel CORS; `LARAVEL_API_URL` is **server-only**.
- Correlation ID: `X-Correlation-Id` + `correlation_id` in JSON (logging only; no PII in log lines).

---

## 2. Next.js (6A)

| Piece | Location |
|-------|----------|
| BFF route | `src/app/api/demo-requests/route.ts` |
| Laravel client | `src/lib/api/laravel.ts` (12s timeout, no payload logging) |
| Form UI | `src/components/contact/demo-form.tsx` (honeypot `company_website`) |
| Analytics hook | `src/lib/analytics.ts` (`NEXT_PUBLIC_ANALYTICS_ENABLED`) |

**BFF behavior:** JSON only; 16 KB max body; mirrors Laravel 422 field errors; 429/502 safe messages.

---

## 3. Laravel (6B)

| Piece | Location |
|-------|----------|
| Module | `EkklesiaNexusApi/Modules/Marketing` |
| Route | `POST /api/public/demo-requests` |
| Validation | `StoreDemoRequestRequest` |
| Model | `MarketingDemoRequest` (no `tenant_id`) |
| Throttle | `api.throttle:public_forms` (~5/min/IP) |
| Mail | `DemoRequestNotificationMail` (queued); DB row kept if mail fails |

---

## 4. Environment

| Variable | App | Required |
|----------|-----|----------|
| `LARAVEL_API_URL` | Next.js | Yes (e.g. `http://127.0.0.1:8000`) |
| `EMAIL_SUPPORT_ADDRESS` | Laravel API | Yes for notifications |
| `TENANT_API_RATE_LIMIT_ENABLED` | Laravel API | `true` in production |

---

## 5. Database

```bash
cd EkklesiaNexusApi
php artisan migrate --path=Modules/Marketing/database/migrations
```

**Verification (this environment):** migration already applied (`Nothing to migrate`).

---

## 6. Automated tests

```bash
cd EkklesiaNexusApi
php artisan test --filter=PublicDemoRequest
```

| Test | Purpose |
|------|---------|
| valid demo request persists | 201 + DB row |
| required fields validated | 422 |
| honeypot rejects spam | no row |
| unauthenticated access allowed | public endpoint |
| throttle limits repeated submissions | 429 |
| record has no tenant id | tenant isolation |

**Last run:** 6 passed (27 assertions).

---

## 7. Manual smoke

1. `php artisan serve` in API; `npm run dev` in Web.
2. Submit demo form at `http://localhost:3000/#contact`.
3. Confirm row in `marketing_demo_requests` and mail queue/log if mail configured.

---

## 8. Sign-off

Phase 6 code and API tests complete. Run migration + `EMAIL_SUPPORT_ADDRESS` on each new environment.

**Next:** [Phase 9 — QA & launch](V1_PHASE_IMPLEMENTATION_PLAN.md#phase-9--qa--launch-readiness) — `npm run qa` + [MANUAL_QA_CHECKLIST.md](MANUAL_QA_CHECKLIST.md).
