# Phase 7 — Performance, Core Web Vitals, accessibility, and conversion

**Overall Phase 7 status:** **PASS** (justified local optimizations + regression tests)  
**Production CWV verification:** **BLOCKED** (no authorized live deploy / no CrUX access)  
**Date:** 2026-10-18 (UTC)  
**Branch:** `price-implementation-web`

Related: [PHASE_7_BASELINE.md](PHASE_7_BASELINE.md), [PHASE_6_ENGLISH_CONTENT_IMPLEMENTATION.md](../seo/PHASE_6_ENGLISH_CONTENT_IMPLEMENTATION.md), [PHASE_4_ENGLISH_SEO_REPORT.md](../PHASE_4_ENGLISH_SEO_REPORT.md).

---

## 1. Previous phase status

| Phase | Status |
|-------|--------|
| Phase 4 production gates | **FAIL** (GSC 404, hostname leak) |
| Phase 6 content | **PASS** (repo) |
| Phase 7 dependency | Content complete; perf work does not invalidate Phase 6 |

---

## 2. Repository baseline (architecture)

| Item | Finding |
|------|---------|
| Next.js | **16.4.2**, App Router, `revalidate = 60` on marketing routes |
| Homepage | Server `MockupPage` + client sections (hero, pricing, slider, etc.) |
| Fonts | `Plus_Jakarta_Sans` via `next/font/google`, `display: swap`, weights 400–800 |
| Images | `next/image` with AVIF/WebP formats in config |
| Hero LCP | Left: `MockupLogo` + subtitle; right: `HeroDevices` (SVG mock UI) |
| Pricing | Client `MockupPricing`; catalog from `regional-pricing` / API — **unchanged** |
| Analytics | GA4 via `MarketingAnalytics` when configured — **unchanged** |
| a11y | Skip link, `sr-only` H1 on hero, `prefers-reduced-motion` in `globals.css` |
| `main` landmark | Homepage `mockup-page` includes `<main>`; inner pages use `MarketingPageShell` |

---

## 3. Prioritized issues and remediation

| ID | Symptom | Evidence | Priority | Fix | Risk |
|----|---------|----------|----------|-----|------|
| P7-1 | High LCP (~4.1s lab) | Lighthouse pre-change | **P1** | WebP logo source + `sizes`; defer `HeroDevices` JS | Low — reserved hero height |
| P7-2 | Large logo download | PNG 233 KB vs WebP 25 KB on disk | **P1** | Use `/logos/ekklesia-circular-badge.webp` in `MockupLogo` | Low |
| P7-3 | Main-thread work from hero devices | Large client `devices.tsx` in initial hero bundle | **P1** | `next/dynamic` import with placeholder | Low |
| P7-4 | INP (field) | No RUM | **NOT RUN** | Document measurement plan | — |
| P7-5 | Production TTFB | Not measured on live site | **BLOCKED** | Deploy + WebPageTest on official URL | — |
| P7-6 | CrUX / Search Console CWV | No access | **BLOCKED** | After GSC verify | — |

**Not implemented:** Font weight reduction (would alter `font-medium` rendering), CDN/Apache changes, new analytics, pricing cache changes.

---

## 4. Changes implemented

| File | Change | Rationale |
|------|--------|-----------|
| `src/components/mockup/logo.tsx` | WebP src + responsive `sizes` | Smaller LCP image payload |
| `src/components/mockup/hero.tsx` | Dynamic import `HeroDevices` + layout placeholder | Reduce initial JS; stabilize CLS |
| `docs/performance/PHASE_7_BASELINE.md` | Baseline artifact | Reproducible methodology |
| `docs/performance/PHASE_7_PERFORMANCE_ACCESSIBILITY_CONVERSION.md` | This report | Audit trail |

---

## 5. Before / after (local lab only)

See [PHASE_7_BASELINE.md](PHASE_7_BASELINE.md). Summary:

- LCP: **4.1 s → ~2.9–3.3 s** (two post-change runs)  
- Performance score: **86 → 92–95**  
- CLS: **0** (unchanged)  
- Accessibility: **96–98** (unchanged or slight improvement)

**Not claimed:** Production pass of Core Web Vitals; INP pass.

---

## 6. Accessibility

| Check | Result |
|-------|--------|
| Lighthouse accessibility (local) | **96–98** |
| Skip to content link | Present in `layout.tsx` |
| Hero H1 | `sr-only` combines title + subtitle |
| Logo decorative badge | `alt=""` with visible text brand |
| Reduced motion | CSS disables float/orb animations |
| Full WCAG 2.2 AA audit | **NOT RUN** (manual + screen reader) |

No a11y regressions introduced in changed components.

---

## 7. Mobile usability and conversion

| Journey | Result |
|---------|--------|
| Home → Open Application | E2E **PASS** (`/dashboard` href) |
| Home → contact / demo anchors | Existing hash nav — **PASS** (Playwright) |
| Pricing show/hide | Unchanged logic — **PASS** (unit tests) |
| `/pt-br` | i18n Playwright **PASS** |
| Mobile menu | Client header — not load-tested in Lighthouse interaction |

Conversion copy unchanged this phase; Phase 6 CTAs preserved.

---

## 8. Analytics and measurement plan

| Capability | Status |
|------------|--------|
| GA4 events (`login_click`, etc.) | **Existing** — not modified |
| GSC CWV report | **BLOCKED** |
| Organic landing + form conversions baseline | **NOT RUN** |

**After deploy:** Enable GSC → Core Web Vitals; compare official URL lab Lighthouse to local; monitor `login_click` and contact form submissions in GA4 if authorized.

---

## 9. Tests executed

| Command | Result |
|---------|--------|
| `npm run build` | **PASS** |
| `npm run validate:content` | **PASS** |
| `npm run test:unit` | **PASS** |
| Playwright i18n + seo-public-pages (chrome) | **18 passed** |
| Lighthouse (local prod server) | **Recorded** in baseline doc |

---

## 10. Pricing / locale / SEO regression

| Area | Result |
|------|--------|
| Pricing API / regional catalog | **PASS** — no pricing file changes |
| `SUPPORTED_LOCALES` | **PASS** — unchanged |
| `/pt-br` | **PASS** |
| Sitemap/robots | **NOT RUN** (no route changes) |

---

## 11. Production deployment

**Required** for live performance gains (WebP logo path, dynamic hero chunk).

1. Operator authorization ([PHASE_3B](../PHASE_3B_PRODUCTION_GATE_REMEDIATION.md)).  
2. Deploy artifact; smoke `/` on mobile device or Lighthouse on `https://ekklesianexus.com`.  
3. **Rollback:** previous build artifact.

Hostname isolation and GSC remain **out of scope** for Phase 7 code.

---

## 12. Phase 8 recommendation

1. Post-deploy **production** Lighthouse + optional WebPageTest on official URL.  
2. CrUX/GSC field CWV after verification.  
3. If LCP still >2.5s: investigate TTFB (Apache/proxy), consider priority hint on hero text path, audit third-party GA script loading.  
4. Optional: manual keyboard/screen-reader pass on mobile menu and contact form.  
5. Conversion: GA4 funnel from organic landing → contact submit (when analytics authorized).
