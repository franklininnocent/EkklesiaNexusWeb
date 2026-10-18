# Phase 13 — Live performance and accessibility smoke

## Phase 13 execution

| Activity | Result |
|----------|--------|
| Lighthouse on live `ekklesianexus.com` | **NOT RUN** |
| CrUX field data | **Unavailable** |
| Manual live smoke | **Limited** — HTTP/HTML only |

## Prior lab baseline

[../performance/PHASE_7_BASELINE.md](../performance/PHASE_7_BASELINE.md) — local `next start` on loopback; not repeated in Phase 13.

## Operator smoke (post-deploy)

1. Load `/` and `/pt-br` on mobile viewport — hero, `#pricing`, `#contact` visible.
2. Language switcher EN ↔ PT on home and `/privacy` mapping.
3. Open Application link → app domain.
4. Optional: Lighthouse on staging with production `SITE_URL`.

## Accessibility

No live axe/Lighthouse in Phase 13. Local Playwright covers switcher labels and skip link in dev server tests.
