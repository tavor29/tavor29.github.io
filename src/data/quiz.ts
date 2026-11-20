// "Your call": a short PMP-style quiz on the homepage (Tavor's idea,
// 2026-11-20). Situations that come up most in high-tech and startups: scope
// pushed in late, sprint interruptions, long-lead hardware, adoption that
// stalls, engineers deadlocked, a team running hot. The questions are original,
// written in the style of the PMP exam (not copied from it), and each answer
// follows the PMI way: assess first, work through the process, talk to people
// directly before escalating. Built to move to its own page later if it works,
// so it only depends on this file and components/Quiz.astro.

export type QuizQuestion = {
	/** Short topic label shown above the question. */
	topic: string;
	situation: string;
	options: [string, string, string, string];
	/** Index of the best answer in options. */
	answer: 0 | 1 | 2 | 3;
	/** Why it's the best answer, in one or two sentences. */
	why: string;
};

export const quiz: QuizQuestion[] = [
	{
		topic: 'Scope change',
		situation:
			'Two weeks before launch, the CEO asks you to add a feature a big prospect wants in this release. What do you do first?',
		options: [
			'Add it. The CEO has the final say.',
			'Say no. Scope is frozen this close to launch.',
			'Assess the impact on schedule, cost, quality and risk, then bring the options to the CEO to decide.',
			'Ask the team to work weekends so it fits without moving the date.',
		],
		answer: 2,
		why: 'Every change goes through change control: understand the impact first, then let the decision-maker choose with the trade-offs in front of them. Saying yes or no on reflex skips that step.',
	},
	{
		topic: 'Agile',
		situation:
			'Mid-sprint, a sales VP messages a developer directly and asks them to drop everything for an urgent customer request. What should happen?',
		options: [
			'Send the request to the product owner, who decides whether it changes the sprint or goes into the backlog.',
			'The developer does it quietly; it’s only a day of work.',
			'Add it to the sprint and extend the sprint by a few days.',
			'Escalate to the CTO to settle who controls the team’s time.',
		],
		answer: 0,
		why: 'The product owner owns priorities. Routing the request to them protects the sprint goal without ignoring the customer, and it keeps side requests from quietly eating the team’s capacity.',
	},
	{
		topic: 'Risk',
		situation:
			'Your launch depends on new GPU servers, and the supplier warns that lead times just stretched to five months. Nothing has slipped yet. What do you do?',
		options: [
			'Wait. It’s only a risk until a delivery date actually moves.',
			'Move the launch date now to be safe.',
			'Accept the risk; supply chains are outside your control.',
			'Log the risk, choose a response (order now, line up a second supplier) and tell the stakeholders.',
		],
		answer: 3,
		why: 'Risks are handled before they become issues. Long-lead items are a classic tech-program trap: the cheapest fix is ordering early or securing a backup while there’s still time.',
	},
	{
		topic: 'Stakeholders',
		situation:
			'You’re rolling out a new internal AI tool. One department head keeps skipping the check-ins, and their team isn’t using it. What’s your first move?',
		options: [
			'Escalate to their VP so adoption becomes mandatory.',
			'Meet them one-on-one to understand their concerns, then adjust the rollout plan.',
			'Carry on without them; the other departments are on board.',
			'Send weekly reminder emails with usage numbers until they engage.',
		],
		answer: 1,
		why: 'Resistance usually has a reason: workload, a bad past rollout, a real gap in the tool. Talking to the person directly comes before escalating, and what you learn often fixes adoption for other teams too.',
	},
	{
		topic: 'Conflict',
		situation:
			'Two senior engineers disagree on the architecture for a key service, and the team has been stalled for a week. What do you do?',
		options: [
			'Go with the more senior engineer’s design.',
			'Let them work it out; they’re the experts.',
			'Bring them together to weigh both designs against the project’s requirements and agree on one.',
			'Ask the CTO to make the call.',
		],
		answer: 2,
		why: 'Collaborating on the problem is the preferred way to resolve conflict: judge the options against agreed criteria, not against who is louder or more senior. Escalate only if that fails.',
	},
	{
		topic: 'Team health',
		situation:
			'Velocity has dropped for three sprints in a row, and in stand-ups the team says they’re stretched thin. What do you do?',
		options: [
			'Hold a retrospective to find the root cause, then remove the blockers you find.',
			'Add two more developers right away.',
			'Ask for overtime until the team is back on plan.',
			'Shorten the sprints so problems surface faster.',
		],
		answer: 0,
		why: 'A servant leader finds out what is slowing the team before acting. New hires slow a team down at first, and overtime hides the problem. The retrospective is where the real cause comes out.',
	},
];
