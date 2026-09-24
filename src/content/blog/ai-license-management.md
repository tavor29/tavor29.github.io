---
title: 'How to Manage AI Licenses (Shadow AI, Onboarding/Offboarding, and Empty Seats)'
summary: 'Shadow AI, slow onboarding/offboarding, and empty seats are SaaS license sprawl''s problems again, faster and higher-stakes.'
origin: real
date: 2026-09-11
---
Remember when SaaS sprawl became a real budget line item, with dozens of tools, half of them redundant, and license counts nobody could fully account for? The AI tool stack is repeating that pattern, faster, with higher stakes. Most companies haven't caught up on managing it yet, and the cost shows up in two places at once: the budget, and the security posture.

## The Problem Has Four Faces

**Shadow AI.** Employees using unsanctioned AI tools (ChatGPT, random browser extensions, niche vertical tools) with company data, entirely invisible to IT and security. Nobody approved it. Nobody's tracking what data went into it.

**Slow onboarding.** A new hire's first two weeks spent without access to the AI tools their role actually requires, because provisioning wasn't part of the standard onboarding checklist. It was a side request someone had to remember to make.

**Slow offboarding.** The inverse, and arguably worse: a departing employee whose AI tool access doesn't get revoked at the same time as their email and Slack. This is a real, quiet security gap, not a hypothetical one.

**Empty seats.** Licenses paid for across a growing list of AI tools, many of them barely touched after the first month of enthusiasm. Nobody's auditing this regularly, so it just compounds.

## Why This Is Worse Than Old SaaS Sprawl

A few things make the AI version of this problem sharper than the SaaS version:

- **Adoption is frictionless.** Free tiers and browser extensions mean shadow usage requires zero procurement process. Someone just starts using it.
- **The data exposure risk is categorically different.** SaaS sprawl mostly created *usage metadata* risk. AI tool sprawl means prompts and uploads (which can contain sensitive company data) flowing into systems nobody vetted.
- **Existing tooling wasn't built for this.** Most SaaS license management platforms and processes were designed around traditional software licensing, not around the specific risk profile of AI tools handling live company data.

## Shadow AI: Finding What You Don't Know About

You can't manage what you can't see, so discovery comes first.

**Network/traffic-based discovery**: monitoring outbound traffic to known AI tool domains. More comprehensive, more infrastructure-dependent, better for larger orgs with the tooling already in place.

**Survey-based discovery**: simply asking teams what they're using. Lower-tech, faster to start, dependent on honesty and self-awareness (people often don't think of a browser extension as "an AI tool").

Either way, the instinct to just ban unsanctioned tools outright tends to backfire. It pushes usage further underground rather than eliminating it. The more effective sequence is: discover first, then offer a sanctioned alternative, *then* enforce.

## Fixing Onboarding and Offboarding

The fix here isn't clever, it's procedural discipline:

- Build a standard AI tool provisioning checklist tied to role, not an ad hoc request someone has to remember to file
- Tie offboarding revocation to the *same* trigger and timeline as other system access, not a separate step owned by a different team that might not happen the same day
- Name an explicit owner for this process. In practice it tends to fall into the gap between IT and Ops, which usually means it falls through entirely unless someone is assigned it directly

## Hunting Empty Seats

This is the most straightforward fix, and the most commonly skipped one simply because nobody schedules it.

- Run a usage-based license review on a quarterly cadence, not "whenever someone happens to glance at the invoice"
- Ask simple, concrete questions: who hasn't logged into this tool in 30/60/90 days? Which seats were provisioned but never activated at all?
- You don't need a full platform to start. A lightweight dashboard, or even a recurring spreadsheet review, surfaces most of the low-hanging fruit

## The Close

The AI tool stack needs the same operational discipline SaaS eventually got, just faster and with sharper stakes given what these tools actually touch: consistent provisioning, real visibility into what's in use, and regular audits instead of reactive ones. The companies that build this now avoid two things at once: a security incident waiting to happen, and a very avoidable line item sitting quietly on next year's budget.
