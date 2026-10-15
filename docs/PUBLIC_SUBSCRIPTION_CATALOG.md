# Public subscription catalog (marketing)

## Source of truth

- **Subscription configuration:** `subscription_plans`, ACTIVE `plan_versions`, entitlements, and features (Settings → Subscription).
- **Marketing publication:** `marketing_plan_catalog_revisions` + singleton `marketing_plan_catalog_publication` (Web Management → Subscription plans).

Activating a subscription plan version does **not** update the marketing website. Super Admin must **Generate preview** and **Approve & Publish** in Web Management.

Plan-specific **Show on website / Hide on website** flags live on the draft marketing revision (`feature_visibility`). They never change `plan_entitlements` or tenant access. The public API returns only the filtered `payload`.

## Public API

`GET /api/public/subscription-plans` returns `{ success: true, data: PublicPlanCard[] }` from the **currently published marketing revision only**. If nothing is published, `data` is `[]`.

Preview (draft only, token-scoped): `GET /api/public/marketing-plan-catalog/preview?token=…`

## Next.js

- **Public homepage `#pricing`** uses regional demonstration data (`regional-pricing.ts`), not this API. That keeps marketing copy independent of the published catalog until product explicitly approves a catalog-backed `/pricing` URL.
- Server fetch: `fetchPublishedSubscriptionPlans()` using `LARAVEL_API_URL` (used for `/preview/plans` and internal flows).
- ISR: `revalidate: 60` on the homepage pricing section.
- Optional on-demand refresh: `POST /api/revalidate-plans` with header `X-Revalidate-Secret` (must match `MARKETING_REVALIDATE_SECRET` on both apps).
- Live preview: `/preview/plans?token=…` (noindex). Local dev: `npm run dev` serves **port 3010** (matches Angular `websiteUrl`).
- Embedded preview in the parish app requires `MARKETING_PREVIEW_FRAME_ANCESTORS` (optional; defaults include `http://localhost:4200` in development).
- Set `LARAVEL_API_URL` on the Next.js host so preview pages can load draft plans from the API.

## Cache

- Laravel: `marketing:published_plan_catalog` (forgotten only after successful marketing publication).
- Typical visitor lag: up to ~60s without revalidate hook; faster when `MARKETING_REVALIDATE_SECRET` is configured.
