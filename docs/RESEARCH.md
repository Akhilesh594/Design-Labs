# Research note — LLD practice

Research date: 9 September 2026. Desk research of public product pages; no user interviews or claims of measured learning outcomes.

## Learner problem

A learner can list classes for a familiar problem and still be unsure whether those classes have coherent responsibilities, preserve important invariants, or handle a failed operation. Code compiling alone cannot resolve these questions. A meaningful attempt therefore needs requirements, object responsibilities, collaborations, an execution trace, and explicit edge cases. Optional code is useful supporting evidence rather than the only accepted format.

## Existing approaches

| Approach | What the source offers | Implication for this prototype |
|---|---|---|
| [Hello Interview LLD guided practice](https://www.hellointerview.com/practice/low-level-design) | Step-by-step practice of common LLD interview questions with personalized feedback | Guided LLD practice already exists. We cannot claim novelty simply from AI feedback or common problems. |
| [Hello Interview delivery framework](https://www.hellointerview.com/learn/low-level-design/in-a-hurry/delivery) | A framework spanning requirements, object model, APIs, and core logic | Use structured sections so a submission exposes reasoning rather than only a class list. |
| [Exercism](https://exercism.org/) | In-browser exercises, automated code analysis, and human mentoring | Separate objective checks from interpretation. Invite learners to revisit their work rather than treating one submission as completion. |
| [Refactoring.Guru pattern catalogue](https://refactoring.guru/design-patterns/catalog) | Explanations of design patterns grouped by intent | Link design choices to requirements. Avoid rewarding the mere presence of pattern names. |

## Product opportunity and hypotheses

Our opportunity is a small, transparent workflow with explicit requirements, evidence alongside review prompts, and preserved revisions. This is a scope choice, not a demonstrated gap in every competitor. The working hypotheses are that a structured form reduces blank-page friction, a maximum of three next steps encourages revision, and quoting the learner's own text makes a review easier to inspect. Test these with learners before claiming improved outcomes.

No one canonical solution should be required. A single pricing class can be reasonable under fixed pricing; an interface earns its place when the problem calls for variation. Review should explain that trade-off rather than mechanically demanding Strategy, Factory, or inheritance.

## Direction and limits

The shipped MVP includes three problems, four required sections, an optional code sketch, deterministic rubric guidance, immutable attempts, revisions, and export. Evaluation explicitly checks supporting evidence, not design correctness. It provides guided questions with excerpts and requirement-specific failure prompts. Semantic judgment remains a future evaluator implementation. That makes the prototype reproducible without provider access, with a clear quality limitation rather than simulated AI output.

Useful future measures: how many learners complete a first submission, the share returning for a second version, which prompts they find actionable, and whether an independent human sees clearer responsibilities in revisions. None of those results have yet been collected. For a two-day exercise, implement and test the practice loop before adding a large catalogue, leaderboard, diagram canvas, or account system.


## Evaluator v2 update

The review now checks concrete requirement behaviours rather than text length. It includes 12 rules for Parking Lot, 11 for Vending Machine, and 11 for Elevator, including shared ownership/collaboration checks. Findings report Evidence found, Needs clarification, or Potential risk, with an exact excerpt when available. Missing evidence is not proof of missing behaviour. Risks and important missing explanations are prioritised into three next steps. Revisions compare newly found and lost evidence by stable rule ID, only for matching evaluator versions. Legacy reports remain readable.

This is an offline heuristic evaluator, not semantic AI assessment. It can miss synonyms, misunderstand negation, and accept plausible wording that does not match the actual implementation. Optional code is retained but not analysed. The UI makes these limits explicit; there is no AI provider connection or API key required.
