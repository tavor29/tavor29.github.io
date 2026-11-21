// The featured coded project, shown as a big photo card at the top of
// "Projects I've Built" and the Projects page (Tavor's ask, 2026-11-21).
// Facts come from Keel's README and SPEC.md.
import keelCover from '../assets/projects/keel/keel-briefing.png';

export const featuredProject = {
	href: 'projects/keel/',
	cover: keelCover,
	mark: 'half' as const,
	label: 'Coded project · Keel',
	meta: '2026 / Live demo',
	title: 'Program management where the conversation is the plan',
	text: 'AI turns emails and chat into proposed schedule changes, shows their impact on the critical path and budget, and the PM approves them in one click.',
	badges: ['React · TypeScript', 'Critical-path engine', 'AI change proposals', 'Live demo'],
};
