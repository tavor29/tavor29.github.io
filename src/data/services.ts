// Third-party services the site talks to. Every value here is public by
// design (it ships in the page anyway); secrets never go in this repo.
// An empty value switches that feature off, so the site works without it.
export const services = {
	/** PostHog project API key (starts with phc_). Empty = no analytics. */
	posthogKey: '',
	/** EU region, so visitor data stays in the EU. */
	posthogHost: 'https://eu.i.posthog.com',
	/** Only this hostname is tracked, so local previews don't pollute the data. */
	trackedHost: 'tavorbenshahar.com',

	/** Cloudflare Turnstile site key for the contact reveal. Empty = phone and email shown as plain links. */
	turnstileSiteKey: '',
	/** The Cloudflare Worker that checks the Turnstile token and returns phone and email (workers/contact-reveal). */
	contactEndpoint: '',
};

export const contactGated = Boolean(services.turnstileSiteKey && services.contactEndpoint);
