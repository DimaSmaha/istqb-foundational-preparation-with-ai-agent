// Shared interaction component for the ISTQB Foundational Level lessons.
// Handles: multiple-choice quizzes (comprehension checks and reproduced exam questions),
// type-the-word recall drills, reveal buttons, term-match widgets.

// Copy-for-notes: builds a button that copies "Q / picked (if wrong) / correct" as plain text
// matching the learner's own note-taking format (question, then correction if they got it wrong).
function wireCopyButton(feedback, getText) {
  if (!feedback) return;
  let btn = feedback.querySelector(".copy-btn");
  if (!btn) {
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy for notes";
    feedback.appendChild(btn);
  }
  btn.onclick = () => {
    navigator.clipboard.writeText(getText()).then(() => {
      btn.textContent = "Copied!";
      setTimeout(() => { btn.textContent = "Copy for notes"; }, 1200);
    });
  };
}

document.addEventListener("DOMContentLoaded", () => {
  // Multiple-choice quizzes: <div class="quiz"><ul class="options"><button data-correct="true|false" data-why="...">
  document.querySelectorAll(".quiz").forEach((quiz) => {
    const feedback = quiz.querySelector(".feedback");
    const qText = quiz.querySelector(".q")?.textContent.trim() || "";
    // Remembers the first wrong option clicked, so if the learner tries again and lands on
    // the correct answer, "Copy for notes" still includes what they originally got wrong.
    let firstWrongPick = null;
    quiz.querySelectorAll(".options button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const correct = btn.dataset.correct === "true";
        quiz.querySelectorAll(".options button").forEach((b) => b.classList.remove("correct", "incorrect"));
        btn.classList.add(correct ? "correct" : "incorrect");
        if (!correct && !firstWrongPick) {
          firstWrongPick = { text: btn.textContent.trim(), why: btn.dataset.why || "" };
        }
        if (feedback) {
          feedback.textContent = correct
            ? "Correct — " + (btn.dataset.why || "")
            : "Not quite — " + (btn.dataset.why || "try again.");
          feedback.classList.add("shown");
          feedback.classList.toggle("ok", correct);
          feedback.classList.toggle("bad", !correct);
        }
        wireCopyButton(feedback, () => {
          const correctBtn = quiz.querySelector('.options button[data-correct="true"]');
          const correctLine = `✓ Correct: ${correctBtn?.textContent.trim() || ""} — ${correctBtn?.dataset.why || ""}`;
          if (correct) {
            if (firstWrongPick) {
              return `Q: ${qText}\n✗ Picked: ${firstWrongPick.text} — ${firstWrongPick.why}\n${correctLine}`;
            }
            return `Q: ${qText}\nA: ${btn.textContent.trim()} — ${btn.dataset.why || ""}`;
          }
          return `Q: ${qText}\n✗ Picked: ${btn.textContent.trim()} — ${btn.dataset.why || ""}\n${correctLine}`;
        });
      });
    });
  });

  // Multi-select quizzes (exam questions with "Select TWO options"):
  // <div class="quiz-multi" data-correct="a,e" data-why="..."><input type="checkbox" value="a">...<button class="check-multi">
  document.querySelectorAll(".quiz-multi").forEach((quiz) => {
    const correct = (quiz.dataset.correct || "").split(",").map((s) => s.trim());
    const feedback = quiz.querySelector(".feedback");
    const checkBtn = quiz.querySelector(".check-multi");
    const qText = quiz.querySelector(".q")?.textContent.trim() || "";
    const boxes = Array.from(quiz.querySelectorAll(".options input[type='checkbox']"));
    const textOf = (val) => {
      const box = boxes.find((b) => b.value === val);
      return box ? box.closest("label").textContent.trim() : val;
    };
    // Remembers the first wrong selection checked, so if the learner tries again and lands on
    // the correct combination, "Copy for notes" still includes what they originally got wrong.
    let firstWrongPick = null;
    if (checkBtn) {
      checkBtn.addEventListener("click", () => {
        const selected = boxes.filter((b) => b.checked).map((b) => b.value);
        const isCorrect = selected.length === correct.length && selected.every((v) => correct.includes(v));
        boxes.forEach((b) => {
          const li = b.closest("li");
          li.classList.remove("correct-selected", "correct-missed", "incorrect-selected");
          const isRight = correct.includes(b.value);
          if (b.checked && isRight) li.classList.add("correct-selected");
          else if (b.checked && !isRight) li.classList.add("incorrect-selected");
          else if (!b.checked && isRight) li.classList.add("correct-missed");
        });
        if (!isCorrect && !firstWrongPick) {
          firstWrongPick = selected.map(textOf).join("; ");
        }
        if (feedback) {
          feedback.textContent = (isCorrect ? "Correct — " : "Not quite — ") + (quiz.dataset.why || "");
          feedback.classList.add("shown");
          feedback.classList.toggle("ok", isCorrect);
          feedback.classList.toggle("bad", !isCorrect);
        }
        const correctTexts = correct.map(textOf).join("; ");
        wireCopyButton(feedback, () => {
          const correctLine = `✓ Correct: ${correctTexts} — ${quiz.dataset.why || ""}`;
          if (isCorrect) {
            if (firstWrongPick) {
              return `Q: ${qText}\n✗ Picked: ${firstWrongPick}\n${correctLine}`;
            }
            return `Q: ${qText}\nA: ${correctTexts} — ${quiz.dataset.why || ""}`;
          }
          const pickedTexts = selected.map(textOf).join("; ");
          return `Q: ${qText}\n✗ Picked: ${pickedTexts}\n${correctLine}`;
        });
      });
    }
  });

  // Type-the-word recall drills: <div class="drill" data-answer="deployed"><input><button class="check">
  document.querySelectorAll(".drill").forEach((drill) => {
    const input = drill.querySelector("input[type='text']");
    const checkBtn = drill.querySelector(".check");
    const result = drill.querySelector(".result");
    const answers = (drill.dataset.answer || "")
      .split("|")
      .map((s) => s.trim().toLowerCase());

    if (checkBtn) {
      checkBtn.addEventListener("click", () => {
        const val = (input.value || "").trim().toLowerCase().replace(/\s+/g, " ");
        const ok = answers.includes(val);
        if (result) {
          result.textContent = ok ? "Correct." : "Not quite — try again, or reveal the answer.";
          result.classList.toggle("ok", ok);
          result.classList.toggle("bad", !ok);
        }
      });
    }
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") checkBtn?.click();
      });
    }
  });

  // Generic reveal buttons: <button class="reveal-btn" data-target="#id">Show answer</button>
  document.querySelectorAll(".reveal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.target);
      if (!target) return;
      const shown = target.classList.toggle("shown");
      btn.textContent = shown ? "Hide answer" : "Show answer";
    });
  });

  // Term-match widgets: <div class="match"><div class="terms"><button class="term" data-pair="1">
  //                                        <div class="defs"><button class="def" data-pair="1">
  document.querySelectorAll(".match").forEach((widget) => {
    let selectedTerm = null;
    const status = widget.querySelector(".match-status");
    const total = widget.querySelectorAll(".term").length;
    let matched = 0;

    const updateStatus = () => {
      if (!status) return;
      status.textContent = matched === total ? "All matched." : `${matched}/${total} matched.`;
    };
    updateStatus();

    const flashWrong = (a, b) => {
      [a, b].forEach((btn) => btn.classList.add("incorrect"));
      setTimeout(() => [a, b].forEach((btn) => btn.classList.remove("incorrect")), 500);
    };

    widget.querySelectorAll(".term").forEach((term) => {
      term.addEventListener("click", () => {
        if (term.disabled) return;
        widget.querySelectorAll(".term").forEach((t) => t.classList.remove("selected"));
        term.classList.add("selected");
        selectedTerm = term;
      });
    });

    widget.querySelectorAll(".def").forEach((def) => {
      def.addEventListener("click", () => {
        if (!selectedTerm || def.disabled) return;
        const correct = selectedTerm.dataset.pair === def.dataset.pair;
        if (correct) {
          selectedTerm.classList.add("matched");
          def.classList.add("matched");
          selectedTerm.disabled = true;
          def.disabled = true;
          selectedTerm.classList.remove("selected");
          selectedTerm = null;
          matched++;
          updateStatus();
        } else {
          flashWrong(selectedTerm, def);
        }
      });
    });
  });
});

// Aggregate scoreboard for the final mock exam: a <div id="exam-scoreboard"> on the page
// enables live tracking across every .quiz and .quiz-multi block. Only the first answer per
// question counts toward the score (matching real-exam semantics), even though the existing
// per-question feedback handlers above still let you re-click to see why an option is wrong.
document.addEventListener("DOMContentLoaded", () => {
  const scoreboard = document.getElementById("exam-scoreboard");
  if (!scoreboard) return;

  const totalQuestions = document.querySelectorAll(".quiz, .quiz-multi").length;
  const answered = new Set();
  const correct = new Set();

  const render = () => {
    const overallPct = totalQuestions ? Math.round((correct.size / totalQuestions) * 100) : 0;
    const passed = overallPct >= 65;
    scoreboard.textContent =
      `Answered ${answered.size}/${totalQuestions} — Correct ${correct.size} — Score ${overallPct}% ` +
      `(need 65% to pass)` + (answered.size === totalQuestions ? (passed ? " — PASS" : " — below passing mark") : "");
    scoreboard.classList.toggle("pass", answered.size === totalQuestions && passed);
    scoreboard.classList.toggle("fail", answered.size === totalQuestions && !passed);
  };
  render();

  document.querySelectorAll(".quiz").forEach((quiz, idx) => {
    const id = "q" + idx;
    quiz.querySelectorAll(".options button").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!answered.has(id)) {
          answered.add(id);
          if (btn.dataset.correct === "true") correct.add(id);
          render();
        }
      });
    });
  });

  document.querySelectorAll(".quiz-multi").forEach((quiz, idx) => {
    const id = "qm" + idx;
    const checkBtn = quiz.querySelector(".check-multi");
    if (!checkBtn) return;
    checkBtn.addEventListener("click", () => {
      if (answered.has(id)) return;
      answered.add(id);
      const correctLetters = (quiz.dataset.correct || "").split(",").map((s) => s.trim());
      const boxes = Array.from(quiz.querySelectorAll(".options input[type='checkbox']"));
      const selected = boxes.filter((b) => b.checked).map((b) => b.value);
      const isCorrect = selected.length === correctLetters.length && selected.every((v) => correctLetters.includes(v));
      if (isCorrect) correct.add(id);
      render();
    });
  });
});
