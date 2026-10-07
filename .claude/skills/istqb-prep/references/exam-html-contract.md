# Exam HTML / JS contract

The markup contract shared by `assets/quiz.js` (lesson mode) and `assets/exam.js` (exam
mode). Question content is written **once**; only the `<script>` at the bottom of the page
decides the interaction. Canonical examples: any file in
`topics/ISTQB Foundational Level/exams/`.

- **Lesson mode** (`quiz.js`): instant feedback on every click, a "Copy for notes" button,
  re-clickable to explore wrong options.
- **Exam mode** (`exam.js`): nothing graded or revealed until **Submit**; a timer that
  starts on the first answer; an unanswered-question warning; a per-topic score breakdown;
  65% (or the module's) pass line; a Retake button.

Do not edit `quiz.js` / `exam.js` per module — copy them in verbatim. If a genuine bug is
found, fix it in this skill's `assets/` copy *and* note it, so the CTFL reference copy and
this one don't silently diverge.

---

## Widget vocabulary (both modes)

### Single-answer multiple choice
```html
<div class="quiz">
  <div class="exam-tag">Exam A · Q1 · FL-1.1.1 · K1</div>
  <div class="q">Question stem.</div>
  <ul class="options">
    <li><button data-correct="false" data-why="Why this option is wrong.">Option text</button></li>
    <li><button data-correct="true"  data-why="Why this option is right.">Option text</button></li>
    <li><button data-correct="false" data-why="...">Option text</button></li>
    <li><button data-correct="false" data-why="...">Option text</button></li>
  </ul>
  <div class="feedback"></div>
</div>
```
- Exactly one `data-correct="true"`.
- `data-why` on **every** option — it's shown as the rationale in both modes. For source
  questions, use the official ISTQB justification, trimmed of any "Is correct." /
  "Is not correct." lead-in.
- 4 options is the ISTQB norm. Keep option texts close to the same length — don't let
  formatting leak the answer.

### Multi-select ("select TWO")
```html
<div class="quiz-multi" data-correct="a,e" data-why="Combined rationale for the correct set.">
  <div class="exam-tag">Exam D · Q20 · FL-4.2.1 · K3</div>
  <div class="q">Question stem. (Select TWO options)</div>
  <ul class="options">
    <li><label><input type="checkbox" value="a"> Option a</label></li>
    <li><label><input type="checkbox" value="b"> Option b</label></li>
    ...
  </ul>
  <div class="feedback"></div>
</div>
```
- `data-correct` on the wrapper is a comma-list of the correct `value`s.
- In **lesson mode** a `<button class="check-multi">` inside the widget triggers grading.
  In **exam mode** `exam.js` strips any `.check-multi` (grading is global) — so a widget can
  carry the button and still work in an exam page.
- If the source question is actually single-choice among pre-combined answers ("a: i,iv /
  b: ii,v / ..."), use a plain `.quiz`, **not** `.quiz-multi`.

### Type-the-word recall drill (lesson mode only)
```html
<div class="drill" data-answer="deployed|deploy">
  <div class="q">The build is ___ to the test environment.</div>
  <input type="text"><button class="check">Check</button>
  <div class="result"></div>
</div>
```
`data-answer` is a `|`-separated list of accepted answers (compared lower-cased,
whitespace-collapsed).

### Reveal button (lesson mode)
```html
<button class="reveal-btn" data-target="#answer-3">Show answer</button>
<div id="answer-3" class="revealable">...</div>
```

### Term-match widget (lesson mode)
```html
<div class="match">
  <div class="terms"><button class="term" data-pair="1">Term</button> ...</div>
  <div class="defs"><button class="def" data-pair="1">Definition</button> ...</div>
  <div class="match-status"></div>
</div>
```
Matching `data-pair` values on a term and a def make a correct pair.

---

## The `.exam-tag` format

`<source> · <question id> · <LO code> · <K-level>`, e.g. `Exam A · Q1 · FL-1.1.1 · K1`,
`Exam C · A16 · FL-4.3.2 · K2`. For authored (non-source) questions:
`Drill · <mode name>`, e.g. `Drill · Spot the swap`, `Drill · Activity boundary`. The tag
is how `/istqb-recap` and `/istqb-quiz` find the exact source wording, and how `exam.js`
buckets a question by chapter when there's no section header.

---

## Exam page skeleton (exam mode)

```html
<head>
  <meta charset="UTF-8">
  <title>Chapter 1 Practice Exam — Fundamentals of Testing</title>
  <link rel="stylesheet" href="../assets/style.css">
  <script src="../assets/theme.js"></script>
</head>
<body>
<div class="page">

  <nav class="crumbs">... back-to-lessons / recap / glossary links + theme toggle ...</nav>

  <h1>Chapter 1 Practice Exam — Fundamentals of Testing</h1>
  <p class="subtitle">... "34 questions, 65% pass, submit-at-end" ...</p>

  <div id="exam-submit-bar" class="exam-submit-bar">
    <span id="exam-progress" class="exam-progress">Answered 0/34</span>
    <span id="exam-timer" class="exam-timer">Time: 00:00</span>
    <span id="exam-warning" class="exam-warning" hidden></span>
    <button id="btn-submit-exam" class="btn-submit-exam" type="button">Submit Exam</button>
    <button id="btn-retake-exam" class="btn-retake-exam" type="button" hidden>Retake Exam</button>
  </div>

  <!-- chapter exams only: a jump index -->
  <nav class="topic-index">
    <a href="#s1-1">1.1 What is Testing? (6)</a>
    <a href="#s1-2">1.2 Why is Testing Necessary? (5)</a>
    ...
  </nav>

  <h2 id="s1-1">1.1 What is Testing?</h2>
  <div class="quiz"> ... </div>
  <div class="quiz"> ... </div>
  <h2 id="s1-2">1.2 Why is Testing Necessary?</h2>
  ...

  <div id="exam-results" class="exam-results" hidden>
    <h2>Results</h2>
    <div id="exam-score-summary" class="exam-score-summary"></div>
    <table class="topic-breakdown">
      <thead><tr><th>Topic</th><th>Score</th></tr></thead>
      <tbody id="topic-breakdown-body"></tbody>
    </table>
  </div>

  <footer class="lesson-footer">
    <div class="ask">If your score lands below the pass mark, re-study the whole section
    (via the section number in each exam-tag), then retake just that section's questions.</div>
    ...
  </footer>

  <footer class="istqb-notice"> ... </footer>  <!-- required — see lesson-html-standard.md -->

</div>
<script src="../assets/exam.js"></script>
</body>
</html>
```

### Required IDs (exam.js looks these up by id)
`#exam-submit-bar`, `#exam-progress`, `#exam-timer`, `#exam-warning`, `#btn-submit-exam`,
`#btn-retake-exam`, `#exam-results`, `#exam-score-summary`, `#topic-breakdown-body`. Missing
ones degrade gracefully (the feature just doesn't appear) — but the submit/retake buttons
and the results container are load-bearing.

---

## Grading behaviour (exam.js)

- **Submit-at-end.** Nothing is graded or revealed until `#btn-submit-exam` is clicked.
- **Unanswered guard.** First submit with blanks shows `#exam-warning` ("You have N
  unanswered…"); a second click grades anyway.
- **Timer** starts on the first answer selection, ticks `mm:ss` in `#exam-timer`, freezes at
  submit, resets on Retake.
- **Score** = correct / total, as a percentage, against a 65% pass line (change the literal
  in `exam.js` `gradeAll` and in the page's copy if the module's mark differs). A skipped
  question grades as wrong and its feedback shows the correct answer.
- **Per-topic breakdown.** Each question is bucketed under its nearest preceding
  `<h2 id>` (chapter exams). Pages with no section headers (the mixed-order mocks) fall back
  to bucketing by chapter digit parsed from the `.exam-tag` — `exam.js` matches `/FL-(\d)/`
  and carries a `chapterNames` map. **For a non-FL module, widen that regex** (e.g.
  `/(?:FL|CT)-(\d)/`) and replace `chapterNames` in this skill's `assets/exam.js` copy. Each
  bucket row links back to its `#anchor`.
- **Retake** re-enables everything, clears feedback and the timer, hides results.

## The three hand-maintained counts

`exam.js` grades and buckets dynamically, but these three are plain text and must be updated
by hand whenever questions are added or removed:
1. the subtitle's "N questions" sentence;
2. `#exam-progress`'s initial `Answered 0/N`;
3. the `nav.topic-index` per-section `(count)` labels — and their sum must equal N.

After editing an exam, verify: opening/closing tags balance
(`<div>`/`<table>`/`<tr>`/`<td>`), every `.quiz` has exactly one `data-correct="true"`,
every `.quiz-multi` `data-correct` list matches real checkbox `value`s, and the topic-index
counts sum to the subtitle total.
