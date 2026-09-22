---
title: 'How to Avoid Slop (Content, Visual, Ideation — and Why You Need to Ask the LLM to Argue With You)'
summary: 'Why default AI output trends toward generic, agreeable slop, and the technique (asking the model to argue against you) that fixes it.'
origin: real
date: 2026-09-15
---
"Slop" gets talked about like it's a quality problem — like the AI just isn't good enough yet. It isn't. It's a default-settings problem. AI tools default to agreeable, safe, statistically average output unless you deliberately push them somewhere else. Slop is what you get when you accept the first, most expected answer.

## Naming the Problem: Three Kinds of Slop

**Content slop** — the generic phrasing and structure readers now recognize on sight: the same rhythm, the same hedged claims, the same three-part lists that say nothing specific.

**Visual slop** — the recognizable "AI-generated" look in images and design: over-symmetrical compositions, a particular flavor of lighting and color grading, a stock-photo blandness even when nothing was actually stock.

**Ideation slop** — brainstorms that stay safe and obvious, because the model's default instinct is to validate your framing rather than challenge it.

These look like three different problems. They share one root cause.

## Why Default AI Output Trends Toward Slop

Models are tuned, by design, to be broadly agreeable and inoffensive. That's a reasonable default for safety — you don't want a tool that argues with everything you say by default. But it's a bad default for sharpness. Without an explicit instruction otherwise, output regresses toward the most statistically expected version of an answer: the average of what's been said before, not the specific, considered version of what *you're* actually trying to say.

The same dynamic drives ideation slop specifically. Ask a model to brainstorm, and by default it tends to build on and affirm your framing rather than stress-test it. You get more ideas in the shape of your original idea, not better scrutiny of whether the original idea holds up.

## Fixing Content Slop

Specificity is the actual antidote to genericness. Concrete details, real examples, a distinct point of view — these are what generic phrasing has none of.

A practical technique: ask for the boring, expected version first, on purpose. Then explicitly ask what a sharper writer would cut or change about it. The gap between those two versions is usually exactly where the slop was hiding.

And don't skip editing for voice. Correctness isn't the same thing as sounding like someone specific wrote it.

## Fixing Visual Slop

Start by being able to name the tells: over-symmetry, a particular generic color grade, compositions that echo stock photography even when generated from scratch.

Prompting for constraint and specificity beats open-ended requests. "Make it look good" invites the average. A specific reference, a specific constraint, a specific thing to avoid — these push output away from the default.

Treat AI visual output as a draft or a starting point, not a final asset. The slop tends to live in whatever nobody bothered to refine past the first pass.

## Fixing Ideation Slop: Getting Real Pushback

This is the core technique, and it's simple to state and easy to forget to use: explicitly ask the model to argue *against* your idea, not just refine it.

Prompt patterns that actually work:
- "Steelman the counterargument to this."
- "What would a skeptical reviewer say about this plan?"
- "Give me the strongest reason this fails."

Note the difference between "criticize my idea" and "strongman your bad ideas." Asking for criticism often gets you a token, hedged objection — a gesture at disagreement. Asking the model to build the *strongest* version of the counterargument gets you something you actually have to reckon with, not something you can wave away.

## Building This Into a Habit

The fix isn't a one-time trick — it's making critique a required step in your own workflow rather than an optional follow-up you remember to ask for occasionally. Build it into your default prompts. Make "now argue against this" as automatic as "now write this."

The goal isn't to make the model generally negative. It's to make real disagreement available on demand, instead of buried under a default setting of agreeableness that's actively working against you every time you don't ask for something else.

## The Close

Slop isn't an inevitable property of AI-generated work. It's what happens when you accept the first, safest, most agreeable output a system defaults to. Asking for specificity, constraint, and real pushback isn't extra effort layered on top of the work — it *is* the work that AI tools quietly skip unless you explicitly ask for it.
