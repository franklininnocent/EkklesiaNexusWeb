# Phase 11 — Brazilian Portuguese content quality

**Native-language review:** **Pending** — engineering aligned SEO strings with English product scope; fluent reviewer should approve before treating copy as marketing-final.

## Classification summary

| Area | Status | Notes |
|------|--------|-------|
| `/pt-br` home UI (messages) | **Technically validated** | i18n parity; Playwright passes |
| `seo.homeTitle` / `seo.homeDescription` | **Needs correction → applied** | Removed “360°” / vague “muito mais”; aligned to EN feature list |
| `seo.manifestDescription` | **Same as homeDescription** | Consistent |
| Legal pages (pt) | **Technically validated** | Metadata localized; legal content HUMAN REVIEW per `docs/i18n/` |
| English-only routes linked from pt footer | **Incomplete equivalence** | Contact links to EN `/contact` by design |
| Feature grid copy (pt) | **Technically validated** | Existing glossary/matrix in `docs/i18n/` |

## Changes made (Phase 11)

| Key | Issue | Action |
|-----|-------|--------|
| `seo.homeDescription` | Overbroad “sistema completo em 360°” vs verified product | Replaced with scope-aligned Portuguese mirroring EN SEO |
| `seo.manifestDescription` | Same | Updated to match |

## Terminology notes for native reviewer

| Term used | Context | Question for reviewer |
|-----------|---------|------------------------|
| mordomia | Stewardship / parish finance records | Accept vs “gestão financeira paroquial”? |
| registros sacramentais | Sacramental registers | Diocesan wording preference? |
| intenções de missa | Mass intentions | Standard BR parish usage? |

## Not changed

- Hero subtitle body (`home.hero` messages) — separate from SEO meta; review in dedicated i18n pass.
- No automatic translation of `/features` or Catholic solution pages.
- `footer.catholicParishes` key exists for EN footer only (pt key for parity, unused in pt footer).

## Defects not found (audit)

- Raw translation keys on `/pt-br` (Playwright).
- Wrong `html lang` (expects `pt-BR` on `/pt-br`).
- Missing keys vs en-US (`validate:i18n`).
