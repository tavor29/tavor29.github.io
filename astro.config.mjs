// @ts-check
import { defineConfig } from 'astro/config';

// Domain-agnostic: relative links only. Set `site` to the GitHub Pages URL
// once the public repo exists. If the site is served from a project path
// (username.github.io/repo), also set `base` to '/repo/'.
// Custom domain: copy CNAME.example to public/CNAME once Tavor picks a domain
// (a live CNAME file cannot contain comments).
export default defineConfig({
	output: 'static',
	trailingSlash: 'always',
	site: 'https://tavor29.github.io/portfolio-site',
	base: '/portfolio-site/',
	devToolbar: {
		enabled: false,
	},
});
