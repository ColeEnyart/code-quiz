var el = {
    timerEl: document.getElementById('countdown'),
    defaultEl: document.getElementById('default'),
    quiz: document.getElementById('quiz'),
    end: document.getElementById('results'),
    showScore: document.getElementById('showScore'),
    start: document.getElementById('startButton'),
    playAgain: document.getElementById('playAgain')
}

var ask = {
    question: document.getElementById('question'),
    button1: document.getElementById('button1'),
    button2: document.getElementById('button2'),
    button3: document.getElementById('button3'),
    button4: document.getElementById('button4')
}

el.start.addEventListener('click', quiz, false);
el.playAgain.addEventListener('click', quiz, false);
ask.button1.addEventListener('click', onChoice, false);
ask.button2.addEventListener('click', onChoice, false);
ask.button3.addEventListener('click', onChoice, false);
ask.button4.addEventListener('click', onChoice, false);

var timeLeft = 20;
var score = 0;
var currentQuestion = 0;

function quiz() {
    countdown();
    toggleQuiz();
    askQuestion();
}

const myQuestions = [
    {
        question: "Who invented JavaScript?",
        choices: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich"],
        answer: 2
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        choices: ["Node.js", "TypeScript", "npm"],
        answer: 2
    },
    {
        question: "Which tool can you use to ensure code quality?",
        choices: ["Angular", "jQuery", "RequireJS", "ESLint"],
        answer: 3
    }
];

function onChoice(e) {
    var chosen = -1;

    // which button is clicked?
    if (e.target === ask.button1) {
        chosen = 0;
    } else if (e.target === ask.button2) {
        chosen = 1;
    } else if (e.target === ask.button3) {
        chosen = 2;
    } else if (e.target === ask.button4) {
        chosen = 3;
    }

    console.log("Answered " + chosen);
    // compare button to answer and score
    if (chosen === myQuestions[currentQuestion].answer) {
        score++;
    } else {
        timeLeft -= 10;
    }

    currentQuestion++;

    // ask next question  
    if (currentQuestion < myQuestions.length) {
        askQuestion();
    } else {
        toggleEnd();
    }
}

function askQuestion() {
    var current = myQuestions[currentQuestion];
    console.log("askQuestion ", currentQuestion);
    ask.question.textContent = current.question;
    ask.button1.textContent = current.choices[0];
    ask.button2.textContent = current.choices[1];
    ask.button3.textContent = current.choices[2];
    ask.button4.textContent = current.choices[3];
}

function toggleQuiz() {
    var quizDisplay = el.quiz.style.display = "none";

    if (quizDisplay == "none") {
        el.quiz.style.display = "flex";
        el.defaultEl.style.display = "none";
        el.end.style.display = "none";
    }
}

function toggleEnd() {
    ask.button1.disabled = true;
    ask.button2.disabled = true;
    ask.button3.disabled = true;
    ask.button4.disabled = true;

    el.showScore.textContent = score;
    var endDisplay = el.end.style.display = "none";

    if (endDisplay == "none") {
        el.end.style.display = "flex";
        el.quiz.style.display = "none";
    }
}

function countdown() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        el.timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            el.timerEl.textContent = "";
            toggleEnd();
        }

    }, 1000);
}