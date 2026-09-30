// Homepage copy. Comes from ../portfolio-copy-merged.md (source of truth since
// 2026-09-30); don't write new claims here. Blog posts come from the content
// collection, case studies from ./case-studies.ts, the About page from ./about.ts.
import type { ImageMetadata } from 'astro';
import type { IconName } from '../lib/icons';
import intakeCover from '../assets/work/ai-intake-governance-agent.jpg';
import citizenCover from '../assets/work/citizen-development-governance.jpg';

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

// "Results from recent roles": countable facts, each tied to where it happened,
// never a percentage improvement nobody can check. `value` counts up on scroll;
// prefix/suffix are shown as-is. Source: ../portfolio-copy-merged.md and the
// content package.
export const stats: { value: number; prefix?: string; suffix?: string; label: string; where: string; mark: IconName }[] = [
	{ value: 40, suffix: '+', label: 'AI workflows moved under IT/R&D security compliance', where: 'Keshet Media Group', mark: 'half' },
	{ value: 7, label: 'Redundant tools cut through unified AI tool licensing', where: 'Keshet Media Group', mark: 'half' },
	{ value: 900, label: 'Project boards archived or consolidated in a platform cleanup', where: 'Keshet Media Group', mark: 'half' },
	{ value: 30, prefix: '−', suffix: '%', label: 'Compute cost after moving servers to a colocation site', where: 'Applied Materials', mark: 'quarter' },
	{ value: 1200, suffix: '+', label: 'Employee facility whose IT infrastructure was modernized', where: 'Applied Materials', mark: 'quarter' },
	{ value: 0, label: 'User disruption across system migrations', where: 'IBM', mark: 'circle' },
];

// "What I do": the three operating pillars, as bento cards. `art` picks the
// card's background illustration (components/PillarArt.astro).
export const services: { tag: string; title: string; text: string; mark: IconName; art: 'network' | 'shield' | 'telemetry' }[] = [
	{
		tag: '01 / Operations',
		title: 'Cross-functional alignment',
		text: 'Unifying engineering and technical teams with Finance, Purchasing, Security, and C-suite leadership behind a shared operational cadence.',
		mark: 'half',
		art: 'network',
	},
	{
		tag: '02 / Governance',
		title: 'Proactive AI governance',
		text: 'Transitioning unmonitored, ad-hoc technology adoption into secure, compliant, enterprise-grade workflows.',
		mark: 'leaf',
		art: 'shield',
	},
	{
		tag: '03 / Analytics',
		title: 'Data-driven transparency',
		text: 'Building live tracking systems and data telemetry so leadership always has clear visibility into program health.',
		mark: 'quarter',
		art: 'telemetry',
	},
];

// "How I think": four beliefs about product, shown as ruled rows after the
// pillars. Each gets one of the four marks, in order.
export const beliefs: { title: string; text: string; mark: IconName }[] = [
	{
		title: 'Early product work should expose the riskiest assumption, not prove the easiest one.',
		text: 'Technical feasibility is almost never the assumption most likely to kill adoption. Whether the user who matters most actually has the problem you think they have usually is. I design the first weeks of any new product around stress-testing that assumption, not building the most demoable version.',
		mark: 'half',
	},
	{
		title: 'Value isn’t complete until users can perceive it.',
		text: 'In complex categories like cybersecurity, AI and B2B platforms, a product can work perfectly and still feel like nothing is happening. The product job isn’t done until value is legible: visible enough to trust, specific enough to recommend, real enough to renew.',
		mark: 'quarter',
	},
	{
		title: 'Design is upstream, not downstream.',
		text: 'The most important design decisions aren’t about color or polish. They’re structural: what appears first, what’s hidden, what’s the default, what the system implies about how users should behave. These choices shape behavior before anyone reads a single word, and they’re product strategy, not styling.',
		mark: 'circle',
	},
	{
		title: 'I’d rather build something a smaller group loves than something everyone tolerates.',
		text: 'In early products, love is a more reliable signal than completeness. It tells you whether you’ve found something worth scaling, or just something that technically works. Minimum lovable, not minimum viable.',
		mark: 'leaf',
	},
];

// Coded projects for the Selected work list (case studies come first, from
// ./case-studies.ts). They get an outline mark; case studies get a solid one.
export const projects: {
	title: string;
	blurb: string;
	label: string;
	href: string;
	mark: IconName;
	cover?: ImageMetadata;
	coverAlt?: string;
}[] = [
	{
		title: 'AI Project Intake & Governance Agent',
		blurb:
			'An agent that turns a chat-based tool request into a structured intake with a duplication check and a risk score.',
		label: 'Flagship · coded project',
		href: 'projects/ai-intake-governance-agent/',
		mark: 'circle',
		cover: intakeCover,
		coverAlt: 'Sticky notes and a printed plan on a desk',
	},
	{
		title: 'Citizen Development Governance Model',
		blurb:
			'A tracked path from idea to production for internally built tools, with a maintenance owner at every stage.',
		label: 'Coded project',
		href: 'projects/citizen-development-governance/',
		mark: 'leaf',
		cover: citizenCover,
		coverAlt: 'Two people working through something on a laptop',
	},
];

export const contact: { label: string; href: string; mark: IconName; external: boolean }[] = [
	{ label: 'Email', href: 'mailto:tzavor29@gmail.com', mark: 'half', external: false },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/tavor-bs/', mark: 'quarter', external: true },
	{ label: 'GitHub', href: 'https://github.com/tavor29', mark: 'circle', external: true },
	{ label: 'Résumé', href: 'Tavor_Ben_Shahar_Resume.pdf', mark: 'leaf', external: false },
];
