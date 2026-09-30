import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const origin = z.enum(['fictional', 'real']);

const entryFields = {
	title: z.string(),
	summary: z.string(),
	origin,
	date: z.coerce.date(),
};

const projects = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
	schema: z.object(entryFields),
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
	schema: z.object(entryFields),
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
		/** Worked examples set in the fictional company must say so on the page. */
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
