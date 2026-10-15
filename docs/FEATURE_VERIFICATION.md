# Feature verification matrix (internal)

**Phase 0 deliverable.** Update this file when product modules change.

Legend:

- **Exists** — implemented in API/UI for parishes  
- **Tenant accessible** — normal parish user can use (with permissions)  
- **Marketing approved** — allowed on public marketing site in V1  
- **Screenshot** — file under `public/images/product/` if used  
- **Sanitized** — passed [MARKETING_SCREENSHOT_INVENTORY.md](MARKETING_SCREENSHOT_INVENTORY.md) checklist  
- **Evidence** — primary code location  

---

## Parish-facing — marketing approved

| Feature | Exists | Tenant | Marketing | Screenshot | Sanitized | Evidence |
|---------|--------|--------|-----------|------------|-----------|----------|
| Dashboard | Yes | Yes | Yes | dashboard.png | Review | `EkklesiaSoftUi` `/dashboard`; `Family` dashboard panels |
| Families | Yes | Yes | Yes | families.png | Review | API `Modules/Family`; UI `/families` |
| Members | Yes | Yes | Yes | (families) | Review | UI `/members/list`, celebrations |
| Sacraments | Yes | Yes | Yes | sacraments.png | Review | API `Modules/Sacraments`; UI `/sacraments` |
| Sacrament certificates | Yes | Yes | Yes | — | — | Certificate controllers; generate/print |
| Certificate verification (public) | Yes | Yes | Yes* | — | — | `GET /api/public/sacrament-certificates/verify/{token}` — parish feature, not marketing page |
| Stewardship & donations | Yes | Yes | Yes | donations.png | Review | API `Modules/Donations`; UI donations feature |
| Contribution plans | Yes | Yes | Yes | — | — | Donations plans UI/API |
| Contribution dues / outstanding | Yes | Yes | Yes | — | — | Dues controllers |
| Projects | Yes | Yes | Yes | projects.png | Review | Donation projects |
| Project installments | Yes | Yes | Yes | — | — | Installment dues |
| Campaigns | Yes | Yes | Yes | — | — | Donation campaigns |
| Ministries & associations | Yes | Yes | Yes | ministries.png | Review | `Modules/MinistriesAssociations` |
| BCCs / Life Groups | Yes | Yes | Yes | — | — | API `Modules/BCC`; UI **BCCs** — market as Life Groups / BCCs |
| Parish leadership | Yes | Yes | Yes | leadership.png | Review | Church Profile leadership |
| Mass & mass intentions | Yes | Yes | Yes | mass-intentions.png | Review | `Modules/MassIntentions` |
| Reports & insights | Yes | Yes | Yes | reports.png | Review | Donations reports, dashboards, data export (role-gated) |
| Users | Yes | Yes | Yes | — | — | `/users` |
| Roles & permissions | Yes | Yes | Yes | — | — | Settings roles |
| Church settings / profile | Yes | Yes | Yes | — | — | Church profile, tenant settings |
| Notifications (in-app) | Yes | Yes | Optional mention | — | — | Not a “messaging platform” |
| Parish support tickets | Yes | Yes | Optional mention | — | — | `/support` |
| Pastoral care | Yes | Yes | Optional mention | — | — | Family/dashboard — not standalone nav |
| Demo / contact request | Yes | N/A (public) | Yes | — | — | `POST /api/public/demo-requests` |

\*Verification endpoint is a real product capability; describe accurately, do not overclaim.

---

## Exists — not for parish marketing

| Feature | Exists | Tenant | Marketing | Evidence |
|---------|--------|--------|-----------|----------|
| Tenants (platform) | Yes | Platform only | **No** | Sidebar `tenants` |
| Ministries Insights | Yes | Platform only | **No** | `/platform/ministries` |
| Support Center | Yes | Ops only | **No** | `SupportAccess` |
| Application Access | Yes | Platform only | **No** | `ApplicationAccess` |
| Ecclesiastical master catalog | Yes | Super-admin settings | **No** | `EcclesiasticalData` |
| Subscription catalog admin | Yes | Platform | **No** | Subscriptions admin UI |
| Public subscription plans API | Yes | Public read | **No in V1** | No pricing section |

---

## Does not exist — never market

| Claim | Marketing | Evidence |
|-------|-----------|----------|
| **Attendance** | **NOT APPROVED** | Permissions retired; no module |
| Mobile giving app | **No** | No mobile app codebase |
| Event calendar | **No** | No Events module |
| Volunteer management | **No** | No module |
| Group portal | **No** | No Groups module |
| General communication / messaging suite | **No** | See notifications only |
| AI / predictive analytics | **No** | Not verified |

---

## Sign-off

| Role | Phase 0 |
|------|---------|
| Engineering | Matrix derived from `app-sidebar.config.ts`, `modules_statuses.json`, API routes (8 Oct 2026) |
| Marketing / product | Review screenshots and copy against this matrix before launch |

**Attendance:** must remain absent from all public marketing content and validators.
