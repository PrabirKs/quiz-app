const questions = JSON.parse(localStorage.getItem("quizQuestions"));
const answers = JSON.parse(localStorage.getItem("quizAnswers"));
const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));

let score = 0;
questions.forEach(q => {
  if (userAnswers[q.id] === answers[q.id]) score++;
});

const resultContainer = document.getElementById("resultContainer");

resultContainer.innerHTML = `
  <div class="card p-4">
    <h2>Your Score: ${score} / ${questions.length}</h2>
    <button class="btn btn-primary mt-3" onclick="location.href='test.html'">Retest</button>
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
