# Phase 8 — Security, accessibility, performance

**Completed (baseline):** 8 Oct 2026  
**Depends on:** Phases 4–7

---

## 1. Security

| Control | Location |
|---------|----------|
| No DB in Next.js | `npm run scan:security` |
| Server-only Laravel URL | `LARAVEL_API_URL` in `src/config/site.ts` |
| Security headers + CSP | `next.config.ts` |
| Demo honeypot + API throttle | Form + Laravel `public_forms` |
| No payload logging in BFF | `src/app/api/demo-requests/route.ts` |

---

## 2. Accessibility (implemented)

| Item | Location |
|------|----------|
| Skip link | `layout.tsx` |
| Focus visible | `globals.css` `:focus-visible` |
| Form labels + `aria-invalid` + alerts | `demo-form.tsx` |
| Showcase tabs | `role="tablist"` / `tab` / `tabpanel`, prev/next labels |
| Showcase keyboard | ArrowLeft/ArrowRight (window), tab arrows in component |
| Reduced motion | `prefers-reduced-motion` in CSS + `AnimatedReveal` |

**Remaining:** complete responsive manual pass in [MANUAL_QA_CHECKLIST.md](MANUAL_QA_CHECKLIST.md).

---

## 3. Performance

| Item | Status |
|------|--------|
| Static homepage | `npm run build` → `○ /` |
| Webpack production build | `package.json` |
| Hero LCP image | `priority` on hero only |
| Minimal client JS | Server `page.tsx`; client islands only where needed |

Optional: Lighthouse on `npm run start` — review, not CI gate.

---

## 4. Sign-off

Automated: `npm run qa` (includes `scan:security`). Manual QA checklist still required for launch.
