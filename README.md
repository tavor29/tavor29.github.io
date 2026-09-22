# Tavor Ben Shahar — portfolio site

Static [Astro](https://astro.build) site. Custom domain is not wired yet.

## Local

```sh
npm install
npm run dev
```

Build and preview:

```sh
npm run build
npm run preview
```

## GitHub Pages

This repo deploys via GitHub Actions (`.github/workflows/deploy.yml`).

1. Push to `main`.
2. In the GitHub repo: **Settings → Pages → Source: GitHub Actions**.

If the site is served from `username.github.io/repo` rather than a user site, set `base` (and `site`) in `astro.config.mjs`.
