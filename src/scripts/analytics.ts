// Site analytics (PostHog, EU). Cookieless: no cookies or browser storage;
// PostHog ties a visit together with a privacy-preserving hash on its side.
// Off when there's no key, off on any host but the live domain, and off for
// visitors who send Do Not Track or Global Privacy Control. The library is
// only downloaded when analytics will actually run.
//
// What's recorded: pageviews (PostHog adds country and city from the IP),
// clicks on anything marked data-track="name" (résumé, email, phone,
// LinkedIn, demos), and the ?ref= tag from per-application links.
import type { PostHog } from 'posthog-js';
import { services } from '../data/services';

let ph: PostHog | null = null;

const optedOut = () =>
	navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;

export async function startAnalytics() {
	if (!services.posthogKey || location.hostname !== services.trackedHost || optedOut()) return;
	const { default: posthog } = await import('posthog-js');

	// Per-application links: tavorbenshahar.com/?ref=acme. The tag rides on the
	// landing pageview; PostHog's session ties the rest of the visit to it.
	const ref = new URLSearchParams(location.search).get('ref')?.trim().toLowerCase().slice(0, 60) || undefined;

	posthog.init(services.posthogKey, {
		api_host: services.posthogHost,
		cookieless_mode: 'always',
		person_profiles: 'never',
		autocapture: false,
		// The first pageview is sent by hand below, after the ref tag is registered.
		capture_pageview: false,
		capture_pageleave: true,
		disable_session_recording: true,
		disable_surveys: true,
		respect_dnt: true,
		loaded: (loaded) => {
			if (ref) loaded.register({ ref });
			loaded.capture('$pageview');
			ph = loaded;
		},
	});

	document.addEventListener('click', (e) => {
		const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
		if (!el) return;
		track(`click_${el.dataset.track}`, {
			label: el.textContent?.trim().slice(0, 80),
			href: el.getAttribute('href') ?? undefined,
		});
	});
}

/** Record a named event (no-op when analytics is off). */
export function track(event: string, props?: Record<string, unknown>) {
	ph?.capture(event, props);
}
