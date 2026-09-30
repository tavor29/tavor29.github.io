---
title: 'AI pilot readiness scorecard'
summary: 'Decide whether an AI pilot should go wider, be extended, or stop, against a bar you wrote down before it started.'
kind: 'Template · decision scorecard'
origin: 'generic'
mark: 'quarter'
order: 1
---

Most AI pilots hit the same wall a few weeks in: is this working well enough to roll out further, or should it be extended, changed, or killed? This scorecard replaces one manager's gut feeling with a defined bar. Fill in the "Bar" column **before** the pilot starts.

## Pilot

| Field | Answer |
|---|---|
| Tool / use case | |
| Pilot group and size | |
| Start date / review date | |
| Decision owner | |

## 1. Output quality

Define three or four concrete criteria and score a sample of real outputs against each (1–5). A second model can do the scoring ("LLM-as-judge"): it reads the output and the criteria and returns a score with a one-line justification.

| Criterion | Bar | Average score | Notes |
|---|---|---|---|
| e.g. Followed the existing code style and conventions | | | |
| e.g. Did not introduce an obvious regression or bug | | | |
| e.g. Saved the reviewer meaningful time versus doing it by hand | | | |
| | | | |

A minimal scorer:

```python
import json

RUBRIC = [
    "Followed the existing code style and conventions",
    "Did not introduce an obvious regression or bug",
    "Would have saved the reviewer meaningful time versus writing it by hand",
]

def score_output(judge_model, sample_output, task_context):
    prompt = f"""You are scoring an AI coding assistant's output against a rubric.
Task context: {task_context}
Output to score: {sample_output}
Rubric: {json.dumps(RUBRIC)}
For each rubric item, return a 1-5 score and a one-sentence justification, as JSON."""
    response = judge_model.generate(prompt)
    return json.loads(response)
```

## 2. Cost per use

Pull cost from the provider's billing data rather than estimating it, and divide by actual usage, not seat count.

| Measure | Bar | Actual |
|---|---|---|
| Total cost for the period | | |
| Licensed seats | | |
| Active users | | |
| Uses in the period | | |
| **Cost per use** | | |

## 3. Adoption

Week-one growth just means people are curious. What matters is whether usage holds or grows by week three or four.

| Week | Active users | Uses |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |

## Decision

| Signal | Weight | Met the bar? |
|---|---|---|
| Output quality | | |
| Cost per use | | |
| Adoption (weeks 3–4) | | |

**Recommendation:** Go / Extend the pilot / No-Go

**Reasoning** (the part a manager needs to defend the decision to their own leadership):
