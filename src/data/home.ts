// Homepage copy. Comes from ../portfolio-content-package.md (source of truth);
// don't write new claims here. Blog posts come from the content collection.
import type { IconName } from '../lib/icons';

export const person = {
	name: 'Tavor Ben Shahar',
	role: 'Business Operations & Program Manager',
	heroLead: 'I turn ad hoc requests into',
	heroEmphasis: 'repeatable processes',
	heroSub:
		'Most recently Business Operations Manager at Keshet Media Group. Before that, Applied Materials and IBM. Based in Tel Aviv.',
	positioning:
		'Business operations and program management, with five years running technology and AI-adoption programs across IT, R&D, and operations teams.',
	positioningMore:
		'I build the governance, intake, and reporting systems that turn ad hoc requests into repeatable processes, and I use AI-assisted development tools daily to build the systems themselves, not just manage them.',
	resume: 'Tavor_Ben_Shahar_Resume.pdf',
};

export const quote =
	'From ad hoc to repeatable. A place to see what already exists, a lightweight way to flag risk, and a fast path from “I built this for myself” to a supported tool. The goal isn’t to slow people down. It’s to make sure the organization can see what it’s actually running.';

// Each service carries one of the four marks, for colour.
export const services: { title: string; tags: string[]; mark: IconName }[] = [
	{ title: 'AI governance & intake', tags: ['Steering committees', 'Intake design', 'Risk scoring'], mark: 'circle' },
	{ title: 'Licensing & SaaS cost', tags: ['Usage review', 'Tier rightsizing', 'Pilot scoping'], mark: 'half' },
	{ title: 'Program management', tags: ['Capital programs', 'Cross-functional', 'Forecast cycles'], mark: 'leaf' },
	{ title: 'Reporting & dashboards', tags: ['KPI dashboards', 'Schedule risk', 'Budget visibility'], mark: 'quarter' },
];

// Each item keeps its mark from the original work index: solid = real work,
// outline = fictional company.
export const work: {
	title: string;
	blurb: string;
	label: string;
	href: string;
	mark: IconName;
	real: boolean;
}[] = [
	{
		title: 'AI Project Intake & Governance Agent',
		blurb:
			'An agent that turns a chat-based tool request into a structured intake with a duplication check and a risk score.',
		label: 'Flagship · coded project · fictional company',
		href: 'projects/ai-intake-governance-agent/',
		mark: 'circle',
		real: false,
	},
	{
		title: 'Keshet Media Group',
		blurb:
			'Helped design AI governance and intake for around 40 unsanctioned tool builders, and reviewed licensing across roughly 750 seats.',
		label: 'Real work · case study',
		href: 'case-studies/keshet/',
		mark: 'half',
		real: true,
	},
	{
		title: 'Citizen Development Governance Model',
		blurb:
			'A tracked path from idea to production for internally built tools, with a maintenance owner at every stage.',
		label: 'Coded project · fictional company',
		href: 'projects/citizen-development-governance/',
		mark: 'leaf',
		real: false,
	},
	{
		title: 'Applied Materials',
		blurb:
			'Built the dashboards a 1,200-plus-employee capital program’s leadership used to see schedule and budget risk without asking around.',
		label: 'Real work · case study',
		href: 'case-studies/applied-materials/',
		mark: 'quarter',
		real: true,
	},
];

export const contact: { label: string; href: string; mark: IconName; external: boolean }[] = [
	{ label: 'Email', href: 'mailto:tzavor29@gmail.com', mark: 'half', external: false },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/tavor-bs/', mark: 'quarter', external: true },
	{ label: 'GitHub', href: 'https://github.com/tavor29', mark: 'circle', external: true },
	{ label: 'Résumé', href: 'Tavor_Ben_Shahar_Resume.pdf', mark: 'leaf', external: false },
];
