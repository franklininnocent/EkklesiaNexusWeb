# Phase 9 — SEO experiment register

Record hypotheses before deploy; fill outcomes only from real GSC/analytics data.

| ID | Hypothesis | Evidence | Page / change | Primary metric | Guardrails | Start | Review | Outcome |
|----|------------|----------|---------------|----------------|------------|-------|--------|---------|
| EXP-001 | English footer link to Catholic overview improves discovery of `/solutions/catholic-parishes` | Phase 5 cluster priority; no GSC yet | Footer + tests | GSC clicks/impressions on Catholic URL | Bounce, contact quality | [Pending deploy] | 28d post-deploy | [Awaiting GSC] |
| EXP-002 | Richer member + Mass intention copy improves relevance for evaluation queries | Phase 5 gaps; no volume data | `/features/member-management`, `/features/mass-intentions` | GSC queries landing on those URLs | No increase in misleading enquiries | [Pending deploy] | 28d post-deploy | [Awaiting GSC] |
| EXP-003 | Contact meta description better matches commercial evaluation intent | Qualitative; no CTR baseline | `/contact` metadata | GSC CTR for contact URL | Form spam rate | [Pending deploy] | 28d post-deploy | [Awaiting GSC] |
| EXP-004 | About + contact cross-links improve Catholic/feature path without cannibalizing home | Internal link audit | `/about`, `/contact` body links | GSC landing mix | Home branded clicks | [Pending deploy] | 28d post-deploy | [Awaiting GSC] |

**Decision rule:** If GSC remains unavailable 60 days post-deploy, review via Search Console operator runbook and manual URL Inspection only; do not declare experiments successful.
