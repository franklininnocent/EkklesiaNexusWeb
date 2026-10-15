# Phase 2 — Design system & branding

**Completed:** 8 Oct 2026  
**Depends on:** [Phase 1 — Foundation](PHASE_1_FOUNDATION.md)

---

## 1. Design tokens

Defined in [`src/app/globals.css`](../src/app/globals.css):

| Token | Value | Usage |
|-------|--------|--------|
| `--brand-navy` | `#003070` | Brand surfaces, headings on light UI |
| `--brand-gold` | `#e0a830` | Accent (not primary CTA fill) |
| `--brand-blue` | `#2563eb` | Primary CTAs (product-aligned) |
| Surfaces | page `#f8fafc`, card `#ffffff` | Layout |
| Radius / shadow | `--radius-md`, `--shadow-card` | Cards, buttons |

Tailwind theme maps: `brand-navy`, `brand-gold`, `brand-blue`, `surface-page`, `surface-card`.

---

## 2. Typography

- **UI sans:** Inter (`--font-inter`) — body and UI  
- **Display serif:** Lora (`--font-display-serif`) — section titles via `.font-display`  
- Configured in [`src/app/layout.tsx`](../src/app/layout.tsx)

---

## 3. UI primitives

| Component | Path |
|-----------|------|
| `Container` | `src/components/ui/container.tsx` |
| `SectionHeader` | `src/components/ui/section-header.tsx` |
| `ButtonLink` | `src/components/ui/button-link.tsx` (primary / secondary / ghost + on-dark) |
| `AnimatedReveal` | `src/components/ui/animated-reveal.tsx` (respects `prefers-reduced-motion`) |

---

## 4. Official logo kit

| Asset | Path |
|-------|------|
| Horizontal wordmark | `public/logos/ekklesiasoft-horizontal.png` (+ `.webp`) |
| Mark / touch icon | `public/logos/ekklesiasoft-mark.png` (+ `.webp`) |
| Favicon | `public/favicon/favicon.ico` |

**Header / footer:** horizontal logo in header; mark in footer — no mockup swirl.

Regenerate WebP: `npm run generate:brand-webp`

---

## 5. Open Graph

| Asset | Path |
|-------|------|
| PNG (social crawlers) | `public/images/og/og-preview.png` (1200×630) |
| WebP (optional) | `public/images/og/og-preview.webp` |

Designed navy field + official horizontal logo + contract slogan lines (no statistics).

Regenerate: `npm run generate:og` (runs `scripts/generate-og-preview.py`)

Referenced in `layout.tsx` metadata `openGraph.images`.

---

## 6. Verification

| Check | Result |
|-------|--------|
| Official mark in header/footer | Yes |
| Mockup swirl logo | Not used |
| Primary CTA contrast (blue on white) | WCAG-friendly pair `#2563eb` / white text |
| `npm run build` | Pass after asset generation |

---

## 7. Sign-off

Phase 2 deliverables complete. Product screenshots remain Phase 5; content remains Phase 3.

**Next:** [Phase 3 — Content architecture](V1_PHASE_IMPLEMENTATION_PLAN.md#phase-3--content-architecture) (already implemented) or jump to [Phase 8](V1_PHASE_IMPLEMENTATION_PLAN.md#phase-8--security-accessibility-performance) for hardening.
