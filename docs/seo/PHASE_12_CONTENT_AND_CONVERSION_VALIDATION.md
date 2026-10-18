# Phase 12 — Content and conversion validation

## Product claims

- `validate:content` — **PASS** (no prohibited attendance/import tokens in content paths)
- Feature limitations on landing pages — present in `feature-slugs.ts`
- Catholic FAQ — aligned with FEATURE_VERIFICATION (Phase 6)

## Internal links

- Footer: Features, Catholic parishes (EN), About, Contact, legal — Playwright **PASS**
- No marketing links to `localhost` in indexable page components (dev URLs only in config fallbacks)
- App CTA: Playwright confirms **Open Application** → `/dashboard` on app origin pattern

## Conversion paths

- Contact form: empty POST → **422** (E2E)
- Demo/contact on home hash sections — frozen surfaces verified in `verify-seo-frozen-surfaces.sh` (part of `npm run qa`)

## Gaps

- pt-BR users routed to EN `/contact` and EN feature pages — documented, not a broken link
- Production form behavior not submitted with real data (per safety rules)
