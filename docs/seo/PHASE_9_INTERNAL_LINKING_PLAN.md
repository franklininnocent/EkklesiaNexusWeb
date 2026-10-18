# Phase 9 — Internal linking plan

**Goal:** Help evaluators move from category search → Catholic positioning → feature depth → pricing context → contact, without doorway pages or exact-match anchor spam.

## Implemented in Phase 9 (repository)

| Source | Destination | Anchor (EN) | Purpose | Status |
|--------|-------------|-------------|---------|--------|
| English footer | `/features` | Features | Hub discovery | Existing |
| English footer | `/solutions/catholic-parishes` | Catholic parishes | Catholic intent | **Added Phase 9** |
| English footer | `/about`, `/contact`, legal | — | Trust / enquiry | Existing |
| Home `#features` (en-US) | `/features`, `/solutions/catholic-parishes` | i18n links | Depth from hero journey | Existing (Phase 4/6) |
| `/features` hub | Catholic overview, `#pricing`, `/contact` | — | Evaluation path | Existing |
| `/solutions/catholic-parishes` | Sacramental, family, stewardship features, `/features`, `/contact` | Descriptive | Topic cluster | Existing |
| `/about` | Catholic overview, `/features`, `/contact` | Descriptive + pricing note | E-E-A-T / next step | **Added Phase 9** |
| `/contact` | `/features`, Catholic guide, `/#pricing` | Descriptive | Pre-form education | **Added Phase 9** |
| All `/features/[slug]` footers | Catholic overview, `/contact`, `/#pricing` | — | Cross-link cluster | **Added Catholic link Phase 9** |
| Feature pages | `relatedSlugs` chips | Feature h1 | Lateral navigation | Existing |

## Not implemented (requires approval or data)

| Proposal | Reason deferred |
|----------|-----------------|
| pt-BR footer link to Catholic page | English-only route; `footer.catholicParishes` exists in pt-BR JSON for key parity only—not shown in pt footer |
| New `/resources/*` hub | Phase 5 P2; no thin content without editorial plan |
| Blog links | No public blog route in sitemap |

## Verification

- `scripts/phase9-internal-linking.test.ts` — English footer Catholic href + i18n key; pt-BR must not gain untranslated key.
- Playwright `footer shows brand, crawlable links` — Catholic parishes link on `/`.
