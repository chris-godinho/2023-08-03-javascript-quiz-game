// Storing button elements into global variables
var startButton = document.getElementById("start");
var highScoresBtn = document.getElementById("left-nav");
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
var highScores = [];
var highInitials = [];
var newScores = [];
var newInitials = [];
var enteredInitials;
var addedScore;
var correctAnswer = 0;
var currentQuestion = 0;

// Declaring question text, options and correct answers
var cQuestionPool = [
['Inside which HTML element do we put the JavaScript?', '&lt;script&gt;', '&lt;scripting&gt;', '&lt;js&gt;', '&lt;javascript&gt;', 1],
['What is the correct JavaScript syntax to change the content of the HTML element &lt;p id="demo"&gt;This is a demonstration.&lt;/p&gt;?', 'document.getElementByName("p").innerHTML = "Hello World!";', 'document.getElement("p").innerHTML = "Hello World!";', 'document.getElementById("demo").innerHTML = "Hello World!";', '#demo.innerHTML = "Hello World!";', 3],
['Where is the correct place to insert a JavaScript?', 'The &lt;head&gt; section', 'The &lt;body&gt; section', 'The &lt;javascript&gt; section', 'Both the &lt;head&gt; section and the &lt;body&gt; section are correct', 2],
['What is the correct syntax for referring to an external script called "xxx.js"?', '&lt;script src="xxx.js"&gt;', '&lt;script href="xxx.js"&gt;', '&lt;script name="xxx.js"&gt;', '&lt;script external="xxx.js"&gt;', 1],
['The external JavaScript file must contain the &lt;script&gt; tag.', 'False', 'True', 'Both', 'Neither', 1],
['How do you write "Hello World" in an alert box?', 'alertBox("Hello World");', 'msgBox("Hello World");', 'msg("Hello World");', 'alert("Hello World");', 4],
['How do you create a function in JavaScript?', 'function myFunction()', 'function:myFunction()', 'function = myFunction()', 'function &gt;&gt; myFunction()', 1],
['How do you call a function named "myFunction"?', 'myFunction()', 'call myFunction()', 'call function myFunction()', 'call internal function myFunction()', 1],
['How do you write an IF statement in JavaScript?', 'if i == 5 then', 'if i = 5 then', 'if (i == 5)', 'if i = 5', 3],
['How do you write an IF statement for executing some code if "i" is NOT equal to 5?', 'if i =! 5 then', 'if i &lt;&gt; 5', 'if (i &lt;&gt; 5)', 'if (i != 5)', 4],
['How does a WHILE loop start?', 'while (i &lt;= 10; i++)', 'while (i &lt;= 10)', 'while i = 1 to 10', 'while loop (i &lt;= 10)', 2],
['How does a FOR loop start?', 'for (i = 0; i &lt;= 5)', 'for (i &lt;= 5; i++)', 'for i = 1 to 5', 'for (i = 0; i &lt;= 5; i++)', 4],
['How can you add a comment in a JavaScript?', "'This is a comment", '&lt;!--This is a comment--&gt;', '//This is a comment', '%-This is a comment', 3],
['What is the correct way to write a JavaScript array?', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', 'var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = ["red", "green", "blue"]', 'var colors = "red", "green", "blue"', 3],
['How do you round the number 7.25, to the nearest integer?', 'Math.rnd(7.25)', 'round(7.25)', 'Math.round(7.25)', 'rnd(7.25)', 3],
['How do you find the number with the highest value of x and y?', 'ceil(x,y)', 'top(x,y)', 'Math.max(x,y)', 'Math.ceil(x,y)', 3],
['JavaScript is the same as Java.', 'True', 'False', 'Both', 'Neither', 2],
['Which event occurs when the user clicks on an HTML element?', 'onclick', 'onchange', 'onmouseover', 'onmouseclick', 1],
['How do you declare a JavaScript variable?', 'variable carName', 'v carName', 'var carName', 'new variable(carName)', 3]
];
var questionPool;
var nextQuestion;

// Storing each screen ID in a different element for quick access
var startEl = document.getElementById("start-screen"); 
var quizEl = document.getElementById("quiz-screen");
var finalEl = document.getElementById("final-score-screen");
var scoreEl = document.getElementById("high-score-screen");
var timerEl = document.getElementById("timer");

// Displays the main screen
function displayStart() {
  quizEl.style.display = "none";
  timerEl.style.display = "none";
  finalEl.style.display = "none";
  scoreEl.style.display = "none";
  document.getElementById("feedback").style.display = "none";
  startEl.style.display = "block";
}

// Displays the quiz interface
function displayQuiz() {
  startEl.style.display = "none";
  finalEl.style.display = "none";
  scoreEl.style.display = "none";
  document.getElementById("feedback").style.display = "none";
  quizEl.style.display = "block";
  timerEl.style.display = "block";
}

// Displays the "Game Over" screen
function displayFinalScore() {
  document.getElementById("final-result").innerHTML = "Game over! Your score is " + currentScore + ".";
  startEl.style.display = "none";
  quizEl.style.display = "none";
  timerEl.style.display = "none";
  scoreEl.style.display = "none";
  finalEl.style.display = "block";
}

// Saves initials and scores to Local Storage and adds the data into the HTML element
function saveInitials() {
  enteredInitials = document.getElementById("initials").value;
  if (enteredInitials === "") {
    alert("Field cannot be blank!\n\nSurely your name contains initials?");
  } else {
    newScores = [];
    newInitials = [];
    highScores = [];
    highInitials = [];
    // Get current Local Storage saved lists (do I need to check if it's there?)
    // Parse them into arrays
    if (localStorage.hasOwnProperty("highscores")) {
      highScores = localStorage.getItem("highscores").split(",");
      for (i = 0; i < highScores.length; i++) {
        highScores[i] = Number(highScores[i]);
      }
      highInitials = localStorage.getItem("highinitials").split(",");
    }

    // Get entered information and add it to the array
    highScores.push(currentScore);
    highInitials.push(enteredInitials);

    // Sort the list
    for (i = 10; i >= 0; i--) {
      for (j = 0; j < highScores.length; j++) {
        if (highScores[j] === i) {
          newScores.push(highScores[j]);
          newInitials.push(highInitials[j]);
        }
      }
    }

    // Add list items into HTML element
    document.getElementById("high-score-list").innerHTML = "";
    for (i = 0; i < newScores.length; i++) {
      addedScore = document.createElement("li");
      addedScore.innerHTML = newInitials[i] + " (" + newScores[i] + ")";
    document.getElementById("high-score-list").appendChild(addedScore);

    // Store current version of the array into Local Storage
    localStorage.setItem("highscores", newScores);
    localStorage.setItem("highinitials", newInitials);

    // Move on to High Scores screen
    displayHighScores();

    // Clear input form
    document.getElementById("initials").value = "";
    }
  }
}

// Displays the High Scores board
function displayHighScores() {
  clearInterval(activeTimer);
  startEl.style.display = "none";
  quizEl.style.display = "none";
  timerEl.style.display = "none";
  finalEl.style.display = "none";
  document.getElementById("feedback").style.display = "none";
  scoreEl.style.display = "block";
}

// Clears Local Storage
function clearStorage() {
  highScores = [];
  highInitials = [];
  document.getElementById("high-score-list").innerHTML = "";
  localStorage.clear();
}

// Decreases the time by one second
function decreaseTimer() {
  document.getElementById("timer-counter").innerHTML--;
  if (document.getElementById("timer-counter").innerHTML <= 0) {
    clearInterval(activeTimer);
    displayFinalScore();
  }
}

// Adds feedback about the previous question to the bottom of the screen
function displayFeedback() {
  if (correctAnswer) {
    document.getElementById("feedback").innerHTML = "Correct!";
    document.getElementById("feedback").style.color = "#2AB8CB";
  } else {
    document.getElementById("feedback").innerHTML = "Incorrect!";
    document.getElementById("feedback").style.color = "#FE3434";
  }
  document.getElementById("feedback").style.display = "block";
}

// Checks if answers are correct
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

// Pulls another question from the remaining pool
function getNextQuestion() {
  if (currentQuestion > 0) {
    displayFeedback();
    if (currentQuestion >= 10) {
      clearInterval(activeTimer);
      displayFinalScore();
      return;
    }
  }
  nextQuestion = questionPool.splice(Math.floor(Math.random() * questionPool.length), 1);
  document.getElementById("question").innerHTML = nextQuestion[0][0];
  document.getElementById("op-a").innerHTML = nextQuestion[0][1];
  document.getElementById("op-b").innerHTML = nextQuestion[0][2];
  document.getElementById("op-c").innerHTML = nextQuestion[0][3];
  document.getElementById("op-d").innerHTML = nextQuestion[0][4];
  currentQuestion++;
  }

// Starts up the timer, clears past scores and resets the question pool
function startGame() {
  currentScore = 0;
  currentQuestion = 0;
  questionPool = [...cQuestionPool];
  document.getElementById("timer-counter").innerHTML = 60;
  activeTimer = window.setInterval(decreaseTimer, 1000);
  displayQuiz();
  getNextQuestion();
}

// Adding event listeners to buttons
startButton.addEventListener("click", startGame);
highScoresBtn.addEventListener("click", displayHighScores);
confirmInitials.addEventListener("click", saveInitials);
goBack.addEventListener("click", displayStart);
clearHighScores.addEventListener("click", clearStorage);
optionA.addEventListener("click", selectOptionA);
optionB.addEventListener("click", selectOptionB);
optionC.addEventListener("click", selectOptionC);
optionD.addEventListener("click", selectOptionD);