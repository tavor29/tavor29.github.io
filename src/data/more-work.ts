// Shorter work than the three case studies: one-line examples from each role
// (shown as "More work" under the case studies), and coded projects that sit
// outside the Citizen AI Governance umbrella (shown under its card). Tavor's
// selections, 2026-11-09. Same confidentiality rules as the case studies: no
// vendor names, colleague names or dollar figures. Work that was still
// underway when the role ended is worded that way ("started", "starting
// with") rather than badged.
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
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'Licences and access nobody was using',
		text: 'Found Microsoft licences no one used, and accounts that could still reach company email, cutting cost and closing a security gap.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'A helpdesk dashboard, then the data behind it',
		text: 'Built and rolled out a helpdesk dashboard; the bigger win was what it exposed, tickets with no category or owner, which became the next fix.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'Network segmentation the helpdesk can run',
		text: 'Made network segmentation (VLANs) workable day to day, starting with a map the helpdesk uses when people join, move department or change desks.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'Storage nobody was watching',
		text: 'Took on hundreds of terabytes of unmanaged media storage, starting with visibility as the basis for capacity planning and retention rules.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'A wiki so knowledge doesn’t leave with people',
		text: 'Started a central map of systems, owners and dependencies, collected through each department’s COO so it runs on goodwill, not authority.',
	},
	{
		org: 'Applied Materials',
		years: '2023–2026',
		mark: 'quarter',
		title: 'IT for a new building, from empty floors',
		text: 'Planned and delivered the IT for a new 12-floor office tower with R&D labs and clean-room space, built from scratch.',
	},
	{
		org: 'Applied Materials',
		years: '2023–2026',
		mark: 'quarter',
		title: 'High-density compute for AI workloads',
		text: 'A 16-month project expanding compute and network infrastructure for AI and machine-learning workloads.',
	},
	{
		org: 'Buildots',
		years: '2020',
		mark: 'leaf',
		title: 'Monitoring a production AI pipeline',
		text: 'NOC Engineer at an AI construction-tech startup, monitoring its machine-learning pipeline across customer projects and working with R&D to fix issues and support releases.',
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
