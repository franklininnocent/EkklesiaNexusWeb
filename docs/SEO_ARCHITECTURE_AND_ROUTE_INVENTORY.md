# SEO architecture and route inventory (P0)

**Canonical marketing property:** `https://ekklesianexus.com`  
**Application (noindex):** `https://app.ekklesianexus.com`  
**API (disallow all in robots):** `https://api.ekklesianexus.com`

## Stack

| Layer | Role |
|-------|------|
| `EkklesiaNexusWeb` | Next.js 16 App Router — public marketing, Metadata API, `robots.ts`, `sitemap.ts`, JSON-LD |
| `EkklesiaNexusApi` / Marketing | Published `payload.seo` in `marketing_content_revisions`; Super Admin publish |
| `EkklesiaNexusUi` | Parish app `noindex`; Web Management SEO editor (optional page overrides) |

## Public route inventory

| Route | Index | Notes |
|-------|-------|--------|
| `/`, `/pt-br` | Yes (home) | Hash sections `#features`, `#pricing`, `#testimonials`, `#demo`, `#contact` |
| `/features`, `/features/[slug]` | Yes | English-only; allowlisted slugs in `feature-slugs.ts` |
| `/solutions/catholic-parishes` | Yes | English-only |
| `/about`, `/contact` | Yes | English-only |
| `/privacy`, `/terms`, `/pt-br/privacy`, `/pt-br/terms` | **No** | Legal placeholders |
| `/preview/plans` | **No** | Token preview; `robots` disallow `/preview/` |
| `/api/*` BFF | **No** | Disallow in `robots.ts` |
| Unknown paths | 404 | `not-found.tsx`, noindex |

## Feature-to-SEO map (intent → URL)

| Intent | Primary URL | Source |
|--------|-------------|--------|
| Church management (category) | `/` | Homepage + CMS `home` SEO |
| Catholic parish management | `/solutions/catholic-parishes` | `solutions.ts` + static defaults |
| Families | `/features/family-management` | `content/features.ts` |
| Members | `/features/member-management` | `content/features.ts` |
| Sacramental registers | `/features/sacramental-registers` | `content/features.ts` |
| Mass intentions | `/features/mass-intentions` | `content/features.ts` |
| Ministries / BCC | `/features/ministries-and-groups` | `content/features.ts` |
| Stewardship / finance | `/features/stewardship-and-finance` | `content/features.ts` |
| Reports / analytics | `/features/church-analytics` | `content/features.ts` |
| Pricing (demonstration) | `/#pricing` | **Frozen** regional mock — not catalog API |
| Brand / about | `/about` | Static + optional CMS |
| Contact | `/contact` | BFF `contact-enquiries` |
| Features hub | `/features` | Links to all allowlisted slugs |

Competitor and SERP notes: [`SEO_INTENT_AND_COMPETITOR_NOTES.md`](SEO_INTENT_AND_COMPETITOR_NOTES.md).  
Product inventory: [`FEATURE_VERIFICATION.md`](FEATURE_VERIFICATION.md).

## CMS SEO page ids

| Id | Required on publish | Path |
|----|---------------------|------|
| `home`, `privacy`, `terms` | Yes | `/`, `/privacy`, `/terms` |
| `features`, `about`, `contact`, `solutionsCatholicParishes` | No (code defaults) | Matching static routes |

Feature **detail** slugs are not CMS page ids; metadata defaults live in `feature-slugs.ts` with optional CMS override only when the same `id` is added to payload in future.
