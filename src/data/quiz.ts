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
// - Vary the position of the right answer, and keep the options about the
//   same length: the right one is never the longest (the build checks).
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
				'Ask the team for an estimate, then move the launch date so the feature fits.',
				'Assess the impact, then let the CEO decide with the trade-offs in front of them.',
				'Assess the impact with the team, and add the feature if they say it fits in time.',
				'Log it as a change request and schedule it for the next release after launch.',
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
				'Send it to the product owner, who decides whether it changes the sprint or waits.',
				'Send it to the product owner and add it to this sprint so the customer isn’t kept waiting.',
				'Have the developer estimate it first, then raise it at the next stand-up meeting.',
				'Have the scrum master tell the VP the sprint scope is locked until the review.',
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
				'Add it to the risk register and review it at next month’s risk meeting with the team.',
				'Treat it as an issue now and ask the sponsor for contingency budget to cover it.',
				'Order the servers now and move the schedule baseline to the new delivery dates.',
				'Log the risk, plan a response such as ordering early, and tell the stakeholders.',
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
				'Ask the sponsor to talk to them, since the sponsor outranks you and they’ll listen.',
				'Meet them one-on-one and walk them through the benefits until they’re on board.',
				'Meet them one-on-one to hear their concerns, then adjust the rollout plan.',
				'Offer their team extra training sessions to build adoption from the bottom up.',
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
				'Get them to weigh both designs against the requirements and agree on one together.',
				'Have each write up their design, then pick the stronger one yourself as the PM.',
				'Combine them: one engineer’s design for the service, the other’s for the data layer.',
				'Put it to a team vote so the decision has the whole team behind it from the start.',
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
				'Delay the release until the patch is ready, since security always comes first.',
				'Ship on schedule and record the vulnerability in the risk register for follow-up.',
				'Turn off the affected feature with a feature flag, and ship on schedule as planned.',
				'Assess the exposure with security, then have the sponsor decide on the options.',
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
				'Send a longer, more detailed weekly status email to everyone on both sides.',
				'Move all status updates into one shared Slack channel.',
				'Agree who needs which updates, how often and through which channel.',
				'Set up a daily all-hands call at a time that works for both offices.',
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
				'Cut the sprint commitment for now, until the team’s velocity recovers.',
				'Run a retrospective to find the root cause, then remove those blockers.',
				'Meet each developer separately to find out who is falling behind and why.',
				'Report the trend to the sponsor and ask for another developer to help.',
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
				'Ask the product owner to clarify the acceptance criteria before the work goes on.',
				'Build the simpler reading for now, and confirm it with the product owner at the sprint review.',
				'Build both versions behind a feature flag so the product owner can choose later.',
				'Finish the story as you read it, and raise the gap in the sprint retrospective.',
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
				'Ask the sponsor for a 15% budget increase to cover the gap before it grows.',
				'Cut scope now so the rest of the work fits inside the remaining budget.',
				'Keep going, since spending is often front-loaded on programs like this one.',
				'Find the cause, forecast the final cost, and bring options to the sponsor.',
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
				'Hold back the final payment until the module meets what users actually need.',
				'Sign off and pay, then informally ask the vendor to fix it as a goodwill gesture.',
				'Sign off against the contract, then raise a change request for what users need.',
				'Ask legal to reopen the contract and renegotiate before you agree to sign off.',
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
				'Escalate to your sponsor right away, since the critical path is now at risk.',
				'Work out the schedule impact, then negotiate with the functional manager.',
				'Accept it, and plan overtime for when the engineer is back to recover the time.',
				'Bring in an outside contractor to cover the data engineering for two weeks.',
			],
			answer: 1,
			why: 'In a matrix, the functional manager owns the person’s time, so start with them, armed with the numbers. Escalating first damages the relationship, and overtime or a contractor spend money before anyone has agreed the trade-off.',
		},
	],
];

// Build check: the right answer must never be the longest option, or people
// learn to pick the longest one.
for (const q of rounds.flat()) {
	const lengths = q.options.map((o) => o.length);
	const longest = Math.max(...lengths);
	if (lengths[q.answer] === longest && lengths.filter((l) => l === longest).length === 1) {
		throw new Error(`Quiz: the right answer is the longest option in "${q.topic}". Rebalance the lengths.`);
	}
}
