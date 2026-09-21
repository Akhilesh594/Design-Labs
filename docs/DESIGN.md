# Design note

## MVP and boundaries

A browser application with a problem catalogue, structured design workspace, rubric feedback, revision ancestry, history, and JSON export. Three seeded problems define requirements and constraints. No LMS, authentication flow, code execution, diagram editor, microservices, or fabricated grading scores.

## Important domain responsibilities

| Type | Responsibility |
|---|---|
| Problem | Fixed requirements, constraints, prompts, sample solution for tests |
| Solution | Four required design sections and an optional code sketch |
| Attempt | Immutable submitted solution, problem reference, review status, parent ID |
| SubmissionValidator | Required-section and size validation |
| DesignEvaluator | Interchangeable evaluation strategy contract |
| RubricEvaluator | Evidence excerpts and self-review guidance; requirement evidence and potential risks |
| Report | Honest evaluation mode, findings, next steps |
| AttemptRepository | Persistence contract |
| BrowserAttemptRepository | Serialize browser history and update by identity |
| EvaluationService | Coordinate validation, review status, evaluator errors, and result storage |

## State and persistence

Drafts are independent per-problem localStorage records. Submission validates before creating an immutable snapshot. An attempt transitions queued → evaluating → completed or failed. Failure preserves input. Retrying updates the review for the same ID; revising creates a new ID with a parent reference. On reload, an interrupted queued/evaluating attempt becomes failed. Storage failures propagate; the UI does not claim that the review succeeded. Domain tests exercise retries, failure preservation, and snapshot retention.

## Evaluation

The deterministic validator proves only input bounds and presence. RubricEvaluator matches explanatory passages against explicit problem-specific rules, quotes that section, and gives focused design questions tied to the selected problem. The label “Evidence found” is explicitly not “Correct.” No heuristic is presented as a semantic assessment. This is useful guided self-review but less powerful than a teacher or LLM; that limitation is visible in the product.

A model-backed evaluator should reason about requirement coverage, responsibility cohesion, ownership, invariants, extension points, and failure recovery, accepting multiple valid solutions. It must return structured findings with exact evidence, separate observations from assumptions, and avoid ungrounded numerical precision. Treat submitted text as untrusted content, bound input and output, validate the model's JSON and quotations, and keep provider credentials server-side. Add request timeouts and retryable failures. The current synchronous evaluator contract can be made Promise-based at the service boundary when this capability is introduced.

## Extensibility

New problems are data. Alternative reviewers implement DesignEvaluator. Alternative storage implements AttemptRepository. A future diagram/code format should implement a SubmissionNormalizer that returns common sections plus references to source nodes or line ranges; it should not make the existing validator pretend to parse images. New evaluation strategies should preserve report provenance and version, with async execution added when an external provider requires it.

## Trade-offs

React/TypeScript was used in the available hosted runtime rather than the earlier proposed Java monolith. There is no Spring Boot server. Local persistence makes the demo immediately usable without credentials but is device-specific and lacks cross-tab atomicity. Using composition at the evaluator and repository boundaries demonstrates replaceable behaviour without a dependency-injection framework. No speculative interfaces exist for UI widgets. Semantic AI assessment and server persistence are explicit follow-up work, not implied features of this release.

## Verification

Automated tests cover validation, valid examples, size limits, review provenance, upserts, completed reviews, failed-review retry, revision immutability, storage failures, and malformed data. Production compilation checks integration. Browser/visual testing was not performed.


## Evaluator v2 update

The review now checks concrete requirement behaviours rather than text length. It includes 12 rules for Parking Lot, 11 for Vending Machine, and 11 for Elevator, including shared ownership/collaboration checks. Findings report Evidence found, Needs clarification, or Potential risk, with an exact excerpt when available. Missing evidence is not proof of missing behaviour. Risks and important missing explanations are prioritised into three next steps. Revisions compare newly found and lost evidence by stable rule ID, only for matching evaluator versions. Legacy reports remain readable.

This is an offline heuristic evaluator, not semantic AI assessment. It can miss synonyms, misunderstand negation, and accept plausible wording that does not match the actual implementation. Optional code is retained but not analysed. The UI makes these limits explicit; there is no AI provider connection or API key required.
