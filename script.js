// script.js

const questions = {
    general: [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Paris", correct: true },
                { text: "London", correct: false },
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false }
            ],
            difficulty: "easy"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Mars", correct: true },
                { text: "Venus", correct: false },
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: false }
            ],
            difficulty: "medium"
        },
        // Additional questions for General Knowledge
        {
            question: "What is the largest mammal?",
            answers: [
                { text: "Blue Whale", correct: true },
                { text: "Elephant", correct: false },
                { text: "Giraffe", correct: false },
                { text: "Orca", correct: false }
            ],
            difficulty: "hard"
        },
    ],
    science: [
        {
            question: "What is the chemical symbol for water?",
            answers: [
                { text: "H2O", correct: true },
                { text: "O2", correct: false },
                { text: "CO2", correct: false },
                { text: "HO2", correct: false }
            ],
            difficulty: "easy"
        },
        // Additional questions for Science
        {
            question: "What planet is known as the 'Morning Star'?",
            answers: [
                { text: "Venus", correct: true },
                { text: "Mars", correct: false },
                { text: "Jupiter", correct: false },
                { text: "Saturn", correct: false }
            ],
            difficulty: "medium"
        },
    ],
    history: [
        {
            question: "Who was the first President of the United States?",
            answers: [
                { text: "George Washington", correct: true },
                { text: "Thomas Jefferson", correct: false },
                { text: "Abraham Lincoln", correct: false },
                { text: "John Adams", correct: false }
            ],
            difficulty: "easy"
        },
        // Additional questions for History
        {
            question: "In which year did World War II end?",
            answers: [
                { text: "1945", correct: true },
                { text: "1939", correct: false },
                { text: "1918", correct: false },
                { text: "1965", correct: false }
            ],
            difficulty: "medium"
        },
    ]
};

let selectedCategory = "general";
let selectedDifficulty = "easy";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const startButton = document.getElementById('start-btn');
const categorySelect = document.getElementById('category');
const difficultySelect = document.getElementById('difficulty');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const scoreContainer = document.getElementById('score-container');
const controlsContainer = document.getElementById('controls');
const timerElement = document.getElementById('timer');
const timerContainer = document.getElementById('timer-container');

startButton.addEventListener('click', startGame);

function startGame() {
    selectedCategory = categorySelect.value;
    selectedDifficulty = difficultySelect.value;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    startButton.parentElement.classList.add('hidden');
    categorySelect.parentElement.classList.add('hidden');
    difficultySelect.parentElement.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    controlsContainer.classList.remove('hidden');
    scoreContainer.classList.remove('hidden');
    timerContainer.classList.remove('hidden');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    const filteredQuestions = questions[selectedCategory].filter(q => q.difficulty === selectedDifficulty);
    showQuestion(filteredQuestions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, question));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    answerButtonsElement.innerHTML = '';
    clearInterval(timer);
    timerElement.innerText = "30";
    timeLeft = 30;
}

function selectAnswer(answer, question) {
    clearInterval(timer);
    if (answer.correct) {
        score++;
        scoreElement.innerText = score;
    }
    currentQuestionIndex++;
    const filteredQuestions = questions[selectedCategory].filter(q => q.difficulty === selectedDifficulty);
    if (currentQuestionIndex < filteredQuestions.length) {
        nextButton.style.display = 'block';
    } else {
        showResults();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer({ correct: false }, null);  // If time runs out, treat as incorrect answer
        }
    }, 1000);
}

function showResults() {
    questionElement.innerText = `Game Over! Your final score is ${score}.`;
    answerButtonsElement.innerHTML = '';
    nextButton.style.display = 'none';
    timerContainer.classList.add('hidden');
}
