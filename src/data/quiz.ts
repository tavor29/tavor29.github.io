// "Your call": a short PMP-style quiz on the homepage (Tavor's idea,
// 2026-11-20). Situations that come up most in high-tech and startups. The
// questions are original, written in the style of the PMP exam (not copied
// from it), and each answer follows the PMI way: assess before acting, work
// through the process, the person who owns a decision makes it, talk to
// people directly before escalating.
//
// Rules for writing more (Tavor, 2026-11-20):
// - Each round is six questions and gets harder as it goes: two easy, two
//   medium, two hard.
// - Wrong answers sit close to the right one: a sensible move done in the
//   wrong order, by the wrong person, or one step short. Never an obviously
//   silly option.
// - Vary the position of the right answer.
// "Play again" moves to the next round; after the last one it starts over.
// The quiz only depends on this file and components/Quiz.astro, so it can
// move to its own page later.

export type Level = 'Easy' | 'Medium' | 'Hard';

export type QuizQuestion = {
	/** Short topic label shown above the question. */
	topic: string;
	level: Level;
	situation: string;
	options: [string, string, string, string];
	/** Index of the best answer in options. */
	answer: 0 | 1 | 2 | 3;
	/** Why it's the best answer, and why the closest wrong one isn't. */
	why: string;
};

export const rounds: QuizQuestion[][] = [
	[
		{
			topic: 'Scope change',
			level: 'Easy',
			situation:
				'Two weeks before launch, the CEO asks you to add a feature a big prospect wants in this release. What do you do first?',
			options: [
				'Ask the team for an estimate and move the launch date to fit the feature.',
				'Assess the impact on schedule, cost, quality and risk, then bring the options to the CEO to decide.',
				'Assess the impact with the team and add the feature if they say it fits.',
				'Log it as a change request and plan it for the next release.',
			],
			answer: 1,
			why: 'Change control means the impact is assessed and the person who owns the decision makes it. Adding it because the team says it fits, or parking it for the next release, both make the CEO’s call for them.',
		},
		{
			topic: 'Agile',
			level: 'Easy',
			situation:
				'Mid-sprint, a sales VP messages a developer directly and asks them to drop everything for an urgent customer request. What should happen?',
			options: [
				'The request goes to the product owner, who decides whether it changes the sprint or waits in the backlog.',
				'The request goes to the product owner, and it’s added to the current sprint so the customer isn’t kept waiting.',
				'The developer estimates it first, then raises it at the next stand-up.',
				'The scrum master tells the VP that the sprint scope is locked.',
			],
			answer: 0,
			why: 'The product owner owns priorities, so they decide, not the requester and not the team. Sprint scope isn’t untouchable either: the product owner can change it if the request is worth more than the sprint goal.',
		},
		{
			topic: 'Risk',
			level: 'Medium',
			situation:
				'Your launch depends on new GPU servers, and the supplier warns that lead times just stretched to five months. Nothing has slipped yet. What do you do?',
			options: [
				'Add it to the risk register and review it at the next monthly risk meeting.',
				'Raise it as an issue and ask the sponsor for contingency budget.',
				'Order the servers now and update the schedule baseline to the new dates.',
				'Add it to the risk register, choose a response such as ordering now or lining up a second supplier, and tell the stakeholders.',
			],
			answer: 3,
			why: 'It’s a risk, not yet an issue, and it needs a response while there’s time, not just a log entry. Ordering is a good move, but changing the baseline goes through change control.',
		},
		{
			topic: 'Stakeholders',
			level: 'Medium',
			situation:
				'You’re rolling out a new internal AI tool. One department head keeps skipping the check-ins, and their team isn’t using the tool. What’s your first move?',
			options: [
				'Ask the sponsor to speak to them, since they outrank you.',
				'Meet them one-on-one and walk them through the tool’s benefits until they’re on board.',
				'Meet them one-on-one to understand their concerns, then adjust the rollout plan.',
				'Offer their team extra training to build adoption from the bottom up.',
			],
			answer: 2,
			why: 'Start by listening. Resistance usually has a reason, like workload, a bad past rollout or a real gap in the tool. A one-on-one spent selling the benefits is still a pitch, and training their team works around the person who decides.',
		},
		{
			topic: 'Conflict',
			level: 'Hard',
			situation:
				'Two senior engineers disagree on the architecture for a key service, and the team has been stalled for a week. What’s the best way to resolve it?',
			options: [
				'Bring them together to weigh both designs against the project’s requirements, and agree on one they both commit to.',
				'Ask each engineer to write up their design, then choose the stronger one yourself.',
				'Combine the two: one engineer’s design for the service, the other’s for the data layer.',
				'Ask the whole team to vote so the decision has everyone behind it.',
			],
			answer: 0,
			why: 'Collaborating on the problem is the preferred way to resolve conflict: judge against agreed criteria and get real commitment. Choosing yourself forces the outcome, splitting the designs is a compromise nobody owns, and a vote skips the merits.',
		},
		{
			topic: 'Security risk',
			level: 'Hard',
			situation:
				'Two days before release, a critical vulnerability is found in an open-source library you use. A proper patch takes a week, and the product lead wants to ship and patch later. What do you do?',
			options: [
				'Delay the release until it’s patched. Security comes first.',
				'Ship on schedule and record the vulnerability in the risk register.',
				'Turn off the affected feature with a feature flag and ship on schedule.',
				'Assess the exposure with security, including turning off the affected feature, and have the sponsor decide with the risk documented.',
			],
			answer: 3,
			why: 'A risk this size is above the PM’s or the product lead’s authority to accept. Turning off the feature may well be the right fix, but the sponsor makes that call with the facts in front of them. Delaying on reflex makes the decision for them too.',
		},
	],
	[
		{
			topic: 'Communication',
			level: 'Easy',
			situation:
				'Your team is split between Tel Aviv and a US office, and status updates keep getting missed on one side or the other. What do you do?',
			options: [
				'Send a longer weekly status email to everyone.',
				'Move all updates into one shared Slack channel.',
				'Agree on a communications plan: who needs what, how often, and through which channel.',
				'Set up a daily all-hands call at a time that suits both offices.',
			],
			answer: 2,
			why: 'The gap is the plan, not the tool. Decide who needs what information, when and how, then pick the channel. A new channel, a longer email or another meeting only treat the symptom.',
		},
		{
			topic: 'Team health',
			level: 'Easy',
			situation:
				'Velocity has dropped for three sprints in a row, and in stand-ups the team says they’re stretched thin. What do you do?',
			options: [
				'Cut the sprint commitment until velocity recovers.',
				'Run a retrospective to find the root cause, then remove the blockers the team identifies.',
				'Meet each developer separately to find out who is falling behind.',
				'Report the trend to the sponsor and ask for another developer.',
			],
			answer: 1,
			why: 'Find out what’s slowing the team before acting. A smaller commitment hides the cause, one-on-ones aimed at finding someone to blame break trust, and a new hire slows the team down at first.',
		},
		{
			topic: 'Requirements',
			level: 'Medium',
			situation:
				'Mid-sprint, the team realizes a story’s acceptance criteria can be read two ways, and each reading is a very different amount of work. What happens next?',
			options: [
				'Ask the product owner to clarify the acceptance criteria before the work continues.',
				'Build the simpler reading and confirm it at the sprint review.',
				'Build both behind a feature flag so the product owner can choose.',
				'Finish the story as you read it and note the gap in the retrospective.',
			],
			answer: 0,
			why: 'The product owner decides what “done” means, and asking now costs minutes. Building first and confirming later risks wasted work, and the retrospective is too late for this story.',
		},
		{
			topic: 'Budget',
			level: 'Medium',
			situation:
				'Six months into a 12-month program, you’ve spent 60% of the budget and finished about 45% of the work. What do you do?',
			options: [
				'Ask the sponsor for a 15% budget increase to cover the gap.',
				'Cut scope so the rest of the work fits the remaining budget.',
				'Keep going, since spending is usually front-loaded on programs like this.',
				'Find the cause of the overspend, forecast the final cost, and bring corrective options to the sponsor.',
			],
			answer: 3,
			why: 'You’re getting about 75 cents of work for every dollar spent. Find out why, forecast where it lands, then let the sponsor choose. Asking for money or cutting scope before the analysis acts on a guess, and assuming front-loading is also a guess.',
		},
		{
			topic: 'Vendors',
			level: 'Hard',
			situation:
				'A vendor delivers a module that meets the contract’s written spec but not what your users actually need. The vendor wants sign-off and final payment. What do you do?',
			options: [
				'Hold the final payment until the module meets the users’ needs.',
				'Sign off and pay, then informally ask the vendor to fix it as a goodwill gesture.',
				'Accept it against the contract, raise a change request for what users need, and review how the requirement was missed.',
				'Ask legal to reopen the contract before you sign off.',
			],
			answer: 2,
			why: 'Deliverables are accepted against the contract. It meets the spec, so you sign off, and holding payment would breach the contract. The real gap was in the requirements, so it’s a change request plus a lesson learned, not a side deal.',
		},
		{
			topic: 'Resources',
			level: 'Hard',
			situation:
				'In a matrix org, a functional manager moves your only data engineer to a VP’s project for two weeks, and your critical path runs through their work. What do you do first?',
			options: [
				'Escalate to your sponsor right away, since the critical path is at risk.',
				'Work out the schedule impact, then negotiate with the functional manager, and escalate only if you can’t agree.',
				'Accept it, and plan overtime when the engineer comes back to recover the time.',
				'Bring in a contractor to cover the two weeks.',
			],
			answer: 1,
			why: 'In a matrix, the functional manager owns the person’s time, so start with them, armed with the numbers. Escalating first damages the relationship, and overtime or a contractor spend money before anyone has agreed the trade-off.',
		},
	],
];
