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

export const collections = {
	projects,
	'case-studies': caseStudies,
	blog,
	'open-source': openSource,
	slides,
};
