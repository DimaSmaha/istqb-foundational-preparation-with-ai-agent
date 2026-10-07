---
name: istqb-quiz
description: Run a live, interactive quiz drilling a chapter's known error patterns before the user sits that chapter's practice exam.
disable-model-invocation: true
argument-hint: "Which chapter? (e.g. 1)"
---

The user wants a live readiness check for an ISTQB Foundational Level chapter, before they open the real
`exams/chapter-N-exam.html`. This is a chat-based quiz session.

## Chapter number

Read the chapter number from the argument. If it's missing or ambiguous, ask which chapter before doing
anything else.

## Source material to read first

For chapter `N`, in `<workspace-root>/topics/ISTQB Foundational Level/`:
- `reference/chapter-N-recap.html`, if it exists — the "Patterns to watch for" section names that
  chapter's real error modes directly; the `.miss` cards show exactly which questions were missed and why.
- `learning-records/*.md` tagged for that chapter's sections — terser statements of the same patterns.
- `quiz-sessions/chapter-N-live-quiz-log.md`, if it exists — every question already asked in a prior live
  session for this chapter. Read it for two reasons: (1) never repeat a scenario logged there, and (2) use
  its entries as a style reference for writing new questions, alongside the exam file below.
- `exams/chapter-N-exam.html` — the official-sourced practice exam. Skim a handful of its
  `<div class="quiz">` items to recalibrate stem length, option count, and distractor construction before
  writing new questions — it's the most authoritative style reference available.
- If no recap page exists yet for this chapter, fall back to the raw notes and any personal lesson-analysis
  write-up you keep for that chapter, and consider proposing an `/istqb-recap` run (recap.html + a
  lesson-analysis pointer + missing drills) before quizzing, since the quiz works best once those patterns
  have been named.

## Question style

Write every question to feel like a real ISTQB exam item, not a tailored tutoring question:
- **Strict 4-option multiple choice, every time.** A short stem (1-3 sentences), then exactly 4 lettered
  options. No open-ended "explain your reasoning" prompts — the user answers with a letter.
- **Distractors must be plausible near-misses**, built the same way the official exam's are: term-swaps,
  scope inversions, or category mix-ups a half-prepared candidate would actually pick — not obviously-wrong
  filler.
- **Don't over-scaffold the scenario.** Don't add qualifying detail, hedges, or conditions that pre-resolve
  the trap for the reader. The real exam doesn't hold the candidate's hand — match that register.
- **Don't shape the scenario around this specific learner's known-correct instincts or prior phrasing.**
  Write for a stranger sitting the real exam, not a scenario tuned to this user's history.
- Fresh scenarios only — never reproduce a question already in the recap page, `exams/chapter-N-exam.html`,
  or `quiz-sessions/chapter-N-live-quiz-log.md`.

## Running the quiz

Drill the chapter's specific error modes (e.g. term-swaps, scope misconceptions, activity/category
boundary mix-ups, framing inversions — whatever that chapter's own recap/records actually documented). One
question at a time:
1. Ask a question (per "Question style" above) targeting one error mode.
2. Wait for the user's letter answer.
3. Say whether they're right and why before moving on — if they're wrong, explain using the same
   reasoning style as the recap (name the trap, not just the correct answer).
4. After 6-8 questions covering the chapter's distinct error modes, give a straight yes/no readiness
   verdict, and name which pattern(s), if any, still need another pass.
5. Point them to `exams/chapter-N-exam.html` as the next step once they're ready.

Don't turn this into a new lesson or written document mid-session — it's a spoken-style back-and-forth in
the chat. The log below is written once, after the quiz ends.

## Logging the session

After giving the readiness verdict (step 4 above), append this session to
`quiz-sessions/chapter-N-live-quiz-log.md` (create the file, and the `quiz-sessions/` directory, if this is
the first session for this chapter). Append only — never edit or delete a prior session's entry. Use this
structure for each question:

```
## Session — <date>

**Q1 (<error-mode>, §<section>)**
> <stem>
> A) ...
> B) ...
> C) ...
> D) ...

- Answer given: <letter>
- Verdict: Correct / Incorrect
- Rationale: <the trap named, not just the correct answer>

... (one block per question)

**Readiness verdict:** <yes/no, and which pattern(s) if any still need another pass>
```
