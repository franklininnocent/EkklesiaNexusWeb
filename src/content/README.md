# Marketing content modules (V1)

All public copy lives here as typed TypeScript. **Do not** import these modules from UI components—use `getMarketingContent()` from `@/lib/marketing/get-content`.

| Module | Export | Role |
|--------|--------|------|
| `contract.ts` | `marketingCopyContract` | Locked slogan + supporting line |
| `site.ts` | `siteContent` | Brand name, SEO title/description |
| `navigation.ts` | `navigationContent` | Header anchors |
| `hero.ts` | `heroContent` | Hero H1, CTAs, hero image |
| `trust.ts` | `valueStripContent` | Value pillar strip |
| `features.ts` | `featureCategoriesContent` | Feature ecosystem |
| `solutions.ts` | `solutionsContent` | Solution blocks |
| `reports.ts` | `reportsContent` | Reports narrative section |
| `workflow.ts` | `workflowContent` | Daily workflow steps |
| `advantages.ts` | `advantagesContent` | Eleven advantage cards |
| `audiences.ts` | `audiencesContent` | Role-based audiences |
| `screenshots.ts` | `screenshotsContent` | Product showcase tabs |
| `cta.ts` | `whyContent`, `church360Content`, `finalCtaContent`, `footerContent` | Narrative + footer |

Validation: `npm run validate:content` (also runs on `npm run build`).
