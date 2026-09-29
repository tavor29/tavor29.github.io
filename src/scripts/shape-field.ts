// The hero's four floating shapes: a tiny physics loop, no library. Each shape
// drifts at a slow, steady speed, bounces off the hero's edges, the text
// (label, headline lines, subline, bottom row), the nav pill and the portrait,
// and bumps into the other shapes. The pointer nudges them too. Runs only
// while the hero is on screen; motion.ts starts it only when the visitor
// hasn't asked for reduced motion, otherwise the shapes stay where the CSS
// puts them.

type Body = {
	el: HTMLElement;
	x: number; // centre, relative to the field
	y: number;
	vx: number;
	vy: number;
	size: number;
	r: number; // radius for bumping into other shapes
	rHit: number; // radius for text and boxes: covers corners as the shape turns
	rWall: number; // radius for the hero's edges: under half the shape, so it can run partly off the page
	m: number; // mass, by area
	a: number; // rotation, degrees
	va: number; // spin, degrees per second
	cruise: number; // the speed it settles back to, px/s
	hx: number; // home: its starting spot as a fraction of the field, so it survives resizes
	hy: number;
};

type Rect = { l: number; t: number; r: number; b: number };

const PAD = 12; // breathing room kept around text and boxes, px
const RESTITUTION = 0.9;
const PULL = 14; // attraction between shapes, px/s², turns paths without adding speed
const HOME = 0.08; // spring back toward each shape's starting spot, per s², keeps the layout balanced

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
		const size = r0.width;
		const r = size * 0.5;
		const angle = (i / els.length) * Math.PI * 2 + Math.random() * 0.8;
		const cruise = 70 - size * 0.12; // big shapes drift slower (~46 to ~65 px/s)
		const body: Body = {
			el,
			x: r0.left - f.left + size / 2,
			y: r0.top - f.top + size / 2,
			vx: Math.cos(angle) * cruise,
			vy: Math.sin(angle) * cruise,
			size,
			r,
			rHit: size * 0.6,
			rWall: size * 0.35,
			m: size * size,
			a: 0,
			va: (Math.random() - 0.5) * 20,
			cruise,
			hx: (r0.left - f.left + size / 2) / f.width,
			hy: (r0.top - f.top + size / 2) / f.height,
		};
		// Pin to the field's top-left and position by transform. Clear right/bottom
		// too, or a shape placed with `right:` would stretch to the full width.
		el.style.left = '0px';
		el.style.top = '0px';
		el.style.right = 'auto';
		el.style.bottom = 'auto';
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

	const bounce = (b: Body, nx: number, ny: number, push: number) => {
		b.x += nx * push;
		b.y += ny * push;
		const vn = b.vx * nx + b.vy * ny;
		if (vn < 0) {
			b.vx -= (1 + RESTITUTION) * vn * nx;
			b.vy -= (1 + RESTITUTION) * vn * ny;
			b.va += (b.vx * ny - b.vy * nx) * 0.15; // glancing hits add spin
		}
	};

	// Push a body out of a rectangle it overlaps, reflecting its velocity.
	const collideRect = (b: Body, o: Rect) => {
		const cx = Math.max(o.l, Math.min(b.x, o.r));
		const cy = Math.max(o.t, Math.min(b.y, o.b));
		let dx = b.x - cx;
		let dy = b.y - cy;
		let d = Math.hypot(dx, dy);
		if (d >= b.rHit) return;
		if (d === 0) {
			// Centre inside the box: leave by the nearest side.
			const exits = [b.x - o.l, o.r - b.x, b.y - o.t, o.b - b.y];
			const k = exits.indexOf(Math.min(...exits));
			dx = [-1, 1, 0, 0][k];
			dy = [0, 0, -1, 1][k];
			d = 0;
			bounce(b, dx, dy, exits[k] + b.rHit);
			return;
		}
		bounce(b, dx / d, dy / d, b.rHit - d);
	};

	const step = (dt: number) => {
		f = origin();
		const W = f.width;
		const H = f.height;
		const rects = obstacles();

		// A gentle pull between shapes bends their paths toward each other, so they
		// meet and bump instead of each circling its own side of the headline.
		for (let i = 0; i < bodies.length; i++) {
			for (let j = i + 1; j < bodies.length; j++) {
				const p = bodies[i];
				const q = bodies[j];
				const dx = q.x - p.x;
				const dy = q.y - p.y;
				const d = Math.hypot(dx, dy) || 1;
				if (d < p.r + q.r + 20) continue;
				const pull = PULL * dt;
				p.vx += (dx / d) * pull;
				p.vy += (dy / d) * pull;
				q.vx -= (dx / d) * pull;
				q.vy -= (dy / d) * pull;
			}
		}

		for (const b of bodies) {
			b.vx += (b.hx * W - b.x) * HOME * dt;
			b.vy += (b.hy * H - b.y) * HOME * dt;
			b.x += b.vx * dt;
			b.y += b.vy * dt;
			b.a += b.va * dt;
			b.va *= 1 - 0.3 * dt; // spin eases off between hits

			// Hero edges.
			if (b.x < b.rWall) bounce(b, 1, 0, b.rWall - b.x);
			if (b.x > W - b.rWall) bounce(b, -1, 0, b.x - (W - b.rWall));
			if (b.y < b.rWall) bounce(b, 0, 1, b.rWall - b.y);
			if (b.y > H - b.rWall) bounce(b, 0, -1, b.y - (H - b.rWall));

			for (const o of rects) collideRect(b, o);

			if (pointer) {
				const dx = b.x - pointer.x;
				const dy = b.y - pointer.y;
				const d = Math.hypot(dx, dy);
				const reach = b.rHit + 40;
				if (d > 0 && d < reach) bounce(b, dx / d, dy / d, reach - d);
			}

			// Ease back toward cruising speed so they never stall or race.
			const s = Math.hypot(b.vx, b.vy) || 1;
			const k = 1 + ((b.cruise - s) / s) * Math.min(1, dt * 1.5);
			b.vx *= k;
			b.vy *= k;
		}

		// Shape-to-shape bumps: elastic impulse along the line between centres.
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
				const overlap = min - d;
				const total = p.m + q.m;
				p.x -= nx * overlap * (q.m / total);
				p.y -= ny * overlap * (q.m / total);
				q.x += nx * overlap * (p.m / total);
				q.y += ny * overlap * (p.m / total);
				const rel = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
				if (rel < 0) {
					const jmp = (-(1 + RESTITUTION) * rel) / (1 / p.m + 1 / q.m);
					p.vx -= (jmp / p.m) * nx;
					p.vy -= (jmp / p.m) * ny;
					q.vx += (jmp / q.m) * nx;
					q.vy += (jmp / q.m) * ny;
					p.va -= 25;
					q.va += 25;
				}
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
