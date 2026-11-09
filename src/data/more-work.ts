// Shorter work than the three case studies: one-line examples from each role
// (shown as "More work" under the case studies), and coded projects that sit
// outside the Citizen AI Governance umbrella (shown under its card). Ordered by
// strength, not by date: phones show the first three. Source: Tavor's project
// list (interview prep), 2026-11-09; only numbers he confirmed. Keep each text
// to about one line. Same confidentiality rules as the case studies: no vendor
// names, colleague names or dollar figures ("millions" is fine). Work that was
// still underway when the role ended says "started", never "built".
import type { IconName } from '../lib/icons';

export type WorkExample = {
	org: string;
	years: string;
	/** Same mark as the org's case study; Buildots has none, so it gets the leaf. */
	mark: IconName;
	title: string;
	text: string;
};

export const moreWork: WorkExample[] = [
	{
		org: 'Applied Materials',
		years: '2023–2026',
		mark: 'quarter',
		title: 'A month early and 5% under budget',
		text: 'A 16-month build of high-density compute for AI workloads, at 99.99% uptime after go-live.',
	},
	{
		org: 'Applied Materials',
		years: '2023–2026',
		mark: 'quarter',
		title: 'A budget gap caught before it was an overrun',
		text: 'Found the annual plan millions short and reset cost, budget and scope with Finance.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'An approved route for vibe-coded apps',
		text: 'Review, CI/CD and security checks, so leaders see what’s built and who owns it.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'From scattered card spend to one corporate card',
		text: 'Tied every purchase to an invoice and a cost center, easing month-end close.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'One source of truth for people and AI agents',
		text: 'Started a shared knowledge base; each AI agent sees only what its creator can.',
	},
	{
		org: 'Applied Materials',
		years: '2023–2026',
		mark: 'quarter',
		title: 'IT for a new 12-floor tower',
		text: 'Offices, R&D labs and clean rooms, from empty floors to handover.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'Storage nobody was watching',
		text: 'Hundreds of terabytes of unmanaged media, starting with visibility for capacity and retention.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'A helpdesk dashboard that exposed the gaps',
		text: 'Rolled out a ticket dashboard that showed tickets with no category, owner or SLA.',
	},
	{
		org: 'Buildots',
		years: '2020',
		mark: 'leaf',
		title: 'Monitoring a production AI pipeline',
		text: 'NOC Engineer at an AI construction-tech startup, monitoring its ML pipeline in production.',
	},
];

export type OtherProject = {
	title: string;
	text: string;
	/** Small line under the text: what it's built with, how it runs. */
	label: string;
	href: string;
	mark: IconName;
};

export const otherProjects: OtherProject[] = [
	{
		title: 'Local Transcriber',
		text: 'Offline Hebrew and English transcription for recordings that can’t go to the cloud, with a built-in benchmark that measures each model’s accuracy and speed on an ordinary laptop.',
		label: 'Python · Runs offline',
		href: 'https://github.com/tavor29/local-transcriber',
		mark: 'quarter',
	},
];
