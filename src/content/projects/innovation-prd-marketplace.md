---
title: 'Innovation & PRD Marketplace'
summary: 'An internal portal where any employee turns an idea, a problem or a vibe-coded prototype into a policy-checked PRD with an AI wizard, then publishes it to a marketplace where managers prioritize it and assign it to a builder.'
stage: decide
status: live
statusNote: 'The demo is in Hebrew, as the PRD specifies, and runs on synthetic data that resets nightly.'
question: 'Which ideas get built, by whom, and under what conditions?'
boundary: 'This turns ideas into approved, assigned specs. Finding the tools people already use is Discovery’s job; keeping what gets built healthy and owned is the Registry’s.'
mark: circle
demo: 'https://innovation-prd-marketplace.vercel.app'
repo: 'https://github.com/tavor29/Innovation-PRD-Marketplace-Portal/tree/rebuild'
links:
  - label: 'Earlier prototype: AI intake agent (live demo)'
    href: 'https://ai-intake-governance-agent.vercel.app'
cover: ../../assets/work/ai-intake-governance-agent.jpg
coverAlt: 'Sticky notes and a printed plan on a desk'
integrations:
  - system: 'Sign-in and roles'
    demo: 'Seeded demo accounts: submitter, manager, builder, admin'
    production: 'The org''s single sign-on'
  - system: 'Language model'
    demo: 'Deterministic mock by default, so the demo and tests need no keys'
    production: 'The org''s approved model provider'
  - system: 'Prototype links (AI app builders)'
    demo: 'Link and file metadata only'
    production: 'Same; full repo analysis is Phase 2'
  - system: 'Files and attachments'
    demo: 'Local storage adapter'
    production: 'The org''s file storage, same adapter interface'
  - system: 'Built-app registry'
    demo: 'Phase 2 hand-off'
    production: 'The Citizen App Registry'
stack:
  note: 'What the live demo runs on.'
  groups:
    - name: Frontend
      items: ['Next.js 16 (App Router)', 'React', 'TypeScript', 'Tailwind v4']
      why: 'Server-rendered forms and separate areas for submitters, managers and admins in one app, with a full right-to-left Hebrew interface.'
    - name: Backend / data
      items: ['Postgres', 'Drizzle ORM', 'Zod', 'pg-boss']
      why: 'Plain SQL with typed schemas. Zod validates every generated PRD, and background jobs run on the same database instead of a separate queue.'
    - name: AI
      items: ['Vercel AI SDK', 'Anthropic', 'Azure OpenAI', 'OpenAI', 'Deterministic mock']
      why: 'The model provider is one setting, chosen per deployment. The mock keeps tests and demos repeatable and key-free.'
    - name: Integrations
      items: ['Auth.js v5']
      why: 'Simple credentials in development; swap in the org''s sign-on without changing anything downstream.'
    - name: Quality
      items: ['Vitest', 'Playwright']
      why: 'The policy engine is unit-tested like any rule that blocks work, and each submission track has an end-to-end test.'
    - name: Infra
      items: ['Docker', 'Standalone Next.js build']
      why: 'Runs on Vercel, a container host or a company''s own servers without code changes; hosting is still open.'
---

## Problem

Employees spot ideas and operational problems every day, but they have no structured way to turn them into a spec that can be prioritized and assigned. Good ideas get lost. Prototypes people build with AI app builders never reach production. And every request arrives in a different format with no security check, which loads up both the development and security teams.

## What it does

Any employee picks one of three tracks: **solution-first** (I know what I want), **problem-first** (I know what hurts), or **prototype** (I already built something). An AI wizard interviews them, spots shallow answers and asks focused follow-ups, while a completeness meter shows how much of the PRD is covered. For a problem, it proposes one or two realistic solution patterns first; for a prototype, it extracts the spec from the description and the linked files.

The output is three things: a PRD in the organization's template, a security and compliance matrix (yellow needs a mitigation, red is blocked, each with a suggested workaround), and a wireframe of the proposed app. The submitter edits the PRD and publishes it to an internal **marketplace**. There, managers filter by department, status and risk, approve or send it back with a comment, set a priority score, and assign it to a vibe-coder or developer with a due date.

## Who it's for

- **Submitters:** any employee, technical or not. Success is a clear PRD with a security matrix, fast, without writing anything technical.
- **Managers:** a filtered queue, clear status, and quick decisions on what to build first.
- **Builders (vibe-coders and developers):** an approved, unambiguous PRD with its security matrix and wireframe, ready to build for production.

## How the policy check works

Deterministic rules run first, in code. Then a language-model pass reads for meaning, and it can only add flags, never clear one the rules raised. Hard bans, such as direct access to endpoint-management or directory systems, or SQL written straight from the frontend, are blocked in code. Rules live in a table an admin edits in the app without a deploy, in three tiers: hard ban, requires mitigation, and advisory. PRD versions are immutable (a revision request creates a new version), and every manager action lands in an audit log.

## Built today

The first release, live as a demo. Sign in with one click as any of the four roles and switch between them.

- The three submission tracks, with the builder recognized from a prototype link
- The interview wizard: focused follow-ups on thin answers and a completeness meter
- PRD generation in the organization's template, inline editing, and a `.md` export
- The policy engine and security matrix, with admin-editable rules; editing a PRD or a rule re-runs the check
- An interactive wireframe for every PRD
- The marketplace, the manager's review queue (approve, request changes, reject, prioritize) and assignment to builders
- Immutable versions and an audit log of every manager action
- Unit tests for the policy engine, scorer and renderer, and an end-to-end test for each track

## Next

- **A real model:** the demo runs on a deterministic mock so it's free and repeatable; the provider switch is in place for the organization's approved model, with a per-submission cost cap.
- **Phase 2:** multiple organizations with isolated data, a KPI dashboard, full analysis of prototype repos, and a registry of built apps that closes the loop, handing each one to the Citizen App Registry.

## Targets for the first release

These are the PRD's targets for a real rollout, not results. The demo runs on synthetic data.

- Zero hard-ban misses on the test set before launch
- At least 95% of policy violations caught
- 90% of ideas published as a PRD within 30 minutes
- A manual PRD path as a fallback if the AI fails

## What it demonstrates

Two ideas at once. First, every employee can be a contributor to innovation, because the AI lowers the writing barrier, not the bar. Second, security policy enforced as code at the idea stage, not after something is already built. The rules and prompts are the brain; the code only enforces and runs them.

## Rejected alternatives

I considered a model where a single reviewer approved or rejected every request by hand. I rejected it because a single gatekeeper doesn't scale past a small team, and it creates exactly the kind of bottleneck this problem is trying to remove.

I also rejected letting the language model make the final risk call. Decisions have to be auditable: a rule gives the same answer every time and can be explained, and a model's judgment can't.

## Honest limitation

This assumes a single identity provider and a relatively flat approval structure, where managers see their own department by default. A multi-entity organization with separate security domains would need the Phase 2 organization model and a more complex approval flow.
