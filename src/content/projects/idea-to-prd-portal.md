---
title: 'Idea-to-PRD Portal'
summary: 'Employees submit an idea, a problem or a prototype. An AI wizard interviews them, a PRD is generated, and policy rules flag risk before a reviewer approves and assigns the work.'
stage: decide
status: in-progress
statusNote: 'In active development. Version 1, the intake agent, is live.'
question: 'Should this exist, and under what conditions?'
boundary: 'This decides whether something should be built and under what conditions. Finding unregistered tools and maintaining approved ones are the other two projects.'
mark: circle
# The portal's repo is private for now. Add `repo:` here once it's public.
links:
  - label: 'Version 1 live demo'
    href: 'https://ai-intake-governance-agent.vercel.app'
  - label: 'Version 1 source'
    href: 'https://github.com/tavor29/ai-intake-governance-agent'
cover: ../../assets/work/ai-intake-governance-agent.jpg
coverAlt: 'Sticky notes and a printed plan on a desk'
walkthrough: true
integrations:
  - system: 'Jira'
    demo: 'Simulated: previews the exact ticket the app would create'
    production: 'Real ticket in the org''s Jira instance'
  - system: 'Slack'
    demo: 'Simulated: previews the exact routing message the app would post'
    production: 'Real message via an incoming webhook'
  - system: 'App and tool catalog'
    demo: 'Simulated (seeded synthetic dataset)'
    production: 'Real CMDB or SaaS inventory'
  - system: 'Sign-in and roles'
    demo: 'Demo role switcher'
    production: 'The org''s single sign-on'
  - system: 'Language model'
    demo: 'Deterministic mock by default, so the demo and CI need no keys'
    production: 'The org''s approved model provider'
stack:
  note: 'From the portal repo as it stands. Version 1, the live intake agent, is Astro and TypeScript with one serverless route on Vercel, and uses rules only, no language model.'
  groups:
    - name: Frontend
      items: ['Next.js 16 (App Router)', 'React', 'TypeScript', 'Tailwind v4']
      why: 'Server-rendered forms and role-based areas (submit, manage, admin) in one app.'
    - name: Backend / data
      items: ['Postgres', 'Drizzle ORM', 'Zod', 'pg-boss']
      why: 'Plain SQL with typed schemas. Zod validates every generated PRD, and background jobs run on the same database.'
    - name: AI
      items: ['Vercel AI SDK', 'Anthropic', 'Azure OpenAI', 'OpenAI', 'Deterministic mock']
      why: 'The model provider is one setting. The mock keeps tests and the demo repeatable and key-free.'
    - name: Integrations
      items: ['Auth.js v5']
      why: 'Simple credentials in development; swap in the org''s sign-on without changing code.'
    - name: Quality
      items: ['Vitest', 'Playwright']
      why: 'Rules that block requests are tested like code, and each submission track has an end-to-end test.'
    - name: Infra
      items: ['Docker', 'Standalone Next.js build']
      why: 'Runs on Vercel or on a company''s own servers without code changes; hosting is still open.'
---

## Problem

Requests for new software or AI tools arrive over chat and hallway conversations, with no standard format, no security check, and no owner. The result is duplicate builds, unreviewed risk, and good ideas that die.

## What it does

Three submission tracks: an idea, a problem, or a prototype someone already built. An AI wizard interviews the requester and flags shallow answers. A PRD generator turns the interview into typed JSON, validated, then rendered to Markdown. A policy engine checks it, and a review queue lets managers approve, ask for changes, and assign the work.

The risk check runs in a fixed order. Deterministic rules go first. Then a language-model pass that can only add flags, never clear one. Rules live in a table an admin can edit, so you can change a rule, resubmit, and watch the flags change. There are three tiers: hard bans, mitigation required, and advisory. PRD versions are immutable, and every decision lands in an audit log.

## Built today

- **Version 1, live:** the intake agent. It checks a request against a seeded catalog for duplicates, scores risk with fixed rules, routes it by team capacity, and previews the Jira ticket and Slack message it would send.
- **The portal, in progress:** the foundation is configured: sign-in with roles, the Postgres database layer, a switchable model provider with a deterministic mock, unit and end-to-end test runners, and a container build. The wizard, PRD generator, policy engine and review queue are being built on top.

## Scope cuts for the demo

- A demo role switcher instead of single sign-on
- No wireframe generator
- One organization only, not multi-tenant

## What it demonstrates

Governance design, not a chat interface. Rules decide and the model only assists, so every decision can be explained after the fact. Version 1 is the generalized, fully built version of the intake system I scoped for real at Keshet; the portal takes it from "route this request" to "decide whether this should exist."

## Rejected alternatives

I considered a model where a single reviewer approved or rejected every request by hand. I rejected it because a single gatekeeper doesn't scale past a small team, and it creates exactly the kind of bottleneck this problem is trying to remove.

I also rejected letting the language model make the final risk call. Decisions have to be auditable: a rule gives the same answer every time and can be explained, and a model's judgment can't.

## Honest limitation

This assumes a single identity provider and a relatively flat approval structure. A multi-entity organization with separate security domains would need a more complex routing and approval model than this handles.
