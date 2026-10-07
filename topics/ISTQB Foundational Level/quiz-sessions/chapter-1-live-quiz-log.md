# Chapter 1 — Live Quiz Log

> Example log, written by the `/istqb-quiz` skill after each live session. Append-only — a new session is
> added to the bottom, prior sessions are never edited or deleted.

## Session — 2026-01-05

**Q1 (verify/validate term-swap, §1.1)**
> A tester confirms that the software meets the documented requirements by running a set of pre-defined
> test cases. Which term best describes this activity?
> A) Validation
> B) Verification
> C) Static testing
> D) Regression testing

- Answer given: A
- Verdict: Incorrect
- Rationale: "meets the documented requirements" is the verification definition — checking against a
  specification. Validation checks whether the software meets the user's actual needs, which isn't what
  this scenario describes. This is the same verify/validate swap flagged in learning record 0001.

**Q2 (defect/failure term-swap, §1.2)**
> A program crashes when a user enters a negative number into a field expecting a positive one. What is
> this crash an example of?
> A) An error
> B) A defect
> C) A failure
> D) A risk

- Answer given: C
- Verdict: Correct
- Rationale: The observable, external mis-behavior (the crash) is a failure. The underlying code flaw that
  caused it would be the defect; the human action that introduced the flaw would be the error.

**Readiness verdict:** Not yet — the verify/validate swap from Q1 is still live. Recommend one more pass on
learning record 0001 before sitting `exams/chapter-1-exam.html`.
