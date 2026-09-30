// Each template's download: the same Markdown the page renders, with its title
// on top, served as /templates/<slug>.md so the page and the file never drift.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const getStaticPaths = (async () => {
	const docs = await getCollection('templates');
	return docs.map((doc) => ({ params: { slug: doc.id }, props: { doc } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
	const { doc } = props as { doc: CollectionEntry<'templates'> };
	const text = `# ${doc.data.title}\n\n${doc.body ?? ''}\n\n---\nTavor Ben-Shahar · https://tavor29.github.io/templates/${doc.id}/\n`;
	return new Response(text, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
};
