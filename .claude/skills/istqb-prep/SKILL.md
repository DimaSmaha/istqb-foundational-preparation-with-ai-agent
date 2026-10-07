---
name: istqb-prep
description: Stand up a full ISTQB certification-module study workspace — source extraction, per-section lessons, two-tier practice exams, the review loop, and a real-exam readiness gate — following the pattern the CTFL v4.0 run established.
disable-model-invocation: true
argument-hint: "Which ISTQB module? (e.g. 'CT-GenAI', 'CTFL v4.0')"
---

The user wants to prepare for an ISTQB certification exam through self-study in this
workspace. This skill is the orchestration layer: it sequences the whole pipeline and
defers the fiddly standards to reference files. It is **ISTQB-specific** — it assumes the
ISTQB document conventions (a syllabus PDF with numbered chapters and 2-/3-level learning
objectives tagged K1/K2/K3; one or more Sample Exam PDFs, each a Questions + Answers pair,
with every question LO-tagged in the Answers PDF; an official exam blueprint that weights
questions per chapter).

The worked reference implementation is **`topics/ISTQB Foundational Level/`** plus the
`istqb-quiz` and `istqb-recap` skills, both included in this repo. When any instruction here
is ambiguous, open the corresponding CTFL file and match it. If you've written a retrospective
from a previous module run, read it once before starting a new one — it's the fastest way to
carry lessons learned forward.

## Module name

Read the module from the argument (e.g. `CT-GenAI`). If missing or ambiguous, ask before
creating anything. Throughout this skill `<Module>` is the human-readable name the user
uses; the teach workspace is `topics/ISTQB <Module>/` and the source cache is
`cache/ISTQB/<Module>/`.

## Standing constraints (from the CTFL run — confirm they still hold, don't assume)

- **Sources only.** Content grounded only in the local syllabus + sample exam PDFs. No web
  search, no outside textbooks — this was a hard constraint from the user, not a default.
- **Don't auto-edit the user's personal notes.** Their raw study notes (e.g. a folder like
  `<Your Notes>/<Module>/`) and any "Questions to Agent" sections are theirs. Write one direct
  answer when a question is already sitting in the note; answer follow-ups in chat only. Shared
  analysis files (e.g. `my-error-patterns.md`, lesson-analysis write-ups) are fine to edit.
- **No Python** for ad-hoc extraction/parsing — use `pdftotext`, PowerShell, Bash, Node.

## The pipeline

### Phase 0 — Sources
The user drops the official PDFs into `cache/ISTQB/<Module>/` (syllabus + each Sample Exam's
Questions and Answers). Extract text and LO-tag every question.
→ **`references/source-extraction.md`** for the `pdftotext` fallback, page-offset
calibration, the column-shifted answer-key-table trap, and the LO-tagging procedure.

Also settle, and record in the workspace `NOTES.md`:
- the chapter list and the 2-level sections under each (this sets the lesson list);
- the official exam blueprint (questions per chapter) and pass mark;
- how many sample exams exist → whether a held-out set is possible (Phase 2).

### Phase 1 — Teach workspace
Create `topics/ISTQB <Module>/` following the `teach` skill's conventions (`MISSION.md`,
`RESOURCES.md`, `NOTES.md`, `lessons/`, `reference/`, `learning-records/`). Two ISTQB-
specific additions to the standard teach layout: an `exams/` directory (Phase 2) and a
`quiz-sessions/` directory (Phase 3).

- **Copy the asset kit.** `cp` this skill's `assets/{style.css,theme.js,quiz.js,exam.js}`
  into `topics/ISTQB <Module>/assets/` unchanged. These are portable and already correct —
  do not rewrite them. `theme.js` has one module-specific line (the `localStorage` key
  `istqb-foundational-theme`); rename it to `istqb-<module>-theme`.
- **One lesson per 2-level section** (§1.1, §1.2, …), not per 3-level LO. Build chapter by
  chapter across sessions, not all at once.
- **Heavy-verbatim syllabus phrasing** for definitions, lists, and key explanatory
  sentences; paraphrase only connective prose and original tables/diagrams/callouts.
- Each lesson pools a **curated representative subset** of its sections' LO-tagged questions
  (every sub-LO covered at least once). The full uncurated pool goes in the chapter exam.
→ **`references/lesson-html-standard.md`** for the page structure, the crumbs/footer
conventions, `lo-tag` spans, and the "Primary source: pages X–Y" citation.

### Phase 2 — Assessment (two tiers)
Both live in `topics/ISTQB <Module>/exams/`. Both use `exam.js` (submit-at-end).
→ **`references/exam-html-contract.md`** for the widget vocabulary, the page skeleton, the
`.exam-tag` format, grading behaviour, and the three hand-maintained count locations.

1. **Per-chapter practice exams** — `chapter-N-exam.html`, one per chapter. *Every*
   LO-tagged question for that chapter across *all* sample exams, no curation. `<h2 id>`-
   anchored by 2-level section so a run of wrong answers points straight at what to
   re-study. Authored (non-source) drill questions are tagged `Drill · <mode>`.
2. **Blueprint mock exams** — full-length papers weighted to the module's official
   blueprint, questions interleaved, reproduced verbatim from the sample exams. How many:
   enough to sit two or three real mocks. If `mock count × blueprint > question pool`, some
   questions must recur across papers — **state this in the exam footer and `NOTES.md`**, so
   a rising score isn't mistaken for pure improvement.
3. **Held-out set (do this if the pool allows).** Reserve a block of sample-exam questions
   that appear in *no* lesson, chapter exam, or mock — kept for one final clean-signal
   sitting near the end. Track which questions have been used where (an `exams/
   question-map.md` or similar) so the held-out block stays genuinely unseen. If only one
   sample exam exists, skip this — reproduce it standalone and don't fold it into the pool.
   A standalone replica is a whole ISTQB® document, not an extract: keep it for local study
   only and leave it out of anything you publish. Name it `*.local.html` (git-ignored) and,
   if a published page needs to point at it, ship a stand-in page that explains how to
   generate it, like `exams/0024-sample-exam-b.html` (see also the `footer.istqb-notice`
   rule in `references/lesson-html-standard.md`).

### Phase 3 — Review loop (per chapter, then per mock)
For each chapter, in order:
1. User studies the lessons and writes their own notes (e.g. in a personal notes folder
   like `<Your Notes>/<Module>/` — the exact location is up to the user; adapt the paths in
   this pipeline to wherever they keep it).
2. `/istqb-recap <N>` — build the pre-exam recap (their phrasing + explanation + missed-
   question cards + patterns-to-watch), inject any due drills into the chapter exam.
3. `/istqb-quiz <N>` — live chat readiness quiz on that chapter's error modes; ends with a
   yes/no verdict; logs append-only to `quiz-sessions/chapter-N-live-quiz-log.md`.
4. User sits `exams/chapter-N-exam.html`.
5. Misses fan out to records the user can review later: a narrative write-up in their own
   notes folder, a terse `learning-records/NNNN-*.md`, and a numbered `my-error-patterns.md`
   entry.
→ **`references/study-log-formats.md`** for all the log/record templates, the "analyze my
notes" checklist, and the live-quiz feedback rules.

Then, once all chapters are done, per mock sitting:
- Optionally a mock-style live quiz first (mixed chapters, **no per-question verdicts** —
  results table at the end).
- Sit the mock. Log to `quiz-sessions/mock-exam-attempt-log.md` (append-only, per-chapter
  breakdown, every miss mapped to a pattern number).

### Phase 4 — Readiness gate
Before the user books or sits the real exam, walk this checklist explicitly and give a
straight verdict:
- [ ] Every chapter exam at or above the target score.
- [ ] At least two full blueprint mocks passed with margin (not a bare pass).
- [ ] Every numbered error pattern drilled to reflexive — a recent live quiz on it produced
      no fresh miss on its own trap.
- [ ] No open "no drill authored yet" / TODO line left in any learning record.
- [ ] If a held-out set exists: one clean sitting on those never-seen questions.
- [ ] The exam-day habits are named and current in `my-error-patterns.md` (e.g. for the CTFL
      reference run, the expensive one was second-guessing away from a correct first pick).

If anything is unchecked, say so and name what to do about it rather than giving a soft
"you're probably fine".

## Related skills
- `istqb-quiz` — the live chat readiness quiz (Phase 3, step 3). CTFL-scoped today; a new
  module needs its own equivalent or a generalization — follow the same question-style and
  logging rules.
- `istqb-recap` — the pre-exam recap builder (Phase 3, step 2). Same note.
- `teach`, `teach-refactor`, `teach-dist` — the generic teaching-workspace skills this sits
  on top of.
