---
name: teach-dist
description: Package a finished topic from a /teach workspace (topics/{Topic}/) into a clean, shareable dist/ folder and zip file, with everything internal or sensitive to the topic's author stripped out.
disable-model-invocation: true
argument-hint: "topic name (a folder under <workspace-root>/topics/), e.g. Git Basics"
---

This skill takes a topic built via the `teach` skill — living at `<workspace-root>/topics/{Topic Name}/`
(the `topics/` directory at the root of the workspace, a sibling of `.claude/` — NOT inside this skill's
own directory; from this skill's directory the relative path is `../../../topics/`) — and produces
a clean, self-contained, shareable bundle for people outside this workspace (teammates, learners,
whoever the user is sending it to). It strips everything meant only for the topic's author, and zips the
result.

## Input

The topic name should be given as an argument, matching a folder under `<workspace-root>/topics/`. If it's
missing or ambiguous, list the folders under `<workspace-root>/topics/` and ask which one.

## What goes in the package, what doesn't

Always **excluded** — never copied into the package under any circumstance:
- `MISSION.md`, `NOTES.md` — internal working documents about *why* the user is teaching this and how
  they want it taught. Not for the learner.
- `learning-records/` — internal history of what the learner has already demonstrated. Not appropriate
  to hand to a third party.
- Any personal-preferences file for the `teach`/`teach-dist` skills themselves (e.g. `user_comments.md`)
  — these live at the skill level, not inside a topic folder, but exclude defensively if found.

Always **included**, but only after the cleaning pass below:
- `lessons/*.html`
- `reference/*.html`
- `assets/*`
- `RESOURCES.md` — rewritten into a plain, learner-facing "Further Reading" doc, not copied verbatim.

## Cleaning pass — do this before copying anything

Read every file that will ship (all lessons, all reference docs, `RESOURCES.md`) end to end and check for:

1. **Dead links.** Any link pointing at `MISSION.md`, `NOTES.md`, `learning-records/`, or any path outside
   the topic folder (e.g. a `cache/` folder used as a private source-material drop that recipients won't
   have). Rewrite the surrounding sentence so it stands on its own — don't just delete the link and leave
   a dangling clause pointing at nothing.
2. **The topic author's identity.** Check how the user is referred to in the content (their git
   `user.name`, first name, email, etc. — check `git config user.name`/`user.email` and scan the files for
   that name). Generalize personal references in lesson prose to a neutral role ("your teacher," "your
   instructor," "whoever's presenting this") unless the user explicitly says to keep their name in. Never
   carry a personal email address into the package.
3. **Internal meta-commentary.** Phrases that only make sense to someone who knows this teaching-workspace
   system: "the agent running this workspace," "per the mission," references to `/teach` or skill
   mechanics, or planning language like "revisit once," "confirmed with [name]," "already vetted by
   [name]," "internal notes." Rewrite these as plain statements a stranger could read cold.
4. **Local file-system specifics.** Absolute paths, drive letters, or references to folders that only
   exist on the user's machine.

Apply this judgment fresh on every run — don't assume a previous run's fixes are the only ones needed.
A newly added lesson can introduce new internal references that need the same treatment.

## Building the package

1. Target folder: `<workspace-root>/topics/{Topic Name}/dist/{Topic Name}/`. If it already exists, wipe it and rebuild
   clean rather than accumulating stale files across runs.
2. Copy `lessons/`, `reference/`, `assets/` in, after applying the cleaning pass above to each file.
3. Write a cleaned `Further Reading.md` from `RESOURCES.md`: keep the curated links and their one-line
   "what it's for" annotations, drop anything under a `## Gaps`/internal-planning heading, drop personal
   attributions ("already vetted by...", "the author's notes").
4. Write an `index.html` landing page at the package root, styled with the topic's shared
   `assets/style.css`, that:
   - Lists the lessons in reading order (derive order from the `NNNN-` numeric prefix on each filename)
     with a one-line description of what each covers.
   - Links to the reference doc(s) and `Further Reading.md`.
   - Has a short "how to use this" callout at the top.
5. Zip the folder to `<workspace-root>/topics/{Topic Name}/dist/{Topic Name}.zip` using PowerShell's
   `Compress-Archive` (this machine has no `zip` command, so don't try it first — go straight to
   `Compress-Archive`). If the destination zip already exists, remove it first rather than letting
   `Compress-Archive` error out or silently merge into the old archive.

## After building

Report back concisely: what (if anything) got rewritten during the cleaning pass, and where the final zip
landed. Open `index.html` in the browser so the user can sanity-check it before sending. Never send,
upload, or share the zip anywhere yourself — building it is as far as this skill goes; sending it is the
user's call.
