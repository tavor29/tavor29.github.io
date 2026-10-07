import type { Config } from "tailwindcss";

/*
 * Every value points at a CSS variable in src/styles/tokens.css. `theme` (not
 * `extend`) replaces Tailwind's defaults for type, color, radius and motion,
 * so an off-system class like text-5xl or bg-blue-500 doesn't exist.
 * Font roles that also carry a weight (display, label, serif) are CSS
 * utilities in global.css, since a Tailwind font family can't set weight.
 */
const config: Config = {
  content: ["./src/**/*.{astro,ts,md,mdx}"],
  theme: {
    fontFamily: {
      ui: ["var(--font-ui)"],
      mono: ["var(--font-mono)"],
    },
    fontSize: {
      xs: ["var(--text-xs)", { lineHeight: "var(--leading-text)" }],
      sm: ["var(--text-sm)", { lineHeight: "var(--leading-text)" }],
      base: ["var(--text-base)", { lineHeight: "var(--leading-text)" }],
      lg: ["var(--text-lg)", { lineHeight: "var(--leading-text)" }],
      xl: ["var(--text-xl)", { lineHeight: "var(--leading-title)" }],
      "2xl": ["var(--text-2xl)", { lineHeight: "var(--leading-title)" }],
      "3xl": ["var(--text-3xl)", { lineHeight: "var(--leading-display)" }],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: {
        DEFAULT: "var(--color-ink)",
        muted: "var(--color-ink-muted)",
        rule: "var(--color-ink-rule)",
        ghost: "var(--color-ink-ghost)",
      },
      paper: {
        DEFAULT: "var(--color-paper)",
        muted: "var(--color-paper-muted)",
        rule: "var(--color-paper-rule)",
      },
      accent: "var(--color-accent)",
      wash: {
        half: "var(--mark-half-wash)",
      },
    },
    borderRadius: {
      none: "0",
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      full: "var(--radius-full)",
    },
    letterSpacing: {
      display: "var(--tracking-display)",
      text: "var(--tracking-text)",
      label: "var(--tracking-label)",
      normal: "0",
    },
    lineHeight: {
      display: "var(--leading-display)",
      title: "var(--leading-title)",
      text: "var(--leading-text)",
    },
    transitionTimingFunction: {
      out: "var(--ease-out)",
    },
    transitionDuration: {
      fast: "var(--dur-fast)",
      base: "var(--dur-base)",
      slow: "var(--dur-slow)",
    },
    extend: {
      // Don't name these `inline` or `block`: Tailwind v4 turns them into
      // inline-*/block-* size utilities and `inline-block` stops meaning display.
      spacing: {
        dot: "var(--space-dot)",
        tight: "var(--space-tight)",
        gutter: "var(--space-gutter)",
        stack: "var(--space-stack)",
        title: "var(--space-title)",
        section: "var(--space-section)",
      },
      maxWidth: {
        container: "var(--container)",
      },
    },
  },
};

export default config;
