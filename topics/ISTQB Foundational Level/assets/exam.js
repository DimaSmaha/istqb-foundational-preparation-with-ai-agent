// Exam-mode interaction: unlike assets/quiz.js (instant per-click reveal, used by lessons),
// this script holds every answer back — nothing is graded or revealed until "Submit Exam" is
// clicked. Reuses the exact same markup vocabulary as quiz.js (.quiz, .quiz-multi, data-correct,
// data-why, .exam-tag, .feedback) so question content never needs to change, only the interaction
// layer. Used only by the 6 chapter exams and the retrofitted final mock exam.

document.addEventListener("DOMContentLoaded", () => {
  const quizzes = Array.from(document.querySelectorAll(".quiz, .quiz-multi"));
  if (!quizzes.length) return;

  // Defensive: exam-mode markup should never ship a per-question check-multi button (grading is
  // global now) — strip any that slipped through so they can't trigger quiz.js-style reveals.
  document.querySelectorAll(".check-multi").forEach((b) => b.remove());

  let graded = false;
  let pendingConfirm = false;

  // Elapsed-time tracker: starts on the first answer selection so the learner can see how
  // long the exam took, freezes at submission, and resets on retake.
  const timerEl = document.getElementById("exam-timer");
  let timerStart = null;
  let timerInterval = null;
  function formatElapsed(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");
    return mm + ":" + ss;
  }
  function startTimer() {
    if (timerStart || !timerEl) return;
    timerStart = Date.now();
    timerInterval = setInterval(() => {
      timerEl.textContent = "Time: " + formatElapsed(Date.now() - timerStart);
    }, 1000);
  }
  function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
  }
  function resetTimer() {
    stopTimer();
    timerStart = null;
    if (timerEl) timerEl.textContent = "Time: 00:00";
  }

  function isAnswered(q) {
    return q.classList.contains("quiz")
      ? !!q.querySelector(".options button.selected")
      : q.querySelectorAll("input[type='checkbox']:checked").length > 0;
  }

  const progressEl = document.getElementById("exam-progress");
  function updateProgress() {
    const answered = quizzes.filter(isAnswered).length;
    if (progressEl) progressEl.textContent = `Answered ${answered}/${quizzes.length}`;
  }

  document.querySelectorAll(".quiz .options button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (graded) return;
      startTimer();
      btn.closest(".options").querySelectorAll("button").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      updateProgress();
    });
  });
  document.querySelectorAll(".quiz-multi input[type='checkbox']").forEach((cb) => {
    cb.addEventListener("change", () => {
      if (graded) return;
      startTimer();
      updateProgress();
    });
  });
  updateProgress();

  // Bucket each question under the nearest preceding <h2 id="..."> so results can show a
  // per-topic breakdown (mirrors the topic-index sections already used on these pages).
  const topicOf = new Map();
  const page = document.querySelector(".page");
  if (page) {
    let current = null;
    page.childNodes.forEach((node) => {
      if (node.nodeType === 1 && node.tagName === "H2" && node.id) {
        current = { id: node.id, label: node.textContent.trim() };
      }
      if (node.nodeType === 1 && (node.classList.contains("quiz") || node.classList.contains("quiz-multi"))) {
        topicOf.set(node, current);
      }
    });
  }

  // Fallback for pages without <h2> topic headers (e.g. the mixed-order full mock exams):
  // bucket by chapter using the FL-<n> number in each question's .exam-tag. No-op on the
  // chapter exams, where every question already resolved to a preceding <h2> above.
  const chapterNames = {
    "1": "Chapter 1 — Fundamentals of Testing",
    "2": "Chapter 2 — Testing Throughout the SDLC",
    "3": "Chapter 3 — Static Testing",
    "4": "Chapter 4 — Test Analysis and Design",
    "5": "Chapter 5 — Managing the Test Activities",
    "6": "Chapter 6 — Test Tools",
  };
  quizzes.forEach((q) => {
    if (topicOf.get(q)) return;
    const tag = q.querySelector(".exam-tag");
    const m = tag && tag.textContent.match(/FL-(\d)/);
    if (m) topicOf.set(q, { id: "ch" + m[1], label: chapterNames[m[1]] || "Chapter " + m[1] });
  });

  function gradeQuiz(q) {
    const selected = q.querySelector(".options button.selected");
    const feedback = q.querySelector(".feedback");
    q.querySelectorAll(".options button").forEach((b) => (b.disabled = true));
    const correctBtn = q.querySelector('.options button[data-correct="true"]');
    if (!selected) {
      correctBtn.classList.add("correct");
      feedback.textContent = "Skipped — correct answer: " + correctBtn.textContent.trim() + " — " + (correctBtn.dataset.why || "");
      feedback.classList.add("shown", "bad");
      return false;
    }
    const correct = selected.dataset.correct === "true";
    selected.classList.add(correct ? "correct" : "incorrect");
    if (!correct) correctBtn.classList.add("correct");
    feedback.textContent = correct
      ? "Correct — " + (selected.dataset.why || "")
      : "Not quite — " + (selected.dataset.why || "") + " Correct answer: " + correctBtn.textContent.trim() + " — " + (correctBtn.dataset.why || "");
    feedback.classList.add("shown", correct ? "ok" : "bad");
    return correct;
  }

  function gradeMulti(q) {
    const correctVals = (q.dataset.correct || "").split(",").map((s) => s.trim());
    const boxes = Array.from(q.querySelectorAll("input[type='checkbox']"));
    boxes.forEach((b) => (b.disabled = true));
    const selected = boxes.filter((b) => b.checked).map((b) => b.value);
    const isCorrect = selected.length === correctVals.length && selected.every((v) => correctVals.includes(v));
    boxes.forEach((b) => {
      const li = b.closest("li");
      const isRight = correctVals.includes(b.value);
      if (b.checked && isRight) li.classList.add("correct-selected");
      else if (b.checked && !isRight) li.classList.add("incorrect-selected");
      else if (!b.checked && isRight) li.classList.add("correct-missed");
    });
    const feedback = q.querySelector(".feedback");
    feedback.textContent = (isCorrect ? "Correct — " : selected.length ? "Not quite — " : "Skipped — ") + (q.dataset.why || "");
    feedback.classList.add("shown", isCorrect ? "ok" : "bad");
    return isCorrect;
  }

  function gradeAll(force) {
    const unanswered = quizzes.filter((q) => !isAnswered(q)).length;
    const warningEl = document.getElementById("exam-warning");
    if (unanswered > 0 && !force) {
      if (warningEl) {
        warningEl.hidden = false;
        warningEl.textContent = `You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"} — click Submit again to grade anyway.`;
      }
      pendingConfirm = true;
      return;
    }
    if (warningEl) warningEl.hidden = true;
    graded = true;
    stopTimer();
    document.body.classList.add("exam-locked");

    let correctCount = 0;
    const topicTally = new Map();
    quizzes.forEach((q) => {
      const ok = q.classList.contains("quiz") ? gradeQuiz(q) : gradeMulti(q);
      if (ok) correctCount++;
      const t = topicOf.get(q);
      if (t) {
        if (!topicTally.has(t.id)) topicTally.set(t.id, { label: t.label, correct: 0, total: 0 });
        const row = topicTally.get(t.id);
        row.total++;
        if (ok) row.correct++;
      }
    });

    const pct = Math.round((correctCount / quizzes.length) * 100);
    const pass = pct >= 65;
    const summaryEl = document.getElementById("exam-score-summary");
    if (summaryEl) {
      summaryEl.textContent = `Score: ${correctCount}/${quizzes.length} — ${pct}% (need 65% to pass) — ${pass ? "PASS" : "below passing mark"}`;
      summaryEl.classList.add(pass ? "pass" : "fail");
    }

    const tbody = document.getElementById("topic-breakdown-body");
    if (tbody) {
      tbody.innerHTML = "";
      Array.from(topicTally.entries())
        .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
        .forEach(([id, row]) => {
          const rowPct = Math.round((row.correct / row.total) * 100);
          tbody.insertAdjacentHTML(
            "beforeend",
            `<tr><td><a href="#${id}">${row.label}</a></td><td class="${rowPct >= 65 ? "pass" : "fail"}">${row.correct}/${row.total} (${rowPct}%)</td></tr>`
          );
        });
    }

    const resultsEl = document.getElementById("exam-results");
    const submitBtn = document.getElementById("btn-submit-exam");
    const retakeBtn = document.getElementById("btn-retake-exam");
    if (resultsEl) resultsEl.hidden = false;
    if (submitBtn) submitBtn.hidden = true;
    if (retakeBtn) retakeBtn.hidden = false;
    if (resultsEl) resultsEl.scrollIntoView({ behavior: "smooth" });
  }

  const submitBtn = document.getElementById("btn-submit-exam");
  if (submitBtn) submitBtn.addEventListener("click", () => gradeAll(pendingConfirm));

  const retakeBtn = document.getElementById("btn-retake-exam");
  if (retakeBtn) {
    retakeBtn.addEventListener("click", () => {
      graded = false;
      pendingConfirm = false;
      resetTimer();
      document.body.classList.remove("exam-locked");
      quizzes.forEach((q) => {
        q.querySelectorAll(".options button").forEach((b) => {
          b.disabled = false;
          b.classList.remove("selected", "correct", "incorrect");
        });
        q.querySelectorAll("input[type='checkbox']").forEach((cb) => {
          cb.disabled = false;
          cb.checked = false;
        });
        q.querySelectorAll(".options li").forEach((li) => {
          li.classList.remove("correct-selected", "correct-missed", "incorrect-selected");
        });
        const fb = q.querySelector(".feedback");
        if (fb) {
          fb.textContent = "";
          fb.classList.remove("shown", "ok", "bad");
        }
      });
      const resultsEl = document.getElementById("exam-results");
      const warningEl = document.getElementById("exam-warning");
      if (resultsEl) resultsEl.hidden = true;
      if (warningEl) warningEl.hidden = true;
      if (submitBtn) submitBtn.hidden = false;
      retakeBtn.hidden = true;
      updateProgress();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
