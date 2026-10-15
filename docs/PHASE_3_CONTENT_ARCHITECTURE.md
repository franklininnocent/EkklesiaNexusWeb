# Phase 3 — Content architecture

**Completed:** 8 Oct 2026  
**Depends on:** [Phase 0](PHASE_0_DISCOVERY.md), [Phase 1](PHASE_1_FOUNDATION.md)

---

## 1. Type model

[`src/types/marketing.ts`](../src/types/marketing.ts) defines `MarketingContent` and related shapes (navigation, features, screenshots, reports, etc.). UI and future CMS adapters should target this type only.

---

## 2. Content modules

Twelve files under [`src/content/`](../src/content/) — see [src/content/README.md](../src/content/README.md).

**Trust / value strip:** `trust.ts` exports `valueStripContent` (plan name: `trust`).

---

## 3. Single entry point

```ts
import { getMarketingContent } from "@/lib/marketing/get-content";

const content = getMarketingContent();
```

- Merges optional contact fields from `src/config/site.ts` (env).
- Filters `screenshots` to `active: true` and sorts by `displayOrder`.
- **Rule:** Pages and layout use this function—not direct `@/content/*` imports. Exception: `get-content.ts` and validators.

---

## 4. Copy contract

[`src/content/contract.ts`](../src/content/contract.ts):

| Field | Value |
|-------|--------|
| Slogan (H1) | The Next Generation of Church Management System. |
| Supporting line | One connected church. Complete 360° management. |

Used by `site.ts`, `hero.ts`, footer statement, and OG generator (keep Python script in sync).

**BCC terminology:** Prose uses “Life Groups / Basic Christian Communities (BCCs)”; 360° chips use “Life Groups / BCCs”.

---

## 5. Validation

| Layer | Path |
|-------|------|
| Logic | `src/lib/marketing/validate-content.ts` |
| CLI | `scripts/validate-marketing-content.ts` |
| Hook | `prebuild` → `npm run validate:content` |

Checks include:

- Prohibited claims ([PROHIBITED_MARKETING_CLAIMS.md](PROHIBITED_MARKETING_CLAIMS.md))
- Contract slogan/supporting line alignment
- Feature descriptions **2–4** sentences; advantages **2–6**
- Unique ids; 11 advantages; nav anchors
- Active screenshot files exist under `public/`
- BCC / Basic Christian Communities mention present

---

## 6. CMS readiness (V2)

Replace the body of `getMarketingContent()` with a fetch from Laravel Marketing CMS; keep `MarketingContent` and component props unchanged.

---

## 7. Verification

```bash
npm run validate:content
npm run typecheck
npm run build
```

| Check | Result (8 Oct 2026) |
|-------|---------------------|
| Validator | Pass |
| Scattered content imports in `src/app` / `src/components` | None (layout uses `getMarketingContent`) |

---

## 8. Sign-off

Phase 3 deliverables complete. Homepage (Phase 4) already consumes `getMarketingContent()` on `/`.
