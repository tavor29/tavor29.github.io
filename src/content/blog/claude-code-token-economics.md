---
title: 'What Claude Code Actually Costs You (And How to Cut It Without Cutting Quality)'
summary: 'What actually drives Claude Code''s token costs and eight concrete habits that cut spend without cutting quality.'
origin: real
date: 2026-08-25
---
Here's a scenario that confuses a lot of people: you send a single short prompt late in a long Claude Code session, and it costs far more than a short prompt should. Nothing about what you typed changed. So what happened?

The answer is that your one-line prompt was never really "one line." It's the tip of a much bigger request.

## Tokens Are the Real Unit

Every interaction with Claude Code runs on tokens, whether you're paying per token via the API or working inside a plan's usage window. And a request includes far more than what you typed. It includes:

- Your prompt
- The conversation so far
- System instructions
- CLAUDE.md
- Tool and MCP server definitions
- Any files, images, or retrieved content in play

A useful mental model:

> **Total work ≈ context read + hidden reasoning + visible answer.**

You save cost by keeping context small, keeping the *stable* parts of that context cacheable, and spending reasoning and output tokens only where they actually change the outcome.

## The Five Token Types (And Why They're Priced Differently)

**Input tokens**: everything Claude reads: your prompt, history, instructions, files, tool schemas, logs, test output. This is why a short prompt late in a long session can still be expensive, because Claude is processing everything that came before it too.

**Output tokens**: everything Claude generates, including tool calls. These typically cost more per token because they're produced sequentially. You can control this directly: ask for exactly what you need: "5 bullets," "only the patch," "diagnosis, no implementation yet."

**Thinking tokens**: hidden reasoning used with extended or adaptive thinking, billed as output tokens. Higher effort genuinely helps with hard debugging, architecture decisions, and planning, and is often wasted on simple searches or mechanical edits.

**Cache-write tokens**: ordinary input tokens being processed and stored as a reusable prompt prefix. The first request that establishes a cache costs more: a 5-minute cache write runs at roughly 1.25x normal input cost, a 1-hour write at roughly 2x.

**Cache-read tokens**: when a later request starts with the same cached prefix, Anthropic reuses it instead of reprocessing from scratch, generally at around 0.1x normal input cost. Paying slightly more once can make every subsequent turn in that session much cheaper.

## What Breaks the Cache

The cache only helps if the prefix stays stable. These break it:

- Changing models
- Changing effort or thinking settings
- Editing early instructions
- Changing tool definitions or enabled MCP servers
- Changing images in the prefix
- Letting the cache simply expire

The practical implication: **append, don't edit.** Adding new messages while leaving the earlier prefix untouched keeps you cache-friendly. Going back and tweaking something near the start of the session does not.

## Eight Habits That Actually Save Money

1. **Use `/clear` between unrelated tasks.** This is the single biggest lever. Don't drag yesterday's debugging session into today's new feature request.
2. **Use `/compact` when a task continues but the session has bloated.** Compaction condenses the important thread, but it costs tokens itself, since Claude has to read and summarize the whole session. Don't run it reflexively.
3. **Keep CLAUDE.md lean.** Only include instructions that apply broadly, and aim for under roughly 200 lines. Move specialized, occasional workflows into on-demand skills instead.
4. **Disable unused MCP servers.** Their tool descriptions consume context on every request, even when you never call them. Check with `/mcp`.
5. **Narrow your requests.** "Inspect `src/auth.ts` and `tests/auth.test.ts`; return only a patch" is dramatically cheaper than "explore the repo and fix authentication."
6. **Isolate noisy work in subagents.** Large log searches, repo exploration, and big test runs can happen in a separate context, with only the useful conclusion returned to the main conversation. The subagent still spends tokens, but it protects your main session's context from bloating.
7. **Match model and effort to the task.** Use cheaper, faster settings for retrieval and mechanical edits. Reserve the most capable model and highest effort for decisions where deeper reasoning genuinely changes the outcome.
8. **Measure instead of guessing.** `/context` shows what's actually consuming your window. `/usage` shows token use and cache health over time. API users can estimate costs ahead of time with Anthropic's token-counting endpoint.

## One Caveat on "Cost"

If you're using the API directly, you're billed per token by category, and everything above translates straight into your bill. If you're on a Pro, Max, Team, or Enterprise plan, you're working within usage limits rather than being billed per token directly, so the dollar estimate Claude Code shows isn't necessarily your literal bill. That said, token discipline still matters: it makes your plan's limits last longer, and, just as importantly, sessions that carry less unnecessary context tend to run faster too.

## The Short Version

Choose your model, effort level, and enabled tools deliberately at the start of a session. Be intentional about what enters context as you go. And don't let a single session run forever. `/clear` is doing more for your budget than any other single habit on this list.

**Further reading:**
- [Prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- [Claude Code costs](https://docs.anthropic.com/en/docs/claude-code/costs)
- [Token counting](https://docs.anthropic.com/en/docs/build-with-claude/token-counting)
- [Model configuration](https://docs.anthropic.com/en/docs/claude-code/model-config)
