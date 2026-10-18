# Phase 10 — Ethical link building, digital PR, brand authority & off-page SEO

**Executive status:** **Partially complete** — governance, baseline, opportunity register, outreach drafts, and resource plan delivered in-repo. **Blocked** on P0 technical SEO, GSC link data, authorized outreach, and any new on-site resource publication.

**Date:** 2026-10-18 (UTC)  
**Code changes:** **None** (documentation and operational frameworks only)  
**Outreach sent:** **None**  
**Earned links verified:** **None**

---

## 1. Scope

| In scope | Out of scope (Phase 10) |
|----------|-------------------------|
| Off-page baseline & limitations | Deploy, DNS, Apache |
| Ethical governance policy | Paid links, PBNs, spam outreach |
| Opportunity + outreach registers (empty execution) | Auto directory signup |
| Outreach **templates** for human review | Sending email or creating accounts |
| Link-worthy resource **plan** (R-001 recommended) | Publishing `/resources/*` without approval |
| Monthly off-page report template | Fabricated DA/backlink metrics |

---

## 2. Previous phases reviewed

| Phase | Status | Relevance to off-page |
|-------|--------|------------------------|
| 3 / 3B | Partial — **P0 host leak open** | Fix before scaling PR |
| 4–7 | Repo complete; prod uncertain | Stale site weakens citations |
| 8 | Measurement runbooks | GSC Links still blocked |
| 9 | Growth + internal links | Stronger citation targets |

See [PHASE_10_OFF_PAGE_BASELINE.md](PHASE_10_OFF_PAGE_BASELINE.md), [SEO_ISSUE_REGISTER.md](SEO_ISSUE_REGISTER.md).

---

## 3. Research methodology

1. Repository and docs audit (Phases 3–9, competitor notes, feature verification).  
2. Production read-only recheck (`check-production-seo-baseline.sh`).  
3. No authorized third-party backlink API or GSC.  
4. Competitor/adjacent positioning from public product category only—**no** link profile copying.  
5. Opportunities marked **Research required** where publication URL/contact not verified in-repo.

---

## 4. Opportunity scoring model (summary)

Nine factors scored 1–3 (see [PHASE_10_LINK_OPPORTUNITY_REGISTER.md](PHASE_10_LINK_OPPORTUNITY_REGISTER.md)):

1. Audience relevance  
2. Editorial quality  
3. Topical relevance  
4. Audience value (traffic independent of SEO)  
5. Link justification  
6. Authenticity  
7. Effort (higher score = lower effort)  
8. Risk (higher score = lower risk)  
9. Evidence confidence  

**Reject** regardless of score if manipulative (LOP-008, LOP-009).

---

## 5. Strategy selected

1. **Fix P0 technical** so earned links consolidate on `https://ekklesianexus.com`.  
2. **Cite existing depth** (`/solutions/catholic-parishes`, `/features/*`) in ethical outreach—no new thin pages.  
3. **Approve and publish R-001 evaluation checklist** when ready—primary linkable asset.  
4. **Directory/review** (Capterra, G2) only with owner approval and accurate dynamic-pricing wording.  
5. **Digital PR:** small-batch, personalized educational pitches—not press-release SEO.  
6. **Brand confusion:** monitor confusable “Ekklesia*” names; correct misattribution with legal approval.  
7. **Measure** via GSC Links + referral analytics + verified register—not backlink counts alone.

---

## 6. Actions implemented (repository)

| Deliverable | Path |
|-------------|------|
| Implementation report | This file |
| Off-page baseline | [PHASE_10_OFF_PAGE_BASELINE.md](PHASE_10_OFF_PAGE_BASELINE.md) |
| Opportunity register | [PHASE_10_LINK_OPPORTUNITY_REGISTER.md](PHASE_10_LINK_OPPORTUNITY_REGISTER.md) |
| Outreach templates | [templates/PHASE_10_OUTREACH_TEMPLATES.md](templates/PHASE_10_OUTREACH_TEMPLATES.md) |
| Link-worthy resources | [PHASE_10_LINK_WORTHY_RESOURCES.md](PHASE_10_LINK_WORTHY_RESOURCES.md) |
| Earned links register | [PHASE_10_EARNED_LINKS_AND_MENTIONS.md](PHASE_10_EARNED_LINKS_AND_MENTIONS.md) |
| Governance | [LINK_BUILDING_GOVERNANCE.md](LINK_BUILDING_GOVERNANCE.md) |
| Monthly report | [templates/MONTHLY_OFF_PAGE_SEO_REPORT.md](templates/MONTHLY_OFF_PAGE_SEO_REPORT.md) |

---

## 7. Actions requiring owner approval

| # | Decision |
|---|----------|
| 1 | Close SEO-001–003 (deploy + Apache) before major outreach |
| 2 | Grant GSC access; export Links baseline |
| 3 | Approve R-001 resource format (web page vs PDF) and legal review |
| 4 | Approve any directory listing fees and copy |
| 5 | Name authorized spokesperson for outreach |
| 6 | Approve review solicitation process (organic only, platform TOS) |
| 7 | Approve adding verified `sameAs` social URLs to Organization JSON-LD |

---

## 8. Tests

No application code changed — **no new test commands**. Existing SEO unit tests remain valid for on-site integrity.

---

## 9. Risks

| Severity | Risk | Mitigation |
|----------|------|------------|
| P0 | Duplicate host dilutes link equity | Phase 3B remediation |
| P0 | GSC file 404 | Deploy `public/google161c1efd34d8a358.html` |
| P1 | Branded confusion in SERP | Entity consistency; no trademark bidding in copy |
| P2 | Directory pricing misrepresentation | Generic pricing language or live catalog only |
| P2 | Outreach without product review | Governance §6 + FEATURE_VERIFICATION |

---

## 10. Recommended next phase

**Phase 10B — Execute with evidence:** (1) P0 deploy, (2) GSC Links snapshot, (3) publish R-001 if approved, (4) 3–5 **approved** personalized outreaches from LOP-001/004/005 research, (5) first monthly off-page report with real numbers.

**Do not** scale link volume until technical baseline is green and at least one earned placement is verified in [PHASE_10_EARNED_LINKS_AND_MENTIONS.md](PHASE_10_EARNED_LINKS_AND_MENTIONS.md).
