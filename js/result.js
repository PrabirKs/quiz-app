const questions = JSON.parse(localStorage.getItem("quizQuestions"));
const answers = JSON.parse(localStorage.getItem("quizAnswers"));
const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));


const startTime = parseInt(localStorage.getItem("quizStartTime"));
const endTime = parseInt(localStorage.getItem("quizEndTime"));

const timeTakenMs = endTime - startTime;
const minutesTaken = Math.floor(timeTakenMs / 60000);
const secondsTaken = Math.floor((timeTakenMs % 60000) / 1000);
const formattedTime = `${String(minutesTaken).padStart(2, '0')}:${String(secondsTaken).padStart(2, '0')}`;

let score = 0;
questions.forEach(q => {
  if (userAnswers[q.id] === answers[q.id]) score++;
});

const resultContainer = document.getElementById("resultContainer");

resultContainer.innerHTML = `
  <div class="card p-4">
    <h2>Your Score: ${score} / ${questions.length}</h2>
    <p><strong>Time Taken:</strong> ${formattedTime}</p> <!-- ⏱️ Show time taken -->
    <button class="btn btn-primary mt-3" onclick="retest()">Retest</button>
    <button class="btn btn-secondary mt-3" onclick="location.href='dashboard.html'">New Test</button>
    <hr>
    <h4>Analysis</h4>
    ${questions.map(q => {
      const correct = answers[q.id];
      const user = userAnswers[q.id];

      return `
        <div class="mb-4">
          <strong>Q${q.id}: ${q.question}</strong>
          <ul class="list-group mt-2">
            ${Object.entries(q.options).map(([key, val]) => {
              const isCorrect = key === correct;
              const isUserWrong = user && key === user && key !== correct;

              return `<li class="list-group-item ${isCorrect ? 'list-group-item-success' : ''} ${isUserWrong ? 'list-group-item-danger' : ''}">
                <strong>${key.toUpperCase()}.</strong> ${val}
              </li>`;
            }).join('')}
          </ul>
          <div class="mt-1 small">
            Correct Answer: <span class="text-success fw-bold">${correct.toUpperCase()}</span>
            ${user && user !== correct ? `| Your Answer: <span class="text-danger fw-bold">${user.toUpperCase()}</span>` : ''}
          </div>
        </div>
      `;
    }).join('')}
  </div>
`;

function retest() {
  localStorage.setItem("quizStartTime", Date.now());
  localStorage.removeItem("quizEndTime");            
  window.location.href = "test.html";
}
