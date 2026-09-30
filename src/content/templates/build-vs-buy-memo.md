---
title: 'Build vs. buy vs. partner memo'
summary: 'A worked decision memo for AI project intake and governance tooling, from the flagship coded project.'
kind: 'Worked example · decision memo'
origin: 'fictional'
mark: 'circle'
order: 4
---

A worked example from the AI Project Intake & Governance Agent, written for **Meridian Dynamics, a fictional company**. Reuse the structure: one question, each option's real trade-off, one recommendation with the condition that would change it.

## Build vs. buy vs. partner: AI project intake and governance tooling

**Question:** should Meridian Dynamics build this intake and governance capability in-house, buy an existing GRC or ITSM add-on, or partner with a vendor for a customized version?

**Option A, build in-house:** full control over the risk-scoring logic and how it fits existing tools like Jira and Slack. Slower to ship and requires ongoing maintenance, but the logic here (what counts as risky, how routing works) is specific enough to the organization that an off-the-shelf tool would need heavy customization anyway.

**Option B, buy an off-the-shelf GRC/ITSM add-on:** fast to deploy and lower upfront cost. Most available tools are built for IT asset management or compliance tracking, not the specific "duplicate check plus risk score plus routing" workflow this problem needs, so the fit is partial at best, and the risk-scoring logic would still need custom configuration.

**Option C, partner with a vendor for a customized build:** faster than a full in-house build and keeps some flexibility, but introduces an ongoing vendor relationship and cost for a capability that isn't especially complex once scoped.

**Recommendation:** build in-house for the MVP. The core logic (duplication checks, risk scoring, routing) is simple enough to build directly, and the two integrations that matter most (Jira, Slack) are already well-documented and free to develop against. Revisit buying or partnering only if the tool needs to scale to enterprise-wide identity and compliance requirements beyond what this MVP handles.
