# Prohibited marketing claims (V1)

Do **not** state or imply the following on the public marketing website, metadata, or structured data. The content validator (`npm run validate:content`) scans for several of these in `src/content/`.

## Non-existent or retired product capabilities

| Claim | Evidence |
|-------|----------|
| **Attendance** (tracking, check-in, roll call) | No `Attendance` module; permissions retired (`UnsupportedAttendancePermissionsTest`, migration `retire_unsupported_attendance_permissions`) |
| Mobile app / mobile giving app | No consumer mobile app in repo |
| Event calendar / event management | No Events module; legacy catalog codes non-public |
| Volunteer management | No volunteers module |
| Group portal / member self-service portal | No Groups module |
| General messaging / communication platform | Notifications + limited stewardship outreach only; not a comms suite |
| AI / predictive analytics / BI platform | Not parish marketing scope unless implemented and verified |

## Fake trust signals

- Customer counts, church counts, diocese counts, revenue figures, percentages  
- Testimonials, star ratings, reviews, awards  
- Customer logos (“trusted by …”) unless real and approved  
- Guaranteed cost savings or guaranteed revenue growth  

## Platform / internal features (not parish marketing)

- Tenants administration  
- Support Center (ops)  
- Application Access  
- Ecclesiastical master catalog administration  
- Subscription catalog administration (platform)  
- Developer-only or Super Admin-only workflows presented as parish features  

## V1 scope exclusions

- Hardcoded plan amounts or feature lists in marketing copy files (`src/content/`) — use the **published** catalog from `GET /api/public/subscription-plans` only  
- “Built with Next.js” (or any stack brag) as a product feature  

## Comparisons

- Do not mention **Attendance** even as “coming soon” or comparison.

## Enforcement

1. `scripts/validate-marketing-content.ts` (prebuild)  
2. Manual review before publishing new copy or screenshots  
3. [FEATURE_VERIFICATION.md](FEATURE_VERIFICATION.md) before adding new feature sections  
