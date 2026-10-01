// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { writeFile } from 'node:fs/promises';

const site = 'https://tavor29.github.io/';

// Old URLs that moved. GitHub Pages can't send server redirects, so Astro
// writes a small page at the old path that forwards to the new one.
const redirects = {
	'/projects/ai-intake-governance-agent/': '/projects/innovation-prd-marketplace/',
};

// sitemap.xml from the pages the build actually wrote, without a plugin.
// Skips redirect stubs and the hidden Open Source page (see CLAUDE.md).
const hidden = ['open-source/', 'blog/slides/'];
const sitemap = {
	name: 'sitemap',
	hooks: {
		'astro:build:done': async ({ pages, dir }) => {
			const skip = new Set([...Object.keys(redirects).map((r) => r.replace(/^\//, '')), ...hidden]);
			const urls = pages
				.map((p) => p.pathname)
				.filter((p) => (p === '' || p.endsWith('/')) && !skip.has(p))
				.sort()
				.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`);
			const xml = [
				'<?xml version="1.0" encoding="UTF-8"?>',
				'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
				...urls,
				'</urlset>',
				'',
			].join('\n');
			await writeFile(new URL('sitemap.xml', dir), xml);
		},
	},
};

// Served from the tavor29.github.io root (repo literally named
// tavor29.github.io), a user site, not a project page, so no `base` path.
// Custom domain: copy CNAME.example to public/CNAME if Tavor picks a paid
// domain later (a live CNAME file cannot contain comments).
export default defineConfig({
	output: 'static',
	trailingSlash: 'always',
	site,
	redirects,
	integrations: [sitemap],
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
