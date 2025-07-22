const questions = JSON.parse(localStorage.getItem("quizQuestions"));
const answers = JSON.parse(localStorage.getItem("quizAnswers"));
const duration = parseInt(localStorage.getItem("quizDuration"));
const startTime = parseInt(localStorage.getItem("quizStartTime"));

let currentQuestion = 0;
const userAnswers = {};
const totalQuestions = questions.length;
const container = document.getElementById("testContainer");
const timerDisplay = document.getElementById("timerDisplay");

function renderQuestion(index) {
  const q = questions[index];
  container.innerHTML = `
    <div class="d-flex justify-content-end mb-3">
      <span class="badge bg-primary p-2 fs-6" id="timerDisplay">Time Left: --:--</span>
    </div>
    <div class="card p-4">
      <h4>Question ${index + 1} of ${totalQuestions}</h4>
      <p>${q.question}</p>
      ${Object.entries(q.options).map(([key, val]) =>
        `<div class="form-check">
          <input class="form-check-input" type="radio" name="answer" value="${key}" ${userAnswers[q.id] === key ? 'checked' : ''}>
          <label class="form-check-label">${val}</label>
        </div>`).join('')}
      <div class="mt-4 d-flex justify-content-between">
        <button class="btn btn-secondary" ${index === 0 ? 'disabled' : ''} onclick="prevQuestion()">Previous</button>
        <button class="btn btn-primary" onclick="saveAndNext()">${index === totalQuestions - 1 ? 'Finish' : 'Next'}</button>
      </div>
    </div>
  `;
  // Reattach the timer display after rerender
  startTimerCountdown();
}

function saveAndNext() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (selected) {
    userAnswers[questions[currentQuestion].id] = selected.value;
  }

  if (currentQuestion < totalQuestions - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  } else {
    submitTest();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
}

function submitTest() {
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  localStorage.setItem("quizEndTime", Date.now()); // ✅ Save end time
  window.location.href = "result.html";
}


function startTimerCountdown() {
  const timerDisplay = document.getElementById("timerDisplay");
  const testDurationMs = duration * 60 * 1000;
  const timeEnd = startTime + testDurationMs;

  function updateTimer() {
    const now = Date.now();
    const timeLeft = Math.max(0, timeEnd - now);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    timerDisplay.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("⏰ Time's up!");
      submitTest();
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

renderQuestion(currentQuestion); // Also calls timer setup
