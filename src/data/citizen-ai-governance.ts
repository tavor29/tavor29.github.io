// The umbrella page (/projects/citizen-ai-governance/): the copy that ties the
// three coded projects together. The projects themselves, their status and
// their stage live in src/content/projects/*.md.
import type { Stage } from '../lib/projects';

export const umbrella = {
	title: 'The Sanctioned Path',
	kicker: 'Citizen AI governance',
	thesis:
		'People will build and use AI on their own. Governance has to make the sanctioned path the easy one at every stage of the lifecycle.',
	description:
		'Three coded projects, one per stage of the AI tool lifecycle: discover what people already use, decide what should exist, and keep what was built healthy and owned.',
};

// The problem, in three parts. Each one is the reason for one stage.
export const problems: { title: string; text: string; stage: Stage }[] = [
	{
		title: 'Shadow AI on personal licenses',
		text: 'People already use AI tools through personal accounts and unregistered licenses. IT sees little of it, and blocking it only pushes it further out of sight.',
		stage: 'discover',
	},
	{
		title: 'Ideas with no path to a spec',
		text: 'Employees spot ideas and problems every day but have no structured way to turn them into a spec someone can prioritize. Prototypes never reach production, and requests arrive with no security check.',
		stage: 'decide',
	},
	{
		title: 'Citizen-built apps with no maintainer',
		text: 'Employees build their own tools and automations. When the builder moves on, nobody owns what they left running.',
		stage: 'sustain',
	},
];

// How work moves between the stages. Shown on the lifecycle diagram and,
// in words, under it.
export const handoffs: { from: Stage; to: Stage; short: string; text: string }[] = [
	{
		from: 'discover',
		to: 'decide',
		short: 'Formalize',
		text: 'A tool found on a personal license is triaged: stop, migrate or formalize. Formalize opens a pre-filled submission in the marketplace.',
	},
	{
		from: 'decide',
		to: 'sustain',
		short: 'Owner named',
		text: 'Once a marketplace PRD is assigned and built, the app moves to the registry, and it can’t reach production there without a named maintenance owner.',
	},
	{
		from: 'sustain',
		to: 'decide',
		short: 'Orphaned',
		text: 'An orphaned app triggers a handover, a retirement, or a new marketplace submission.',
	},
];

// One record per app, whichever stage found it. `source` says how it entered.
export const catalog = {
	title: 'One shared app catalog',
	text: 'All three projects read and write the same catalog of apps, so a tool keeps one record from the day it’s found to the day it’s retired.',
	sources: ['discovery', 'self_report', 'portal_request', 'prototype_import'],
};

export const principles: { title: string; text: string }[] = [
	{
		title: 'The sanctioned path must be the fastest path',
		text: 'If the approved route is slower than the workaround, people take the workaround.',
	},
	{
		title: 'Rules decide, the model only assists',
		text: 'Fixed rules make every blocking call, so each decision can be explained. The model can add a concern, never clear one.',
	},
	{
		title: 'A maintenance owner is a gate, not a field',
		text: 'No named owner, no production. An empty field nobody checks protects nothing.',
	},
	{
		title: 'Amnesty before enforcement',
		text: 'Make it safe to say what you already use. Visibility first, rules second.',
	},
];
