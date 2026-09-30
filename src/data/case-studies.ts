// The three real-work case studies, in Context / Challenge / Actions / Results
// form. Copy from ../portfolio-copy-merged.md. Used by the homepage's Selected
// work list, the case-studies index and each case-study page.
import type { ImageMetadata } from 'astro';
import type { IconName } from '../lib/icons';
import keshetCover from '../assets/work/keshet.jpg';
import appliedCover from '../assets/work/applied-materials.jpg';
import ibmCover from '../assets/work/ibm.jpg';

export type CaseStudy = {
	slug: string;
	number: string;
	title: string;
	/** Short name for rows and the browser tab. */
	org: string;
	role: string;
	years: string;
	mark: IconName;
	/** Key impact line for the case study's card. */
	summary: string;
	/** Pill badges on the card. */
	badges: string[];
	context: string;
	challenge: string;
	actions: string[];
	/** `lead` is set in bold before the rest of the sentence. */
	results: { lead: string; text: string }[];
	/** "What I'd do differently": one honest closing line. Optional. */
	lesson?: string;
	/** Cover photo (src/assets/work/); cards fall back to generated art without one. */
	cover?: ImageMetadata;
	coverAlt?: string;
};

export const caseStudies: CaseStudy[] = [
	{
		slug: 'keshet',
		number: '01',
		title: 'Shadow AI Mitigation & Executive Steering Framework',
		org: 'Keshet Media Group',
		role: 'Business Operations Manager',
		years: '2026',
		mark: 'half',
		cover: keshetCover,
		coverAlt: 'A single light glowing in a dark room',
		summary:
			'Established an executive AI steering committee alongside the CIO to transition 40+ unmonitored employee workflows into secure, compliant enterprise tools.',
		badges: ['AI Governance', 'Security Boundaries', 'SaaS License Optimization'],
		context: 'Rapid adoption of generative AI across business units created workflows that sat outside R&D oversight.',
		challenge:
			'40+ employees were building AI workflows with no standard security protocols, budget lines, or data-protection rules.',
		actions: [
			'Helped establish an executive AI steering committee with the CIO and senior leadership.',
			'Designed the approval workflow defining budget ownership and security boundaries.',
			'Built a phased rollout to move unmonitored workflows into official, compliant tools without hurting productivity.',
			'Reviewed ~750 license seats against actual usage ahead of renewal.',
			'Ran a platform cleanup that archived or consolidated 900 project boards, and removed tens of excess admin-level permissions across document sites.',
		],
		results: [
			{ lead: '100% transition:', text: 'All 40+ workflows brought under IT/R&D security compliance.' },
			{ lead: 'Zero security incidents', text: 'under the new data-privacy boundaries.' },
			{ lead: '7 redundant tools cut', text: 'through unified AI tool licensing.' },
			{ lead: '900 project boards', text: 'archived or consolidated.' },
		],
		lesson:
			'I’d write the intake requirements and the rollout plan together, from the first week. A requirements document is a starting point, not a shipped system; the rollout is where governance actually gets tested.',
	},
	{
		slug: 'applied-materials',
		number: '02',
		title: 'Multi-Year Infrastructure Modernization (1,200+ Employees)',
		org: 'Applied Materials',
		role: 'IT Project Manager & Infrastructure Lead',
		years: '2023–2026',
		mark: 'quarter',
		cover: appliedCover,
		coverAlt: 'Network cables patched into a switch panel',
		summary:
			'Managed the multi-year IT/R&D infrastructure portfolio for a 1,200+ employee facility, building automated SQL & Tableau dashboards for live C-suite visibility.',
		badges: ['CapEx/OpEx', 'SQL & Tableau Telemetry'],
		context: 'Overhaul of R&D and production IT infrastructure supporting a facility of 1,200+ employees.',
		challenge:
			'High-stakes delivery across R&D, IT, Finance, and external contractors, with strict production schedules and long-lead hardware bottlenecks.',
		actions: [
			'Translated R&D technical requirements into bills of materials and procurement schedules.',
			'Tracked dozens of long-lead items end to end, from vendor sourcing through installation and handover.',
			'Built one automated SQL and Tableau dashboard per project, giving tens of executives live visibility into milestones, risks, and budget.',
			'Moved server workloads to a colocation site.',
		],
		results: [
			{ lead: '30% lower compute cost', text: 'after moving servers to a colocation site.' },
			{ lead: 'On-time milestones', text: 'with no downtime to R&D schedules during the upgrade.' },
			{ lead: 'Full executive visibility:', text: 'Manual status reporting replaced by real-time KPI dashboards.' },
			{ lead: 'Streamlined forecasting:', text: 'Recurring budget cycles run in step with Finance and Purchasing.' },
		],
		lesson:
			'I’d assign an owner to every dashboard input on day one. A dashboard is only as reliable as the data feeding it, and keeping inputs current turned out to be its own ongoing effort, not a one-time build.',
	},
	{
		slug: 'ibm',
		number: '03',
		title: 'Multi-System Migration & Zero-Downtime Hypercare',
		org: 'IBM',
		role: 'Operations Manager',
		years: '2021–2023',
		mark: 'circle',
		cover: ibmCover,
		coverAlt: 'Bundles of network cables running into a rack',
		summary:
			'Led cross-system migrations and disaster-recovery initiatives with hands-on UAT ownership, achieving zero operational downtime for end users.',
		badges: ['UAT & Hypercare', 'Disaster Recovery'],
		context: 'Cross-system IT transformation and infrastructure migrations for enterprise clients.',
		challenge: 'Migrating mission-critical systems while keeping operations running with no user disruption.',
		actions: [
			'Directed matrixed engineering teams through migrations and disaster-recovery initiatives.',
			'Owned UAT and hypercare, coordinating on-site technicians and operations teams.',
			'Managed configuration changes and crisis response during active transition windows.',
		],
		results: [
			{ lead: 'Zero disruption:', text: 'Migrations delivered with full operational continuity.' },
			{ lead: 'Smooth adoption:', text: 'Fast sign-off across user acceptance groups, driven by structured hypercare.' },
		],
	},
];

export const caseStudyBySlug = (slug: string) => {
	const found = caseStudies.find((c) => c.slug === slug);
	if (!found) throw new Error(`Unknown case study: ${slug}`);
	return found;
};
