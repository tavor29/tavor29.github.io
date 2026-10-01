import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const origin = z.enum(['fictional', 'real']);

const entryFields = {
	title: z.string(),
	summary: z.string(),
	origin,
	date: z.coerce.date(),
};

// Coded projects: the three stages of the Citizen AI Governance umbrella. The
// Markdown body is the page's prose (each ## heading becomes a labelled
// section); everything structured (status, links, stack, integration map)
// is frontmatter, so it can change without touching code.
const stackGroup = z.enum(['Frontend', 'Backend / data', 'AI', 'Integrations', 'Quality', 'Infra']);
const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				/** One or two sentences: the card line and the page's meta description. */
				summary: z.string(),
				stage: z.enum(['discover', 'decide', 'sustain']),
				/** `live` needs a working `demo` link; the build fails otherwise. */
				status: z.enum(['live', 'in-progress', 'planned']),
				statusNote: z.string().optional(),
				/** The question this stage answers. */
				question: z.string(),
				/** One line on where this project stops and the other two begin. */
				boundary: z.string(),
				mark: z.enum(['half', 'quarter', 'circle', 'leaf']),
				repo: z.string().url().optional(),
				demo: z.string().url().optional(),
				links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
				cover: image().optional(),
				coverAlt: z.string().optional(),
				/** Show the Version 1 intake walkthrough on this page. */
				walkthrough: z.boolean().default(false),
				integrations: z.array(z.object({ system: z.string(), demo: z.string(), production: z.string() })).default([]),
				stack: z.object({
					/** True until the code exists: the section is titled "Planned stack". */
					planned: z.boolean().default(false),
					note: z.string().optional(),
					groups: z.array(z.object({ name: stackGroup, items: z.array(z.string()), why: z.string() })),
				}),
			})
			.refine((d) => d.status !== 'live' || !!d.demo, { message: 'A project marked live needs a demo link.' }),
});

const caseStudies = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
	schema: z.object({
		...entryFields,
		parts: z.array(z.string()).optional(),
	}),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		...entryFields,
		/** Short topic shown as the pill on the post's card, e.g. 'Governance'. */
		tag: z.string().optional(),
	}),
});

const openSource = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/open-source' }),
	schema: z.object(entryFields),
});

const slides = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/slides' }),
	schema: z.object({
		...entryFields,
		/** Set once a real PDF is uploaded to public/, e.g. '/decks/my-talk.pdf'. */
		pdfPath: z.string().optional(),
	}),
});

// Templates & Docs: reusable working documents. Each entry's Markdown body is
// both the page and the downloadable file (see pages/templates/[slug].md.ts).
const templates = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/templates' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		/** What kind of document it is, shown as the row's label. */
		kind: z.string(),
		/** `fictional` = worked example from a coded-project demo (outline mark); `generic` = a blank template. */
		origin: z.enum(['fictional', 'generic']),
		mark: z.enum(['half', 'quarter', 'circle', 'leaf']),
		order: z.number(),
	}),
});

export const collections = {
	templates,
	projects,
	'case-studies': caseStudies,
	blog,
	'open-source': openSource,
	slides,
};
