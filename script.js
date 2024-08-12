// script.js

const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    // Additional questions can be added here
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

startGame();

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.addEventListener('click', setNextQuestion);
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    answerButtonsElement.innerHTML = '';
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
        scoreElement.innerText = score;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        nextButton.style.display = 'block';
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.innerText = `Game Over! Your final score is ${score}.`;
    answerButtonsElement.innerHTML = '';
    nextButton.style.display = 'none';
}

