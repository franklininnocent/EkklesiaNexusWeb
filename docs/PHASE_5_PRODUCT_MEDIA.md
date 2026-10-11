# Phase 5 — Product screenshots & media

**Completed:** 8 Oct 2026  
**Depends on:** Phase 0, Phase 4

---

## 1. Published assets

`public/images/product/` (PNG + optional WebP via `npm run generate:product-webp`):

| File | Showcase id | Hero |
|------|-------------|------|
| `dashboard.png` | dashboard | Yes (LCP) |
| `families.png` | families | |
| `sacraments.png` | sacraments | |
| `donations.png` | donations | |
| `projects.png` | projects | |
| `ministries.png` | ministries | |
| `leadership.png` | leadership | |
| `mass-intentions.png` | mass-intentions | |
| `reports.png` | reports | |

Metadata: `src/content/screenshots.ts` — filtered/sorted in `getMarketingContent()`.

---

## 2. Performance

| Location | `next/image` |
|----------|----------------|
| Hero | `priority`, `sizes="(max-width: 1024px) 100vw, 50vw"` |
| Product showcase | lazy (default), `sizes="(max-width: 1024px) 100vw, 65vw"` |

Validator confirms each active screenshot file exists on disk.

---

## 3. PII review (V1 set)

Engineering review against [MARKETING_SCREENSHOT_INVENTORY.md](MARKETING_SCREENSHOT_INVENTORY.md) — aggregate/list views only; no family detail, finance grids, or permissions screens.

| Image | PII checklist (8 Oct 2026) | Reviewer |
|-------|---------------------------|----------|
| dashboard.png | Pass — overview metrics | Eng |
| families.png | Pass — list view | Eng |
| sacraments.png | Pass | Eng |
| donations.png | Pass — dashboard | Eng |
| projects.png | Pass | Eng |
| ministries.png | Pass | Eng |
| leadership.png | Pass | Eng |
| mass-intentions.png | Pass | Eng |
| reports.png | Pass | Eng |

**Ongoing:** Re-review before any public launch if captures are replaced.

---

## 4. Sign-off

Phase 5 V1 media set complete. Do not publish high-risk captures from inventory without scrubbing.
