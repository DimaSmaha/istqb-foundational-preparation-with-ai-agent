---
name: teach-refactor
description: Recheck and fix a range of lessons in an existing /teach topic against its primary sources - factual accuracy, phrasing conventions, and quiz correctness - editing lesson files directly and logging the recheck in NOTES.md.
disable-model-invocation: true
argument-hint: "topic name and lesson/section scope, e.g. \"ISTQB Foundational Level, Chapter 1 (lessons 0001-0005)\""
---

This skill takes a topic already built via the `teach` skill — living at `<workspace-root>/topics/{Topic Name}/`
(from this skill's directory the relative path is `../../../topics/`) — and rechecks a specified range of
its lessons against that topic's own primary sources. It fixes what's objectively fixable directly, and
flags the rest for the user's judgment.

## Input

The argument should give a topic name and a scope (a chapter, a section range, or explicit lesson
numbers). If either is missing or ambiguous, list the folders under `<workspace-root>/topics/`, then list
that topic's `lessons/` files, and ask.

Resolve scope to a concrete lesson-file list using both the `NNNN-` numeric prefix on each filename
*and* the topic's own chapter/section grouping as recorded in `NOTES.md` — don't assume a chapter
boundary purely from filename patterns, since different topics may number sections differently.

## 1. Load the topic's conventions before touching anything

Read, in full:
- `MISSION.md` — the grounding sources and any hard constraints (e.g. "no web search — content must
  be grounded only in X/Y/Z").
- `NOTES.md` — locked decisions, any recorded phrasing convention, and the progress log.
- `RESOURCES.md` — the primary-source documents and how questions/facts are tagged back to them.
- `./assets/*` — the shared HTML/CSS/JS contract every lesson must keep working (quiz widgets, drills,
  theme toggle). Read the actual JS, don't infer the markup contract from one lesson alone.
- `./reference/*.html` if present — treat as a phrasing authority alongside `NOTES.md`.

This step is deliberately generic — assume nothing about the topic's domain, only that these files exist
in these roles per the `teach` convention.

## 2. Locate and calibrate primary-source page ranges

For each source document `MISSION.md`/`RESOURCES.md` designates as authoritative:

- If the source is a PDF, check whether this environment's `Read` tool can render PDF pages
  (`pdftoppm`-backed). If it can't, fall back to extracting text with `pdftotext -layout <file> -` (present
  on this machine via Git's mingw64 bin even when `pdftoppm` isn't installed) and work from the text
  output instead of aborting.
- Printed page numbers inside a document often differ from a PDF viewer's physical page index (covers,
  TOC, revision history shift the offset). Before trusting an existing "primary source: pages X–Y" citation
  already in a lesson, do a short calibration pass: extract a plausible page range, locate the actual
  section headers/TOC, and compute the printed → physical offset. Reuse that offset for the rest of the
  run instead of recalibrating per lesson.
- If a source can't be read for environment reasons even after the fallback, stop and surface it to the
  user immediately — don't proceed to "verify" content against a source that was never actually read.

## 3. Content-accuracy pass

Lesson by lesson, re-derive each claim (definitions, list contents/completeness/order, named
counts/figures, causal chains, the "Primary source" page citation itself) directly against the calibrated
source text. Fix factual errors, dropped or invented list items, and stale page citations. Also flag (don't
silently keep) any claim in a lesson that isn't traceable to the primary source at all — it may be accurate
domain knowledge, but the point of this pass is source-grounding, not general correctness.

## 4. Terminology / phrasing pass

Read whatever phrasing convention is actually recorded in *this* topic's `NOTES.md` — don't assume a
specific wording; a different topic may record something else, or nothing at all. If the convention calls
for near-verbatim source phrasing and some lessons in scope predate that convention, rewrite
definitions, lists, and key explanatory sentences toward the source's own wording — using an
already-compliant lesson elsewhere in the same topic as a structural/voice reference. Leave connective
prose, callouts, comparison tables, and diagrams as paraphrased teaching scaffolding; the shift is
specifically about definitions and key facts, not the whole lesson. Cross-check any rewritten term
against `./reference/*.html` if a glossary exists. If the convention is ambiguous for a specific case, flag
it rather than guess.

## 5. Quiz cross-verification pass

Treat this as a full recheck, not a spot check. For every quiz/drill widget in scope, read its
source-question tag and open the calibrated pages of the matching source (e.g. a Questions PDF and its
Answers PDF). Confirm the question wording, every option's wording, the correct-answer selection(s),
the rationale, and any LO/K-level tag all match the source. Fix any mismatch in place while strictly
preserving the widget markup contract read in step 1 (e.g. a `data-correct`/`data-why` button contract, a
multi-select wrapper's `data-correct="a,e"` + checkbox `value`s, a drill's pipe-separated `data-answer`).

## 6. Edit policy

Direct-edit anything objectively checkable against the primary source: factual errors, wrong citations,
quiz mismatches, phrasing that doesn't match a clearly-recorded convention. Flag instead of editing
when: the right choice is a pedagogical/stylistic judgment call, `NOTES.md` is silent or ambiguous on the
case, a source document's version appears to have drifted from what `NOTES.md`/`RESOURCES.md`
recorded, or a fix would require touching shared `assets/*` in a way that could affect lessons outside
the current scope.

## 7. Update NOTES.md

Never silently overwrite a locked decision — add a new dated entry that explicitly supersedes the old
one (referencing it), leaving the original text intact. Append a dated recheck-log entry recording scope,
sources used (with versions), and a summary of what changed or was flagged, so a future rerun of this
skill knows what's already been verified.

## 8. Final report

Close with a chat report (not a written file): topic, scope, and sources+versions used, then a per-lesson
breakdown of **Verified / Fixed / Flagged** items, then a closing summary (edit count, flag count,
confirmation `NOTES.md` was updated). If any lessons render interactive widgets, open one or two edited
lessons in the browser to confirm the check/reveal interactions still work — a text edit can silently
break a JS widget's class/attribute matching without throwing any error.
