---
title: 'Why Claude Gets "Dumber" the Longer Your Project Runs (And How to Fix It)'
summary: 'Why long-running Claude Code sessions degrade, and the file-based memory and codebase-splitting fixes that actually address it.'
origin: real
date: 2026-08-18
---
Three months into an intensive Claude Code project, a developer described a pattern that will sound familiar to anyone running long agentic coding sessions: constant contradicted test results, claims about work that was never done, and an endless loop of apologies that never actually moved the project forward.

*"You're right, I misled you."*
*"Sorry for the mistake I raised earlier."*
*"You're right, my arguments are weak and misleading."*

Nearly every other message. The developer wasn't asking for help writing code anymore. They were spending their time catching Claude in errors, re-explaining decisions that had already been made, and re-verifying "completed" work that turned out not to be complete at all.

It feels personal. It isn't. It's a systems problem, and it has a systems-level fix.

## The Symptom Isn't "Claude Getting Dumber"

It's tempting to read this as the model degrading, like it's tired, or having an off week. That framing is a trap. What's actually happening is that the *conditions* around the model have degraded: the context it's working with has grown stale, contradictory, or simply too large to hold coherently. The model is doing exactly what you'd expect a system to do when it's fed a sprawling, undifferentiated pile of information: it starts pattern-matching to the most recent or most repeated thing in context, rather than reasoning cleanly about the actual state of the project.

Once you reframe it this way, the fixes stop being about "prompting harder" and start being about restructuring how the project is fed to the model at all.

## Root Cause #1: The Project Outgrew a Single Agent's Context

Three months of intensive work on one codebase, with one continuous mental model living inside Claude's context window, is a lot to ask of any single agent, human or AI. The signs are familiar to any engineering team that's hit this wall before: growing confusion about which parts of the system affect which other parts, a rising rate of "fixes" that break something unrelated, and a general sense that no one (or no *thing*) fully holds the whole system in their head anymore.

The fix borrows directly from how you'd manage this with a human team: split the project. Break it into clearly bounded modules or repositories: frontend, backend, data layer, whatever the natural seams are. Refactor one piece at a time, verify it still works exactly as before, then move to the next. The goal isn't microservices for their own sake. It's giving the agent (and you) clear boundaries so no single working session needs to hold the entire system in mind at once.

## Root Cause #2: Memory Isn't Structured

This is probably the single biggest lever. If your only "memory" strategy is a growing conversation history or a single sprawling CLAUDE.md, you're asking the model to search a haystack every time it needs a fact.

The better pattern is hierarchical, file-based memory:

- A **product spec** file: what the system is supposed to do, and why
- An **architecture** file: how the pieces fit together
- A **status** file: what's done, what's in progress, what's blocked
- A **test requirements and status** file: what needs to pass, what's currently skipped and why
- **Session summaries**: a running log of what happened in each work session, so a new conversation doesn't start from zero

Critically, these get loaded *on demand*, not all at once. Claude doesn't need the entire codebase in context to work on one function. It can run code without reading it into context, and pull in only the files relevant to the current task. This alone solves a large share of the "I already told you this" problem, because the information genuinely is retrievable. It's just structured so it can be found.

## Root Cause #3: Garbage In, Garbage Out

Large language models have a mild but real tendency to continue whatever pattern is already present in their context. If a project has accumulated dead code, unused dependencies, flaky tests, and warnings nobody cleaned up, the model isn't immune to that mess. It tends to extend it rather than resist it.

This is the same failure mode that hits large legacy codebases when teams never get the political capital to stop and clean house. The fix is the same too: stop adding features for a few days and just clean.

What to look for:

- **Dead code**: old code kept "just in case," with no remaining references
- **Unused dependencies**: libraries pulled in and forgotten
- **Build warnings and static analysis issues**: especially if your build has no warning-free baseline
- **Bloated test suites**: tests that are too verbose, tests that ask the same question thirty different ways, tests that have been skipped for months without anyone checking if they're still relevant
- **Undocumented boundaries**: does the agent actually know which parts of the codebase it's allowed to touch, and which tests are relevant to the area it's working in? If not, it can't reliably stay inside its lane.

## A Concrete Remediation Checklist

If you're already deep in the symptoms described above, here's a practical reset sequence:

1. **Back up, then wipe, the memory files.** Whatever CLAUDE.md or memory system has accumulated cruft, start fresh. Cap the new file at roughly 50 lines, and force yourself to keep only what's broadly applicable.
2. **Map the codebase freshness.** Tools that auto-map dependencies and structure (for example, codebase-graphing utilities) can surface dead code and orphaned references you've lost track of.
3. **Split testing responsibility** the way you'd split it across a human team: by module or feature area, not as one monolithic suite everyone touches.
4. **Consider an orchestrator pattern**: a coordinating model that delegates specific, scoped tasks to subagents, matching model strength to task difficulty rather than running everything through one large, overloaded context.
5. **Document the "why," not just the "what."** Code tells you what a system does. It rarely tells you why an engineer made a particular decision. Writing that down is what keeps future work (human or AI) from "fixing" something in a way that quietly breaks the reasoning behind it.

## The Reframe

This isn't a Claude failure. It's what happens when any complex, growing system (code, tests, documentation, and memory) is left to sprawl without deliberate structure. Treat a long AI-assisted project the way you'd treat a growing human team: clear boundaries, real documentation, and deliberate information architecture. The apologies stop being necessary once the agent actually has a coherent, well-organized picture of the project to work from.
