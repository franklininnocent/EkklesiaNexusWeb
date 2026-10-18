# SEO monitoring operating procedure

**Product:** EkklesiaNexus marketing site (`https://ekklesianexus.com`)  
**Locales:** `en-US` (`/`), `pt-BR` (`/pt-br`)  
**Authority:** Single issue register — [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md)

## Roles

| Role | Responsibility |
|------|----------------|
| SEO operator | Weekly automation + GSC/GA4 manual sections |
| DevOps | Deploy, Apache host isolation, GSC file on production |
| Super Admin | Web Management runbook in app (`/settings/marketing-website/seo-monitoring`) |

## Weekly (15–20 minutes)

1. Run `npm run monitor:weekly:production` from `EkklesiaNexusWeb` (or `bash scripts/check-production-seo-baseline.sh` for legacy table).
2. Complete [templates/WEEKLY_SEO_HEALTH_CHECK.md](templates/WEEKLY_SEO_HEALTH_CHECK.md) — paste automated output; fill GSC as **UNAVAILABLE — MANUAL REVIEW REQUIRED** if no access.
3. Log failures in [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md).
4. Escalate per [SEO_ALERTING_AND_ESCALATION.md](SEO_ALERTING_AND_ESCALATION.md).

## Monthly (45–60 minutes)

1. Use last complete **28 days** vs prior **28 days** in Search Console ([workflow](PHASE_14_SEARCH_CONSOLE_MONITORING_WORKFLOW.md)).
2. Fill [templates/MONTHLY_SEO_PERFORMANCE_REPORT.md](templates/MONTHLY_SEO_PERFORMANCE_REPORT.md).
3. Update [PHASE_14_CTR_AND_SERP_EXPERIMENT_REGISTER.md](PHASE_14_CTR_AND_SERP_EXPERIMENT_REGISTER.md) if experiments ran.
4. Review [PHASE_14_ORGANIC_CONVERSION_MEASUREMENT.md](PHASE_14_ORGANIC_CONVERSION_MEASUREMENT.md) for GA4 (if enabled).

## Quarterly (2–4 hours)

1. Complete [templates/QUARTERLY_SEO_AUDIT.md](templates/QUARTERLY_SEO_AUDIT.md).
2. Run `bash scripts/record-phase0-14-production-verification.sh`.
3. Run `npm run test:unit` and `npm run build`.
4. Update [templates/NEXT_90_DAY_SEO_ROADMAP.md](templates/NEXT_90_DAY_SEO_ROADMAP.md).

## Data limitations

- Never substitute **0** for missing GSC/GA4 data — use **UNAVAILABLE**.
- Automated checks do not prove indexing; URL Inspection is manual.
- Production P0 issues (GSC 404, host leak) block meaningful performance baselines until resolved.

## Related

- [SEO_MONITORING_COMMANDS.md](SEO_MONITORING_COMMANDS.md)
- [PHASE_0_14_MONITORING_READINESS.md](PHASE_0_14_MONITORING_READINESS.md) (superseded by this procedure for cadence)
- [scheduling.example.cron](scheduling.example.cron)
