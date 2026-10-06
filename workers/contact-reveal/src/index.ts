// contact-reveal: returns phone and email only after a Cloudflare Turnstile
// token checks out, so scrapers reading the site never see them. The values
// live in Worker secrets (CONTACT_EMAIL, CONTACT_PHONE, TURNSTILE_SECRET),
// never in this repo. Only requests from the site's own origin are served.

export interface Env {
	TURNSTILE_SECRET: string;
	CONTACT_EMAIL: string;
	CONTACT_PHONE: string;
	/** Comma-separated origins allowed to call this, e.g. https://tavorbenshahar.com */
	ALLOWED_ORIGINS: string;
}

const json = (body: unknown, status: number, headers: Record<string, string>) =>
	new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } });

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const origins = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
		const origin = req.headers.get('Origin') ?? '';
		const allowed = origins.includes(origin);
		const cors: Record<string, string> = allowed
			? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' }
			: {};

		if (req.method === 'OPTIONS') return new Response(null, { status: allowed ? 204 : 403, headers: cors });
		if (req.method !== 'POST' || !allowed) return json({ error: 'forbidden' }, 403, cors);

		const body = (await req.json().catch(() => null)) as { token?: unknown } | null;
		const token = typeof body?.token === 'string' && body.token.length <= 4096 ? body.token : null;
		if (!token) return json({ error: 'bad request' }, 400, cors);

		const form = new FormData();
		form.append('secret', env.TURNSTILE_SECRET);
		form.append('response', token);
		const ip = req.headers.get('CF-Connecting-IP');
		if (ip) form.append('remoteip', ip);
		const verdict = (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
			.then((r) => r.json())
			.catch(() => ({ success: false }))) as { success: boolean; hostname?: string };

		// The token must be fresh, valid, and issued on one of the site's own hostnames.
		const hosts = origins.map((o) => new URL(o).hostname);
		if (!verdict.success || (verdict.hostname && !hosts.includes(verdict.hostname))) {
			return json({ error: 'verification failed' }, 403, cors);
		}

		const phoneHref = `tel:${env.CONTACT_PHONE.replace(/[^\d+]/g, '')}`;
		return json({ email: env.CONTACT_EMAIL, phone: env.CONTACT_PHONE, phoneHref }, 200, cors);
	},
};
