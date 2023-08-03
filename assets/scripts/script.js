var startButton = document.getElementById("start");

var startEl = document.getElementById("start-screen"); 
var quizEl = document.getElementById("quiz-screen");
var finalEl = document.getElementById("final-score-screen");
var scoreEl = document.getElementById("high-score-screen");

function displayQuiz() {
  console.log(startEl);
  console.log(quizEl);
  startEl.style.display = "none";
  quizEl.style.display = "block";
  // Hide other screens too (even if they won't show up)?
}

startButton.addEventListener("click", displayQuiz);