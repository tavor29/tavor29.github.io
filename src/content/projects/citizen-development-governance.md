---
title: 'Citizen App Registry & Handover'
summary: 'A registry for employee-built apps: stages from idea to production, a named maintenance owner on every app, and live repo health signals from the GitHub API.'
stage: sustain
status: live
question: 'Is it still healthy, and who owns it now?'
boundary: 'This keeps approved and discovered apps healthy and owned. How they get discovered and approved is handled upstream.'
mark: leaf
repo: 'https://github.com/tavor29/citizen-development-governance'
demo: 'https://tavor29.github.io/citizen-development-governance/'
links:
  - label: 'Framework doc'
    href: 'https://tavor29.github.io/citizen-development-governance/framework/'
cover: ../../assets/work/citizen-development-governance.jpg
coverAlt: 'Two people working through something on a laptop'
integrations:
  - system: 'GitHub'
    demo: 'Live (real API, real repos)'
    production: 'Same'
  - system: 'App registry'
    demo: 'Simulated (seeded synthetic catalog)'
    production: 'Real CMDB or SaaS inventory'
  - system: 'Ownership and HR data (who owns what after a departure)'
    demo: 'Documented only, out of scope'
    production: 'Real HRIS integration'
stack:
  groups:
    - name: Frontend
      items: ['Astro', 'TypeScript', 'Vanilla DOM']
      why: 'A board you read and click through needs no UI framework, so it ships as static pages.'
    - name: Backend / data
      items: ['Seeded catalog (TypeScript module)']
      why: 'No database until the registry needs to write anything back.'
    - name: Integrations
      items: ['GitHub REST API (live)']
      why: 'Public repo data needs no credentials, so the health check runs in the browser.'
    - name: Infra
      items: ['GitHub Pages', 'GitHub Actions']
      why: 'Every push builds and deploys a static site, with no servers to run.'
---

## Problem

Employees build their own AI tools and automations without engineering support, and most organizations have no answer for who maintains them once the builder moves on or leaves.

## What it does

A registry for employee-built apps. Each app moves through defined stages, from idea to prototype to MVP to production, and carries a named maintenance owner at every stage. Health signals come from the app's actual repository, pulled live from the GitHub API, and a written framework spells out what each stage requires.

## Built today

- A stage board (idea, prototype, MVP, production) with a named maintenance owner on every app
- Live repo health on each card: last commit and contributor count from the GitHub API
- A framework document with the entry and exit criteria for each stage
- A seeded catalog of employee-built tools, all synthetic

## Next

- The owner as a gate: an app can't reach production in the registry without a named maintenance owner
- Orphan detection: flag apps whose owner has left or whose repo has gone quiet
- A handover checklist for reassigning an orphaned app
- An adoption panel: lifecycle funnel, share of sanctioned apps over time, orphaned apps, and time to decision, all on synthetic data

## What it demonstrates

A maintenance owner is a gate, not a field. Almost nobody plans for what happens to an employee-built app after the person who built it moves on, so the idea carries most of the weight here. The build just needs to be credible.

## Rejected alternative

I considered a model that required engineering sign-off before anyone could build anything internally. I rejected it because that's exactly the kind of bottleneck that pushes people toward unsanctioned tools in the first place. This model assumes employees will keep building, and makes what they build visible and owned instead of trying to stop it.

## Honest limitation

Repo signals cover only apps that have a repo; low-code and no-code tools need other health signals. And today the tracker records ownership without enforcing it. The owner gate is the next piece being built.
