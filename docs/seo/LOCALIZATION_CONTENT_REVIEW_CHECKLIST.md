# Localization and international SEO review checklist

Use before publishing or materially updating **en-US** or **pt-BR** marketing content.

## 1. Scope and locale

- [ ] Change applies only to `en-US` and/or `pt-BR` — no new locales.
- [ ] Routes `/` and `/pt-br` unchanged unless explicitly approved.
- [ ] English-only paths (`/features`, `/about`, `/contact`, `/solutions/*`) not falsely paired with `/pt-br` hreflang.

## 2. Product accuracy

- [ ] Claims match [FEATURE_VERIFICATION.md](../FEATURE_VERIFICATION.md).
- [ ] No attendance, data import, Reconciliation certificates, or unverified superlatives (“360°”, “completo” without scope).

## 3. Translation quality (pt-BR)

- [ ] Natural Brazilian Portuguese (not literal English).
- [ ] Catholic / parish terminology reviewed where sensitive — **native speaker sign-off** when material.
- [ ] Status recorded: Verified | Technically validated | Needs correction | Incomplete | Blocked.

## 4. i18n keys

- [ ] `npm run validate:i18n` passes (key parity).
- [ ] No raw keys visible in UI.
- [ ] Interpolation placeholders match between locales.

## 5. Metadata and hreflang

- [ ] Unique title/description per locale where localized.
- [ ] Self-referencing **canonical** on each indexable localized URL.
- [ ] `alternates.languages` only for true equivalents (home, privacy, terms).
- [ ] `x-default` points to English home (`/`) — confirmed appropriate.

## 6. Sitemap

- [ ] New indexable URLs added only via existing sitemap mechanism.
- [ ] No `/es` or duplicate locale URLs.

## 7. Pricing and country

- [ ] No hardcoded plan prices in copy or JSON-LD.
- [ ] Language switch does **not** change visitor-country pricing logic.
- [ ] pt-BR locale ≠ forced Brazil pricing for English visitors.

## 8. Language switcher

- [ ] Only EN / PT labels; `switchLocalePath` tested for current path.
- [ ] English-only pages: switching locale does not imply translated content exists.

## 9. Tests

- [ ] `npm run validate:content`
- [ ] `npm run test:unit` (includes `phase11-international-seo.test.ts`)
- [ ] Playwright `e2e/i18n.spec.ts` when switcher or home copy changes.

## 10. Approval

- [ ] Native-language review completed (pt-BR marketing claims).
- [ ] Deploy authorized separately.
