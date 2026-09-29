# DESIGN.md

The site's design system and where it came from. Part 1 is a teardown of the reference portfolio that set the layout, rhythm and motion (majd-portfolio.framer.website, measured from computed styles at 1440×900 on 2026-09-29). Part 2 is the system this site actually uses. It merges the reference's layout, spacing, colors and motion (first built as a Next.js prototype, now archived) with the original Astro site's typography and marks.

---


---

## Part 1: The reference, measured

### Fonts and weights

One family does everything: **Archivo** (300, 400, 500, 600, 700, 800). The page also declares Inter and Clash Grotesk, but neither loads, so they're unused.

| Role | Size / line-height | Weight | Tracking | Notes |
|---|---|---|---|---|
| Hero display | 174 / 156.6 (0.9) | 800 | -3.48px (-0.02em) | ALL CAPS, two lines |
| Footer wordmark | 417 / 375 (0.9) | 700 | -8.3px (-0.02em) | 10% opacity on dark |
| Section title | 76 / 76 (1.0) | 600 | -1.52px (-0.02em) | "Hey!", "Services", "Featured Projects" |
| Footer statement | 68 / 68 | 600 | -1.36px | on dark |
| Blog CTA | 44 / 52.8 (1.2) | 400 | -0.88px | split per word |
| Scroll-reveal quote | 36 / 43.2 (1.2) | 500 | -0.72px | per-word opacity 0.1 → 1 |
| Row title | 32 / 38.4 (1.2) | 500 | -0.64px | service names, post titles |
| Footer column label | 26 / 31.2 | 500 | normal | "/Quick links", slash prefix |
| Lead / nav logo | 22 / 30.8 (1.4) | 600 | -0.88px (-0.04em) | |
| Body | 18 / 25.2 (1.4) | 400 | -0.72px (-0.04em) | secondary text at 50% alpha |
| Small / meta | 16 / 22.4 (1.4) | 400, 300 | -0.64px | names, roles, tags |
| Button label | 16 / 19.2 (1.2) | 500 | -0.32px | split into single letters for a hover roll |

Pattern: tracking is always negative, roughly -0.02em on display sizes and -0.04em on text. Line-height is 0.9 for display, 1.0 for titles, 1.2 for headings, 1.4 for text.

### Color

- Background `#FAF7F3` (a warm off-white), with a faint grain overlay (two layers at 4% and 6% opacity).
- Ink `#111111`. Secondary text is ink at 50% alpha, and unrevealed words are ink at 10% alpha.
- Surfaces: `#111111` for the footer, testimonial cards, "all posts" card and nav pill; `#FFFFFF` for small chips.
- No gradients anywhere in the layout. The only color is on the 3D holographic stickers (a purple tint), which are illustrations, not UI.

### Grid and spacing

- Content container is **1180px max-width**, centered (≈130px side margins at 1440).
- 2-up project grid: 582px columns with a **16px gutter**. The 4-up testimonial row uses 283px cards with the same gutter.
- Vertical rhythm: sections have **120px top padding**. Title-to-content gap is **60px** (40px in contact). Card and row gaps are **16px**. Inline gaps are **10px**.
- The footer uses 120px top padding and 300px bottom padding, which leaves room for the oversized wordmark.
- Radii: **20px** for cards and image wraps (39 uses), 16px for large dark cards, 8px for small buttons and chips, and full round for dots and pills.
- Service rows are **120px tall**, full container width, `justify-content: space-between`: title on the left, tags on the right separated by 4px dots.

### Components (all flat, no stock cards)

- **Nav**: a 320×60 dark pill, centered and fixed at the top. It holds the name (22/600) and a 28px menu square. Padding 12/16.
- **Hero**: centered display type with two decorative 3D stickers and a bottom row: `©2026` on the left, `/CREATING SINCE 2020` on the right, and a 400×456 avatar centered at the bottom.
- **Rows, not cards**: services are ruled horizontal rows, and the blog list is title plus date. The only "cards" are image frames with no shadow or border.
- **Buttons**: text plus a 28px square arrow chip (8px radius). No filled pill CTAs.
- **Form**: inputs have no borders or backgrounds, just 44px lines of text on the dark footer.

### Scroll and motion

- **Easing**: Framer's default `cubic-bezier(.44,0,.56,1)` for tweens, plus springs for appear effects. Long durations are up to 1.6s.
- **Appear on enter**: 57 elements start at `opacity: 0` with `translateY(10px)` (45 of them) or `translateY(20px)` (12). They settle to 0 when they enter the viewport. Siblings stagger.
- **Sticky avatar**: the hero and bio share an 1800px-tall wrapper with a 900px `position: sticky` layer, so the avatar stays pinned while the bio scrolls up underneath. The avatar has front and back faces (`rotateY(180deg)`, perspective ≈1200px) and flips as you scroll.
- **Scroll-scrubbed quote**: a 1350px section with 900px of sticky content. Each word starts at 10% alpha and fills to 100% in reading order, tied directly to scroll progress.
- **Testimonial cards** have a front and back face and flip in 3D.
- **Hover**: button labels are split per letter and roll vertically. Arrow chips rotate 45°.
- **Ambient**: the stickers idle-rotate (about 16°), and a horizontal marquee moves by `translateX(-50%)`.

### What the restraint actually is

One typeface. Two colors plus alpha steps. Rules and whitespace instead of boxes. Motion does the decorating, so the static layout can stay nearly bare.

---

---

## Part 2: This site's system

Everything lives in `src/styles/tokens.css`. `tailwind.config.ts` maps utilities onto those variables and replaces Tailwind's default type, color and radius scales, so off-system classes don't exist. Components never hard-code a size, color, duration or easing.

### Type

System faces only, so there's no webfont request and nothing to license. Rendering differs by OS: Segoe UI and Palatino Linotype on Windows, San Francisco and Iowan Old Style on macOS.

| Role | Token | Face | Weight | Tracking | Used for |
|---|---|---|---|---|---|
| Display | `--font-display` → `font-display` | system sans | 700 (`--weight-display`) | -0.03em | Headline, section titles, row titles, "Hey!", scroll statement, footer links |
| Accent | `--font-serif` → `font-serif` | Iowan Old Style / Palatino | 400 italic | -0.01em | Only "*repeatable processes.*" and "*Let's talk.*" |
| UI / body | `--font-ui` → `font-ui` | system sans | 400–600 | -0.011em | Body, nav, blurbs, blog titles |
| Label | `--font-label` → `font-label` | system sans | 600 (`--weight-label`), uppercase | 0.06em | Eyebrow, section indexes, dates, meta lines, chips |
| Code | `--font-mono` | ui-monospace stack | 400 | normal | Blog code blocks |

Scale (px): 12 / 14 / 16 / 20 / 22→28 / 32→44 / 40→72. The top three scale linearly with viewport width between 390px and 1440px, so they're fixed at their maximum on desktop. Line-heights: display 1.04, title 1.15, UI text 1.5, long-form prose 1.6.

### Color

`#0a0a0a` ink on `#fafafa` paper, one accent `#e5484d`. Ink alpha steps: 60% muted, 12% rules, 10% unrevealed words, 4% wash. Red is reserved for small marks (hero dot and period, focus rings). The four shape marks keep the original site's colours through `--mark-*` tokens: half-disc blue, quarter orange, circle amber, leaf green. Each shape has the same colour everywhere it appears. Links, selected states and primary buttons on the long-read pages use `--color-link` (ink). The chart palette (`--chart-*`) is data color and stays as validated.

### Spacing and layout

On a 4px base: `dot` 4, `tight` 10, `gutter` 16, `stack` 40, `title` 60 (title → content), `section` 120. Every page, long reads included, sits in the 1180px `--container` with 16px gutters (40px from 768px up). Don't name spacing keys `inline` or `block`: Tailwind v4 turns them into `inline-*`/`block-*` size utilities, and `inline-block` stops meaning display.

### Icons

One component, `src/components/Icon.astro`. It draws in `currentColor`, sizes come from `--icon-sm/md/lg` (12/18/28) and stroke width from `--icon-stroke` (1.5px). Names:

- `arrow`: link arrow, used in the 28px arrow chip and back links.
- `half`, `quarter`, `circle`, `leaf`: the original site's marks, drawn in their own colours with `tone="mark"`. On work and index rows they're solid for real work and outline for a fictional company (Keshet = half, Applied Materials = quarter, Intake Agent = circle, Citizen Dev = leaf). The footer contact links use Email = half, LinkedIn = quarter, GitHub = circle, Résumé = leaf. They turn 90° on hover.

Add an icon by adding a path to `Icon.astro`, never an inline `<svg>` elsewhere. Chart SVGs are data visualizations, not icons.

### Motion (`src/scripts/motion.ts`, GSAP + ScrollTrigger)

Easing `--ease-out` cubic-bezier(0.16, 1, 0.3, 1). Durations 400 / 600 / 800ms. Each effect is opt-in by data attribute:

| Attribute | Effect |
|---|---|
| `data-hero-line` / `data-hero-fade` | Headline lines rise out of a mask (800ms, 80ms stagger), then sub copy and meta fade up |
| `data-portrait-track` + `data-portrait` | Sticky portrait across hero + About. It starts at 45% scale and face-down (grayscale back face), then scrubs to full size and face-up in colour, landing in About's middle column (cols 5–8, 400:456). Desktop only; mobile and reduced motion get a static image. |
| `data-quote` + `data-word` | Pinned statement; words fill from 10% to full ink in reading order, scrubbed to scroll |
| `data-reveal` | Opacity 0 → 1, y 20 → 0, 600ms, 60ms stagger, at 95% of viewport |
| `data-rule` | Row hairline draws left to right (scaleX 0 → 1, 800ms) |

`prefers-reduced-motion: reduce` skips every tween, and `global.css` shows the final state. Without JS, content is visible, because only the `.js` class hides it.

### Deliberate departures from the reference

- The type scale caps at 72px, not 174px. The headline gets its weight from bold sans against a serif-italic phrase.
- There are no 3D stickers, testimonials or contact form (no approved copy for the last two). Contact is plain links.
- The warm off-white and grain overlay are dropped in favour of the cooler `#fafafa`.

### Pages

- The homepage (`src/pages/index.astro`) is built from `src/components/home/*` plus `src/data/home.ts` (copy from the content package). Writing pulls the newest six posts from the blog collection.
- Every list of links (homepage work and writing, the projects, case-studies and blog index pages) is a ruled row (`components/ui/IndexRow.astro` for index pages), not a card grid. On long-read pages, headings use the display face on the same scale (h1 = `--text-2xl`), section labels use the label style, and summary panels are hairline-ruled rather than boxed.
- Long-read pages (case studies, projects, blog) keep their own layouts (`editorial.css`, scoped styles) inside `BaseLayout`, which adds the pill nav and dark footer. Tailwind's preflight reset is **off** so those pages keep default heading, paragraph and list styling. The redesigned chrome opts into a scoped reset with `data-ui`.
- `/resume/` holds the full résumé that used to sit under the old homepage (it prints like the PDF).
