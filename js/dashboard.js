const testForm = document.getElementById("testForm");

testForm.addEventListener("submit", function (e) {
  e.preventDefault();
  try {
    const questions = JSON.parse(document.getElementById("questionsJson").value);
    const answers = JSON.parse(document.getElementById("answersJson").value);
    const duration = parseInt(document.getElementById("duration").value);

    localStorage.setItem("quizQuestions", JSON.stringify(questions));
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    localStorage.setItem("quizDuration", duration);
    localStorage.setItem("quizStartTime", Date.now());

    window.location.href = "test.html";
  } catch (err) {
    alert("Invalid JSON format!");
  }
});
