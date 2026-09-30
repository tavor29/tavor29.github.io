// The three real-work case studies, in Context / Challenge / Actions / Results
// form. Copy from ../portfolio-copy-merged.md. Used by the homepage's Selected
// work list, the case-studies index and each case-study page.
import type { IconName } from '../lib/icons';

export type CaseStudy = {
	slug: string;
	number: string;
	title: string;
	/** Short name for rows and the browser tab. */
	org: string;
	role: string;
	years: string;
	mark: IconName;
	context: string;
	challenge: string;
	actions: string[];
	/** `lead` is set in bold before the rest of the sentence. */
	results: { lead: string; text: string }[];
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
		context: 'Rapid adoption of generative AI across business units created workflows that sat outside R&D oversight.',
		challenge:
			'40+ employees were building AI workflows with no standard security protocols, budget lines, or data-protection rules.',
		actions: [
			'Helped establish an executive AI steering committee with the CIO and senior leadership.',
			'Designed the approval workflow defining budget ownership and security boundaries.',
			'Built a phased rollout to move unmonitored workflows into official, compliant tools without hurting productivity.',
		],
		results: [
			{ lead: '100% transition:', text: 'All 40+ workflows brought under IT/R&D security compliance.' },
			{ lead: 'Zero security incidents', text: 'under the new data-privacy boundaries.' },
			{ lead: 'Clear financial governance:', text: 'Redundant SaaS spend reduced through unified AI tool licensing.' },
		],
	},
	{
		slug: 'applied-materials',
		number: '02',
		title: 'Multi-Year Infrastructure Modernization (1,200+ Employees)',
		org: 'Applied Materials',
		role: 'IT Project Manager & Infrastructure Lead',
		years: '2023–2026',
		mark: 'quarter',
		context: 'Overhaul of R&D and production IT infrastructure supporting a facility of 1,200+ employees.',
		challenge:
			'High-stakes delivery across R&D, IT, Finance, and external contractors, with strict production schedules and long-lead hardware bottlenecks.',
		actions: [
			'Translated R&D technical requirements into bills of materials and procurement schedules.',
			'Tracked long-lead items end to end, from vendor sourcing through installation and handover.',
			'Built automated SQL and Tableau dashboards giving leadership live visibility into milestones, risks, and budget.',
		],
		results: [
			{ lead: 'On-time milestones', text: 'with no downtime to R&D schedules during the upgrade.' },
			{ lead: 'Full executive visibility:', text: 'Manual status reporting replaced by real-time KPI dashboards.' },
			{ lead: 'Streamlined forecasting:', text: 'Recurring budget cycles run in step with Finance and Purchasing.' },
		],
	},
	{
		slug: 'ibm',
		number: '03',
		title: 'Multi-System Migration & Zero-Downtime Hypercare',
		org: 'IBM',
		role: 'Operations Manager',
		years: '2021–2023',
		mark: 'circle',
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
