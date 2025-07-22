const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

const credentials = {
  username: "admin",
  password: "satya@1234"
};

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === credentials.username && password === credentials.password) {
    window.location.href = "dashboard.html";
  } else {
    loginError.classList.remove("d-none");
  }
});
