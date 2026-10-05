// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { writeFile } from 'node:fs/promises';

const site = 'https://tavorbenshahar.com/';

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

// Served at the root of tavorbenshahar.com, so no `base` path. The repo is
// the tavor29.github.io user site; the custom domain is set in the repo's
// Pages settings (deploys run through GitHub Actions, which ignore a CNAME
// file), and tavor29.github.io redirects to it.
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
