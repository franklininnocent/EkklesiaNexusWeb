# Phase 10 — Hero visual editor (MVP)

**Completed:** 8 Oct 2026

## Location

Angular → **Settings → Marketing website** → **Hero section** tab.

## Behavior

- **Locked:** headline + supporting line (product contract)
- **Editable:** hero description, image path, image alt text
- **Apply hero to JSON** merges into the full `MarketingContent` payload (also syncs `site.slogan` / `tagline`)
- Save draft or publish from **Full JSON** tab (or after applying hero)

## Contract source

`EkklesiaSoftUi/.../constants/marketing-copy-contract.ts` — must match `EkklesiaSoftWeb/src/content/contract.ts`.

## Next editors (not built)

Features, screenshots metadata, navigation — still JSON or future forms.
