// The hero's four floating shapes: a tiny steering loop, no library. Each shape
// glides slowly along long, gently curving paths, eases away from the hero's
// edges, the text (label, headline lines, subline, bottom row), the nav pill,
// the portrait and the other shapes before it reaches them, and turns slowly
// as it goes. Nothing snaps or bounces: contact is a soft push, and a hard
// constraint only exists as a safety net. The pointer nudges them gently.
// On phones (under 768px) the text fills the hero, so the shapes don't dodge
// it: they drift behind it as a faint ambient layer (Hero.astro dims them).
// Runs only while the hero is on screen; motion.ts starts it only when the
// visitor hasn't asked for reduced motion, otherwise the shapes stay where
// the CSS puts them.

type Body = {
	el: HTMLElement;
	x: number; // centre, relative to the field
	y: number;
	vx: number;
	vy: number;
	size: number;
	r: number; // radius for spacing from other shapes
	rHit: number; // radius for text and boxes: covers corners as the shape turns
	rWall: number; // radius for the hero's edges: under half the shape, so it can run partly off the page
	a: number; // rotation, degrees
	va: number; // spin, degrees per second (eased, never kicked)
	spin: number; // this shape's own slow resting spin, degrees per second
	cruise: number; // the speed it glides at, px/s
	phase: [number, number]; // offsets for its wandering, so no two shapes turn in step
	hx: number; // home: its starting spot as a fraction of the field, so it survives resizes
	hy: number;
};

type Rect = { l: number; t: number; r: number; b: number };

// Big shapes glide slower (~16 to ~27 px/s at 1440px); narrower screens slow
// everything further so a phone hero stays calm.
const cruiseFor = (size: number, width: number) => (30 - size * 0.07) * Math.min(1, Math.max(0.45, width / 1440));

const PAD = 12; // breathing room kept around text and boxes, px
const HOME = 0.02; // faint pull back toward each shape's starting spot, keeps the layout balanced
const TURN = 0.22; // how far a shape's heading wanders, rad/s at most
const EASE = 0.6; // how quickly speed settles back to cruise, per second
const AMBIENT_BELOW = 768; // px: narrower heroes use the behind-the-text layer

export function startShapeField(field: HTMLElement): () => void {
	const hero = field.closest('section') ?? field;
	const els = [...field.querySelectorAll<HTMLElement>('[data-shape-body]')];
	if (!els.length) return () => {};

	const origin = () => field.getBoundingClientRect();
	let f = origin();

	// Start each shape where the CSS placed it, then take over positioning.
	const initialStyle = els.map((el) => el.style.cssText);
	const bodies: Body[] = els.map((el, i) => {
		const r0 = el.getBoundingClientRect();
		const size = el.offsetWidth;
		const angle = (i / els.length) * Math.PI * 2 + Math.random() * 0.8;
		const cruise = cruiseFor(size, f.width);
		const body: Body = {
			el,
			x: r0.left - f.left + r0.width / 2,
			y: r0.top - f.top + r0.height / 2,
			vx: Math.cos(angle) * cruise,
			vy: Math.sin(angle) * cruise,
			size,
			r: size * 0.5,
			rHit: size * 0.6,
			rWall: size * 0.35,
			a: 0,
			va: 0,
			spin: (i % 2 ? 1 : -1) * (3 + Math.random() * 3),
			cruise,
			phase: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2],
			hx: (r0.left - f.left + r0.width / 2) / f.width,
			hy: (r0.top - f.top + r0.height / 2) / f.height,
		};
		// Pin to the field's top-left and position by transform. Clear right/bottom
		// too, or a shape placed with `right:` would stretch to the full width.
		el.style.left = '0px';
		el.style.top = '0px';
		el.style.right = 'auto';
		el.style.bottom = 'auto';
		el.style.translate = 'none'; // the CSS centring offset; the transform takes over
		return body;
	});

	// Obstacles: tight text boxes (a Range measures the glyphs, not the full-width
	// block) plus the nav pill and the portrait card.
	const textEls = [...hero.querySelectorAll<HTMLElement>('[data-shape-obstacle]')];
	const boxEls = [
		document.querySelector<HTMLElement>('header[data-ui] nav'),
		document.querySelector<HTMLElement>('[data-portrait]'),
	].filter((e): e is HTMLElement => !!e);
	const range = document.createRange();

	const obstacles = (): Rect[] => {
		const out: Rect[] = [];
		const add = (b: DOMRect) => {
			if (!b.width || !b.height) return;
			out.push({ l: b.left - f.left - PAD, t: b.top - f.top - PAD, r: b.right - f.left + PAD, b: b.bottom - f.top + PAD });
		};
		for (const el of textEls) {
			range.selectNodeContents(el);
			add(range.getBoundingClientRect());
		}
		for (const el of boxEls) add(el.getBoundingClientRect());
		return out;
	};

	let pointer: { x: number; y: number } | null = null;
	const onMove = (e: PointerEvent) => (pointer = { x: e.clientX - f.left, y: e.clientY - f.top });
	const onLeave = () => (pointer = null);
	hero.addEventListener('pointermove', onMove);
	hero.addEventListener('pointerleave', onLeave);

	// A soft push away from something `gap` px away, starting `margin` px out and
	// growing smoothly as the gap closes. Returns px/s² to add to velocity.
	const soft = (gap: number, margin: number, strength: number) => {
		if (gap >= margin) return 0;
		const t = 1 - Math.max(gap, 0) / margin;
		return strength * t * t;
	};

	// Safety net: if a shape does end up overlapping, move it out and drop only
	// the part of its velocity heading inward. No reflection, so no bounce.
	const settle = (b: Body, nx: number, ny: number, depth: number) => {
		b.x += nx * depth;
		b.y += ny * depth;
		const vn = b.vx * nx + b.vy * ny;
		if (vn < 0) {
			b.vx -= vn * nx;
			b.vy -= vn * ny;
		}
	};

	let t = 0;
	const step = (dt: number) => {
		t += dt;
		f = origin();
		const W = f.width;
		const H = f.height;
		// Phones: no dodging the text, the shapes float behind it.
		const rects = W < AMBIENT_BELOW ? [] : obstacles();
		const margin = Math.min(90, Math.max(40, W * 0.06)); // how early shapes start easing away

		for (const b of bodies) {
			// Sizes follow the screen (fluid tokens), so re-read them in case of a resize.
			const size = b.el.offsetWidth;
			if (size !== b.size) {
				b.size = size;
				b.r = size * 0.5;
				b.rHit = size * 0.6;
				b.rWall = size * 0.35;
			}
			b.cruise = cruiseFor(size, W);
		}

		for (const b of bodies) {
			let ax = 0;
			let ay = 0;
			const strength = b.cruise * 2.2; // steering force scales with the shape's own pace

			// Wander: turn the heading a little, by two slow overlapping waves.
			const turn = TURN * (0.65 * Math.sin(t * 0.21 + b.phase[0]) + 0.35 * Math.sin(t * 0.47 + b.phase[1]));
			const c = Math.cos(turn * dt);
			const s = Math.sin(turn * dt);
			[b.vx, b.vy] = [b.vx * c - b.vy * s, b.vx * s + b.vy * c];

			// Faint pull home.
			ax += (b.hx * W - b.x) * HOME;
			ay += (b.hy * H - b.y) * HOME;

			// Ease away from the hero's edges.
			ax += soft(b.x - b.rWall, margin, strength) - soft(W - b.rWall - b.x, margin, strength);
			ay += soft(b.y - b.rWall, margin, strength) - soft(H - b.rWall - b.y, margin, strength);

			// Ease away from text, the nav and the portrait.
			for (const o of rects) {
				const cx = Math.max(o.l, Math.min(b.x, o.r));
				const cy = Math.max(o.t, Math.min(b.y, o.b));
				const dx = b.x - cx;
				const dy = b.y - cy;
				const d = Math.hypot(dx, dy);
				if (d === 0) continue; // handled by the safety net below
				const push = soft(d - b.rHit, margin, strength * 1.4);
				ax += (dx / d) * push;
				ay += (dy / d) * push;
			}

			// Ease away from the other shapes (they drift close, never collide hard).
			for (const o of bodies) {
				if (o === b) continue;
				const dx = b.x - o.x;
				const dy = b.y - o.y;
				const d = Math.hypot(dx, dy) || 1;
				const push = soft(d - (b.r + o.r), margin * 0.8, strength);
				ax += (dx / d) * push;
				ay += (dy / d) * push;
			}

			// The pointer parts them gently, like a hand through water.
			if (pointer) {
				const dx = b.x - pointer.x;
				const dy = b.y - pointer.y;
				const d = Math.hypot(dx, dy) || 1;
				const push = soft(d - b.rHit, 120, strength * 1.5);
				ax += (dx / d) * push;
				ay += (dy / d) * push;
			}

			b.vx += ax * dt;
			b.vy += ay * dt;

			// Settle speed back toward cruise, smoothly, and never let it race.
			const sp = Math.hypot(b.vx, b.vy) || 1;
			const target = b.cruise + (Math.min(sp, b.cruise * 2) - b.cruise) * (1 - EASE * dt);
			b.vx *= target / sp;
			b.vy *= target / sp;

			b.x += b.vx * dt;
			b.y += b.vy * dt;

			// Rotation follows the drift: a slow resting spin plus a lean into the
			// sideways motion, eased so it never jolts.
			const vaTarget = b.spin + b.vx * 0.12;
			b.va += (vaTarget - b.va) * Math.min(1, dt * 0.8);
			b.a += b.va * dt;

			// Safety nets: edges, then text and boxes.
			if (b.x < b.rWall) settle(b, 1, 0, b.rWall - b.x);
			if (b.x > W - b.rWall) settle(b, -1, 0, b.x - (W - b.rWall));
			if (b.y < b.rWall) settle(b, 0, 1, b.rWall - b.y);
			if (b.y > H - b.rWall) settle(b, 0, -1, b.y - (H - b.rWall));
			for (const o of rects) {
				const cx = Math.max(o.l, Math.min(b.x, o.r));
				const cy = Math.max(o.t, Math.min(b.y, o.b));
				const dx = b.x - cx;
				const dy = b.y - cy;
				const d = Math.hypot(dx, dy);
				if (d >= b.rHit) continue;
				if (d === 0) {
					const exits = [b.x - o.l, o.r - b.x, b.y - o.t, o.b - b.y];
					const k = exits.indexOf(Math.min(...exits));
					settle(b, [-1, 1, 0, 0][k], [0, 0, -1, 1][k], exits[k] + b.rHit);
				} else settle(b, dx / d, dy / d, b.rHit - d);
			}
		}

		// Safety net between shapes: separate any overlap, share the inward speed.
		for (let i = 0; i < bodies.length; i++) {
			for (let j = i + 1; j < bodies.length; j++) {
				const p = bodies[i];
				const q = bodies[j];
				const dx = q.x - p.x;
				const dy = q.y - p.y;
				const d = Math.hypot(dx, dy);
				const min = p.r + q.r;
				if (d === 0 || d >= min) continue;
				const nx = dx / d;
				const ny = dy / d;
				const half = (min - d) / 2;
				settle(p, -nx, -ny, half);
				settle(q, nx, ny, half);
			}
		}

		for (const b of bodies) {
			const half = b.size / 2;
			b.el.style.transform = `translate3d(${b.x - half}px, ${b.y - half}px, 0) rotate(${b.a}deg)`;
		}
	};

	// Run only while the hero is visible.
	let raf = 0;
	let last = 0;
	const frame = (now: number) => {
		const dt = Math.min((now - last) / 1000, 1 / 30);
		last = now;
		step(dt);
		raf = requestAnimationFrame(frame);
	};
	const play = () => {
		if (raf) return;
		last = performance.now();
		raf = requestAnimationFrame(frame);
	};
	const pause = () => {
		cancelAnimationFrame(raf);
		raf = 0;
	};
	const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()));
	io.observe(hero);

	return () => {
		pause();
		io.disconnect();
		hero.removeEventListener('pointermove', onMove);
		hero.removeEventListener('pointerleave', onLeave);
		els.forEach((el, i) => (el.style.cssText = initialStyle[i]));
	};
}
