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
        // Additional questions
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
        // Additional questions
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
        // Additional questions
    ]
};

let selectedCategory = "general";
let selectedDifficulty = "easy";
let currentQuestionIndex = 0;
let score = 0;

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

startButton.addEventListener('click', startGame);

function startGame() {
    selectedCategory = categorySelect.value;
    selectedDifficulty = difficultySelect.value;
    currentQuestionIndex = 0;
    score = 0;
    startButton.parentElement.classList.add('hidden');
    categorySelect.parentElement.classList.add('hidden');
    difficultySelect.parentElement.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    controlsContainer.classList.remove('hidden');
    scoreContainer.classList.remove('hidden');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    const filteredQuestions = questions[selectedCategory].filter(q => q.difficulty === selectedDifficulty);
    showQuestion(filteredQuestions[currentQuestionIndex]);
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
}

function selectAnswer(answer, question) {
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

function showResults() {
    questionElement.innerText = `Game Over! Your final score is ${score}.`;
    answerButtonsElement.innerHTML = '';
    nextButton.style.display = 'none';
}
