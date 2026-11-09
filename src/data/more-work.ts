// Shorter work than the three case studies: one-line examples from each role
// (shown as "More work" under the case studies), and coded projects that sit
// outside the Citizen AI Governance umbrella (shown under its card). Ordered by
// strength, not by date: phones show the first three. Source: Tavor's project
// list (interview prep), 2026-11-09; only numbers he confirmed. Each row is
// problem, what I built, how it works, what changed. Same confidentiality rules as the case studies: no vendor
// names, colleague names or dollar figures ("millions" is fine). Work that was
// still underway when the role ended says "started", never "built".
import type { IconName } from '../lib/icons';

export type WorkExample = {
	org: string;
	years: string;
	/** Same mark as the org's case study; Buildots has none, so it gets the leaf. */
	mark: IconName;
	title: string;
	/** One sentence each, about one line on desktop. Numbers only when confirmed. */
	problem: string;
	built: string;
	how: string;
	changed: string;
};

export const moreWork: WorkExample[] = [
	{
		org: 'Applied Materials',
		years: '2023–2026',
		mark: 'quarter',
		title: 'An AI compute farm, a month early and 5% under budget',
		problem: 'R&D’s AI chip simulation and testing was outgrowing the compute it had.',
		built: 'A water-cooled compute farm of 150 racks on a 400G network, delivered over 16 months as the lead IT PM.',
		how: 'Gear with 12–18-month lead times ordered at first design; change control and a 5–10% reserve absorbed a mid-project jump to 40 kW racks.',
		changed: 'Live a month early, about 5% under budget, with 99.99% uptime after go-live.',
	},
	{
		org: 'Applied Materials',
		years: '2023–2026',
		mark: 'quarter',
		title: 'A budget gap caught before it was an overrun',
		problem: 'The annual operating plan underestimated the real cost by millions of dollars.',
		built: 'A corrected cost, budget and scope baseline, worked out with Finance.',
		how: 'Raised the gap early with the numbers, sized its impact with Finance, and updated cost, budget and scope together.',
		changed: 'The revised budget was approved, so the gap never became a mid-year overrun.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'An approved route for vibe-coded apps',
		problem: 'Employees were shipping AI-built apps fast; leadership couldn’t see what existed, who owned it or what data it touched.',
		built: 'A standard route from request to production for apps employees build with AI.',
		how: 'A short requirements doc, architecture review, cloud registration, a CI/CD pipeline, and automated code and security scans.',
		changed: 'Leadership sees what’s built, who owns it and what data it uses, and building moved off personal tools into controlled ones.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'From scattered card spend to one corporate card',
		problem: 'Departments bought on their own credit cards; charges arrived with no invoice or cost center, leaving gaps at month-end close.',
		built: 'A procure-to-pay process with one corporate card, standardized with Finance.',
		how: 'Every purchase is linked to an invoice and to the buying department’s cost center.',
		changed: 'One corporate card and a clear budget split per department.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'One source of truth for people and AI agents',
		problem: 'Knowledge was scattered across docs, boards and chats and left with people; employees’ AI agents ran with no company context.',
		built: 'Started a company knowledge base that serves both employees and the AI agents they build.',
		how: 'Systems, owners, dependencies and processes mapped into standard wiki templates through each department’s COO; each agent gets only its creator’s access.',
		changed: 'Agents built on it start from current company facts instead of data re-entered by hand.',
	},
	{
		org: 'Applied Materials',
		years: '2023–2026',
		mark: 'quarter',
		title: 'IT for a new 12-floor tower',
		problem: 'A new tower with offices, R&D labs and a clean room needed all of its IT from scratch.',
		built: 'End-to-end IT delivery for the building, from empty floors to handover.',
		how: 'A project charter, design reviews at 30/60/90%, critical-path planning and contractor oversight, bridging Facilities, engineering and IT.',
		changed: 'All 12 floors handed over, on new network and physical-security standards I defined.',
	},
	{
		org: 'Keshet Media Group',
		years: '2026',
		mark: 'half',
		title: 'A helpdesk dashboard that exposed the gaps',
		problem: 'No view of service requests: tickets with no assignee, WhatsApp requests never categorized, and no SLA.',
		built: 'A helpdesk dashboard showing every request, its status and who has it.',
		how: 'Brings tickets into one view and flags those with no category or owner.',
		changed: 'Adopted by the team with positive feedback, and it set the next fix: categories, owners and SLAs.',
	},
	{
		org: 'Buildots',
		years: '2020',
		mark: 'leaf',
		title: 'Monitoring a production AI pipeline',
		problem: 'An AI pipeline processed site data for many customer projects at once, and machine-learning errors had to be caught fast.',
		built: 'NOC monitoring of the production pipeline, as NOC Engineer.',
		how: 'Tracked each project’s runs, resolved errors, escalated to R&D, and set the outsourced QA team’s daily priorities.',
		changed: 'Resolution metrics and fixes fed back to R&D, improving the pipeline in production.',
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
