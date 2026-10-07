# ISTQB® Foundational Level Preparation — with an AI Agent

> **Unofficial study aid.** Not affiliated with, endorsed by, or accredited by the ISTQB®. ISTQB® is a
> registered trademark of the International Software Testing Qualifications Board. Free and
> non-commercial — see [Copyright & Attribution](#copyright--attribution) and [`NOTICE.md`](NOTICE.md).

A Claude Code skillset for turning official certification source material into a full, structured study
pipeline: interactive HTML lessons, two-tier practice exams, live drilling quizzes, and an automatic
error-pattern log — plus a worked example course (ISTQB® CTFL v4.0) built with it.

This was built on top of the [`/teach`](https://www.aihero.dev/skills-teach) skill by Matt Pocock (adapted
and extended here), and the certification-specific layer (`istqb-prep`, `istqb-quiz`, `istqb-recap`) was
built for two real ISTQB certification runs.

## What's in this repo

```
.claude/skills/
  teach/            — generic spaced-learning framework (any topic, not just certifications)
  teach-refactor/    — rechecks existing lessons against their primary sources
  teach-dist/        — packages a finished topic into a clean, shareable bundle
  istqb-prep/        — orchestrates a full ISTQB module build (lessons + exams + review loop)
  istqb-quiz/        — live chat quiz drilling your own documented error patterns
  istqb-recap/       — builds a pre-exam recap (your notes + missed questions + fresh drills)
topics/ISTQB Foundational Level/
  lessons/           — 22 interactive HTML lessons, one per syllabus section
  exams/             — per-chapter practice exams + blueprint-weighted mock exams, plus a
                       generate-it-yourself page for the official Sample Exam B
  reference/         — glossary + chapter recap pages
  assets/            — shared stylesheet, quiz engine, dark/light theme toggle
  MISSION.md, NOTES.md, learning-records/, quiz-sessions/ — example tracking files, trimmed down to
    show the pattern (see the note at the top of each)
LICENSE              — MIT (software code)
LICENSE-CONTENT.txt  — CC BY-NC-SA 4.0 (original explanatory text)
NOTICE.md            — ISTQB® copyright & attribution, source documents, licensing scope
```

## Copyright & Attribution

This project contains **question extracts from the official ISTQB® Certified Tester Foundation Level
(CTFL) v4.0 Sample Exams** (sets A v1.7, C v1.6 and D v1.5) and wording from the **ISTQB® CTFL Syllabus
v4.0.1**. All questions, answers, and syllabus structures are copyrighted by the International Software
Testing Qualifications Board (ISTQB®). All rights reserved. The authors and ISTQB® are acknowledged as
the source and copyright owners — the full author lists and ISTQB®'s conditions of use are in
[`NOTICE.md`](NOTICE.md).

These extracts are reproduced strictly for **non-commercial, educational use** in accordance with the
ISTQB® Sample Exam Copyright Notice. Questions are extracted individually and regrouped by learning
objective; no sample exam is reproduced as a complete document. Every lesson and exam page carries an
attribution footer.

- **No paywalls, ads, or premium tiers.** Do not monetize this project or a fork of it.
- **No official branding.** Do not use the ISTQB® logo or present this as an official ISTQB® product.

**The official PDFs are not redistributed here.** Download them free from
[istqb.org](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/). `RESOURCES.md`
lists exactly which documents were used. You'll need your own copies (in `cache/ISTQB/<Module>/`) if you
want `istqb-prep` to rebuild or extend this course, or to build a course for a different ISTQB® module.

## Installing the skillset

Pick whichever fits your workflow:

- **Via CLI**: `npx skills@latest add mattpocock/skills --skill=teach` (installs the base `/teach` skill;
  the `istqb-*` skills in this repo layer on top of it)
- **Copy the files**: download or `git clone` this repo, then copy `.claude/skills/*` into your own
  workspace's `.claude/skills/`
- **Ask your AI agent**: *"Install the skills from this repo into `.claude/skills/` and set them up so I
  can start using them right away."*

## Using it

1. `/teach` — the base framework; reads `.claude/skills/teach/user_comments.md` for your personal
   preferences every session (see that file — it's a template you should edit).
2. `/istqb-prep <module>` — stands up a full study workspace for an ISTQB module: source extraction,
   lessons, exams, the review loop, and a final readiness gate.
3. `/istqb-recap <chapter>` and `/istqb-quiz <chapter>` — the per-chapter review loop: a recap combining
   your notes with your mistake history, then a live drilling quiz before you sit the chapter exam.
4. `/teach-refactor` and `/teach-dist` — recheck lessons against source material, and package a finished
   topic for sharing.

The included `topics/ISTQB Foundational Level/` course is a full worked example — open any lesson file in
a browser to see the format, or read `.claude/skills/istqb-prep/SKILL.md` for the full pipeline this course
was built with.

## License

The software code in this repository is licensed under the MIT License. The exam question data is
property of the ISTQB® and is used under non-commercial extract guidelines.

| What | License |
|---|---|
| Code — `.claude/skills/**`, `topics/*/assets/**` (quiz/exam engine, styles, theme), page structure | [MIT](LICENSE) |
| Original explanatory text — lesson explanations, rationales in the author's own words, notes | [CC BY-NC-SA 4.0](LICENSE-CONTENT.txt) |
| ISTQB® material — syllabus wording, learning objectives, K-levels, sample-exam questions, options, answer keys | Not licensed by this project — © ISTQB®, all rights reserved; see [`NOTICE.md`](NOTICE.md) |

The `teach` skill is adapted from [`mattpocock/skills`](https://github.com/mattpocock/skills)
(MIT, Copyright (c) 2026 Matt Pocock).

If you represent the ISTQB® or a Member Board and want any material removed, please open an issue.
