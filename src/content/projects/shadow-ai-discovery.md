---
title: 'Shadow AI Discovery & Amnesty'
summary: 'Finds the AI tools people already use on personal accounts and unregistered licenses, triages each one (stop, migrate or formalize), and offers a no-blame way to self-report.'
stage: discover
status: planned
question: 'What''s already happening, and what do we do about it?'
boundary: 'This finds what''s already happening. Deciding whether something should be built is the Marketplace''s job; keeping it healthy is the Registry''s.'
mark: half
integrations:
  - system: 'Spend lines (cards and expenses)'
    demo: 'Simulated, schema modeled on real expense exports'
    production: 'Finance system export'
  - system: 'OAuth grants to third-party apps'
    demo: 'Simulated, schema modeled on identity-provider audit logs'
    production: 'Identity provider audit API'
  - system: 'Browser and CASB events'
    demo: 'Documented only'
    production: 'Endpoint or CASB tooling'
  - system: 'Self-report form'
    demo: 'Built into the app'
    production: 'Same'
stack:
  planned: true
  note: 'Nothing is built yet. This is the stack the project is planned on, shared with the marketplace where it can be.'
  groups:
    - name: Frontend
      items: ['TypeScript', 'Tailwind']
      why: 'Same language and styling approach as the marketplace, so the three projects share patterns.'
    - name: Backend / data
      items: ['Postgres (Neon)', 'Drizzle', 'Zod', 'Seeded signal feed']
      why: 'Signals are synthetic but match real vendor schemas, so swapping in a real source changes the input, not the logic.'
    - name: AI
      items: ['Claude (structured outputs)']
      why: 'Classifies each signal into a typed record; the triage decision itself stays with a person.'
    - name: Quality
      items: ['GitHub Actions CI']
      why: 'Every change runs the classification checks before it ships.'
    - name: Infra
      items: ['Vercel']
      why: 'One small app with a database, deployed on push.'
---

## Problem

Employees already use AI at work through personal accounts and unregistered licenses. IT sees little of it, and blocking it pushes it further out of sight.

## What it does

A signal inbox collects evidence of AI use: spend lines, OAuth grants to third-party apps, and browser or CASB events. Each finding lands in a triage queue with three outcomes: stop, migrate to a sanctioned tool, or formalize. Formalizing opens a pre-filled submission in the Innovation & PRD Marketplace. Alongside it, a no-blame self-report path lets people declare what they use before anyone finds it. Each finding gets an exposure estimate based on the kinds of data involved.

## Planned scope

- The signal inbox, fed by a seeded feed that follows real vendor schemas
- The triage queue with stop, migrate and formalize, and the hand-off into the marketplace
- The self-report form and amnesty flow
- Exposure estimates from the data classes involved

## What it demonstrates

Amnesty before enforcement. People route around rules that only punish, so the first goal is visibility: make it safe to say what you use, then make the sanctioned path easier than the workaround.

## Rejected alternative

Blocking unsanctioned tools. People route around blocks, and the organization loses the little visibility it had.

## Honest limitation

Personal accounts on personal devices are largely invisible to any of these signals. And monitoring employees' tool use raises privacy and legal questions that need HR and legal input before anything like this runs for real.
