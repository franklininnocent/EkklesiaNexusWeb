# Quarterly SEO audit

**Quarter:** ___________  
**Auditor:** ___________  
**Duration:** target 2–4 hours

## Technical SEO

- [ ] Domain / HTTPS / www behavior
- [ ] Canonicals, robots, sitemap (run `npm run monitor:weekly:production`)
- [ ] Metadata + JSON-LD sample review
- [ ] Host leak recheck
- [ ] Production vs repo drift (`record-phase0-14-production-verification.sh`)

## Content and intent

- [ ] GSC pages/queries trends (if available)
- [ ] Unsupported claims scan (`npm run validate:content`)

## International

- [ ] `/` and `/pt-br` hreflang/canonical
- [ ] Locale vs country pricing separation (no code change — observation only)

## Performance and accessibility

- [ ] PageSpeed Insights — `/`, `/pt-br` (lab + field if shown)
- [ ] Manual a11y spot check

## Off-page

- [ ] GSC links sample / [PHASE_14_OFF_PAGE_MONITORING_REGISTER.md](../PHASE_14_OFF_PAGE_MONITORING_REGISTER.md)

## Next 90 days

Complete [NEXT_90_DAY_SEO_ROADMAP.md](NEXT_90_DAY_SEO_ROADMAP.md)
