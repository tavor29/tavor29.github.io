// Homepage copy. Comes from ../portfolio-copy-merged.md (source of truth since
// 2026-09-30) and Tavor's confirmed numbers; don't write new claims here. Blog posts come from the content
// collection, case studies from ./case-studies.ts, the About page from ./about.ts.
import type { IconName } from '../lib/icons';

export const person = {
	name: 'Tavor Ben-Shahar',
	// Freelance-first since 2026-11-21 (Tavor's call): clients first, recruiters
	// welcome, the résumé stays in the nav.
	role: 'Freelance Program & Project Manager',
	focus: 'Project rescue · Fractional PM · AI governance · IT & infrastructure programs',
	heroLead: 'I get stuck technology projects',
	heroEmphasis: 'back on track and shipped',
	heroSub:
		'Freelance program and project manager with 6+ years running technology programs at Applied Materials, IBM and Keshet Media Group. I step into projects that are late, over budget or unclear, reset the plan, and see them through to launch.',
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
		'Available for freelance projects, part-time or end to end, and open to the right full-time role. Tell me about the project that’s stuck.',
	/** Scheduling page for a 20-minute intro call (Cal.com or Calendly). Empty = the button opens an email instead. */
	bookingUrl: '',
	resume: 'Tavor_Ben_Shahar_Resume.pdf',
};

// The scroll-filled statement (Tavor's wording, 2026-10-02).
export const quote =
	'I sit between the people who build technology and the people who fund and depend on it. I turn requirements into plans, constraints into decisions, and status into foresight leadership can plan with.';

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

// "What I actually do": five short bullets, program management and business
// operations. One line each, plain words.
// "How I can help": the four freelance offers (Tavor's picks, 2026-11-21).
// Each says who it's for, what the client gets, a typical length and one
// proof point from a real role (only numbers he has confirmed).
export type Offer = {
	title: string;
	mark: IconName;
	forWho: string;
	gets: string[];
	length: string;
	proof: string;
};

export const offers: Offer[] = [
	{
		title: 'Project rescue',
		mark: 'quarter',
		forWho: 'A technology project that’s late, over budget or stuck, and nobody can say exactly why.',
		gets: ['A health check in the first week', 'A reset plan the sponsor signs off', 'Weekly status that shows real risk'],
		length: 'Usually 1–3 months',
		proof: 'Caught a budget gap of millions of dollars before it became an overrun (Applied Materials).',
	},
	{
		title: 'Fractional PM / PMO',
		mark: 'half',
		forWho: 'Teams that need a senior project or program manager, but not a full-time hire.',
		gets: ['Roadmap, plan and risk register', 'One cadence across R&D, IT, Security and Finance', 'A live dashboard for leadership'],
		length: 'A few days a week, month to month',
		proof: 'Ran an IT and R&D portfolio of 10+ projects a year for 4,000+ employees (Applied Materials).',
	},
	{
		title: 'AI governance setup',
		mark: 'leaf',
		forWho: 'Companies where people adopt AI tools faster than IT and Security can approve them.',
		gets: ['A map of the AI tools and workflows in use', 'A simple approved route and policy', 'A licence and cost review'],
		length: 'Usually 4–6 weeks',
		proof: 'Moved 40+ unapproved AI workflows into approved, secure tools (Keshet Media Group).',
	},
	{
		title: 'IT & infrastructure programs',
		mark: 'circle',
		forWho: 'An office build-out, compute expansion or system migration with many vendors and long lead times.',
		gets: ['One schedule and critical path', 'Long-lead procurement tracking', 'Change control with a budget reserve'],
		length: 'The length of the program',
		proof: 'Delivered a 16-month AI compute build a month early and about 5% under budget (Applied Materials).',
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

export const contact: { label: string; href: string; mark: IconName; external: boolean }[] = [
	{ label: 'Email', href: 'mailto:tzavor29@gmail.com', mark: 'half', external: false },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/tavor-bs/', mark: 'quarter', external: true },
	{ label: 'GitHub', href: 'https://github.com/tavor29', mark: 'circle', external: true },
	{ label: 'Résumé', href: 'Tavor_Ben_Shahar_Resume.pdf', mark: 'leaf', external: false },
];

/** Where "Book a 20-min call" goes: the scheduling page, or an email until there is one. */
export const booking = person.bookingUrl
	? { href: person.bookingUrl, external: true }
	: { href: `mailto:${person.email}?subject=${encodeURIComponent('Intro call about a project')}`, external: false };
