# DesignLab

A focused LLD practice prototype for the CipherSchools two-day assignment.

## Run

Node 24+, npm. Run `npm ci`, then `npm run dev`. Production build: `npm run build`. Domain tests: `node --experimental-transform-types --test tests/practice.test.ts`.

## Learner flow

Choose Parking Lot, Vending Machine, or Elevator. Fill four design sections (at least 30 characters each), optionally include code, submit for rubric guidance, revise, and browse attempt history. Drafts save while typing. Submitted snapshots are read-only. Revisions retain a parent attempt ID. JSON export includes the solution and feedback.

## Architecture

React with TypeScript on the provided Vinext/Workers-compatible runtime. Domain model, evaluator strategy, validator, application service, and repository contract are in `lib/practice.ts`. The UI is in `app/page.tsx`; styles in `app/globals.css`. This prototype uses browser localStorage rather than a Spring Boot/H2 backend, keeping the runnable deployment self-contained. Java is supported as optional submission text; this is not a Java application or code runner.

## Evaluation and limitations

This release uses an explicitly labelled deterministic **rubric review**, not an AI grader. It quotes the submitted text, identifies sentence-level supporting evidence, and generates requirement-specific self-review prompts. Neither word count nor keywords establishes semantic correctness. No scores, fabricated AI calls, or claims of expert assessment are made. Meaningful semantic feedback is the largest remaining product improvement; plug a model-backed implementation into `DesignEvaluator` through a server route and validate its output before enabling it.

All history and drafts stay in the current browser; no database, account sync, collaboration, or execution of submitted code. Clearing browser data removes history. Export important designs. There is no cross-tab transaction lock. A refresh during review marks the attempt failed and enables retry. Browser storage failures are shown to the learner. The short asynchronous handoff makes save/review state visible; it is not a remote queue.

## Assignment documentation

- `docs/RESEARCH.md`: researched approaches, opportunities, and product direction.
- `docs/DESIGN.md`: responsibilities, state changes, evaluation, extension points, trade-offs.
- `AI_USAGE.md`: accepted and rejected AI-assisted decisions.
- `tests/practice.test.ts`: important domain, failure, and persistence cases.

## Manual walkthrough

1. Select Parking Lot. Submit an empty form; verify actionable validation.
2. Write each section and refresh before submission; the draft is restored when opening the same problem.
3. Submit and inspect all four evidence excerpts and the three review prompts.
4. Revise, change a section, submit again, and verify both snapshots in My attempts.
5. Open a snapshot; it is read-only. Export JSON and inspect its contents.
6. Repeat on another problem; review prompts use that problem's requirements.


## Evaluator v2 update

The review now checks concrete requirement behaviours rather than text length. It includes 12 rules for Parking Lot, 11 for Vending Machine, and 11 for Elevator, including shared ownership/collaboration checks. Findings report Evidence found, Needs clarification, or Potential risk, with an exact excerpt when available. Missing evidence is not proof of missing behaviour. Risks and important missing explanations are prioritised into three next steps. Revisions compare newly found and lost evidence by stable rule ID, only for matching evaluator versions. Legacy reports remain readable.

This is an offline heuristic evaluator, not semantic AI assessment. It can miss synonyms, misunderstand negation, and accept plausible wording that does not match the actual implementation. Optional code is retained but not analysed. The UI makes these limits explicit; there is no AI provider connection or API key required.
