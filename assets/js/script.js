var timerEl = document.getElementById('countdown');
var defaultEl = document.getElementById('default');
var switchEL = document.getElementsByClassName('main');
var start = document.getElementById('startButton');
var quiz = document.getElementById('quiz');
var end = document.getElementById('results');


function countdown() {
    var timeLeft = 5;


    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if(timeLeft === 0) {
        clearInterval(timeInterval);
        /* timerEl.textContent = ""; */
        toggleEnd();
        }

    }, 1000);
}

/* switchEL.setAttribute("style", "display: flex; justify-content: space-evenly; align-items: center;"); */

function toggleQuiz() {

    var quizDisplay = quiz.style.display = "none";
    console.log(quizDisplay);

    if (quizDisplay == "none") {
        quiz.style.display = "block";
        defaultEl.style.display = "none";
    }
}

function toggleEnd() {

    var endDisplay = end.style.display = "none";
    console.log(endDisplay);

    if (endDisplay == "none") {
        end.style.display = "block";
        quiz.style.display = "none";
    }
}