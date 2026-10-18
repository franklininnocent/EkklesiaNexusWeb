# Phase 14 — CTR and SERP experiment register

Carries forward [PHASE_9_EXPERIMENT_REGISTER.md](PHASE_9_EXPERIMENT_REGISTER.md) with Phase 14 measurement rules.

| ID | Hypothesis | URL | Baseline period | Change | Primary metric | Guardrails | Start | Review | Outcome |
|----|------------|-----|-----------------|--------|----------------|------------|-------|--------|---------|
| EXP-001 | Footer Catholic link improves discovery | `/solutions/catholic-parishes` | [Awaiting GSC] | Phase 9 footer link | Clicks, impressions | Bounce | Post-deploy | +28d | **Pending** |
| EXP-003 | Contact meta aligns evaluation intent | `/contact` | [Awaiting GSC] | Phase 9 description | CTR, enquiries | Spam | Post-deploy | +28d | **Pending** |
| EXP-P14-001 | Deploy fixes home snippet vs 360° copy | `/` | Live 2026-10-18 (old title) | Deploy repo `seoTitle` | CTR, branded queries | Position mix | Post-deploy | +28d | **Pending** |

**Decision rule:** Need ≥28d GSC + stable impressions; document confounding (deploy, seasonality, host leak fix).

Do not run simultaneous title + H1 + body changes on same URL without staggered evaluation.
