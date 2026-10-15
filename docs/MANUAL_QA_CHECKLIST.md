# Manual QA checklist (Phase 9)

Run after `npm run build` and `npm run start` (or staging deploy). Record date and environment.

## Automated (run first)

```bash
npm run qa      # build + API tests + HTTP smoke
# or separately:
npm run smoke   # after build, against next start
```

## Responsive widths

| Width | Homepage | Privacy | Terms | Notes |
|-------|----------|---------|-------|-------|
| 390px | ☐ | ☐ | ☐ | Mobile menu, form fields |
| 768px | ☐ | ☐ | ☐ | Tablet nav |
| 1280px | ☐ | ☐ | ☐ | Desktop layout |
| 1920px | ☐ | ☐ | ☐ | Max-width containers |

## Navigation

- ☐ Sticky header does not cover anchor targets (scroll-margin)
- ☐ Active section highlights in nav while scrolling
- ☐ Mobile menu opens/closes; Escape closes
- ☐ “Request a Demo” scrolls to `#contact`

## Product showcase

- ☐ Tab keyboard navigation
- ☐ Previous/next controls and keyboard where implemented
- ☐ Images lazy-load below hero

## Demo form (`#contact`)

- ☐ Success message after valid submit (Laravel running + migration applied)
- ☐ Validation errors for empty required fields
- ☐ Honeypot filled → silent success (no leak to user)
- ☐ Rate limit (6th rapid submit) → friendly 429 message
- ☐ Laravel stopped → generic error (no stack trace)

## Content accuracy

- ☐ No attendance, mobile app, pricing, or fake testimonials
- ☐ BCC described as Life Groups / Basic Christian Communities where mentioned
- ☐ Grep: `src/content` matches [PROHIBITED_MARKETING_CLAIMS.md](PROHIBITED_MARKETING_CLAIMS.md)

## SEO / legal

- ☐ View source: canonical, OG image `/images/og/og-preview.png`
- ☐ `/privacy` and `/terms` show `noindex`
- ☐ `robots.txt` and `sitemap.xml` load

## Security headers (production or `next start`)

- ☐ `X-Content-Type-Options: nosniff`
- ☐ `Content-Security-Policy` present (see `next.config.ts`)
- ☐ No `NEXT_PUBLIC_LARAVEL_*` in env

## Sign-off

| Role | Name | Date |
|------|------|------|
| Engineering | | |
| Product / marketing | | |
