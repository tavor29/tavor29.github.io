// The About page (/about/, "How I work"). Copy from ../portfolio-copy-merged.md
// and Tavor's operating-profile update (2026-09-30). Each fact appears once:
// the executive summary and operating pillars live on the homepage, the
// steering committee lives in case study 01, so none of them repeat here.
import type { IconName } from '../lib/icons';

// Professional operating profile: three columns of three.
export const profile: { heading: string; mark: IconName; items: { lead: string; text: string }[] }[] = [
	{
		heading: 'Leadership style',
		mark: 'half',
		items: [
			{
				lead: 'Cross-functional translation',
				text: 'Translating technical delivery constraints into clear business metrics for Finance and executive leadership.',
			},
			{
				lead: 'Data-backed autonomy',
				text: 'Empowering matrixed engineering teams through live KPI telemetry rather than micromanagement.',
			},
			{
				lead: 'Hands-on cutover ownership',
				text: 'Driving UAT, cutover logistics, and hypercare to guarantee zero operational downtime.',
			},
		],
	},
	{
		heading: 'Delivery methodologies',
		mark: 'quarter',
		items: [
			{
				lead: 'Adaptive frameworks',
				text: 'Scrum for rapid AI and software iterations; structured PMO governance for long-lead hardware procurement.',
			},
			{
				lead: 'Executive steering',
				text: 'Defining budget ownership, formal approval gates, and escalation pathways at the C-suite level.',
			},
			{
				lead: 'Continuity & risk control',
				text: 'Proactive supply chain tracking, disaster recovery, and structured change control.',
			},
		],
	},
	{
		heading: 'Domain specialization',
		mark: 'circle',
		items: [
			{
				lead: 'High-tech & enterprise systems',
				text: 'Semiconductor R&D infrastructure, media operations, and enterprise software rollouts.',
			},
			{
				lead: 'AI & SaaS optimization',
				text: 'Frameworks for safe LLM deployment, license efficiency, and security boundary compliance.',
			},
			{
				lead: 'Infrastructure modernization',
				text: 'Data center upgrades, network architecture alignment, and multi-year CapEx/OpEx planning.',
			},
		],
	},
];

// Tools & stack. The competencies that used to sit beside these are covered
// by the profile above, so only the concrete tools are listed.
export const tools: { title: string; mark: IconName; items: string[] }[] = [
	{
		title: 'Project & workflow',
		mark: 'half',
		items: ['Jira', 'Confluence', 'Monday.com', 'Azure DevOps', 'ServiceNow', 'MS Project'],
	},
	{
		title: 'Analytics & data',
		mark: 'quarter',
		items: ['SQL', 'Tableau', 'Automated executive KPI dashboards'],
	},
	{
		title: 'ERP & infrastructure',
		mark: 'circle',
		items: ['SAP S/4HANA', 'Enterprise cloud & data-center infrastructure', 'Cybersecurity governance'],
	},
	{
		title: 'Developer tools',
		mark: 'leaf',
		items: ['Cursor / AI IDEs', 'LLM-assisted automation'],
	},
];

// Education, with the degree's honors and the training hours folded in
// (they used to repeat as a separate "Awards" list).
export const education: { title: string; detail: string; mark: IconName }[] = [
	{
		title: 'B.A., Business Administration & Information Systems, Cum Laude',
		detail: 'Ruppin Academic Center · 2020–2023',
		mark: 'leaf',
	},
	{ title: 'AI Implementation in Organizations (160 hours)', detail: 'HackerU · 2026', mark: 'circle' },
	{ title: 'AI Performance Engineering (100 hours)', detail: 'Nebius Academy · 2026', mark: 'circle' },
];

export const trainingNote = '260 hours of specialized AI training in 2026';
export const languages = 'Native English · Native Hebrew';

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
