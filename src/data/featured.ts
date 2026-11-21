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
	// What it is, what it replaces, what it solves (Tavor, 2026-11-21).
	title: 'One app instead of MS Project, Monday and Slack',
	text: 'Program management software for multi-team tech programs. The schedule, the boards and the team conversation live in one place, and AI turns emails and chat into plan changes the PM approves, so nobody chases status updates by hand.',
	badges: ['Critical path & baselines', 'Boards & sprints', 'AI change proposals', 'Live demo'],
};
