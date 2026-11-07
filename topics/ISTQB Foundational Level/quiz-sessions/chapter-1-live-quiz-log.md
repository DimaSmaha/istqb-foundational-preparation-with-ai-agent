# Chapter 1 — Live Quiz Log

Append-only transcript of every `/istqb-quiz 1` live session: question, answer, verdict, rationale. Two
purposes — (1) never repeat a scenario already logged here, (2) give future sessions a calibrated style
reference alongside `exams/chapter-1-exam.html`. Never edit a prior session's entry, only append new ones.

## Session — 2026-07-26

**Q1 (§1.1)**
> A team ships a feature that matches every line of its signed-off requirements spec. In UAT, users say
> it doesn't fit how they actually work — the spec never mentioned their workflow. What does this best
> illustrate?
> A) A verification failure, because the spec was not checked carefully enough
> B) Verification succeeded, but validation against the real stakeholder need was not satisfied
> C) A debugging failure, because the missing feature was never fixed
> D) Both verification and validation succeeded, because the spec was followed exactly

- Answer given: D
- Verdict: Incorrect
- Rationale: Pattern 1 (term-swap, verify↔validate). Matching the documented spec is verification; whether
  the product meets the real need is validation. Correct: B.

**Q2 (§1.2)**
> A developer runs a unit test on their own laptop; the discount function returns a negative price. They
> fix it before pushing, so the bad value never left their machine. Did a failure occur?
> A) No, because the defect was found on a developer machine, not in a test environment or production
> B) No, because unit tests run by a developer are debugging, not testing
> C) Yes, a failure occurred when the function returned the negative price, and a defect was present in the code
> D) Yes, but there was no defect, because the developer corrected the code immediately

- Answer given: A
- Verdict: Incorrect
- Rationale: Pattern 2 (failure is not production-only). Stated reasoning was "failure = deployed app." A
  failure occurs the instant an executed defect makes the system misbehave, in any environment. Correct: C.

**Q3 (§1.4)**
> A tester takes the agreed acceptance criteria for a "transfer amount" field (valid range 1–5000) and
> applies boundary value analysis to write test cases: 0 → rejected, 1 → accepted, 5000 → accepted,
> 5001 → rejected. Which activity is this?
> A) Test analysis  B) Test design  C) Test implementation  D) Test execution

- Answer given: A
- Verdict: Incorrect
- Rationale: Pattern 3 (activity boundary). Applying a technique to turn conditions into test cases is test
  design; analysis only identifies the partitions and boundaries. Correct: B.

**Q4 (§1.5)**
> A team adopts the whole-team approach. A developer says: "Since quality is everyone's responsibility now,
> nobody needs to be individually accountable when a bug slips through." Is this correct?
> A) Yes, collective ownership replaces individual accountability
> B) No, the approach adds a shared layer of responsibility on top of individual accountability
> C) Yes, but only for experienced Agile teams
> D) No, because the whole-team approach applies only to manual testing

- Answer given: B
- Verdict: Correct
- Rationale: Pattern 4 (shared-X-implies-less-individual-X) avoided this time. Shared ownership adds
  accountability, it never subtracts it.

**Readiness verdict:** Not yet — 3 of the 4 named error modes missed (patterns 1, 2, 3). Re-drill those
before sitting `exams/chapter-1-exam.html`; pattern 4 held.

## Session — 2026-07-27 (re-pass on patterns 1–3)

**RP1 (§1.1)**
> An engineer works through a 40-page interface specification clause by clause and confirms each clause is
> implemented as written. What was performed?
> A) Validation, because the check confirms the module is fit for the manufacturer's purpose
> B) Verification, because the module was checked against a documented specification
> C) Neither, because both require executing the software
> D) Validation, because acceptance against a contract is always validation

- Answer given: B
- Verdict: Correct
- Rationale: Checked against a documented spec = verification. A is the swap bait ("fit for purpose" sounds
  like a stakeholder need).

**RP2 (§1.2)**
> On its first run against the QA environment, a new automated API test gets HTTP 500 instead of the
> expected 200. At that moment, which is correct?
> A) No failure — a 500 on a brand-new test means the test is wrong
> B) No failure — failures require production
> C) A failure occurred — actual behavior deviated from expected when a defect was exercised
> D) A failure occurred only if a developer later confirms a code defect

- Answer given: C
- Verdict: Correct
- Rationale: Observed ≠ expected behavior is a failure, in any environment. D confuses where the defect
  lives with whether a failure happened.

**RP3 (§1.4)**
> A tester, working from agreed acceptance criteria, applies equivalence partitioning to write out
> concrete test cases with inputs and expected results. Which activity is this?
> A) Test analysis  B) Test design  C) Test implementation  D) Test execution

- Answer given: B
- Verdict: Correct
- Rationale: Technique applied to produce cases = test design.

**Readiness verdict:** Ready — 3/3 on the re-pass. Sit `exams/chapter-1-exam.html` next.
