// Every piece of work in one list: the case studies, then the coded projects.
// Drives the homepage's Selected work cards and the "More work" cards at the
// end of each case-study and project page. `cover` is a photo once one is
// chosen; until then cards draw generated art from `slug`.
import type { ImageMetadata } from 'astro';
import type { IconName } from '../lib/icons';
import { caseStudies } from './case-studies';
import { projects } from './home';

export type WorkItem = {
	slug: string;
	title: string;
	label: string;
	href: string;
	mark: IconName;
	real: boolean;
	cover?: ImageMetadata;
	coverAlt?: string;
};

export const work: WorkItem[] = [
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
		slug: p.href.replace(/^projects\/|\/$/g, ''),
		title: p.title,
		label: p.label,
		href: p.href,
		mark: p.mark,
		real: false,
		cover: p.cover,
		coverAlt: p.coverAlt,
	})),
];

/** The next `count` items after the one at `href`, wrapping around. */
export function moreWork(href: string, count = 2): WorkItem[] {
	const i = work.findIndex((w) => w.href === href);
	return Array.from({ length: count }, (_, k) => work[(i + 1 + k) % work.length]).filter((w) => w.href !== href);
}
