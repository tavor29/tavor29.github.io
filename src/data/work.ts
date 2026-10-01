// Every piece of work in one list: the case studies, then the coded projects
// in lifecycle order. Drives the work cards and the "More work" cards at the
// end of each case-study and project page. `cover` is a photo once one is
// chosen; until then cards draw generated art from `slug`.
import type { ImageMetadata } from 'astro';
import type { IconName } from '../lib/icons';
import { caseStudies } from './case-studies';
import { getProjects, projectHref, stageLabel, type Status } from '../lib/projects';

export type WorkItem = {
	slug: string;
	title: string;
	label: string;
	href: string;
	mark: IconName;
	real: boolean;
	/** Coded projects only: shown as a badge on the card. */
	status?: Status;
	cover?: ImageMetadata;
	coverAlt?: string;
};

export async function getWork(): Promise<WorkItem[]> {
	const projects = await getProjects();
	return [
		...caseStudies.map((c) => ({
			slug: c.slug,
			title: c.title,
			label: `${c.org} · ${c.years}`,
			href: `case-studies/${c.slug}/`,
			mark: c.mark,
			real: true,
			cover: c.cover,
			coverAlt: c.coverAlt,
		})),
		...projects.map((p) => ({
			slug: p.id,
			title: p.data.title,
			label: stageLabel(p.data.stage),
			href: projectHref(p),
			mark: p.data.mark,
			real: false,
			status: p.data.status,
			cover: p.data.cover,
			coverAlt: p.data.coverAlt,
		})),
	];
}

/** The next `count` items after the one at `href`, wrapping around. */
export async function moreWork(href: string, count = 2): Promise<WorkItem[]> {
	const work = await getWork();
	const i = work.findIndex((w) => w.href === href);
	return Array.from({ length: count }, (_, k) => work[(i + 1 + k) % work.length]).filter((w) => w.href !== href);
}
