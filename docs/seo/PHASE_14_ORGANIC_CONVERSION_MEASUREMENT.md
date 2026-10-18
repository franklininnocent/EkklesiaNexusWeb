# Phase 14 — Organic conversion measurement

## Existing implementation (repo)

| Event | Trigger | GA4 name | PII sent |
|-------|---------|----------|----------|
| `contact_form_submit` | Successful contact API response | `contact_form_submit` | **No** form fields |
| `login_click` | Open Application CTAs | `login_click` | No |
| `demo_form_submit` / open | Demo form success / open | `demo_request_submit` / unmapped open | No |
| `cta_click` | Selected CTAs | Partial → `login_click` or skip | Label only (no PII) |

Source: `src/lib/analytics.ts`, `ga4-events.ts`, `MarketingAnalytics` (env + CMS gated).

## Production status

**UNVERIFIED** — `NEXT_PUBLIC_ANALYTICS_ENABLED` and measurement ID on production not confirmed (SEO-006).

## Organic attribution (when GA4 available)

| Dimension | Definition |
|-----------|------------|
| Organic landing | GA4 session with default channel = Organic Search |
| Conversion | `contact_form_submit` count / organic sessions (denominator explicit) |
| Locale | Page path `/` vs `/pt-br` — not same as country pricing |

## Not measured / do not add without approval

- Form field contents, email, phone
- `contact_form_start` (not implemented)
- New third-party pixels

## Consent

Preserve existing consent behavior; legal review before enabling production GA4.
