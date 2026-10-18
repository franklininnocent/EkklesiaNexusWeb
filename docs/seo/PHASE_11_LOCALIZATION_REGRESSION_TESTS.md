# Phase 11 — Localization regression tests

## Commands

| Command | Scope |
|---------|--------|
| `npm run validate:i18n` | Key parity en-US / pt-BR |
| `npm run validate:content` | Marketing claim validators |
| `npm run test:unit` | Includes `phase1-seo-contract`, `phase11-international-seo`, `locale.test.ts`, pricing tests |
| `npm run build` | Typecheck + static generation |
| `npx playwright test e2e/i18n.spec.ts --project=chrome` | Language switcher, pt-br home, privacy mapping |

## `phase11-international-seo.test.ts`

- `SUPPORTED_LOCALES` frozen  
- Home + legal hreflang URLs and reciprocity  
- pt-BR self-canonical  
- English-only pages: no `alternates.languages`  
- Sitemap: `/` + `/pt-br`, no `/es`  
- `switchLocalePath` for features and legal  

## `phase1-seo-contract.test.ts`

- Home en/pt canonical  
- Legal privacy hreflang (updated Phase 11)  
- Features hub no hreflang  

## Environment

- Sets `NEXT_PUBLIC_SITE_URL=https://ekklesianexus.com` in tests  
- No Google API or production network required  

## Production-only (operator)

```bash
bash scripts/check-production-seo-baseline.sh
```

Manual: View source on `https://ekklesianexus.com/` and `/pt-br` for hreflang link elements after deploy.

## Known limitations

- Does not crawl live HTML for hreflang.  
- Does not validate GSC International Targeting.  
- Playwright does not assert hreflang tags (could add later).
