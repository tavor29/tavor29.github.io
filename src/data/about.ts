// The About page (/about/): profile, skills, education, recognition and
// testimonials. Copy from ../portfolio-copy-merged.md; bracketed placeholders
// there are left out here until Tavor fills them in.
import type { IconName } from '../lib/icons';

// Professional profile: three columns of three.
export const profile: { heading: string; mark: IconName; items: { lead: string; text: string }[] }[] = [
	{
		heading: 'Leadership style',
		mark: 'half',
		items: [
			{
				lead: 'Pragmatic & cross-functional.',
				text: 'I translate technical delivery constraints into business impact for Finance and executive leadership.',
			},
			{
				lead: 'Data-backed accountability.',
				text: 'Matrixed engineering teams get real-time KPI dashboards, not micromanagement.',
			},
			{
				lead: 'Hands-on in transitions.',
				text: 'I own UAT and hypercare on critical cutovers to keep disruption to users minimal.',
			},
		],
	},
	{
		heading: 'Delivery methodology',
		mark: 'quarter',
		items: [
			{
				lead: 'Hybrid Agile & Waterfall.',
				text: 'Scrum for fast software iteration, structured Waterfall governance for long-lead infrastructure procurement.',
			},
			{
				lead: 'Steering committees & governance.',
				text: 'Clear budget ownership, approval gates, and escalation paths at executive level.',
			},
			{
				lead: 'Risk & change control.',
				text: 'Disaster recovery, supply-chain bottleneck mitigation, structured change management.',
			},
		],
	},
	{
		heading: 'Specialization',
		mark: 'circle',
		items: [
			{
				lead: 'Enterprise high-tech & media.',
				text: 'Semiconductor infrastructure, R&D facility operations, and enterprise AI rollouts.',
			},
			{
				lead: 'AI & SaaS optimization.',
				text: 'Frameworks for safe LLM adoption, license optimization, and security boundaries.',
			},
			{
				lead: 'Infrastructure modernization.',
				text: 'Data-center upgrades, network architecture alignment, multi-year budget planning.',
			},
		],
	},
];

// Skills, grouped for the filter tabs (All · Governance & AI · Program Delivery · Analytics & Stack).
export type SkillFilter = 'governance' | 'delivery' | 'analytics';
export const skillFilters: { id: SkillFilter | 'all'; label: string }[] = [
	{ id: 'all', label: 'All' },
	{ id: 'governance', label: 'Governance & AI' },
	{ id: 'delivery', label: 'Program Delivery' },
	{ id: 'analytics', label: 'Analytics & Stack' },
];
export const skills: { group: SkillFilter; title: string; mark: IconName; items: string[] }[] = [
	{
		group: 'governance',
		title: 'AI & software governance',
		mark: 'circle',
		items: [
			'AI governance frameworks',
			'Enterprise LLM workflow integration',
			'SaaS license & cost optimization',
			'AI security boundaries & compliance',
		],
	},
	{
		group: 'delivery',
		title: 'Program & operational delivery',
		mark: 'half',
		items: [
			'Cross-functional program management',
			'Steering committee facilitation',
			'Vendor & contractor management',
			'UAT & hypercare',
			'Disaster recovery & change control',
			'Capacity & budget planning',
		],
	},
	{
		group: 'analytics',
		title: 'Project & workflow',
		mark: 'quarter',
		items: ['Jira', 'Confluence', 'Monday.com', 'Azure DevOps', 'ServiceNow', 'MS Project'],
	},
	{
		group: 'analytics',
		title: 'Analytics & data',
		mark: 'quarter',
		items: ['SQL', 'Tableau', 'Automated executive KPI dashboards'],
	},
	{
		group: 'analytics',
		title: 'ERP & infrastructure',
		mark: 'quarter',
		items: ['SAP S/4HANA', 'Enterprise cloud & data-center infrastructure', 'Cybersecurity governance'],
	},
	{
		group: 'analytics',
		title: 'Developer tools',
		mark: 'quarter',
		items: ['Cursor / AI IDEs', 'LLM-assisted automation'],
	},
];

export const education: { title: string; detail: string; mark: IconName }[] = [
	{ title: 'AI Implementation in Organizations (160 hours)', detail: 'HackerU · 2026', mark: 'circle' },
	{ title: 'AI Performance Engineering (100 hours)', detail: 'Nebius Academy · 2026', mark: 'circle' },
	{
		title: 'B.A., Business Administration & Information Systems, Cum Laude',
		detail: 'Ruppin Academic Center · 2020–2023',
		mark: 'leaf',
	},
];

export const languages = 'Native English · Native Hebrew';

export const recognition: { title: string; org: string; text: string; mark: IconName }[] = [
	{
		title: 'Cum Laude',
		org: 'Ruppin Academic Center',
		text: 'Graduated with honors in B.A. Business Administration & Information Systems.',
		mark: 'leaf',
	},
	{
		title: 'AI Steering Committee',
		org: 'Keshet Media Group',
		text: 'Helped establish the organization’s first official AI governance body alongside the CIO.',
		mark: 'half',
	},
	{
		title: '260 hours of specialized AI training',
		org: 'HackerU and Nebius Academy',
		text: 'AI Implementation (HackerU) and AI Performance Engineering (Nebius Academy).',
		mark: 'circle',
	},
];

// Testimonials only render once they have a real person's name and title, and
// that person has agreed to the wording. Until then this section stays hidden.
export const testimonials: { quote: string; name: string; title: string; org: string }[] = [
	{
		quote:
			'Tavor has a rare ability to step into technical complexity, extract order from chaos, and deliver executive-level clarity. His work on our AI steering framework transformed how our organization approaches emerging technology.',
		name: '',
		title: '',
		org: 'Keshet Media Group',
	},
	{
		quote:
			'In high-stakes infrastructure environments supporting over 1,200 people, Tavor’s procurement discipline and automated Tableau reporting kept our R&D initiatives on schedule and under budget.',
		name: '',
		title: '',
		org: 'Applied Materials',
	},
	{
		quote:
			'A master of cross-functional delivery. Tavor managed matrixed teams through complex migrations with minimal friction and flawless UAT execution.',
		name: '',
		title: '',
		org: 'IBM',
	},
];
