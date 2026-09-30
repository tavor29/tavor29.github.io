---
title: 'One-page PRD for an internal AI tool'
summary: 'The four questions most internal AI tool proposals skip, as a half-page to fill in before anything gets built.'
kind: 'Template · one-pager'
origin: 'generic'
mark: 'circle'
order: 3
---

Internal AI tools get built faster than almost anything else right now, which is exactly why they need a lighter, faster PRD, not none at all. A half-page answering these four questions catches most of the problems that otherwise show up after the tool is already in twenty people's daily workflow.

## Tool

| Field | Answer |
|---|---|
| Name | |
| Proposed by | |
| Date | |
| One-line purpose | |

## 1. Who's actually going to use this, and how often?

"The whole engineering team" is not a user. "Engineers doing code review, roughly 15 times a week each" is. That specificity is what lets you evaluate whether the tool is working later.

- Users:
- Frequency:

## 2. What data does it touch, and what leaves the building?

Name the data categories explicitly, and name which ones are not allowed to leave the internal network, before a single line of code gets written.

| Data category | Used by the tool? | Allowed to leave the internal network? |
|---|---|---|
| Proprietary code | | |
| Customer data | | |
| Financial details | | |
| | | |

## 3. Where is the line between "personal experiment" and "shared tool"?

Most governance problems start as one person's weekend project that quietly becomes load-bearing for a team. Pick one trigger for review and write it down.

- Review is triggered by (choose one): user count / data sensitivity level / cost threshold
- Threshold:

## 4. What does "good enough to keep" look like?

A stated bar, specific enough that six months from now someone can look at it and say whether it worked: fewer manual steps, faster turnaround, fewer errors.

- Bar:
- Check-in date:
