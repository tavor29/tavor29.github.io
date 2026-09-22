// @ts-check
import { defineConfig } from 'astro/config';

// Served from the tavor29.github.io root (repo literally named
// tavor29.github.io), a user site, not a project page, so no `base` path.
// Custom domain: copy CNAME.example to public/CNAME if Tavor picks a paid
// domain later (a live CNAME file cannot contain comments).
export default defineConfig({
	output: 'static',
	trailingSlash: 'always',
	site: 'https://tavor29.github.io/',
	devToolbar: {
		enabled: false,
	},
});
