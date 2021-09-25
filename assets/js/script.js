// selectors
var el = {
    timerEl: document.getElementById('countdown'),
    defaultEl: document.getElementById('default'),
    quiz: document.getElementById('quiz'),
    end: document.getElementById('results'),
    showScore: document.getElementById('showScore'),
    start: document.getElementById('startButton'),
    highScore: document.getElementById('highScore')
}

// select buttons
var ask = {
    question: document.getElementById('question'),
    button1: document.getElementById('button1'),
    button2: document.getElementById('button2'),
    button3: document.getElementById('button3'),
    button4: document.getElementById('button4'),
    saveScore: document.querySelector('#saveScore button'),
    playAgain: document.getElementById('playAgain')
}

// add click
el.start.addEventListener('click', quiz, false);
ask.playAgain.addEventListener('click', quiz, false);
ask.button1.addEventListener('click', onChoice, false);
ask.button2.addEventListener('click', onChoice, false);
ask.button3.addEventListener('click', onChoice, false);
ask.button4.addEventListener('click', onChoice, false);
ask.saveScore.addEventListener('click', saveScore, false);

// global variables
var timeLeft = 0;
var score = 0;
var currentQuestion;
var highScore = 0;
var timeInterval;

// start game when button is clicked 
function quiz() {
    currentQuestion = 0;
    score = 0;
    startTimer();
    toggleQuiz();
    askQuestion();
}

// start timer for quiz
function startTimer() {
    timeLeft = 21;
    timeInterval = setInterval(timerTick, 1000);
}

// each escond that passes reduce amount of time left and check to see if user is out of time
function timerTick() {
    timeLeft--;
    el.timerEl.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
        el.timerEl.textContent = "";
        toggleEnd();
    }

}

// makes quiz section visible and other hide other sections
function toggleQuiz() {
    el.quiz.style.display = "flex";
    el.defaultEl.style.display = "none";
    el.end.style.display = "none";
    el.highScore.style.display = "none";

}

// sets up user interface to display question and choices
function askQuestion() {
    var current = myQuestions[currentQuestion];

    ask.question.textContent = current.question;
    ask.button1.textContent = current.choices[0];
    ask.button2.textContent = current.choices[1];
    ask.button3.textContent = current.choices[2];
    ask.button4.textContent = current.choices[3];
}

const myQuestions = [
    {
        question: "Who invented JavaScript?",
        choices: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich", "Bill Gates"],
        answer: 2
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        choices: ["Node.js", "TypeScript", "npm", "Java"],
        answer: 2
    },
    {
        question: "Which tool can you use to ensure code quality?",
        choices: ["Angular", "jQuery", "RequireJS", "ESLint"],
        answer: 3
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Text Markup Leveler"],
        answer: 2
    },
    {
        question: "What does CSS stand for?",
        choices: ["Cascading Style Sheets", "Color Style Sync", "Computer Standard Style", "Cascading Sail Slides"],
        answer: 0
    }
];

// compare button to what is clicked in choices array 
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

// makes end section visible and other hide other sections
function toggleEnd() {
    ask.saveScore.disabled = false;
    el.showScore.textContent = "Your score is: " + score;
    el.end.style.display = "flex";
    el.quiz.style.display = "none";
    el.defaultEl.style.display = "none";
    el.highScore.style.display = "none";

    clearInterval(timeInterval);
}

// click handler for save high score button
function saveScore() {
    // disable button after clicked so user cannot click a second time
    ask.saveScore.disabled = true;

    var initials = document.getElementById('initials').value;
    var result = { initials: initials, score: score, when: Date.now() };
    var saved = localStorage.getItem('scores');

    // if there is no pre existing data then just save this result
    if (saved === null) {
        localStorage.setItem('scores', JSON.stringify([result]));
        return;
    }

    // make an array of scores
    var scores = JSON.parse(saved);
    // append current result to array of scores
    scores.push(result);
    // sort (highest score, then by most recent)
    scores.sort((a, b) => {
        if (a.score > b.score) { return -1; }
        if (a.score < b.score) { return 1; }

        if (a.when > b.when) { return -1; }
        if (a.when < b.when) { return 1; }

        return 0;
    });

    localStorage.setItem('scores', JSON.stringify(scores));

    toggleScore();
}

// makes score section visible and other hide other sections
// displays highscores
function toggleScore() {
    el.highScore.style.display = "flex";
    el.end.style.display = "none";
    el.quiz.style.display = "none";
    el.defaultEl.style.display = "none";

    var ol = document.querySelector('#highScore > ol');
    var scores = JSON.parse(localStorage.getItem('scores'));

    scores.forEach(element => {
        var li = document.createElement('li');
        var text = document.createTextNode(element.initials + " " + element.score);
        li.appendChild(text);
        ol.appendChild(li);

    });
}
