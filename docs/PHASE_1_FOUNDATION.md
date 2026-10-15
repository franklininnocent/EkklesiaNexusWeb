# Phase 1 — Foundation (Next.js project)

**Completed:** 8 Oct 2026  
**Depends on:** [Phase 0 — Discovery](PHASE_0_DISCOVERY.md)  
**Goal:** Runnable Next.js 16 app with correct toolchain, folder layout, environment templates, and repo hygiene.

---

## 1. Toolchain

| Item | Value | Evidence |
|------|--------|----------|
| Framework | Next.js **16.4.0** (App Router) | `package.json` |
| React | 19.3.0 | `package.json` |
| Language | TypeScript **strict** | `tsconfig.json` → `"strict": true` |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) | `src/app/globals.css` |
| Lint | ESLint 9 + `eslint-config-next` | `eslint.config.mjs` |
| Path alias | `@/*` → `src/*` | `tsconfig.json` |
| Production build | `next build --webpack` (Turbopack build avoided for stability) | `package.json` scripts |
| Node | **20+** recommended | `package.json` → `engines` |

---

## 2. Source layout

```
EkklesiaNexusWeb/
├── public/                 # Static assets (logos, favicon, OG, product images)
├── scripts/                # Build-time validators (e.g. marketing content scan)
├── src/
│   ├── app/                # App Router: pages, layout, API routes, robots/sitemap
│   ├── components/         # UI sections and layout (feature-oriented folders)
│   ├── config/             # Env-backed site config (`site.ts`)
│   ├── content/            # Typed marketing copy modules (Phase 3+)
│   ├── hooks/              # Client hooks
│   ├── lib/                # API client, marketing loader, utilities
│   └── types/              # Shared TypeScript types
├── docs/                   # Phase plans, deploy, discovery
├── env.example             # Tracked duplicate of `.env.example`
├── .env.example            # Environment template (committed)
├── next.config.ts
├── tsconfig.json
└── package.json
```

**Phase 1 rule:** No direct PostgreSQL or CMS from Next.js. Server-only Laravel URL stays in `LARAVEL_API_URL`.

---

## 3. Environment variables

Templates: `.env.example` and `env.example` (identical). Local overrides: `.env.local` (gitignored).

| Variable | Scope | Purpose |
|----------|--------|---------|
| `LARAVEL_API_URL` | Server only | Internal Laravel base URL for BFF (`/api/demo-requests`) |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical URL (metadata, sitemap, Open Graph) |
| `MARKETING_CONTACT_EMAIL` | Server | Optional footer/contact line |
| `MARKETING_CONTACT_PHONE` | Server | Optional footer/contact line |
| `MARKETING_CONTACT_ADDRESS` | Server | Optional footer/contact line |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Public | `false` by default |

Central reader: `src/config/site.ts`.

---

## 4. `next.config.ts` (baseline)

- `outputFileTracingRoot` — monorepo-friendly tracing root  
- `poweredByHeader: false`  
- `images.formats` — AVIF + WebP  
- Security headers: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`  

Full production proxy/TLS notes: [DEPLOY.md](DEPLOY.md).

---

## 5. Git hygiene

`.gitignore` excludes:

- `node_modules`, `.next`, `out`, build artifacts  
- `.env` and `.env.*` **except** `!.env.example`  
- Explicit allow for tracked `env.example`  

Never commit `.env.local` or API secrets.

---

## 6. Verification (exit criteria)

Run from `EkklesiaNexusWeb/`:

```bash
cp env.example .env.local   # or cp .env.example .env.local
npm install
npm run typecheck
npm run dev                 # http://localhost:3000
npm run build               # webpack production build
```

| Check | Result (8 Oct 2026) |
|-------|---------------------|
| `npm run typecheck` | Pass |
| `npm run build` | Pass (static `/`, `/privacy`, `/terms`; dynamic BFF route) |
| Dev server port | **3000** (Next default) |

---

## 7. Sign-off

Phase 1 deliverables are in place. Later phases (design system, content, homepage, Laravel demo API) build on this foundation without changing the architecture rule: **Browser → Next.js → Laravel → PostgreSQL**.

**Next:** [Phase 2 — Design system & branding](V1_PHASE_IMPLEMENTATION_PLAN.md#phase-2--design-system--branding) in the implementation plan.
