# Chapter 1 — Exam Attempt Log

Append-only record of every real sitting of `exams/chapter-1-exam.html`: score, per-topic breakdown,
and each wrong question with rationale. Purpose — track pass history and feed pattern recurrence back
into `topics/ISTQB Foundational Level/learning-records/my-error-patterns.md` and future recaps. Never
edit a prior attempt's entry, only append new ones.

## Attempt 1 — 2026-07-28

**Score:** 30/34 — 88% (need 65% to pass) — **PASS**

| Topic                                              | Score       |
| -------------------------------------------------- | ----------- |
| 1.1 What is Testing?                               | 5/6 (83%)   |
| 1.2 Why is Testing Necessary?                      | 4/5 (80%)   |
| 1.3 Testing Principles                             | 4/4 (100%)  |
| 1.4 Test Activities, Testware and Test Roles       | 11/12 (92%) |
| 1.5 Essential Skills and Good Practices in Testing | 6/7 (86%)   |

**Q1 (Exam D · Q1, §1.1) — pattern 1, term-swap**
> Which of the following is a typical test objective?

- Picked: "Validating that legal requirements have been met"
- Correct: "Building confidence in the quality of the test object"
- Rationale: Checking against legal requirements is verification, not validation. Repeat of the
  verify↔validate swap missed in the live quiz.

**Q2 (Exam D · Q2, §1.2) — pattern 2, failure is not production-only**
> Tired designer / time-pressured programmer / disabled-user complaints / unnoticed bonus miscalculation —
> which statement is correct?

- Picked: "The miscalculation of bonuses is a defect that occasionally occurs"
- Correct: "The programmer working under severe time pressure is a root cause"
- Rationale: The story bundles two independent error→defect→failure chains; the correct option asserts
  exactly one link. "Nobody noticed" the bonus failure is a distractor, not evidence that no failure occurred.

**Q3 (Exam A · Q4, §1.4) — pattern 3, activity boundary**
> Which of the following activities is a part of test analysis?

- Picked: "Using boundary value analysis to derive the test data for the payment tests"
- Correct: "Deciding that the team should test whether payment can be shared between many users"
- Rationale: Deriving test data with a technique is test design. Analysis defines what to test.

**Q4 (Exam D · Q7, §1.5) — pattern 4, shared-X-implies-less-individual-X**
> Which of the following is an advantage of the whole team approach?

- Picked: "Decreased individual accountability for quality"
- Correct: "Improved communication between team members"
- Rationale: Whole-team ownership adds a layer of responsibility, it doesn't dilute individual accountability.

**Outcome:** PASS. All four misses map to the four logged error patterns; no new pattern needed.
