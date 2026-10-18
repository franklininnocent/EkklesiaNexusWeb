# Content quality and SEO review checklist

Reuse before publishing or materially updating any public marketing page.

## 1. Topic and intent

- [ ] Target audience is named (e.g. parish secretary, treasurer, IT evaluator).
- [ ] Primary search intent is documented (informational, commercial evaluation, branded).
- [ ] Page purpose is unique vs other indexable URLs on the site.

## 2. Product accuracy

- [ ] Claims checked against [FEATURE_VERIFICATION.md](../FEATURE_VERIFICATION.md).
- [ ] No attendance, data import, Reconciliation certificates, mobile giving, or AI analytics unless verified.
- [ ] Limitations / scope section present where competitors might assume broader features.
- [ ] No fabricated testimonials, logos, counts, awards, or certifications.

## 3. Pricing and commercial

- [ ] No hardcoded subscription prices in copy or JSON-LD.
- [ ] Pricing references point to homepage `#pricing` or API-driven UI only.
- [ ] No invented plans, discounts, or tax rules.

## 4. Copy and structure

- [ ] Headings follow a logical outline; no keyword stuffing.
- [ ] First screen states what EkklesiaNexus is and who the page serves.
- [ ] CTAs match page intent (contact, features, app sign-in).
- [ ] Grammar and readability reviewed.

## 5. SEO metadata

- [ ] Unique `seoTitle` and `seoDescription` (or CMS override documented).
- [ ] Canonical URL correct for locale.
- [ ] `robots` appropriate (indexable marketing vs noindex legal).
- [ ] hreflang / alternates unchanged unless locale work is approved.

## 6. Internal links

- [ ] Links use descriptive anchors; no localhost/staging/IP URLs.
- [ ] Destinations are indexable where intended.
- [ ] See [PHASE_9_INTERNAL_LINKING_PLAN.md](PHASE_9_INTERNAL_LINKING_PLAN.md).

## 7. Locale

- [ ] English-only routes (`/features`, `/solutions/*`, `/about`, `/contact`) not broken for pt-BR home.
- [ ] No automatic pt-BR translation of new English strings without native review.
- [ ] No new locales without approval.

## 8. Technical

- [ ] `npm run validate:content` and `validate:i18n` pass.
- [ ] `npm run test:unit` pass.
- [ ] Playwright SEO/i18n specs pass if routes or footer changed.
- [ ] `npm run build` pass before deploy authorization.

## 9. Governance workflow

1. Topic approved  
2. Search intent established  
3. Product facts verified  
4. Draft reviewed  
5. SEO metadata checked  
6. Internal links verified  
7. Accessibility and performance spot-check  
8. Business owner approves material claims  
9. Tests pass  
10. **Deploy authorized separately**
