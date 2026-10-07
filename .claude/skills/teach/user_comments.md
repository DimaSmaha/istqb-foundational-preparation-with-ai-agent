# My Personal Notes for the Teach Skill

Personal adjustments and preferences that shape how this skill should behave for me.

> This file is an **example**. Copy this structure and replace the content below with your own
> preferences — the point of `user_comments.md` is that it's yours, read fresh every session, and it
> overrides the skill's defaults. Nothing here is required; delete any section that doesn't apply to you.

---

## Resource Acquisition

There are three ways I provide resources, and the skill should handle each differently:

1. **I give you links directly** — I will paste specific URLs into the chat. You are allowed to fetch and use them. Trust them; don't search for alternatives.

2. **I give you nothing** — No links, no file. In this case, use WebSearch to find relevant, high-quality resources on the topic yourself before building the lesson.

3. **I drop a big file with many links** — I will paste or attach a file containing a list of links. You must filter that list down to only the ones relevant to the current topic before using them. Discard anything off-topic.

## Dark Mode for Lessons

Starting with the next new lesson built in any topic (existing lessons don't need to be retrofitted unless I ask), every lesson must ship with a light/dark mode toggle. Build it once per topic as shared assets, not inline per-lesson:

- **CSS**: in the topic's `assets/style.css`, keep the existing light palette as the default `:root` variables, then add a `:root[data-theme="dark"]` block that overrides the same variable names (`--paper`, `--ink`, `--ink-soft`, `--accent`, `--accent-soft`, `--rule`, `--code-bg`, `--code-fg`, etc.) with a dark palette. Don't hardcode colors outside these variables in new components — always reference the custom properties so dark mode covers them for free.
- **Toggle control**: a small button/switch placed in the `nav.crumbs` area (top of the lesson, near the breadcrumbs), labeled clearly (e.g. "☀︎/☾" or "Light/Dark"). Same markup on every lesson so it comes from a shared partial pattern, not reinvented each time.
- **JS**: a shared `assets/theme.js` (one file, reused across all lessons in the topic) that:
  - On load, checks `localStorage` for a saved preference; if none, falls back to `prefers-color-scheme: dark`.
  - Sets `data-theme="dark"|"light"` on `<html>`.
  - Toggle button click flips the attribute and saves the choice to `localStorage` so it persists across lessons (use one shared storage key per topic, so the choice follows the user through the whole course, not just one page).
- **Print**: keep the existing `@media print` rules forcing light colors regardless of the active theme, so printouts stay ink-friendly.
- Apply this to every topic going forward — it's a course-wide convention, not one-topic-specific.

## End-of-Chapter Handoff Prompts

Some topics are organized into large multi-session chunks — chapters, parts, units — each containing
several lessons, built one chunk per session (e.g. a certification syllabus's chapters). For these
topics, don't wait to be asked for a handoff/compact prompt at the end of a chunk. As soon as a chunk's
lessons are fully built, its reference docs (e.g. glossary) are extended, and `NOTES.md`'s Progress section
is updated, proactively produce the next chunk's self-contained handoff prompt as plain text in that same
reply — no separate request needed, and no tool calls in that reply, just the prompt itself ready to paste
into a fresh session.

Structure the handoff prompt the same way each time:
- Workspace paths, and which reusable assets (stylesheet, theme toggle, quiz/widget components) to reuse
  rather than rebuild
- Reference-doc terms expected for the next chunk (sourced from the material's own keyword/glossary list,
  not guessed from memory)
- Source material locations/page ranges for the next chunk, plus any tool-usage caveats already discovered
  (e.g. PDF `pages` parameter errors)
- Locked-in decisions carried forward unchanged (lesson numbering scheme, pacing, verbatim-vs-paraphrase
  style, anything explicitly deferred)
- The concrete task list for the next session (extract source questions/material, write lessons, extend
  references, fix the previous lesson's forward link, update `NOTES.md`, open the first new lesson for
  review)

Only trigger this for topics that are actually chunked into chapters/parts spanning multiple sessions —
a single-session topic finishing normally doesn't need one.

## Note Review Flow (mistakes/questions intake)

Separate from the default "build a lesson" flow: sometimes I drop a note for a topic containing a mix
of my own restated notes, explicit questions to you, and quiz results (correct/incorrect, with the
exam's rationale). When that happens, follow this loop rather than treating it as a request for a new
lesson:

1. **Learning points** — identify genuinely non-obvious mistakes or misconceptions (not just "material
   that was covered") and write them to that topic's `learning-records/NNNN-slug.md`, per
   `LEARNING-RECORD-FORMAT.md`. Look for the *pattern* behind multiple mistakes (e.g. a recurring
   term-swap error mode) rather than logging every wrong answer as its own record.
2. **Answer questions** — directly answer any explicit questions the note raises. If a quiz explanation
   is flagged as not having "clicked," re-explain it a different way rather than repeating the original
   rationale.
3. **Personal review note** — write a plain-text summary of the mistake analysis to a folder placed as a
   *sibling* to wherever you keep your own raw notes for that topic — not inside the `teach` skill's
   internal `topics/{Topic}/` workspace (e.g. `<Your Notes>/lesson-analysis/Chapter N.md`, sibling to
   `<Your Notes>/Chapter N/...`). This is your own review material, separate from the skill's internal
   learning-records.

   **Why both exist** (steps 1 and 3 are not duplicates — don't collapse them): they differ by
   audience. A learning record is *the agent's*: terse ZPD signal, one pattern across several mistakes,
   1–3 sentences, and `teach-dist` strips `learning-records/` out of any bundle as internal — you never
   need to open it. A personal review note is *yours*: a full per-question walkthrough of why a trap
   worked, sitting beside your raw notes where you actually study, and it's what you reread before a
   retake. Merging them would bury the ZPD signal in narrative and push your study material into the set
   `teach-dist` discards. When the same material exists at both granularities, cross-link them rather
   than picking one.
4. **Forward plan** — close with a short, honest statement of whether any action is warranted now (e.g.
   patch an existing lesson's quiz) vs. deferred to a future spaced-review session. Don't unilaterally
   edit already-recheck-verified lesson content on the strength of a single note — offer it as an option
   instead and let the user decide.
