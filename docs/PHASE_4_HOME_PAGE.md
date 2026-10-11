# Phase 4 — Homepage (single page `/`)

**Completed:** 8 Oct 2026  
**Depends on:** Phase 2, Phase 3

---

## 1. Route

- **URL:** `/` only (marketing narrative)
- **Server component:** `src/app/page.tsx` → `getMarketingContent()`
- **Client islands:** `SiteHeader`, `ProductShowcase`, `DemoForm`, motion (`AnimatedReveal`, `HeroCtas`)

---

## 2. Sections & anchors

| Section | Anchor | Component |
|---------|--------|-----------|
| Header | — | `site-header.tsx` |
| Hero | `#home` | `hero-section.tsx` |
| Value strip | — | `value-strip.tsx` |
| Why EkklesiaNexus | `#why` | `home-sections.tsx` |
| Complete 360° | — | `home-sections.tsx` |
| Feature ecosystem | `#features` | `home-sections.tsx` |
| Product showcase | `#product` | `product-showcase.tsx` |
| Core solutions | `#solutions` | `home-sections.tsx` |
| Reports & insights | `#benefits` | `home-sections.tsx` |
| Daily workflow | — | `home-sections.tsx` |
| Key advantages | — | `home-sections.tsx` |
| Audiences | — | `home-sections.tsx` |
| Final CTA | — | `home-sections.tsx` |
| Contact / demo | `#contact` | `demo-form.tsx` |
| Footer | — | `site-footer.tsx` |

Nav links (`navigation.ts`): `#home`, `#solutions`, `#product`, `#benefits`, `#contact`.

`globals.css` sets `scroll-margin-top` on `section[id]` for sticky header.

---

## 3. Enhancements delivered

- Active section highlight (`use-active-section.ts`)
- Hero motion via `AnimatedReveal` + `prefers-reduced-motion` in CSS
- Showcase tabs, prev/next, ArrowLeft/ArrowRight keyboard (when focus not in form controls)

---

## 4. Verification

- `npm run build` — static `/`
- No extra marketing routes beyond `/`, `/privacy`, `/terms`

**Sign-off:** Phase 4 complete.
