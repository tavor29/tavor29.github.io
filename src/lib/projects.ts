// Shared helpers for the three coded projects (src/content/projects/*.md):
// stage order and names, status labels, and the collection sorted in
// lifecycle order.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Stage = Project['data']['stage'];
export type Status = Project['data']['status'];

export const stages: Record<Stage, { n: number; name: string }> = {
	discover: { n: 1, name: 'Discover' },
	decide: { n: 2, name: 'Decide' },
	sustain: { n: 3, name: 'Sustain' },
};

export const statusLabel: Record<Status, string> = {
	live: 'Live',
	'in-progress': 'In progress',
	planned: 'Planned',
};

/** The three projects in lifecycle order: Discover, Decide, Sustain. */
export async function getProjects(): Promise<Project[]> {
	return (await getCollection('projects')).sort((a, b) => stages[a.data.stage].n - stages[b.data.stage].n);
}

export const projectHref = (p: Project) => `projects/${p.id}/`;

/** "Stage 2 · Decide" */
export const stageLabel = (stage: Stage) => `Stage ${stages[stage].n} · ${stages[stage].name}`;
