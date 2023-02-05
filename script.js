var headerEl = document.getElementById('header');
var textEl = document.getElementById('text');
var hideEl = document.querySelector('.hide');
var startButtonEl = document.getElementById('start-button');
var highScoreButtonEl = document.getElementById('high-score-button');
var timerEl = document.querySelector('.timer');
var aList = document.createElement('ol');
var result = document.getElementById('result')
var answerButton1 = document.createElement('button');
var answerButton2 = document.createElement('button');
var answerButton3 = document.createElement('button');
var answerButton4 = document.createElement('button');
answerButton1.classList.add('answer-button', 'a');
answerButton2.classList.add('answer-button', 'b');
answerButton3.classList.add('answer-button', 'c');
answerButton4.classList.add('answer-button', 'd');
var score = 0;
let secondsRemaining = 60;
var timerInterval;
var questions = [{
        question: 'What do you need to make a string in JavaScript?',
        answers: {
            a: '< >',
            b: '" "',
            c: '( )',
            d: '{ }'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Which of these is a complex data type in JavaScript?',
        answers: {
            a: 'Function',
            b: 'Boolean',
            c: 'Number',
            d: 'String'
        },
        correctAnswer: 'a'
    },
    {
        question: 'Which of these can NOT be used to set a variable in JavaScript?',
        answers: {
            a: 'var',
            b: 'const',
            c: 'is',
            d: 'let'
        },
        correctAnswer: 'c'
    },
    {
        question: 'What character is used to select an id in CSS?',
        answers: {
            a: '.',
            b: '#',
            c: '!',
            d: '&'
        },
        correctAnswer: 'b'
    },
    {
        question: 'What are the three fundamental languages of the modern web?',
        answers: {
            a: 'Java, Python, PHP',
            b: 'Ruby, GO, Rust',
            c: 'C, C#, C++',
            d: 'HTML, CSS, JavaScript'
        },
        correctAnswer: 'd'
    },
    {
        question: 'What tool is best for debugging?',
        answers: {
            a: 'Array.map()',
            b: 'window.close()',
            c: 'console.log()',
            d: 'hammer.smash()'
        },
        correctAnswer: 'c'
    },
    {
        question: 'What does CSS stand for?',
        answers: {
            a: 'Cascading Style Sheets ',
            b: 'Corroded Steel Submarines',
            c: 'Cascading Sub-string Styles',
            d: 'Creating Successful Subtypes'
        },
        correctAnswer: 'a'
    },
    {
        question: 'Name the responsive CSS framework developed at Twitter',
        answers: {
            a: 'Flexbox',
            b: 'Tube top',
            c: 'Bootstrap',
            d: 'Chirp'
        },
        correctAnswer: 'c'
    },
    {
        question: 'The original version of JavaScript was created in what year?',
        answers: {
            a: '1987',
            b: '1997',
            c: '2007',
            d: '2017'
        },
        correctAnswer: 'b'
    },
    {
        question: 'An Array can hold how many values?',
        answers: {
            a: '0',
            b: '1',
            c: '2',
            d: 'All of the above'
        },
        correctAnswer: 'd'
    },
];
var currentQuestion;
var questionArray = [];
var i = 0;
var scoreObjs = JSON.parse(localStorage.getItem('scoreObj')) || [];

function enterScore() {
    clearInterval(timerInterval);
    timerEl.textContent = '';
    console.log('GAME OVER');
    headerEl.textContent = 'Game Over!';
    divEl = document.createElement('div');
    scoreEl = document.createElement('score');
    scoreEl.textContent = `Final Score: ${score}/10`;
    headerEl.appendChild(divEl);
    divEl.appendChild(scoreEl);
    var form = document.createElement('form');
    var inputBox = document.createElement('input');
    inputBox.setAttribute('type', 'text');
    inputBox.setAttribute('placeholder', 'Enter Your Initials');
    aList.replaceWith(form);
    form.appendChild(inputBox);
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var object = {
                name: inputBox.value,
                score: score
            }
        scoreObjs.push(object)
        localStorage.setItem('scoreObj', JSON.stringify(scoreObjs));
        if (inputBox.value != '') {
            window.open('scores.html', '_self');
        };
    });
};

function timer() {
    timerInterval = setInterval(function() {
        secondsRemaining--;
        timerEl.textContent = 'Timer: ' + secondsRemaining;
        if (secondsRemaining == 0) {
            clearInterval(timerInterval);
            timerEl.textContent = 'Timer: ' + secondsRemaining;
            enterScore();
        }
    }, 1000);
};

function gamestart() {
    startButtonEl.classList.add('hide');
    timer();
    questions.sort(() => Math.random() - 0.5);
    console.log('QUESTIONS: ', questions)
    currentQuestion = questions[i];
    questionAsker();
};

questionAsker = () => {
    if (questionArray.length >= questions.length || secondsRemaining == 0) {
        enterScore();
    } else {
        textEl.replaceWith(aList);
        currentQuestion = questions[i];
        questionArray.push(questions[i]);
        headerEl.innerHTML = questions[i].question;
        answerButton1.innerHTML = questions[i].answers.a;
        answerButton2.innerHTML = questions[i].answers.b;
        answerButton3.innerHTML = questions[i].answers.c;
        answerButton4.innerHTML = questions[i].answers.d;
        aList.appendChild(answerButton1);
        aList.appendChild(answerButton2);
        aList.appendChild(answerButton3);
        aList.appendChild(answerButton4);
        console.log('value of i: ', i);
        console.log('CURRENT Q: ', currentQuestion);
    };
};

addEventListener('load', () => {
    if (headerEl) {
        headerEl.textContent = 'Welcome to the JavaScript Code Quiz'
    };
    if (textEl) {
        textEl.innerHTML = 'You have 60 seconds to complete the quiz. Each wrong answer will decrease your time by 5 seconds. Correct answers will increase your score by one. At the end of the quiz, you may input your initials to save your high score. Good luck and have fun!'
    };
    if (hideEl) {
        hideEl.classList.remove('hide');
    };
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('answer-button')) {
        console.log('answer buttons work');
        if (e.target.classList.contains(currentQuestion.correctAnswer)) {
            console.log('CORRECT ANSWER WORKING')
            score++;
            if (result.classList.contains('wrong')) {
                result.classList.remove('wrong');
            };
            result.classList.add('correct');
            result.textContent = 'Correct!'
            setTimeout(function() {
                result.textContent = ''
            }, 1000);
            i++;
            questionAsker();
        } else {
            console.log('WRONG ANSWER WORKING')
            secondsRemaining -= 5;
            result.classList.remove('correct');
            result.classList.add('wrong');
            result.textContent = 'Wrong!'
            setTimeout(function() {
                result.textContent = ''
            }, 1000);
            i++;
            questionAsker();
        };
    }
});

loadHighScores = () => {
    window.open('scores.html', '_self');
};

if (highScoreButtonEl) {
    highScoreButtonEl.addEventListener('click', loadHighScores);
};

if (startButtonEl) {
    startButtonEl.addEventListener('click', gamestart);
};