# Tavor Ben Shahar: portfolio site

Static [Astro](https://astro.build) site with Tailwind v4 and GSAP, live at [tavor29.github.io](https://tavor29.github.io/). No paid custom domain wired yet.

The design system (tokens, type, icons, motion) is documented in [`docs/DESIGN.md`](docs/DESIGN.md).

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

This repo is named `tavor29.github.io`, so it serves as a GitHub user site at the domain root, no `base` path needed in `astro.config.mjs`.
