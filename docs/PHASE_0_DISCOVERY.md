# Phase 0 — Discovery & Product Truth

**Completed:** 8 Oct 2026  
**Purpose:** Evidence-based inputs for the EkklesiaNexus marketing website (V1). No marketing copy or UI should contradict this document.

**Related artifacts:**

- [FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md) — feature matrix  
- [PROHIBITED_MARKETING_CLAIMS.md](PROHIBITED_MARKETING_CLAIMS.md) — must not appear on the public site  
- [MARKETING_SCREENSHOT_INVENTORY.md](MARKETING_SCREENSHOT_INVENTORY.md) — captures and PII risk  
- [MARKETING_BRANDING_INVENTORY.md](MARKETING_BRANDING_INVENTORY.md) — official identity vs mockups  

---

## 1. Repository landscape

| Application | Path | Role |
|-------------|------|------|
| Laravel API | `/var/www/html/EkklesiaNexus/EkklesiaSoftApi` | Authoritative backend; nwidart modules; PostgreSQL |
| Angular product UI | `/var/www/html/EkklesiaNexus/EkklesiaSoftUi` | Parish & platform app (`localhost:4200`) |
| Marketing site | `/var/www/html/EkklesiaNexus/EkklesiaSoftWeb` | Next.js 16 public marketing (V1) |
| Documents / captures | `/var/www/html/EkklesiaSoftDocuments/` | Screenshots, mockups, branding library |

**Architecture rule (V1):** `Next.js → Laravel → PostgreSQL`. Next.js must not connect to PostgreSQL.

---

## 2. API & public surface (pre–marketing site)

### Enabled API modules (`modules_statuses.json`)

Authentication, Tenants, RolesAndPermissions, EcclesiasticalData, Sacraments, Family, BCC, Donations, MinistriesAssociations, SupportAccess, PastoralCare, SupportTickets, ApplicationAccess, Notifications, Subscriptions, MassIntentions, **Marketing** (demo requests only).

### Public / unauthenticated endpoints (marketing-relevant)

| Method | Path | Module | V1 marketing use |
|--------|------|--------|------------------|
| `POST` | `/api/public/demo-requests` | Marketing | Yes — via Next.js BFF only |
| `GET` | `/api/public/subscription-plans` | Subscriptions | **No** — pricing not in V1 |
| `GET` | `/api/public/sacrament-certificates/verify/{token}` | Sacraments | Product feature; not a marketing page API |
| `POST` | `/api/auth/*` | Authentication | Product login; not marketing |

**No** marketing CMS, FAQ, testimonial, or screenshot APIs existed before V1.

### Response convention

Public controllers use JSON shape: `{ "success": true|false, "message": "...", "data": ... }` (see `PublicPlanController`, `PublicDemoRequestController`).

### CORS

`EkklesiaSoftApi/config/cors.php` allows Angular origins (`FRONTEND_URL`, `localhost:4200`). V1 does **not** add marketing origins; the browser talks only to Next.js.

---

## 3. Parish product navigation (source of truth)

Authoritative parish sidebar: `EkklesiaSoftUi/src/app/layout/sidebar-nav/app-sidebar.config.ts`.

**Parish-facing (marketable to churches):**

- Dashboard, Notifications  
- Church Profile (tree)  
- Families (dashboard, list, members, birthdays, anniversaries)  
- BCCs  
- Sacraments (dashboard, register)  
- Holy Mass / Mass intentions (dashboard, intentions, masses)  
- Stewardship & Donations (via donations sidebar adapter)  
- Ministries & Associations  
- Users, Roles & Permissions  
- Settings (tenant)  
- Support (parish tickets)

**Platform-only (do not market as normal parish features):**

- Tenants, Ministries Insights, Support Center, Application Access  

**Embedded / not top-level nav:**

- Pastoral Care (family/dashboard contexts)  
- Ecclesiastical master data, subscription catalog admin (settings / super-admin paths)

Module map: `docs/ARCHITECTURE.md`.

---

## 4. Terminology lock

| Marketing language | Product reality |
|--------------------|-----------------|
| **Life Groups / Basic Christian Communities (BCCs)** | Module `BCC`; UI label **BCCs** — not a separate “Groups” product |
| **Stewardship & Donations** | Module `Donations`; contributions, plans, dues, projects, campaigns |
| **Contributions** | Same stewardship workspace; not a separate module name |
| **Parish Leadership** | Church Profile leadership; ministries leadership terms |

---

## 5. Mockup vs product (attached website mockup)

**Use for layout inspiration only:** light SaaS, hero + device frame, cards, slider, contact panel.

**Do not implement from mockup:**

- Swirl logo (use official dove library)  
- Pricing, testimonials, fake customer logos  
- Event scheduling, communication tools, group portal, volunteer management, mobile giving app  
- “Trusted by ministries” strip implying customer logos  
- “Built with Next.js” as a product feature  

---

## 6. Marketing CMS

**Decision (V1):** No CMS. Content lives in `EkklesiaSoftWeb/src/content/` behind `getMarketingContent()`. Laravel Marketing module is **demo persistence only**.

---

## 7. Phase 0 exit criteria

| Criterion | Artifact |
|-----------|----------|
| Feature matrix with routes/evidence | [FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md) |
| Prohibited claims documented | [PROHIBITED_MARKETING_CLAIMS.md](PROHIBITED_MARKETING_CLAIMS.md) |
| Screenshot inventory + PII guidance | [MARKETING_SCREENSHOT_INVENTORY.md](MARKETING_SCREENSHOT_INVENTORY.md) |
| Branding inventory | [MARKETING_BRANDING_INVENTORY.md](MARKETING_BRANDING_INVENTORY.md) |
| Attendance explicitly excluded | All of the above + content validator |

**Phase 0 status:** Complete. Safe to proceed with Phases 1–9 per [V1_PHASE_IMPLEMENTATION_PLAN.md](V1_PHASE_IMPLEMENTATION_PLAN.md).
