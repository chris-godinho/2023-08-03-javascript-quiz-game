// Storing button elements into global variables
var startButton = document.getElementById("start");
var highScores = document.getElementById("left-nav");
var optionA = document.getElementById("op-a");
var optionB = document.getElementById("op-b");
var optionC = document.getElementById("op-c");
var optionD = document.getElementById("op-d");
var confirmInitials = document.getElementById("confirm-initials");
var goBack = document.getElementById("go-back");
var clearHighScores = document.getElementById("clear-scores");

// Declaring timer, score and initials variables globally
var activeTimer;
var currentScore = 0;
var highScoreList = [];
var storedHighScoreList = [];
var enteredInitials;
var newScore;
var correctAnswer = 0;
var firstQuestion = true;

var questionPool = [
["Inside which HTML element do we put the JavaScript?", "<script>", "<scripting>", "<js>", "<javascript>", 1],
['What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id="demo">This is a demonstration.</p>', 'document.getElementByName("p").innerHTML = "Hello World!";', 'document.getElement("p").innerHTML = "Hello World!";', 'document.getElementById("demo").innerHTML = "Hello World!";', '#demo.innerHTML = "Hello World!";', 3],
['Where is the correct place to insert a JavaScript?', 'The <head> section', 'The <body> section', 'The <javascript> section', 'Both the <head> section and the <body> section are correct', 2],
['What is the correct syntax for referring to an external script called "xxx.js"?', '<script src="xxx.js">', '<script href="xxx.js">', '<script name="xxx.js">', '<script external="xxx.js">', 1],
['The external JavaScript file must contain the <script> tag.', 'False', 'True', 'Both', 'Neither', 1],
['How do you write "Hello World" in an alert box?', 'alertBox("Hello World");', 'msgBox("Hello World");', 'msg("Hello World");', 'alert("Hello World");', 4],
['How do you create a function in JavaScript?', 'function myFunction()', 'function:myFunction()', 'function = myFunction()', 'function >> myFunction()', 1],
['How do you call a function named "myFunction"?', 'myFunction()', 'call myFunction()', 'call function myFunction()', 'call internal function myFunction()', 1],
['How do you write an IF statement in JavaScript?', 'if i == 5 then', 'if i = 5 then', 'if (i == 5)', 'if i = 5', 3],
['How do you write an IF statement for executing some code if "i" is NOT equal to 5?', 'if i =! 5 then', 'if i <> 5', 'if (i <> 5)', 'if (i != 5)', 4]
];
var nextQuestion;

// Storing each screen ID in a different element for quick access
var startEl = document.getElementById("start-screen"); 
var quizEl = document.getElementById("quiz-screen");
var finalEl = document.getElementById("final-score-screen");
var scoreEl = document.getElementById("high-score-screen");
var timerEl = document.getElementById("timer");

function displayStart() {
  quizEl.style.display = "none";
  timerEl.style.display = "none";
  finalEl.style.display = "none";
  scoreEl.style.display = "none";
  document.getElementById("feedback").style.display = "none";
  startEl.style.display = "block";
}

function displayQuiz() {
  startEl.style.display = "none";
  finalEl.style.display = "none";
  scoreEl.style.display = "none";
  document.getElementById("feedback").style.display = "none";
  quizEl.style.display = "block";
  timerEl.style.display = "block";
}

function displayFinalScore() {
  document.getElementById("final-result").innerHTML = "Game over! Your score is " + currentScore + ".";
  startEl.style.display = "none";
  quizEl.style.display = "none";
  timerEl.style.display = "none";
  scoreEl.style.display = "none";
  finalEl.style.display = "block";
}

function saveInitials() {
  enteredInitials = document.getElementById("initials").value;
  highScoreList.push(enteredInitials + " (" + currentScore + ")");
  localStorage.setItem("highscores", highScoreList);
  storedHighScoreList = localStorage.getItem("highscores").split(",");
  document.getElementById("high-score-list").innerHTML = "";
  for (i = 0; i < storedHighScoreList.length; i++) {
    newScore = document.createElement("li");
    newScore.innerHTML = storedHighScoreList[i];
    document.getElementById("high-score-list").appendChild(newScore);
  }
  displayHighScores();
  console.log(highScoreList);
  console.log(localStorage.getItem("highscores"));
  document.getElementById("initials").value = "";
}

function displayHighScores() {
  startEl.style.display = "none";
  quizEl.style.display = "none";
  timerEl.style.display = "none";
  finalEl.style.display = "none";
  document.getElementById("feedback").style.display = "none";
  scoreEl.style.display = "block";
}

function clearStorage() {
  highScoreList = [];
  document.getElementById("high-score-list").innerHTML = "";
  localStorage.clear();
}

function decreaseTimer() {
  document.getElementById("timer-counter").innerHTML--;
  if (document.getElementById("timer-counter").innerHTML <= 0) {
    clearInterval(activeTimer);
    displayFinalScore();
  }
}

function displayFeedback() {
  console.log("correctAnswer -> " + correctAnswer);
  console.log(correctAnswer.typeof);
  if (correctAnswer) {
    console.log("CORRECT ANSWER");
    document.getElementById("feedback").innerHTML = "Correct!";
    document.getElementById("feedback").style.color = "#2AB8CB";
  } else {
    console.log("INCORRECT ANSWER");
    document.getElementById("feedback").innerHTML = "Incorrect!";
    document.getElementById("feedback").style.color = "#FE3434";
  }
  document.getElementById("feedback").style.display = "block";
}

function selectOptionA() {
  if (nextQuestion[0][5] === 1) {
    correctAnswer = true;
    currentScore++;
  } else {
    correctAnswer = false;
    for (i = 0; i < 10; i++) {
      decreaseTimer();
    }
  }
  getNextQuestion();
}

function selectOptionB() {
  if (nextQuestion[0][5] === 2) {
    correctAnswer = true;
    currentScore++;
  } else {
    correctAnswer = false;
    for (i = 0; i < 10; i++) {
      decreaseTimer();
    }
  }
  getNextQuestion();
}

function selectOptionC() {
  if (nextQuestion[0][5] === 3) {
    correctAnswer = true;
    currentScore++;
  } else {
    correctAnswer = false;
    for (i = 0; i < 10; i++) {
      decreaseTimer();
    }
  }
  getNextQuestion();
}

function selectOptionD() {
  if (nextQuestion[0][5] === 4) {
    correctAnswer = true;
    currentScore++;
  } else {
    correctAnswer = false;
    for (i = 0; i < 10; i++) {
      decreaseTimer();
    }
  }
  getNextQuestion();
}

function getNextQuestion() {
  if (questionPool.length === 0) {
    displayFinalScore();
  } else {
    if (firstQuestion) {
      firstQuestion = false;
    } else {
      displayFeedback();
    }
    nextQuestion = questionPool.splice(Math.floor(Math.random() * questionPool.length), 1);
    document.getElementById("question").innerHTML = nextQuestion[0][0];
    document.getElementById("op-a").innerHTML = nextQuestion[0][1];
    document.getElementById("op-b").innerHTML = nextQuestion[0][2];
    document.getElementById("op-c").innerHTML = nextQuestion[0][3];
    document.getElementById("op-d").innerHTML = nextQuestion[0][4];
  }

}

function startGame() {
  currentScore = 0;
  document.getElementById("timer-counter").innerHTML = 90;
  activeTimer = window.setInterval(decreaseTimer, 1000);
  displayQuiz();
  getNextQuestion();
}

startButton.addEventListener("click", startGame);
highScores.addEventListener("click", displayHighScores);
confirmInitials.addEventListener("click", saveInitials);
goBack.addEventListener("click", displayStart);
clearHighScores.addEventListener("click", clearStorage);
optionA.addEventListener("click", selectOptionA);
optionB.addEventListener("click", selectOptionB);
optionC.addEventListener("click", selectOptionC);
optionD.addEventListener("click", selectOptionD);