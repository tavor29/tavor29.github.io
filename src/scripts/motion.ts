// All scroll and entrance motion (GSAP + ScrollTrigger). Loaded once from
// BaseLayout. Every effect is keyed off a data attribute, so pages opt in by
// markup alone; prefers-reduced-motion skips everything and global.css shows
// the final state.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Read from tokens.css so GSAP and CSS transitions share one motion system.
function tokens() {
	const s = getComputedStyle(document.documentElement);
	const ms = (name: string) => parseFloat(s.getPropertyValue(name)) / 1000;
	const bezier = s.getPropertyValue('--ease-out').match(/cubic-bezier\(([^)]+)\)/)?.[1] ?? '0.16,1,0.3,1';
	return {
		fast: ms('--dur-fast'),
		base: ms('--dur-base'),
		slow: ms('--dur-slow'),
		ease: CustomEase.create('token-out', bezier.replace(/\s/g, '')),
	};
}

const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
	const t = tokens();

	// Hero: masked line rise, then the sub copy and meta row fade up.
	if (document.querySelector('[data-hero-line]')) {
		gsap
			.timeline({ delay: 0.1, defaults: { ease: t.ease } })
			.to('[data-hero-line]', { y: 0, duration: t.slow, stagger: 0.08 })
			.fromTo(
				'[data-hero-fade]',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: t.base, stagger: 0.06 },
				'-=0.4',
			);
	}

	// Hero shapes: pop in just after the headline, then drift up and turn as
	// the hero scrolls away (each by its data-speed, alternating direction).
	if (document.querySelector('[data-shape-pop]')) {
		gsap.fromTo(
			'[data-shape-pop]',
			{ opacity: 0, scale: 0, rotate: -90 },
			{ opacity: 1, scale: 1, rotate: 0, duration: t.slow, ease: t.ease, stagger: 0.08, delay: 0.5 },
		);
	}
	gsap.utils.toArray<HTMLElement>('[data-shape-float]').forEach((el, i) => {
		const speed = Number(el.dataset.speed) || 1;
		gsap.to(el, {
			y: -160 * speed,
			rotate: 90 * speed * (i % 2 ? 1 : -1),
			ease: 'none',
			scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: 0.6 },
		});
	});

	// Shapes elsewhere: pop in when they enter the viewport.
	ScrollTrigger.batch('[data-shape-in]', {
		start: 'top 95%',
		once: true,
		onEnter: (els) =>
			gsap.fromTo(
				els,
				{ opacity: 0, scale: 0, rotate: -90 },
				{ opacity: 1, scale: 1, rotate: 0, duration: t.slow, ease: t.ease, stagger: 0.08 },
			),
	});

	// Portrait: small and face-down at the foot of the hero, scrubbed to full size
	// and face-up as About reaches the top of the viewport.
	const portrait = document.querySelector('[data-portrait]');
	if (portrait) {
		gsap.fromTo(
			portrait,
			{ scale: 0.45, rotateY: 180, transformOrigin: '50% 100%' },
			{
				scale: 1,
				rotateY: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: '[data-portrait-track]',
					start: 'top top',
					endTrigger: '#about',
					end: 'top top',
					scrub: 0.6,
				},
			},
		);
	}

	// Appear on enter: opacity 0 → 1, y 20 → 0, staggered per batch.
	gsap.set('[data-reveal]', { y: 20 });
	ScrollTrigger.batch('[data-reveal]', {
		start: 'top 95%',
		once: true,
		onEnter: (els) =>
			gsap.to(els, { opacity: 1, y: 0, duration: t.base, ease: t.ease, stagger: 0.06 }),
	});

	// Ruled rows: the hairline draws left to right.
	gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((el) => {
		gsap.to(el, {
			scaleX: 1,
			duration: t.slow,
			ease: t.ease,
			scrollTrigger: { trigger: el, start: 'top 90%', once: true },
		});
	});

	// Scroll-scrubbed statement: words fill from 10% to full ink in reading order.
	const quote = document.querySelector('[data-quote]');
	if (quote) {
		gsap.to(quote.querySelectorAll('[data-word]'), {
			opacity: 1,
			ease: 'none',
			stagger: 0.1,
			scrollTrigger: { trigger: quote, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
		});
		// Its four marks turn half a revolution over the same scroll.
		gsap.to(quote.querySelectorAll('[data-shape-spin]'), {
			rotate: 180,
			ease: 'none',
			scrollTrigger: { trigger: quote, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
		});
	}
});

// Late layout shifts (images, fonts) move trigger positions; recompute once settled.
window.addEventListener('load', () => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());
