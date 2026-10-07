---
name: istqb-recap
description: Build the pre-exam chapter recap (exact-phrasing table + missed-question cards + drills) from a chapter's raw notes, lesson-analysis, and learning records.
disable-model-invocation: true
argument-hint: "Which chapter? (e.g. 1)"
---

Before the user sits a chapter's practice exam (`exams/chapter-N-exam.html`), build a recap combining
their raw notes with the accumulated mistake analysis for that chapter. This is a fixed three-deliverable
shape, reused chapter to chapter — don't re-derive the format from scratch, and don't invent new content;
everything comes from material that already exists.

## Source material to read first, in full

1. Raw study notes — wherever the user keeps their own per-chapter notes (e.g. `<Your Notes>/Chapter-N/*.md`)
   — the user's own phrasing. Preserve it close to verbatim (strip Obsidian `==highlight==`/`**bold**`
   markup to `<strong>`, but don't reword sentences).
2. The user's personal lesson-analysis write-up for that chapter, if they keep one (e.g.
   `<Your Notes>/lesson-analysis/Chapter N.md`, plus any per-topic deep-dive files) — narrative
   walkthroughs of *why* each wrong pick was tempting.
3. `topics/ISTQB Foundational Level/learning-records/000N-*.md` for that chapter — terse, pattern-level
   error modes. One record can span multiple raw-note misses across sections if it's the same underlying
   mistake (e.g. a recurring term-swap reflex).
4. `exams/chapter-N-exam.html` — the live exam file. Treat this as the source of truth for exact
   question/option wording; the raw notes often only quote a fragment or paraphrase while narrating. Match
   by exam tag (e.g. "Exam A · A3") to find the right `<div class="quiz">` block.

Read all four before drafting anything.

## Build procedure

1. For every miss the raw notes or lesson-analysis mention, look up its exact wording in the exam file
   (source #4 above) rather than trusting the raw note's paraphrase.
2. Group misses under the error mode their matching learning record already named — don't invent new
   categories or re-derive the pattern; the record did that analysis already.
3. Draft the HTML recap one syllabus section at a time. Write the section's callout (naming its error
   mode) *before* its table, so the table rows can be picked to actually illustrate that mode rather than
   just restating the syllabus. Table rows condense the raw notes' conceptual content — keep their
   wording, don't summarize it away. Miss-cards come from step 1's exact-text lookups.
4. Cross-check each learning record for an explicit "no drill authored yet" (or similar open TODO) — that
   is the signal a new drill question is due for that chapter, not a fresh decision each time. Design the
   new drill so it reproduces the *exact* documented trap (same swapped terms / same shared keyword / same
   boundary confusion), not just a generic new question on the topic.
5. Insert each new drill into the exam file immediately before the next section's `<h2>` (i.e. at the end
   of its own section's question block), tagged `Drill · <mode name>` (e.g. `Drill · Shared keyword`,
   `Drill · Activity boundary`) so it's visually distinct from real Exam A/C/D questions.
6. Update the three hardcoded count locations in the exam file by hand — `exam.js` grades/buckets
   dynamically and needs no changes, but these are plain text: the subtitle's "N questions" sentence, the
   `#exam-progress` element's initial "Answered 0/N", and the `nav.topic-index` per-section `(count)`
   labels.
7. Verify before calling it done: grep-count that opening/closing tags balance in the new HTML
   (`<div>`/`</div>`, `<table>`/`</table>`, `<tr>`/`</tr>`, `<td>`/`</td>`), confirm each new drill has
   exactly one `data-correct="true"`, and confirm the per-section counts in `topic-index` sum to the
   subtitle's total.

## The three deliverables

- **`topics/ISTQB Foundational Level/reference/chapter-N-recap.html`** — printable/dark-mode page, reusing
  `assets/style.css` + `assets/theme.js`. Per syllabus section: a callout naming that section's error
  mode, a two-column `<table class="recap-table">` (exact phrasing | explanation), then `.miss` cards per
  wrong question (✗ wrong pick / ✓ correct / why). Closes with a "patterns to watch for" summary. The
  `.recap-table`/`.miss` CSS classes live in the shared `assets/style.css` — reuse them, don't refork them
  per chapter.
- **A short sibling pointer next to the user's raw notes** (e.g. `<Your Notes>/lesson-analysis/chapter-N-recap.md`
  — `lesson-analysis/` is the user's own study material, separate from the `teach` skill's internal
  `learning-records/`). Links to the HTML as canonical, and points at the `istqb-quiz` skill
  (`/istqb-quiz N`) for the live readiness check rather than embedding a one-off prompt.
- **New drills in `exams/chapter-N-exam.html`** per step 4-6 above, whenever a learning record has an open
  TODO for that chapter.

## Why this exact shape

The user asked for "my exact phrasing, your descriptions to the right, and incorrect answers" specifically
so they can study from their own words rather than a rewritten summary — don't paraphrase the left column
away from what they actually wrote.

## Related

- `istqb-quiz` — the companion skill that runs the live chat-based readiness quiz using this recap's
  output, once it exists.
