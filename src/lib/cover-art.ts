// Generated cover art for writing (and the fallback for work cards without a
// photo): a Bauhaus-style grid of the site's four shapes in their colours,
// with one oversized shape behind it. Deterministic: the same seed (a post's
// slug) always draws the same cover, so art never changes between builds.
// Everything is opaque, so overlaps stay crisp instead of going muddy.

const COLORS = {
	ink: '#0a0a0a',
	paper: '#fafafa',
	half: '#2a78d6',
	quarter: '#eb6834',
	circle: '#fab219',
	leaf: '#0ca30c',
} as const;

// Same paths as components/Icon.astro, on a 24-unit square.
const PATHS = {
	half: 'M0 0A24 12 0 0 1 0 24Z',
	quarter: 'M0 0A24 24 0 0 1 24 24H0Z',
	circle: 'M12 0a12 12 0 1 1 0 24a12 12 0 1 1 0-24Z',
	leaf: 'M0 0H12A12 12 0 0 1 24 12V24H12A12 12 0 0 1 0 12Z',
} as const;

type Shape = keyof typeof PATHS;
const SHAPES = Object.keys(PATHS) as Shape[];
const ROTATIONS = [0, 90, 180, 270];

// FNV-1a hash of the seed, then mulberry32 for a repeatable sequence.
function random(seed: string) {
	let h = 2166136261;
	for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
	let s = h >>> 0;
	return () => {
		s = (s + 0x6d2b79f5) | 0;
		let t = Math.imul(s ^ (s >>> 15), 1 | s);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const shape = (name: Shape, x: number, y: number, size: number, rot: number, fill: string) =>
	`<path d="${PATHS[name]}" fill="${fill}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot} ${size / 2} ${size / 2}) scale(${(size / 24).toFixed(4)})"/>`;

/**
 * The inner SVG markup for a cover of the given size (use it inside an
 * <svg viewBox="0 0 {width} {height}">). `cols` sets the grid density;
 * `forceDark` keeps an ink ground for cards that put white text on the art.
 */
export function coverArt(seed: string, width: number, height: number, cols = 3, forceDark = false): string {
	const r = random(seed);
	const pick = <T,>(list: readonly T[]) => list[Math.floor(r() * list.length)];

	const dark = r() < 0.7 || forceDark;
	const bg = dark ? COLORS.ink : COLORS.paper;
	const neutral = dark ? COLORS.paper : COLORS.ink;
	const cell = width / cols;
	const rows = Math.ceil(height / cell);

	let out = `<rect width="${width}" height="${height}" fill="${bg}"/>`;

	// One oversized shape behind the grid, bleeding off an edge.
	const big = pick(SHAPES);
	const bigSize = width * (0.8 + r() * 0.3);
	out += shape(big, width * (0.3 + r() * 0.35), height * (0.02 + r() * 0.35), bigSize, pick(ROTATIONS), COLORS[pick(SHAPES)]);

	// The grid: most cells get a coloured shape, a few are left empty or neutral.
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const roll = r();
			if (roll < 0.3) continue;
			const fill = roll < 0.4 ? neutral : COLORS[pick(SHAPES)];
			out += shape(pick(SHAPES), x * cell, y * cell, cell, pick(ROTATIONS), fill);
		}
	}
	return out;
}
