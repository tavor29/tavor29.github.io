// Colours for the quiz illustrations, all from tokens.css. SVG presentation
// attributes don't reliably take var(), so drawings set colour through style.
const vars = {
	bg: '--illo-bg',
	bgDeep: '--illo-bg-deep',
	floor: '--illo-floor',
	skin: '--illo-skin',
	skinDeep: '--illo-skin-deep',
	red: '--illo-hair-red',
	brown: '--illo-hair-brown',
	purple: '--illo-purple',
	navy: '--illo-navy',
	blue: '--mark-half',
	orange: '--mark-quarter',
	amber: '--mark-circle',
	green: '--mark-leaf',
	alert: '--color-accent',
	ink: '--color-ink',
	paper: '--color-paper',
} as const;

export type Colour = keyof typeof vars;

export const c = (k: Colour) => `var(${vars[k]})`;
/** style="fill:…" for a shape. */
export const f = (k: Colour) => `fill:${c(k)}`;
/** style for a stroked line (no fill). */
export const s = (k: Colour, width: number) =>
	`fill:none;stroke:${c(k)};stroke-width:${width};stroke-linecap:round;stroke-linejoin:round`;
