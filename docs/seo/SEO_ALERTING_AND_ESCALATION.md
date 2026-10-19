# SEO alerting and escalation

## Immediate investigation (Critical)

- Apex `/` or `/pt-br` unavailable (5xx or persistent failure).
- Site-wide accidental `noindex` on marketing homes.
- Canonical domain redirects to unexpected host.
- Credible security/privacy exposure on public marketing surface.

**Action:** DevOps + engineering; log SEO-AUDIT/issue ID; do not deploy untested fixes to production without rollback plan.

## Prompt investigation (High)

- Sitemap invalid or non-200 after deploy.
- GSC verification file 404 when deploy expected complete.
- Important page excluded from indexing (GSC evidence).
- Material broken internal links on key journeys.
- Host leak (unauthorized host / raw IP serving marketing HTML).

**Action:** Within 1–2 business days; reference [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md).

## Planned investigation (Medium / Low)

- Sustained organic performance change (GSC, sufficient data).
- Content/CTR experiment follow-up.
- Lab performance regression.
- Accessibility finding from manual QA.

## Alert content (required)

Each escalation note must include: what failed, URL/component, detection time, evidence, severity, immediate safe checks, owner.

## Verification before close

Status **VERIFIED — CLOSED** only after reproduced fix evidence (script output, GSC screenshot date, or test pass). See issue register glossary in [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md).
