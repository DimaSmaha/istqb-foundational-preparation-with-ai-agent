# Lesson-chapter HTML standard

The structure every `topics/ISTQB <Module>/lessons/NNNN-<sec>-<slug>.html` follows.
Canonical example: `topics/ISTQB Foundational Level/lessons/0001-1.1-what-is-testing.html`.
Filename: a 4-digit incrementing prefix, then the section number, then a dash-case slug
(`0012-4.2-black-box-test-techniques.html`).

## Page skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>1.1 What is Testing?</title>          <!-- just the section number + name -->
<link rel="stylesheet" href="../assets/style.css">
<script src="../assets/theme.js"></script>
</head>
<body>
<div class="page">

<nav class="crumbs">
  <span class="path">ISTQB <Module> &nbsp;·&nbsp; §1.1 &nbsp;·&nbsp; Lesson 1 of 5 (Ch. 1) &nbsp;·&nbsp;
  <a href="0002-....html">Next: 1.2 ... →</a> &nbsp;·&nbsp;
  <a href="../reference/glossary.html">Glossary ↗</a></span>
  <button class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode">☾ Dark</button>
</nav>

<h1>1.1 What is Testing?</h1>
<p class="subtitle">One or two sentences framing the lesson — what to unlearn, or the single win.</p>
<span class="lo-tag">FL-1.1.1 (K1) Identify typical test objectives</span>
<span class="lo-tag">FL-1.1.2 (K2) Differentiate testing from debugging</span>

<h2>Knowledge section heading</h2>
<p>... heavy-verbatim syllabus phrasing for definitions and lists ...</p>

<div class="callout"><strong>Misconception 1:</strong> ...</div>

<div class="compare">
  <div class="col accent">...</div>
  <div class="col">...</div>
</div>

<!-- reproduced exam questions as .quiz widgets — see exam-html-contract.md -->
<div class="quiz"> ... </div>

<footer class="lesson-footer">
  <div class="ask">If any of this is unclear, ask your teacher — that's what they're for.</div>
  Primary source: ISTQB CTFL Syllabus v4.0.1, pages 15–17.
  Next: <a href="0002-....html">§1.2 ... →</a>
</footer>

<footer class="istqb-notice">
  <p><strong>Copyright &amp; Attribution Notice.</strong> This page contains question extracts from the
  official ISTQB&reg; ... Sample Exams and wording from the ... Syllabus. Sources: ...</p>
  <p>All questions, answers, and syllabus structures are copyrighted by the International Software Testing
  Qualifications Board (ISTQB&reg;). All rights reserved. The authors and ISTQB&reg; are acknowledged as
  the source and copyright owners. Extracts, for non-commercial use, from this document may be copied if
  the source is acknowledged. ... non-commercial, educational use ...</p>
  <p>Unofficial study aid &mdash; not affiliated with, endorsed by, or accredited by ISTQB&reg;. ...</p>
</footer>

</div>
<script src="../assets/quiz.js"></script>
</body>
</html>
```

## Rules

- **`<head>`** links `../assets/style.css` and `../assets/theme.js` only. `<title>` is the
  section number + name, nothing more.
- **`body > div.page`** wraps everything. `style.css` handles max-width, print, dark mode.
- **`nav.crumbs`** — one `span.path` with ` · `-separated crumbs (module name, section
  number, "Lesson N of M (Ch. X)", a Next/Prev link, a Glossary link) and the
  `button.theme-toggle[data-theme-toggle]`. Keep the forward/back links accurate as
  chapters are added — the last lesson of a chapter links to the first of the next.
- **`h1`** = section number + name. **`p.subtitle`** = the framing sentence(s).
- **`span.lo-tag`** — one per learning objective the lesson covers, format
  `<LO code> (<K-level>) <verb phrase from the syllabus>`.
- **`h2` knowledge sections** — the taught content. Use `.callout` for
  misconceptions/warnings/asides and `.compare` (two `.col`, one `.accent`) for
  side-by-side contrasts. These classes are all in the shared `style.css` — never refork
  them per lesson.
- **Phrasing:** definitions, lists, and key explanatory sentences stay near-verbatim to the
  syllabus (exam wording tracks the syllabus). Paraphrase is fine for connective prose and
  for original comparison tables / diagrams / callouts built as teaching scaffolding.
- **Reproduced questions** are `.quiz` / `.quiz-multi` widgets (see
  `exam-html-contract.md`), each with an `.exam-tag` naming its source
  (`Exam A · Q1 · FL-1.1.1 · K1`). A lesson carries a *curated* subset — every sub-LO under
  the section covered at least once — not the full pool.
- **`footer.lesson-footer`** — a `.ask` reminder that the agent is their teacher and can
  re-explain anything, the **"Primary source: <doc>, pages X–Y"** citation (calibrated
  physical pages — see `source-extraction.md`), and a forward link to the next lesson.
- **`footer.istqb-notice`** (required on every lesson, exam and reference page, last thing
  inside `div.page`) — the ISTQB® Copyright & Attribution Notice. ISTQB®'s conditions of use
  only allow non-commercial *extracts* when the source is acknowledged, so the footer must
  name every source document the page draws from, with version (the syllabus, plus each
  Sample Exam set that appears in the page's `.exam-tag`s), credit the authors and ISTQB® as
  source and copyright owners, state non-commercial educational use, and carry the
  "unofficial / not affiliated" + trademark line. Link to the repo's `NOTICE.md` and the
  official istqb.org download page. Never reproduce a whole sample exam as one page in its
  original order — regroup extracts by learning objective.
- **Script:** lessons load `../assets/quiz.js` (instant per-click feedback + "Copy for
  notes"). Exams load `../assets/exam.js` instead. Never both.

## Reference documents that sit alongside lessons

- **`reference/glossary.html`** — every chapter's keywords, extended chapter by chapter as
  lessons are built. Once a term is defined here, every lesson uses that exact wording.
- **`reference/chapter-N-recap.html`** — the pre-exam recap, built by `/istqb-recap` (not
  by hand). See `study-log-formats.md`.
