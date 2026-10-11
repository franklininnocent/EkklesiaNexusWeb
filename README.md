# EkklesiaNexus Marketing Website

Single-page marketing site for EkklesiaNexus (Next.js 16, App Router, TypeScript, Tailwind).

## Setup

```bash
# Use either template (same content):
cp .env.example .env.local
# or, if the dotfile is missing in your shell:
cp env.example .env.local

npm install
npm run dev
```

If `cp` still fails, create `.env.local` from the absolute path:

```bash
cp /var/www/html/EkklesiaNexus/EkklesiaSoftWeb/env.example /var/www/html/EkklesiaNexus/EkklesiaSoftWeb/.env.local
```

- `LARAVEL_API_URL` — server-only; used by `/api/demo-requests` BFF to reach Laravel.
- `NEXT_PUBLIC_SITE_URL` — canonical URL for SEO.

## Scripts

- `npm run dev` — local development (default port 3000)
- `npm run build` — production build (uses webpack; Turbopack build may fail in some environments)
- `npm run validate:content` — prohibited marketing claim scan
- `npm run typecheck` — TypeScript
- `npm run generate:og` — regenerate OG image from brand + slogan
- `npm run generate:brand-webp` — WebP exports for `public/logos/*.png`
- `npm run export:content` — export `MarketingContent` JSON for `php artisan marketing:import-content`
- `npm run validate:export` — validate export JSON before CMS publish
- `npm run qa` — full gate: validate, typecheck, lint, build, security scan, API tests, HTTP smoke
- `npm run smoke` — curl smoke tests against `next start` (port `PORT`, default 3000)
- `npm run scan:security` — marketing security grep only

## Laravel integration

Demo requests: `POST /api/public/demo-requests` (Marketing module). Run migrations on the API database:

```bash
cd ../EkklesiaSoftApi
php artisan migrate --path=Modules/Marketing/database/migrations
```

Set `EMAIL_SUPPORT_ADDRESS` in the API `.env` for notification mail.

Phase 0 discovery: [docs/PHASE_0_DISCOVERY.md](docs/PHASE_0_DISCOVERY.md).

Phase 1 foundation: [docs/PHASE_1_FOUNDATION.md](docs/PHASE_1_FOUNDATION.md).

Phase 2 design system: [docs/PHASE_2_DESIGN_SYSTEM.md](docs/PHASE_2_DESIGN_SYSTEM.md).

Phase 3 content: [docs/PHASE_3_CONTENT_ARCHITECTURE.md](docs/PHASE_3_CONTENT_ARCHITECTURE.md).

Phase 4 homepage: [docs/PHASE_4_HOME_PAGE.md](docs/PHASE_4_HOME_PAGE.md).

Phase 5 product media: [docs/PHASE_5_PRODUCT_MEDIA.md](docs/PHASE_5_PRODUCT_MEDIA.md).

Phase 6 demo form API: [docs/PHASE_6_DEMO_REQUEST.md](docs/PHASE_6_DEMO_REQUEST.md).

Phase 7 SEO & legal: [docs/PHASE_7_SEO_LEGAL.md](docs/PHASE_7_SEO_LEGAL.md).

Phase 8 security & a11y: [docs/PHASE_8_SECURITY_A11Y.md](docs/PHASE_8_SECURITY_A11Y.md).

Phase 10 CMS foundation (V2): [docs/PHASE_10_CMS_FOUNDATION.md](docs/PHASE_10_CMS_FOUNDATION.md).

Staging CMS mode: [docs/STAGING_CMS.md](docs/STAGING_CMS.md).

Phase-by-phase plan: [docs/V1_PHASE_IMPLEMENTATION_PLAN.md](docs/V1_PHASE_IMPLEMENTATION_PLAN.md).

Phase 9 QA & launch: [docs/PHASE_9_QA_LAUNCH.md](docs/PHASE_9_QA_LAUNCH.md).

Pre-launch QA: [docs/MANUAL_QA_CHECKLIST.md](docs/MANUAL_QA_CHECKLIST.md).

Production launch: [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md).

Production deployment: [docs/DEPLOY.md](docs/DEPLOY.md).
