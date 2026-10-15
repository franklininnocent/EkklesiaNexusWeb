# Protected surface SEO implications (analysis only)

Per product mandate, these homepage areas were **not modified** during the SEO program. This document records SEO/trust/commercial implications for a later approval cycle.

## Testimonials (`testimonials.tsx`, `TESTIMONIAL_*`, `home.testimonials.*`)

| Risk | Implication |
|------|-------------|
| Trust / YMYL | Quotes may be read as real customer endorsements by users and crawlers. |
| Structured data | **Do not** add `Review` or `AggregateRating` JSON-LD while content is not permissioned. |
| E-E-A-T | Weak or fictional social proof can harm brand trust if discovered. |

**Recommendation:** Replace with permissioned stories, staff quotes, or remove section; then reconsider schema.

## Homepage feature cards (`features.tsx`, `FEATURE_ITEMS`, `home.features.*`)

| Risk | Implication |
|------|-------------|
| Inventory gap | Cards are a **subset** of product; `/features` and detail pages carry the full verified map. |
| Cannibalization | Low if titles differ; hub/detail pages target long-tail intents. |
| Accuracy | Card copy may drift from `FEATURE_VERIFICATION.md` until aligned. |

**Recommendation:** Optional copy alignment pass; do not remove cards without product/UX sign-off.

## Demonstration pricing (`pricing.tsx`, `regional-pricing.ts`, `home.pricing.*`)

| Risk | Implication |
|------|-------------|
| Commercial accuracy | Amounts are **not** `GET /api/public/subscription-plans`; crawlers index `#pricing` content on `/`. |
| SERP | `#pricing` is not a separate URL; competitors use `/pricing`. |
| Conflict | Future catalog `/pricing` must be approved so it does not contradict homepage demo. |

**Recommendation:** After approval, ship `/pricing` from published marketing catalog; decide whether `#pricing` stays demo or matches catalog.

## Trust strip (`trust.tsx` and related copy)

| Risk | Implication |
|------|-------------|
| Unverifiable claims | “Trusted by…” or numeric stats without evidence create regulatory/reputation risk. |

**Recommendation:** Audit against real customers or soften to factual product statements.

## Scanners

Prohibited-claim validators intentionally **do not** scan frozen i18n keys (see [`PROHIBITED_MARKETING_CLAIMS.md`](PROHIBITED_MARKETING_CLAIMS.md)). CMS SEO fields and new static copy remain scanned in API/Next validators.
