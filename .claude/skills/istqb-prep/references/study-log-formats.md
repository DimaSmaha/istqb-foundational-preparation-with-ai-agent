# Study-log formats

Every record the review loop produces, with its template. Canonical examples live in
`topics/ISTQB Foundational Level/` and `ISTQB-PREPS/lesson-analysis/`.

Two folders that look like they compete but don't:
- **`ISTQB-PREPS/<Module>/` and `ISTQB-PREPS/lesson-analysis/`** — the **user's** study
  material. Their raw notes, the narrative error analysis, the numbered pattern list.
- **`topics/ISTQB <Module>/learning-records/` and `quiz-sessions/`** — the **agent's**
  working memory and append-only transcripts.

---

## A miss fans out to three records

When the user brings a wrong answer from a chapter, exam, or mock:

### 1. Narrative — `ISTQB-PREPS/<Module>/lesson-analysis/Chapter N.md`
Running log, one block per section. Prose: *why the wrong option was tempting*, tied to
what the user already knew. When one subtopic needs more room, spin a deep-dive file next
to it (`N.N-topic.md`) and link it from the block.

```
## N.N
<2–4 sentences: what the wrong pick swapped / over-scoped / mis-attributed, and the
anchor that resolves it. Reference the user's own note phrasing where it shows they
already had the fact — the gap is usually application, not knowledge.>

Pattern to watch: <the reusable trap>. <Whether it's a settled pattern or a first instance.>
```

### 2. Terse pattern — `topics/ISTQB <Module>/learning-records/NNNN-<dash-name>.md`
4-digit incrementing prefix. The error mode at pattern level, for the agent to judge what
to drill. One record can span several misses if the underlying mistake is the same.

```
# <One-line title naming the error mode>

<What was missed and where (section, question, real exam vs. practice). What the user
explicitly said if they self-flagged.>

<The method / anchor now established, in 2–3 sentences.>

**Implications:** <related records ([[0004-...]]), cross-ref to my-error-patterns.md
pattern number, and — if a drill question is owed — an explicit "no drill authored yet".>
```

### 3. Numbered drill entry — `ISTQB-PREPS/lesson-analysis/my-error-patterns.md`
The drill generator. The file opens with a header explaining how to invoke it
("quiz me on my error patterns", "drill patterns 3, 16, 30"). Append a new numbered entry,
blank line between entries:

```
**N. <Short name> (§X.Y):** <the misconception, the wrong pick, the correct answer, and
the anchor rule — enough to regenerate a question that baits the exact wrong pick>.
```

Keep the user's own phrasing where they've given it. This file has copy/paste artifacts
(non-breaking spaces around some `_italic_` markers) — **read it fresh before every edit**,
don't build an exact-string edit from a stale read.

---

## Full mock sittings — `topics/ISTQB <Module>/quiz-sessions/mock-exam-attempt-log.md`

Append-only. Never edit a prior entry.

```
## Attempt <n> — <Mock name> (`<file>`) — <date>

**Score: X/40 — NN% (need NN% to pass) — PASS/FAIL.** <one line of context>

| Chapter | Score |
|---|---|
| 1 — ... | 7/8 (88%) |
...

<count> misses — <one-line shape>. <How many are known-pattern recurrences vs. new.>

### Miss <k> — ch<c> · <exam-tag> — <one-line topic>

> <question stem, quoted>

- **Picked:** <option>
- **Correct:** <option> — <why>
- **Maps to → pattern <n> (<name>, §X.Y).** <recurrence / refinement / NEW pattern <n>.>

### Takeaways
- <what passed cleanly, what's the weak block>
- **Priority before the next mock:** <numbered list>
```

## Live quiz sessions

Written by the `istqb-quiz` skill itself, append-only, one file per chapter:
`quiz-sessions/chapter-N-live-quiz-log.md`. Purpose: (1) never repeat a logged scenario,
(2) a calibrated style reference for future questions.

```
## Session — <date>

**Q1 (§1.1)**
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

Mixed-chapter "mock-style" live quizzes get their own file
(`quiz-sessions/mock-exam-live-quiz-log.md`) and a different rule — see below.

---

## Live-quiz rules (carried over from the CTFL run)

- **No pattern label in the visible question header.** `Q1 (§1.1)` — the section number
  only. Naming the trap ("verify/validate term-swap") gives away what to watch for before
  the user reads the scenario. Track the targeted error mode privately.
- **Chapter-scoped `/istqb-quiz`:** right/wrong + rationale after *each* question.
- **Mock-style (mixed chapters):** **no per-question verdicts** — ask the next question and
  move on; save every verdict and rationale for a results table at the end, like a real
  submit-at-end exam. On a single miss in an otherwise strong session, one quick same-
  subtopic confirmation question right after the results table is reasonable.
- **4-option multiple choice, every time.** Distractors are plausible near-misses built the
  way the official exam builds them (term-swaps, scope inversions, category mix-ups) — not
  filler. Don't over-scaffold the scenario, and don't shape it around this user's known-
  correct instincts or prior phrasing. Fresh scenarios only.
- **Distractors can be deliberate.** Don't teach "everything stated in a question must be
  applied" — some ISTQB question types (multi-flow root-cause chains) include information
  that is a distractor to be recognized and discarded. Frame it as: check whether the
  scenario actually satisfies the rule's trigger condition.

---

## "Analyze my notes" — the lesson-review checklist

When the user asks to analyze a chapter note right after finishing it, run **all** of these,
not just the `***` scan:

1. Read the chapter note end to end — know what sections it actually has.
2. Read the linked source lesson HTML (`[[NNNN-...html]]` at the top) — ground truth.
3. Verify every `***bold italic***` span against that source — these are active-recall
   claims typed from memory; confirm or correct each individually.
4. Check `### Questions to Agent` for anything written there — direct questions to answer.
5. Check `### QUIZ Results` for `✗ Picked` / `✓ Correct` entries — already-documented wrong
   answers, usually the highest-signal mistake in the note. Don't skip them because they
   aren't `***`-marked.
6. Cross-reference `my-error-patterns.md` and the chapter's lesson-analysis file — say where
   a finding traces back to (or fixes) an existing entry.
7. Report a clean pass plainly if nothing is wrong — don't manufacture issues.
8. If logging a new pattern, append it to `my-error-patterns.md` per the format above.

## Note-editing boundary

Write to the user's personal `ISTQB-PREPS/<Module>/` note only for (a) the initial direct
answer to a question already sitting in the note, or (b) something they explicitly ask to be
added. Follow-up clarifications, "does this sound right?" checks, iterative refinement —
answer in chat only. `my-error-patterns.md` and the lesson-analysis files are shared
analysis, not "their note" — edits there are expected.
