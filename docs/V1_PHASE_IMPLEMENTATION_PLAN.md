# EkklesiaNexus Marketing Website V1 — Phase-by-Phase Implementation Plan

This document turns the V1 contract into ordered phases. Each phase has **goals**, **deliverables**, **verification**, and **dependencies**. Phases must be completed in order unless noted.

**Architecture (all phases):** Browser → Next.js (`EkklesiaNexusWeb`) → Laravel (`EkklesiaNexusApi`) → PostgreSQL. No CMS in V1. No browser → Laravel CORS. No direct DB from Next.js.

---

## Phase 0 — Discovery & product truth

**Goal:** Confirm what may be advertised and what already exists in the ecosystem.

| Task | Deliverable |
|------|-------------|
| Inspect `EkklesiaNexusApi`, `EkklesiaNexusUi`, empty `EkklesiaNexusWeb` | Short findings (API patterns, no marketing CMS) |
| Map parish-facing features vs Super Admin vs non-existent | Approved feature list |
| Confirm **Attendance** and mockup-only features are excluded | Prohibited-claims list |
| Inventory screenshots under `EkklesiaNexusDocuments/` | Sanitization shortlist |
| Inventory branding under `logo&branding/` | Official mark (dove navy/gold), not mockup swirl |
| Document BCC = Life Groups / Basic Christian Communities (BCCs) | Terminology lock |

**Verification:** [`FEATURE_VERIFICATION.md`](FEATURE_VERIFICATION.md) complete; Attendance marked **NOT APPROVED**.

**Deliverables (Phase 0 package):**

| Document | Purpose |
|----------|---------|
| [PHASE_0_DISCOVERY.md](PHASE_0_DISCOVERY.md) | Master findings & exit criteria |
| [FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md) | Feature matrix |
| [PROHIBITED_MARKETING_CLAIMS.md](PROHIBITED_MARKETING_CLAIMS.md) | Banned copy/topics |
| [MARKETING_SCREENSHOT_INVENTORY.md](MARKETING_SCREENSHOT_INVENTORY.md) | Captures & PII risk |
| [MARKETING_BRANDING_INVENTORY.md](MARKETING_BRANDING_INVENTORY.md) | Official identity |

**Status:** **Complete** (signed off in `PHASE_0_DISCOVERY.md`).

**Depends on:** Nothing.

---

## Phase 1 — Foundation (Next.js project)

**Goal:** Runnable Next.js 16 app with correct toolchain and repo hygiene.

| Task | Deliverable |
|------|-------------|
| Scaffold Next.js 16 Active LTS, App Router, TypeScript strict, Tailwind, ESLint | `package.json`, `tsconfig.json` |
| Project structure: `src/app`, `src/components`, `src/content`, `src/lib`, `src/types`, `src/config` | Folder layout |
| `.gitignore` (node_modules, `.next`, `.env*`, keep `env.example`) | Root ignore rules |
| `env.example` / `.env.example` + `.env.local` template | `LARAVEL_API_URL`, `NEXT_PUBLIC_SITE_URL`, contact vars, analytics flag |
| `next.config.ts`: `outputFileTracingRoot`, security headers (baseline), image formats | Config |
| README + link to deploy doc | [`README.md`](../README.md) |

**Verification:** `npm install`; `npm run dev` serves on port 3000; `npm run typecheck` and `npm run build` pass.

**Deliverables (Phase 1 package):**

| Artifact | Purpose |
|----------|---------|
| [PHASE_1_FOUNDATION.md](PHASE_1_FOUNDATION.md) | Toolchain, layout, env, verification sign-off |
| `package.json` / `tsconfig.json` / `eslint.config.mjs` | Next 16 + strict TS + ESLint |
| `next.config.ts` | Tracing root, image formats, baseline security headers |
| `.gitignore` + `env.example` + `.env.example` | Repo hygiene and env templates |
| [README.md](../README.md) + [DEPLOY.md](DEPLOY.md) | Setup and production notes |

**Status:** **Complete** (signed off in `PHASE_1_FOUNDATION.md`).

**Depends on:** Phase 0.

---

## Phase 2 — Design system & branding

**Goal:** Premium SaaS look aligned with official identity (not mockup clone).

| Task | Deliverable |
|------|-------------|
| CSS tokens: navy `#003070`, gold `#E0A830`, blue `#2563eb`, surfaces, type, radius, shadows | [`src/app/globals.css`](../src/app/globals.css) |
| Fonts: Inter + display serif (Lora) | [`src/app/layout.tsx`](../src/app/layout.tsx) |
| UI primitives: Container, SectionHeader, ButtonLink, AnimatedReveal | `src/components/ui/*` |
| Logo kit from Brand Logo Library | `public/logos/*` (horizontal + mark) |
| Favicon + app icon | `public/favicon/`, `src/app/favicon.ico` |
| OG image (designed navy + slogan; interim may use dashboard) | `public/images/og/og-preview.png` |
| Optional: WebP/AVIF exports for logos and screenshots | `*.webp` alongside PNG |

**Verification:** Header/footer use official mark; no swirl logo; contrast on CTAs acceptable.

**Deliverables (Phase 2 package):**

| Artifact | Purpose |
|----------|---------|
| [PHASE_2_DESIGN_SYSTEM.md](PHASE_2_DESIGN_SYSTEM.md) | Tokens, fonts, primitives, assets sign-off |
| `src/app/globals.css` + `layout.tsx` | Tokens and fonts |
| `src/components/ui/*` | Container, SectionHeader, ButtonLink, AnimatedReveal |
| `public/logos/*`, `public/favicon/` | Official marks |
| `public/images/og/og-preview.png` | Designed OG (`npm run generate:og`) |
| `scripts/generate-og-preview.py`, `export-brand-webp.sh` | Regenerable assets |

**Status:** **Complete** (signed off in `PHASE_2_DESIGN_SYSTEM.md`).

**Depends on:** Phase 1.

---

## Phase 3 — Content architecture

**Goal:** All marketing copy typed, centralized, CMS-ready.

| Task | Deliverable |
|------|-------------|
| `src/types/marketing.ts` | `MarketingContent` and related types |
| Content modules: `site`, `navigation`, `hero`, `trust`, `features`, `solutions`, `reports`, `workflow`, `advantages`, `audiences`, `cta`, `screenshots` | `src/content/*.ts` |
| `getMarketingContent()` — single entry for UI | [`src/lib/marketing/get-content.ts`](../src/lib/marketing/get-content.ts) |
| Slogan H1 + supporting line in hero/site | Exact contract wording |
| Copy rules: 2–4 / 3–6 sentences; BCC wording; no prohibited claims | Content review |
| `scripts/validate-marketing-content.ts` + `npm run validate:content` + prebuild | Automated claim scan |

**Verification:** `npm run validate:content` passes; no attendance/mobile app/etc. in `src/content`.

**Deliverables (Phase 3 package):**

| Artifact | Purpose |
|----------|---------|
| [PHASE_3_CONTENT_ARCHITECTURE.md](PHASE_3_CONTENT_ARCHITECTURE.md) | Architecture sign-off |
| [src/content/README.md](../src/content/README.md) | Module map |
| `src/content/contract.ts` | Locked slogan + supporting line |
| `src/lib/marketing/validate-content.ts` | Structural + copy rules |
| `getMarketingContent()` | Single UI entry |

**Status:** **Complete** (signed off in `PHASE_3_CONTENT_ARCHITECTURE.md`).

**Depends on:** Phase 0, Phase 1.

---

## Phase 4 — Homepage (single page `/`)

**Goal:** Full marketing narrative on one URL with anchor navigation.

| Section | Anchor | Component area |
|---------|--------|----------------|
| Header | — | Sticky nav, mobile menu, Request a Demo |
| Hero | `#home` | Slogan, frame, CTAs |
| Value strip | — | Factual value pillars (not fake logos) |
| Why EkklesiaNexus | — | Problem / connected church |
| Complete 360° | — | Ecosystem chips |
| Feature ecosystem | `#features` | Categorized features |
| Product showcase | `#product` | Tabs + screenshot (client island) |
| Core solutions | `#solutions` | Grouped solution blocks |
| Reports & insights | `#benefits` | Full reports narrative |
| Daily workflow | — | Step list |
| Key advantages | — | 11 advantage cards |
| Audiences | — | Role-based value |
| Final CTA | — | Navy band |
| Contact / demo | `#contact` | Form + optional contact env |
| Footer | — | Brand + legal links |

**Rules:** `page.tsx` stays a Server Component; client only for header, showcase, form, motion.

**Enhancements (plan):** active nav highlight, hero motion (`prefers-reduced-motion`), showcase prev/next + keyboard.

**Verification:** All sections render; scroll-margin under sticky header; no extra marketing routes.

**Deliverables:** [PHASE_4_HOME_PAGE.md](PHASE_4_HOME_PAGE.md)

**Status:** **Complete** (signed off in `PHASE_4_HOME_PAGE.md`).

**Depends on:** Phase 2, Phase 3.

---

## Phase 5 — Product screenshots & media

**Goal:** Real product proof without PII.

| Task | Deliverable |
|------|-------------|
| Copy approved captures to `public/images/product/` | dashboard, families, sacraments, donations, projects, ministries, leadership, mass, reports |
| Metadata in `screenshots.ts` | titles, descriptions, capabilities, order |
| Next.js `Image`: `sizes`, priority on hero only, lazy below fold | Performance |
| Sanitization checklist per image | No names, phones, addresses, tenant data |

**Avoid unless scrubbed:** family/member detail pages, permissions matrices, finance grids with PII.

**Verification:** Visual review; validator + manual PII pass.

**Deliverables:** [PHASE_5_PRODUCT_MEDIA.md](PHASE_5_PRODUCT_MEDIA.md)

**Status:** **Complete** (V1 set + PII review logged) — re-review if images change.

**Depends on:** Phase 0, Phase 4.

---

## Phase 6 — Demo request (BFF + Laravel)

**Goal:** Secure demo submissions without exposing Laravel to the browser.

### 6A — Next.js BFF

| Task | Deliverable |
|------|-------------|
| `POST /api/demo-requests` | [`src/app/api/demo-requests/route.ts`](../src/app/api/demo-requests/route.ts) |
| Server-only `LARAVEL_API_URL` | [`src/lib/api/laravel.ts`](../src/lib/api/laravel.ts) |
| Validation, body size, timeout, correlation ID | Safe 422 / 429 / 502 messages |
| Client form + honeypot + static country list | [`src/components/contact/demo-form.tsx`](../src/components/contact/demo-form.tsx) |
| Optional analytics (`NEXT_PUBLIC_ANALYTICS_ENABLED`) | [`src/lib/analytics.ts`](../src/lib/analytics.ts) |

### 6B — Laravel Marketing module (not CMS)

| Task | Deliverable |
|------|-------------|
| Module `Marketing` registered | `modules_statuses.json` |
| Migration `marketing_demo_requests` (no `tenant_id`) | DB table |
| `POST /api/public/demo-requests` + `StoreDemoRequestRequest` | Public API |
| Throttle `public_forms` (~5/min/IP) | `Modules/Tenants/config/tenants.php` |
| Queued mail to `EMAIL_SUPPORT_ADDRESS` | Persist then notify; mail failure ≠ DB rollback |
| PHPUnit feature tests | validation, honeypot, throttle, persistence, no tenant leak |

**Verification:** `php artisan migrate --path=Modules/Marketing/database/migrations`; `php artisan test --filter=PublicDemoRequest`; manual form submit with `php artisan serve`.

**Deliverables:** [PHASE_6_DEMO_REQUEST.md](PHASE_6_DEMO_REQUEST.md)

**Status:** **Complete** — API tests pass; migration applied in dev. Set `EMAIL_SUPPORT_ADDRESS` on each new environment.

**Depends on:** Phase 1 (Next), Phase 4 (form UI).

---

## Phase 7 — SEO, legal, and discoverability

**Goal:** Production-grade metadata without fake structured data.

| Task | Deliverable |
|------|-------------|
| Metadata API: title, description, canonical, OG, Twitter | `layout.tsx` |
| JSON-LD: Organization, WebSite, SoftwareApplication | No Review/AggregateRating/Offer pricing |
| `sitemap.ts` | `/` (add `/privacy`, `/terms` only when legal is indexable) |
| `robots.ts` | Allow homepage |
| `/privacy`, `/terms` | Placeholder + `noindex` until legal review |
| Branded `not-found.tsx` | Link back to `/` |

**Verification:** View page source; inspect OG tags; legal pages show noindex.

**Deliverables:** [PHASE_7_SEO_LEGAL.md](PHASE_7_SEO_LEGAL.md), `legal-metadata.ts`, `validate-seo.ts`

**Status:** **Complete** (legal copy still placeholder; noindex until counsel).

**Depends on:** Phase 1, Phase 3.

---

## Phase 8 — Security, accessibility, performance

**Goal:** Enterprise-ready public surface.

| Area | Planned work |
|------|----------------|
| Security | No `pg`/Prisma in Next; no `NEXT_PUBLIC_LARAVEL_*`; no payload logging; baseline headers in `next.config.ts`; honeypot + throttle |
| Accessibility | Semantic headings, skip link, form labels/errors, keyboard nav & showcase controls, focus states, reduced motion |
| Performance | Static `/`; webpack production build; minimal client JS; optimized hero LCP |

**Optional hardening:** Full CSP (test fonts, images, Next assets, form endpoint).

**Verification:** Security checklist in contract; keyboard-only pass; `npm run build`; Lighthouse on production build (review, not gate).

**Deliverables:** [PHASE_8_SECURITY_A11Y.md](PHASE_8_SECURITY_A11Y.md), `scan-marketing-security.sh`

**Status:** **Baseline complete** — **remaining:** manual [MANUAL_QA_CHECKLIST.md](MANUAL_QA_CHECKLIST.md) at 390/768/1280/1920.

**Depends on:** Phases 4–7.

---

## Phase 9 — QA & launch readiness

**Goal:** Evidence before calling V1 done.

```bash
# All automated frontend + API checks
npm run qa

# Then smoke production build
npm run start
```

| Manual QA | |
|-----------|---|
| Responsive | 390, 768, 1280, 1920 |
| Navigation | Sticky header, anchors, active section, mobile menu |
| Form | Success, validation, honeypot, rate limit, API down |
| Content | No prohibited features; BCC wording |
| Legal | Privacy/terms load; noindex |

**Deploy:** See [`DEPLOY.md`](DEPLOY.md) — reverse proxy, HTTPS `NEXT_PUBLIC_SITE_URL`, process manager for `next start`, internal `LARAVEL_API_URL`.

**Deliverables:** [PHASE_9_QA_LAUNCH.md](PHASE_9_QA_LAUNCH.md), [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md), `scripts/smoke-production.sh`

**Status:** **Automated complete** (`npm run qa` includes smoke) — **remaining:** manual [MANUAL_QA_CHECKLIST.md](MANUAL_QA_CHECKLIST.md) + production deploy per [DEPLOY.md](DEPLOY.md).

**Depends on:** Phases 1–8.

---

## Phase 10 — V2 (out of V1 scope; planned compatibility only)

**Goal:** Replace file-based content with Laravel Marketing CMS **without** rewriting UI.

| Future capability | Notes |
|-------------------|--------|
| CMS admin (Super Admin) | Hero, features, screenshots, SEO, CTAs |
| Public read APIs or SSR fetch | Swap `getMarketingContent()` data source only |
| Testimonials / FAQ | Only with real approved content |
| Pricing | Only if product explicitly requests; not V1 |

**V1 requirement:** Components consume `MarketingContent` only — no scattered content imports.

**Deliverables (Phase 10 foundation):**

| Artifact | Purpose |
|----------|---------|
| [PHASE_10_CMS_FOUNDATION.md](PHASE_10_CMS_FOUNDATION.md) | V2 roadmap + what shipped |
| [MARKETING_CMS_API_CONTRACT.md](MARKETING_CMS_API_CONTRACT.md) | Public read API shape |
| Content providers + `getMarketingContentAsync()` | Swap data source without UI rewrite |
| Laravel publish + public read APIs | `marketing_content_revisions` |
| [PHASE_10_CMS_ADMIN_UI.md](PHASE_10_CMS_ADMIN_UI.md) | Super Admin JSON publish in Angular |

**Status:** **Storage + API + CLI + Super Admin JSON publish UI** — visual editors not implemented. See [PHASE_10_CMS_ADMIN_UI.md](PHASE_10_CMS_ADMIN_UI.md).

---

## Phase dependency diagram

```text
Phase 0 Discovery
    ↓
Phase 1 Foundation
    ↓
Phase 2 Design ─────────────┐
    ↓                       │
Phase 3 Content ────────────┤
    ↓                       │
Phase 4 Homepage ←──────────┘
    ↓
Phase 5 Screenshots
    ↓
Phase 6 BFF + Laravel (parallel with 7 after form UI exists)
    ↓
Phase 7 SEO / Legal
    ↓
Phase 8 Security / A11y / Performance
    ↓
Phase 9 QA & Launch
    ↓
Phase 10 V2 CMS (later)
```

---

## V1 acceptance summary

| Requirement | Phase |
|-------------|-------|
| Single page `/` + `/privacy` `/terms` only | 4, 7 |
| Official branding & accurate features | 0, 2, 3, 5 |
| Typed content + validator | 3 |
| Demo form end-to-end | 6 |
| No CMS, no pricing, no testimonials | 0, 10 |
| Production build | 1, 9 |

---

## Quick reference: explicit non-goals (all phases)

Do not implement: Marketing CMS, pricing, fake testimonials/stats, attendance, mobile app, events, volunteers, group portal, comms platform, Angular changes, unrelated Laravel modules, browser CORS to Laravel, second database, Next.js → PostgreSQL.
