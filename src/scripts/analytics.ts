// Site analytics (PostHog, EU). By default it's cookieless: no cookies or
// browser storage, and PostHog ties a visit together with a privacy-preserving
// hash on its side. Visitors who allow recording in the consent banner
// (components/ConsentBanner.astro) get PostHog's normal cookie mode instead,
// with session recording on and anything typed masked. Their choice is kept
// in localStorage so the banner doesn't ask again; recording starts from the
// next page they open.
//
// Off when there's no key, off on any host but the live domain, and off for
// visitors who send Do Not Track or Global Privacy Control (they never see
// the banner either). The library is only downloaded when analytics will run.
//
// What's recorded: pageviews (PostHog adds country and city from the IP),
// clicks on anything marked data-track="name" (résumé, email, phone,
// LinkedIn, demos), the ?ref= tag from per-application links, and, with
// consent only, the session recording.
import type { PostHog } from 'posthog-js';
import { services } from '../data/services';

let ph: PostHog | null = null;

const CONSENT_KEY = 'recording-consent';
export type Consent = 'yes' | 'no' | null;

/** Do Not Track or Global Privacy Control: no analytics and no banner. */
export const optedOut = () =>
	navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;

/** The visitor's answer to the recording banner, or null if they haven't answered. */
export function getConsent(): Consent {
	try {
		const v = localStorage.getItem(CONSENT_KEY);
		return v === 'yes' || v === 'no' ? v : null;
	} catch {
		return null;
	}
}

export function setConsent(choice: Consent) {
	try {
		if (choice) localStorage.setItem(CONSENT_KEY, choice);
		else localStorage.removeItem(CONSENT_KEY);
	} catch {
		// Storage blocked: the choice just isn't remembered.
	}
}

export async function startAnalytics() {
	if (!services.posthogKey || location.hostname !== services.trackedHost || optedOut()) return;
	const { default: posthog } = await import('posthog-js');
	const recording = getConsent() === 'yes';

	// Per-application links: tavorbenshahar.com/?ref=acme. The tag rides on the
	// landing pageview; PostHog's session ties the rest of the visit to it.
	const ref = new URLSearchParams(location.search).get('ref')?.trim().toLowerCase().slice(0, 60) || undefined;

	posthog.init(services.posthogKey, {
		api_host: services.posthogHost,
		// Cookieless unless the visitor allowed recording, which needs cookies.
		...(recording ? {} : { cookieless_mode: 'always' as const }),
		person_profiles: 'never',
		autocapture: false,
		// The first pageview is sent by hand below, after the ref tag is registered.
		capture_pageview: false,
		capture_pageleave: true,
		disable_session_recording: !recording,
		session_recording: { maskAllInputs: true },
		disable_surveys: true,
		// Only what the privacy page lists: no heatmaps, dead clicks or performance
		// metrics, even if they're switched on in the PostHog project.
		capture_heatmaps: false,
		capture_dead_clicks: false,
		capture_performance: false,
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
