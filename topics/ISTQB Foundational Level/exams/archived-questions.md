# Archived exam questions (trimmed from chapter-3/4/5 exams)

> **Copyright & Attribution Notice.** This file contains question extracts from the official ISTQB®
> Certified Tester Foundation Level (CTFL) v4.0 Sample Exams A v1.7, C v1.6 and D v1.5 (Questions &
> Answers). All questions and answers are copyrighted by the International Software Testing
> Qualifications Board (ISTQB®). All rights reserved. The authors and ISTQB® are acknowledged as the
> source and copyright owners. These extracts are reproduced strictly for non-commercial, educational
> use in accordance with the ISTQB® Copyright Notice — see [NOTICE](../../../NOTICE.md). Unofficial
> study aid; not affiliated with, endorsed by, or accredited by ISTQB®.

These questions were removed from `chapter-3-exam.html`, `chapter-4-exam.html`, and `chapter-5-exam.html`
on 2026-07-27 to shorten those practice exams (3: 16→10, 4: 37→20, 5: 35→20), at the user's request. They
are still official ISTQB pool questions (from Sample Exams A, C, D) — nothing invented — just pulled out
of the per-chapter practice exams to cut down repeat testing of the same learning objective. Every
learning objective (`FL-x.y.z`) still has at least one question remaining in its chapter exam; these are
the "extra" duplicate-angle questions on objectives that had 2–4 official questions to choose from.

**Note:** these questions are unchanged in the four `0023-final-mock-exam-N.html` files — they were only
removed from the per-chapter practice exams, not from the mock exam pool.

If you want more drilling on a specific learning objective later, pull questions back from here.

## Chapter 3 (6 removed)

**Exam A · A11 · FL-3.1.1 · K1**
> The following is a list of the work products produced in the SDLC.
> i. Business requirements
> ii. Schedule
> iii. Test budget
> iv. Third-party executable code
> v. User stories and their acceptance criteria
>
> Which of them can be reviewed?

- i and iv can be reviewed
- i, ii, iii and iv can be reviewed
- **i, ii, iii, and v can be reviewed** — Business requirements, schedule, test budget, and user stories with acceptance criteria are all human-readable work products — any of them can be the subject of a review. Third-party executable code is the one exception: it's not interpretable by humans.
- iii, iv, v can be reviewed

**Exam A · A12 · FL-3.1.3 · K2**
> Decide which of the following statements (i-v) are true for static testing.
> i. Abnormal external behaviors are easier to identify with this testing
> ii. Discrepancies from a coding standard are easier to find with this testing
> iii. It identifies failures caused by defects when the software is run
> iv. Its test objective is to identify defects as early as possible
> v. Missing coverage for critical security requirements is easier to find and fix

- i, iv, v are true for static testing
- i, iii, iv are true for static testing
- ii, iii are true for static testing
- **ii, iv, v are true for static testing** — ii (coding-standard deviations) and v (gaps in requirements/security coverage) are classic static-testing catches. iv is true too — early testing is exactly its objective. i and iii both require the software to actually run, which rules them out.

**Exam A · Q16 · FL-3.2.1 · K1**
> Which of the following is a benefit of early and frequent feedback?

- It improves the test process for future projects
- It forces customers to prioritize their requirements based on agreed risks
- It provides a measure for the quality of changes
- **It helps avoid requirements misunderstandings** — Early and frequent feedback can prevent misunderstandings about requirements — exactly the syllabus's stated benefit.

**Exam A · A14 · FL-3.2.3 · K1**
> What task may management take on during a formal review?

- Taking overall responsibility for the review
- **Deciding what is to be reviewed** — Deciding what is to be reviewed — and providing the resources (staff, time) for it — is the manager's responsibility.
- Ensuring the effective running of review meetings, and moderating, if necessary
- Recording review information such as review decisions

**Exam A · Q17 · FL-3.2.4 · K2**
> The reviews being used in your organization have the following attributes:
> • There is the role of a scribe
> • The main purpose is to evaluate quality
> • The meeting is led by the author of the work product
> • There is individual preparation
> • A review report is produced
>
> Which of the following review types is MOST likely being used?

- Informal review
- **Walkthrough** — "Led by the author" is the walkthrough's defining trait — inspections and technical reviews are led by a moderator instead. Evaluating quality and building confidence is one of a walkthrough's central objectives.
- Technical review
- Inspection

**Exam C · Q18 · FL-3.2.5 · K1**
> Which of the following is a factor that contributes to a successful review?

- Ensure management participate as reviewers
- **Split large work products into smaller parts** — Breaking a large work product into small enough parts prevents reviewers from losing focus during an individual review or the review meeting.
- Set reviewer evaluation as an objective
- Plan to cover one document per review

## Chapter 4 (17 removed)

**Exam A · Q19 · FL-4.1.1 · K2**
> Which of the following is a characteristic of experience-based test techniques?

- Test cases are created based on detailed design information
- Items tested within the interface code section are used to measure coverage
- **The test techniques heavily rely on the tester's knowledge of the software and the business domain** — This knowledge and experience — expected use, environment, likely defects, and their distribution — is used to define tests.
- The test cases are used to identify deviations from the requirements

**Exam C · Q19 · FL-4.1.1 · K2**
> What is the MAIN difference between black-box test techniques and experience-based test techniques?

- The test object
- The test level at which the test technique is used
- **The test basis** — Black-box techniques are based on an analysis of the specified behavior (usually a specification); experience-based techniques use the tester's knowledge and experience, possibly without the specification at all.
- The software development lifecycle (SDLC) in which the test technique can be used

**Exam C · Q20 · FL-4.2.1 · K3**
> You are testing a PIN validator... [four-digit PIN, not all same digit — valid equivalence partitions for length and digit variety]. Which of the following is the BEST set of input test data to cover the identified equivalence partitions?

- **12, 1111, 1234, 12345** — 12 covers "length incorrect" (too few); 1111 covers "length correct" + "digits incorrect"; 1234 covers "length correct" + "digits correct"; 12345 covers "length incorrect" (too many) — all four partitions covered.
- 1, 123, 1111, 1234
- 11, 12, 1111, 12345
- 123, 1222, 12345

**Exam A · Q21 · FL-4.2.2 · K3**
> Course grade BVA coverage calculation (6 TCs given, 12 boundary values identified) — what % 2-value BVA coverage is achieved?

- **50%** — 6 of 12 boundary values covered (91, 50, 81, 60, 70, 51 — the syllabus answer key references a "TC7" covering 51 not in the listed table, an apparent error in the original source).
- 60% / 33.3% / 100% — all incorrect counts.

**Exam C · Q21 · FL-4.2.2 · K3**
> Business rule: IF (value ≤ 100 OR value ≥ 200) THEN "value incorrect" ELSE "value OK". Which test input set achieves greatest 2-value BVA coverage?

- 100, 150, 200, 201 (50%)
- 99, 100, 200, 201 (50%)
- 98, 99, 100, 101 (50%)
- **101, 150, 199, 200** — boundary values are 100, 101, 199, 200; this hits 101, 199, 200 — 75% coverage, highest of the four.

**Exam A · Q22 · FL-4.2.3 · K3**
> Bicycle rental CRM decision table (member/missed-deadline/15th-rental → discount/T-shirt). Which rule (R1-R8) describes an impossible situation?

- R4 / R2 / R6 — all consistent
- **R8** — not a member, missed deadline, 15th rental → no discount (correct) but DOES get a gift T-shirt. Gift T-shirts are members-only, so a non-member receiving one is impossible/contradictory.

**Exam A · Q23 · FL-4.2.4 · K3**
> State transition diagram (INIT/DEBUG MODE/IN OPERATION/ON HOLD/OFF). Minimal number of test cases for valid transitions coverage?

- 4 / 2 / 7 — incorrect
- **3** — "test" and "error" transitions can't occur in the same test case, nor can both "done" transitions — at least 3 needed.

**Exam C · Q24 · FL-4.3.2 · K2**
> Control flow graph (start→A, A↔B loop, A→C, C splits to D/E, D/E converge to F). How many coverage items (branches/edges) for branch testing?

- 2 / 4 / 7 — undercounts
- **8** — start→A, A↔B (2 edges), A→C, C→D, C→E, D→F, E→F = 8 edges total.

**Exam D · Q25 · FL-4.3.3 · K2**
> Why does white-box testing facilitate defect detection even when the specification is vague/outdated/incomplete?

- **Test cases are designed based on the structure of the test object rather than the specification** — white-box tests come from the code's own structure, so they can find defects (like an unintended extra feature) that black-box testing against a poor spec would miss.
- (three distractors about coverage measurability, requirement-omission detection, and static/dynamic applicability — all false or irrelevant to the "why")

**Exam C · Q25 · FL-4.3.3 · K2**
> How can white-box testing be useful in support of black-box testing?

- **White-box coverage measures can help testers evaluate black-box tests in terms of the code coverage achieved by these black-box tests** — black-box testing alone gives no measure of actual code coverage.
- (distractors: unreachable-code detection unrelated to black-box support; false subsumption claim; no direct coverage-item relation)

**Exam A · Q26 · FL-4.4.1 · K2**
> Which of the following BEST describes the concept behind error guessing?

- **Error guessing involves using your knowledge and experience of defects found in the past and typical errors made by developers** — the basic concept: guessing what errors a developer may have made, based on past experience (and sometimes checklists).
- (distractors: personal-coding-experience framing, user-error imagination framing, development-duplication framing — all wrong)

**Exam C · Q26 · FL-4.4.1 · K2**
> List: correct input not accepted / incorrect input accepted / wrong output format / division by zero. What technique is MOST PROBABLY used?

- Exploratory testing
- **Fault attack** — this is a list of possible failures; fault attacks are the methodical implementation of error guessing, building a list of possible errors/defects/failures and designing tests to expose them.
- Checklist-based testing
- Boundary value analysis

**Exam A · Q27 · FL-4.4.2 · K2**
> Delayed release, late test execution start, strong domain knowledge, missing requirements, management wants results now. Which technique fits BEST?

- Checklist-based testing / Error guessing — no checklist/experience yet for a new product
- **Exploratory testing** — most useful when few specs are known and/or under time pressure; strong domain knowledge and analytical skills fit well.
- Branch testing — too time-consuming, doesn't leverage domain knowledge

**Exam C · Q27 · FL-4.4.3 · K2**
> Which of the following BEST describes how checklist-based testing can result in increased coverage?

- (distractors about low-level detail, automation, independent testing of items — all miss the actual mechanism)
- **Two testers designing and executing tests based on the same high-level checklist items will typically perform the testing in slightly different ways** — high-level checklists leave room for variability; different testers cover different areas, increasing overall coverage (at the cost of repeatability).

**Exam D · Q28 · FL-4.5.1 · K2**
> Which collaborative user story writing practice enables the team to achieve a collective understanding of what needs to be delivered?

- Planning poker — estimates effort, doesn't build understanding
- Reviews — not a named collaborative user-story practice
- Iteration planning — prioritization, not shared understanding
- **Conversation, so that team members can understand how the software will be used** — one of the "3 C's," typically leads to defining meaningful acceptance criteria.

**Exam A · Q28 · FL-4.5.2 · K2**
> Which of the following BEST describes the way acceptance criteria can be documented?

- Retrospectives — not a documentation method
- **Using the given/when/then format to describe an example test condition related to a given user story** — the standard scenario-oriented format named explicitly for documenting acceptance criteria (used in BDD).
- Verbal communication — doesn't document anything
- Documenting risks in a test plan — not the same as acceptance criteria

**Exam A · Q29 · FL-4.5.3 · K3**
> Editor content-review user story with 6 listed acceptance criteria. Which is the BEST example of an ATDD test for this user story?

- **Test if the editor can save the document after edit the page content** — covers two acceptance criteria at once (editing content, saving changes), both explicitly listed.
- (distractors: content-owner login, scheduling for publication, reassigning to another editor — all go beyond the story's stated scope)

## Chapter 5 (15 removed)

**Exam A · A19 · FL-5.1.1 · K2**
> Test plan excerpt: "Testing will be performed using component testing and component integration testing. The regulations require... 100% branch coverage... for each component classified as critical." Which part of the test plan does this belong to?

- Communication / Risk register / Context of testing — wrong
- **Test approach** — contains test levels and an exit criterion (100% branch coverage for critical components), both part of the test approach section.

**Exam D · Q31 · FL-5.1.4 · K3**
> Three-point estimation: best-case 1h, worst-case 8h, most-likely 3h, per test case; estimate time for 4 test cases.

- **14 hours** — E = (1 + 4×3 + 8)/6 = 3.5h per TC; ×4 = 14 hours.
- 3.5 hours (per-TC estimate, not the total) / 16 / 12 — incorrect

**Exam A · Q32 · FL-5.1.4 · K3**
> Three-point estimation: optimistic 2h, most-likely 11h, pessimistic 14h. Final estimate?

- 9 / 14 / 11 hours — incorrect
- **10 person-hours** — E = (2 + 4×11 + 14)/6 = 60/6 = 10.

**Exam A · Q33 · FL-5.1.5 · K3**
> Restaurant-finder app, 5 TCs with priorities and dependencies (TC001→TC002→{TC003,TC004,TC005}). Which TC runs third?

- **TC 003** — dependencies force TC001 then TC002 first; of the remaining three, TC003 has highest priority (1), so it runs third.
- TC 005 / TC 002 / TC 001 — incorrect ordering

**Exam C · Q33 · FL-5.1.6 · K1**
> What does the test pyramid model show?

- That tests may have different priorities / require different coverage criteria / depend on other tests — wrong
- **That tests may have different granularity** — small and isolated at the bottom, large and end-to-end at the top.

**Exam C · Q34 · FL-5.1.7 · K2**
> What is the relationship between the testing quadrants, test levels and test types?

- (distractors: SDLC-location combinations, granularity-per-level, test-type-to-level assignment — all wrong)
- **Testing quadrants group test levels and test types by several criteria such as targeting specific stakeholders** — grouped by criteria like business- vs. technology-facing, and supporting the team vs. critiquing the product.

**Exam D · Q34 · FL-5.2.1 · K1**
> Risk level is $1,000, risk likelihood is 50%. What is the risk impact?

- $500 / $50,000 / $200 — incorrect division
- **$2,000** — risk level = likelihood × impact, so impact = $1,000 ÷ 0.5 = $2,000.

**Exam D · Q35 · FL-5.2.2 · K2 · select TWO**
> Which of the following are product risks? (Scope creep / Poor architecture / Cost-cutting / Poor tool support / Too long response time)

- **Poor architecture, Too long response time** — both product characteristics. Scope creep and poor tool support are project risks (technical); cost-cutting is a project risk (organizational).

**Exam C · Q35 · FL-5.2.3 · K2**
> Which of the following is an example of how product risk analysis may influence the thoroughness and scope of testing?

- Continuous risk monitoring / risk identification enabling mitigation / deriving coverage items — all wrong (monitoring/control activities, not analysis)
- **The assessed risk level helps us to select the rigor of testing** — the syllabus's own example: risk analysis determines the assessed level, which is then used to select testing rigor.

**Exam C · Q36 · FL-5.3.2 · K2**
> Which activity in the test process makes the MOST use of test progress reports?

- Test design / Test analysis / Test planning — wrong
- **Test completion** — a test completion report is prepared during test completion, using information gathered from test progress reports throughout testing.

**Exam A · A26 · FL-5.3.2 · K2**
> Which piece of information in a test progress report is LEAST useful for business representatives?

- Impediments to testing / Test progress / New risks — all useful to business stakeholders
- **Branch coverage achieved** — a technical, code-level metric of interest to developers and technical test analysts, not business representatives.

**Exam D · Q37 · FL-5.4.1 · K2**
> Support engineer reassembles all files of a release based on version number to let a developer analyze and fix a reported defect. What enabled this?

- Risk management / test monitoring and control / whole team approach — wrong
- **Configuration management** — provides the discipline for identifying, controlling, and tracking work products, keeping a record of changed configuration items when a new baseline is created.

**Exam A · Q37 · FL-5.4.1 · K2**
> Updating an automated test script for a new requirement. Which process indicates creating a new version of the script in the test repository?

- Traceability management / Maintenance testing / Requirements engineering — wrong
- **Configuration management** — may involve version control of all test items, including creating a new version of a changed test script in the repository.

**Exam D · Q38 · FL-5.5.1 · K3**
> Book Lending System defect report (unable to return a book) — no user/book specifics in Description. What's MOST likely to help the developer reproduce the failure quickly?

- **Adding information about which users and which books the failure affects to the "Description" section** — lets the developer use the same input data, making the failure much more likely to reproduce.
- Filling in Priority / adding memory dumps and DB snapshots after every step / repeating across environments — all miss the actual reproduction gap

**Exam C · Q38 · FL-5.5.1 · K3**
> WebShop v0.99 defect report (login button not working) — steps, expected/actual result, severity, priority given. What's the MOST important missing information?

- Name of tester and date — useful but not critical to reproduction
- **Test environment elements and their version numbers** — browser/device-specific bugs (like this one) need the environment specified to reproduce and diagnose.
- Identification of the test object — already given (WebShop v0.99)
- Impact on stakeholders — already given (Severity: High)
