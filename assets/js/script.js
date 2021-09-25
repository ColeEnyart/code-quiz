var el = {
    timerEl: document.getElementById('countdown'),
    defaultEl: document.getElementById('default'),
    quiz: document.getElementById('quiz'),
    end: document.getElementById('results'),
    showScore: document.getElementById('showScore'),
    start: document.getElementById('startButton'),
    playAgain: document.getElementById('playAgain'),
    saveScore: document.querySelector('#saveScore button'),
    highScore: document.getElementById('highScore')
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
el.saveScore.addEventListener('click', saveScore, false);


var timeLeft = 0;
var score = 0;
var currentQuestion;
var highScore = 0;
var timeInterval;

function saveScore() {
    el.saveScore.disabled = true;

    var initials = document.getElementById('initials').value;
    var result = { initials: initials, score: score, when: Date.now() };
    var saved = localStorage.getItem('scores');

    if (saved === null) {
        saved = JSON.stringify([result]);
        localStorage.setItem("scores", saved);
        return;
    }

    var scores = JSON.parse(saved);
    scores.push(result);
    scores.sort((a, b) => {
        if (a.score > b.score) { return -1; }
        if (a.score < b.score) { return 1; }

        if (a.when > b.when) { return -1; }
        if (a.when < b.when) { return 1; }

        return 0;
    });

    saved = JSON.stringify(scores);
    localStorage.setItem("scores", saved);

    toggleScore();
}

function quiz() {
    currentQuestion = 0;
    score = 0;
    startTimer();
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

    ask.question.textContent = current.question;
    ask.button1.textContent = current.choices[0];
    ask.button2.textContent = current.choices[1];
    ask.button3.textContent = current.choices[2];
    ask.button4.textContent = current.choices[3];
}

function toggleQuiz() {
    el.quiz.style.display = "flex";
    el.defaultEl.style.display = "none";
    el.end.style.display = "none";
    el.highScore.style.display = "none";

}

function toggleEnd() {
    el.saveScore.disabled = false;
    el.showScore.textContent = "Score: " + score;
    el.end.style.display = "flex";
    el.quiz.style.display = "none";
    el.defaultEl.style.display = "none";
    el.highScore.style.display = "none";

    clearInterval(timeInterval);
}

function toggleScore() {
    el.highScore.style.display = "flex";
    el.end.style.display = "none";
    el.quiz.style.display = "none";
    el.defaultEl.style.display = "none";

    var ol = document.querySelector('#highScore > ol');
    var scores = JSON.parse(localStorage.getItem('scores'));
    
    scores.forEach(element => {
        var li = document.createElement("li");
        var text = document.createTextNode(element.initials + " " + element.score);
        li.appendChild(text);
        ol.appendChild(li);
        
    });
}

function startTimer() {
    timeLeft = 21;
    timeInterval = setInterval(timerTick, 1000);
}


function timerTick() {
    timeLeft--;
    el.timerEl.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
        el.timerEl.textContent = "";
        toggleEnd();
    }

}