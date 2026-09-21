# AI usage

1. **Structured submission:** AI proposed splitting design input into responsibilities, relationships, core flow, and edge cases. Accepted because those dimensions reveal design reasoning while fitting a two-day implementation.
2. **Evaluation claims:** AI proposed using an LLM for design feedback. Deferred live integration because no provider was configured. Rejected presenting text length or keywords as design correctness; shipped an explicitly labelled rubric self-review instead. This reduces feedback power and is a documented limitation.
3. **Architecture:** AI proposed evaluator and repository interfaces. Accepted these two extension points because alternative evaluation and persistence are concrete changes. Rejected a large class hierarchy and distributed job architecture.
4. **Prototype runtime:** An earlier suggestion was Spring Boot/H2. The implementation uses the available React/TypeScript hosted runtime with localStorage for an immediately usable demo. This is a deliberate scope change, not a claim that a Java backend was built.
5. **Testing:** AI generated domain tests. Accepted tests for interrupted/failed reviews, retries, revision preservation, bounds, and storage failure because those failures can lose learner work. Avoided tests that merely assert CSS or component structure.

AI authored the initial implementation and documentation. Automated verification results are separate from human review; no claim of manual browser testing or learner validation is made.


## Evaluator v2 update

The review now checks concrete requirement behaviours rather than text length. It includes 12 rules for Parking Lot, 11 for Vending Machine, and 11 for Elevator, including shared ownership/collaboration checks. Findings report Evidence found, Needs clarification, or Potential risk, with an exact excerpt when available. Missing evidence is not proof of missing behaviour. Risks and important missing explanations are prioritised into three next steps. Revisions compare newly found and lost evidence by stable rule ID, only for matching evaluator versions. Legacy reports remain readable.

This is an offline heuristic evaluator, not semantic AI assessment. It can miss synonyms, misunderstand negation, and accept plausible wording that does not match the actual implementation. Optional code is retained but not analysed. The UI makes these limits explicit; there is no AI provider connection or API key required.
