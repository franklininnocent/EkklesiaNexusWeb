# Public subscription catalog (marketing)

## Source of truth

- **Subscription configuration:** `subscription_plans`, ACTIVE `plan_versions`, entitlements, and features (Settings → Subscription).
- **Marketing publication:** `marketing_plan_catalog_revisions` + singleton `marketing_plan_catalog_publication` (Web Management → Subscription plans).

Activating a subscription plan version does **not** update the marketing website. Super Admin must **Generate preview** and **Approve & Publish** in Web Management.

Plan-specific **Show on website / Hide on website** flags live on the draft marketing revision (`feature_visibility`). They never change `plan_entitlements` or tenant access. The public API returns only the filtered `payload`.

## Public API

`GET /api/public/subscription-plans` (e.g. `https://api.ekklesianexus.com/api/public/subscription-plans`) returns `{ success: true, data: PublicPlanCard[] }` from the **currently published marketing revision only**. If nothing is published, `data` is `[]`.

Each plan includes `regional_prices` built from **`plan_catalog_prices`** (`IN` / `US` / `BR` rows → INR / USD / BRL). If an `IN` row is missing at publish time, INR is taken from the active `plan_version` until admins add the India row.

Preview (draft only, token-scoped): `GET /api/public/marketing-plan-catalog/preview?token=…`

## Next.js

- **Public homepage `#pricing`** loads `fetchPublishedSubscriptionPlans()` and selects amounts from each plan’s `regional_prices` block using trusted visitor country (IN→INR, BR→BRL, else USD). Each card always shows **Show Price**; the revealed amount comes from the published API catalog. If the catalog is unpublished or a regional amount is missing, the control still appears and reveals a contact prompt rather than a fabricated price. Card layout stays in the marketing UI; amounts never come from hardcoded catalogs or FX.
- Visitor country: nginx sets `X-EN-Geo-Country` from GeoIP or Cloudflare and `X-EN-Geo-Token` (must match `MARKETING_GEO_HEADER_SECRET`). Local dev may use `MARKETING_VISITOR_COUNTRY` when geo headers are absent.
- Plan JSON fetch: `revalidate: 60` (country-independent). Homepage HTML is `force-dynamic` / private so one region’s prices are not cached for another.
- Optional on-demand refresh: `POST /api/revalidate-plans` with header `X-Revalidate-Secret` (must match `MARKETING_REVALIDATE_SECRET` on both apps).
- Live preview: `/preview/plans?token=…` (noindex). Local dev: `npm run dev` serves **port 3010** (matches Angular `websiteUrl`).
- Embedded preview in the parish app requires `MARKETING_PREVIEW_FRAME_ANCESTORS` (optional; defaults include `http://localhost:4200` in development).
- Set `LARAVEL_API_URL` on the Next.js host so preview pages can load draft plans from the API.

## Cache

- Laravel: `marketing:published_plan_catalog` (forgotten only after successful marketing publication).
- Typical visitor lag: up to ~60s without revalidate hook; faster when `MARKETING_REVALIDATE_SECRET` is configured.
