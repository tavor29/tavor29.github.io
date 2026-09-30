// Homepage copy. Comes from ../portfolio-copy-merged.md (source of truth since
// 2026-09-30); don't write new claims here. Blog posts come from the content
// collection, case studies from ./case-studies.ts, the About page from ./about.ts.
import type { IconName } from '../lib/icons';

export const person = {
	name: 'Tavor Ben-Shahar',
	role: 'Business Operations & Program Manager',
	focus: 'AI governance · Technical program delivery · Enterprise infrastructure',
	heroLead: 'Turning operational friction into',
	heroEmphasis: 'structured, high-impact programs',
	heroSub:
		'Business Operations & Program Manager with 5 years of experience leading complex technology programs across R&D, IT, Security, and Finance. I specialize in AI tool rollouts, multi-million-dollar infrastructure modernization, and automated executive reporting.',
	// Executive summary, split across About's two columns.
	positioning:
		'I work at the intersection of software, AI adoption, product delivery, and cross-functional operations.',
	positioningMore:
		'With a hands-on technical foundation and experience at Applied Materials, IBM, and Keshet Media Group, I take fragmented processes and align R&D, IT, Security, and Finance to a single cadence.',
	location: 'Tel Aviv, Israel',
	phone: '+972 50-492-2040',
	phoneHref: 'tel:+972504922040',
	email: 'tzavor29@gmail.com',
	availability:
		'I’m open to select operations and program management roles at the intersection of software, AI, product, and cross-functional delivery. If you’re scaling technical delivery or AI initiatives, I’d like to hear about it.',
	resume: 'Tavor_Ben_Shahar_Resume.pdf',
};

// The scroll-filled statement: the executive summary's second paragraph.
export const quote =
	'Whether I’m establishing an executive AI steering committee, managing multi-million-dollar infrastructure procurement, or building SQL and Tableau dashboards for senior leadership, the goal is the same: move fast, with governance that holds up.';

// Hero badges, shown as the stats row under About. `value` counts up on
// scroll; prefix/suffix are shown as-is.
export const stats: { value: number; prefix?: string; suffix?: string; label: string; mark: IconName }[] = [
	{ value: 5, suffix: '+', label: 'Years of enterprise program delivery', mark: 'half' },
	{ value: 1200, suffix: '+', label: 'Employee facility modernized', mark: 'quarter' },
	{ value: 40, suffix: '+', label: 'AI workflows brought under enterprise security compliance', mark: 'circle' },
];

// "What I do": the three operating pillars, one mark each.
export const services: { title: string; text: string; mark: IconName }[] = [
	{
		title: 'Cross-functional alignment',
		text: 'Bridging technical teams (R&D, IT) and corporate functions (Finance, Purchasing, Security).',
		mark: 'half',
	},
	{
		title: 'Proactive AI governance',
		text: 'Turning unmonitored “shadow AI” into secure, compliant, enterprise-grade workflows.',
		mark: 'circle',
	},
	{
		title: 'Data-driven transparency',
		text: 'Real-time tracking so leadership never has to ask where a project stands.',
		mark: 'quarter',
	},
];

// Coded projects for the Selected work list (case studies come first, from
// ./case-studies.ts). Outline mark = fictional company.
export const projects: {
	title: string;
	blurb: string;
	label: string;
	href: string;
	mark: IconName;
}[] = [
	{
		title: 'AI Project Intake & Governance Agent',
		blurb:
			'An agent that turns a chat-based tool request into a structured intake with a duplication check and a risk score.',
		label: 'Flagship · coded project · fictional company',
		href: 'projects/ai-intake-governance-agent/',
		mark: 'circle',
	},
	{
		title: 'Citizen Development Governance Model',
		blurb:
			'A tracked path from idea to production for internally built tools, with a maintenance owner at every stage.',
		label: 'Coded project · fictional company',
		href: 'projects/citizen-development-governance/',
		mark: 'leaf',
	},
];

export const contact: { label: string; href: string; mark: IconName; external: boolean }[] = [
	{ label: 'Email', href: 'mailto:tzavor29@gmail.com', mark: 'half', external: false },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/tavor-bs/', mark: 'quarter', external: true },
	{ label: 'GitHub', href: 'https://github.com/tavor29', mark: 'circle', external: true },
	{ label: 'Résumé', href: 'Tavor_Ben_Shahar_Resume.pdf', mark: 'leaf', external: false },
];
