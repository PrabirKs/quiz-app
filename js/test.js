const questions = JSON.parse(localStorage.getItem("quizQuestions"));
const answers = JSON.parse(localStorage.getItem("quizAnswers"));
const duration = parseInt(localStorage.getItem("quizDuration"));

let currentQuestion = 0;
const userAnswers = {};
const totalQuestions = questions.length;

const container = document.getElementById("testContainer");

function renderQuestion(index) {
  const q = questions[index];
  container.innerHTML = `
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
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    window.location.href = "result.html";
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
}

function startTimer(minutes) {
  let timeLeft = minutes * 60;
  const timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      window.location.href = "result.html";
    }
  }, 1000);
}

renderQuestion(currentQuestion);
startTimer(duration);
