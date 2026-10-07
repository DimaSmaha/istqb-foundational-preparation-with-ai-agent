# Source extraction & question sourcing

How the official ISTQB PDFs become usable text, and how questions get LO-tagged.

## Cache layout

```
cache/
  .gitignore                    # contents: /*  then  !/.gitignore  — ignores everything but itself
  ISTQB/
    <Module>/
      <Module>-Syllabus-vX.Y.pdf
      <Module>_Sample-Exam-A-Questions_vX.Y.pdf
      <Module>_Sample-Exam-A-Answers_vX.Y.pdf
      ...  (B, C, D as available)
      extracted-text/           # git-ignored (whole cache/ is)
        syllabus_paged.txt
        <exam>_Questions.txt
        <exam>_Answers.txt
```

The copyrighted source never enters git — everything under `cache/` is ignored. The user
drops the PDFs in; this skill only reads them.

## Getting text out of a PDF

1. **Try the `Read` tool first** — it can render PDF pages as images when `pdftoppm` is
   installed.
2. **If `pdftoppm` is not installed** (it was not, for the CTFL run — check with
   `pdftoppm -v`), fall back to `pdftotext` (present via Git's mingw64 bin even without
   `pdftoppm`):
   - `pdftotext -layout <file> - > extracted-text/<name>.txt` — for syllabus prose and
     exam question text. Preserves columns and tables reasonably.
   - `pdftotext -raw <file> - > extracted-text/<name>_raw.txt` — for the **Answers PDFs'
     per-question narrative rationale blocks**, which `-layout` garbles (they're set in
     two columns). Use `-raw` output for those, `-layout` for everything else.
3. **Never use Python** for this — `pdftotext` / PowerShell / Node only.
4. If a PDF genuinely can't be read even after the fallback, stop and tell the user — don't
   "verify" content against a source that was never actually read.

## Page-offset calibration (do this once per document, per run)

The page number printed on a syllabus page is usually **not** the physical page index a PDF
viewer or extraction reports — front matter (cover, TOC, revision history) shifts it.

- Extract a plausible range, locate an actual section header (e.g. "3.1. Static Testing
  Basics"), and compute `printed page → physical page` offset.
- Reuse that one offset for the rest of the run instead of recalibrating per lesson.
- For the CTFL v4.0.1 syllabus the offset was **zero** (printed = physical). Do not assume
  that for another module — recompute it.
- The lesson's "Primary source: pages X–Y" citation uses **printed** page numbers (what the
  user sees if they open the PDF to that page).

## LO-tagging every question

Each sample-exam question carries a Learning Objective code (`FL-4.2.2`, `CT-3.1.1`, …) and
a K-level (K1/K2/K3) in its Answers PDF. This is the join key: a lesson for §4.2 pulls every
question tagged `FL-4.2.x` across all sample exams; a chapter exam pulls every `FL-4.x`.

- **Source of truth = the per-question narrative rationale blocks** in the Answers PDF
  (the paragraphs that explain each option for question N).
- **Do NOT use the summary "Appendix: Answer Key" / per-chapter tables.** They extract with
  a column/row misalignment under `pdftotext` — it looks like an off-by-one between the
  question number and its LO/answer/K-level. This bit the CTFL run repeatedly; every recheck
  log entry notes it.
- **Questions PDF vs Answers PDF wording drift is real.** When an option's text differs
  between the two documents (CTFL Sample Exam C·Q17, A·A10), reproduce the **Questions PDF**
  wording — that's what a candidate sees on the exam. The correct-answer letter, LO, and
  K-level are still taken from the Answers PDF.

## What to settle before building lessons

Record in `topics/ISTQB <Module>/NOTES.md`:
- the chapter list and every 2-level section (this is the lesson list, one lesson each);
- the official exam blueprint — questions per chapter — and the pass mark;
- how many sample exams exist, and therefore whether a held-out never-seen set is viable;
- the calibrated page offset for the syllabus PDF.
