# Marketing branding inventory

## Canonical source

| Asset | Path |
|-------|------|
| Brand logo library (all variants) | `/var/www/html/EkklesiaNexusDocuments/logo&branding/EkklesiaNexusBrandLogoLibrary.png` |
| Horizontal / wordmark crops | `1.png`, `4.png` in same folder |
| Product UI runtime badge | `EkklesiaNexusUi/public/brand/ekklesia-circular-badge.png` |

## Official identity

- **Mark:** Dove + three squares in navy circle; “Ekklesia” navy, “Nexus” gold  
- **Primary navy:** ~`#003070`  
- **Gold accent:** ~`#E0A830`  
- **Product UI CTA blue (screenshots/chrome):** `#2563eb` — Church Financial OS tokens (`docs/design-system/colors.md`)

## Marketing site usage (`EkklesiaNexusWeb/public/`)

| File | Use |
|------|-----|
| `logos/ekklesianexus-horizontal.png` | Header (from `1.png`) |
| `logos/ekklesianexus-mark.png` | Footer, Apple touch icon |
| `favicon/favicon.ico` | From product UI favicon |
| `images/og/og-preview.png` | Open Graph (designed navy + logo + slogan; regen: `npm run generate:og`) |
| `images/og/og-preview.webp` | Optional WebP companion |
| `logos/*.webp` | Optional WebP companions (`npm run generate:brand-webp`) |

## Reject

- Website mockup **swirl** logo (`EkklesiaNexusDocuments/Website/mockups/`)  
- AI-generated one-off images not in brand library  
- Mockup palette (mint/neon) as primary brand  

## Planned improvements (post–Phase 0)

- Export WebP variants from brand library  
- Designed OG image: navy field + horizontal logo + slogan (no fake stats)  
- Optional serif wordmark alignment in marketing display type (Lora) — accent only  
