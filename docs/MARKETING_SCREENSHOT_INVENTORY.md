# Marketing screenshot inventory

**Source directory:** `/var/www/html/EkklesiaNexusDocuments/*.png`  
**Published copies (V1):** `EkklesiaNexusWeb/public/images/product/`

## Approved for marketing (aggregate / low PII risk)

Review before every public release; demo parishes may still show fictional names.

| Source file | Published as | Module | Notes |
|-------------|--------------|--------|--------|
| `Dashboard.png` | `dashboard.png` | Dashboard | Hero + reports |
| `Dashboard2.png` | (alt) | Dashboard | Backup angle |
| `FamilyPage.png` | `families.png` | Families | List/dashboard |
| `Sacraments.png` | `sacraments.png` | Sacraments | Register/list |
| `DonationsDashboard.png` | `donations.png` | Stewardship | Overview |
| `SpecialProjects.png` | `projects.png` | Projects/campaigns | |
| `Ministries.png` | `ministries.png` | Ministries | |
| `ParishLeadership.png` | `leadership.png` | Leadership | |
| `Mass&Intensions.png` | `mass-intentions.png` | Mass | |

## Use only after explicit PII scrub or crop

| Source file | Risk |
|-------------|------|
| `FamilyDetailsPage.png` | Addresses, phones, member PII |
| `FamilyFinanceDetails*.png` | Financial detail, amounts, identifiers |
| `MemberDetails1.png` | Individual PII |
| `MemberCelebrations.png` | Names, dates |
| `Permissions*.png` | Internal RBAC |
| `BCC-DetailsPage*.png` | Member lists |
| `AddSacraments.png` | Form-level PII possible |
| `SupportSystem.png` | Ops/support context |

## Not required for V1 homepage

`ChurchProfile.png`, `CreateMassIntension.png`, `MassSchedule.png`, `EkklesiaNexusIntroduction.png`, duplicate `*1.png` variants — available for future crops.

## Sanitization checklist (before `public/images/product/`)

- [ ] No real person names (unless approved synthetic demo)  
- [ ] No phone numbers or email addresses  
- [ ] No home addresses  
- [ ] No family codes / internal IDs in readable form  
- [ ] No private notes  
- [ ] No `localhost` or dev URLs in browser chrome  
- [ ] Currency display is acceptable for demo parish only  

## Mockup assets

`EkklesiaNexusDocuments/Website/mockups/` — design reference only; not product screenshots.
