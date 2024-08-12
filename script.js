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
        // Other questions omitted for brevity
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
        // Other questions omitted for brevity
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
        // Other questions omitted for brevity
    ]
};

let selectedCategory = "general";
let selectedDifficulty = "easy";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let highScores = [];

// Sound effects
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');
const timerSound = new Audio('timer.mp3');

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
const leaderboardContainer = document.getElementById('leaderboard-container');

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
    leaderboardContainer.classList.add('hidden');
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
        correctSound.play();
    } else {
        incorrectSound.play();
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
            timerSound.play();
            selectAnswer({ correct: false }, null);  // If time runs out, treat as incorrect answer
        }
    }, 1000);
}

function showResults() {
    questionElement.innerText = `Game Over! Your final score is ${score}.`;
    answerButtonsElement.innerHTML = '';
    nextButton.style.display = 'none';
    timerContainer.classList.add('hidden');
    updateLeaderboard(score);
}

function updateLeaderboard(newScore) {
    highScores.push(newScore);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);  // Keep only top 5 scores
    displayLeaderboard();
}

function displayLeaderboard() {
    leaderboardContainer.classList.remove('hidden');
    leaderboardContainer.innerHTML = '<h2>Leaderboard</h2>';
    highScores.forEach((score, index) => {
        const scoreEntry = document.createElement('p');
        scoreEntry.innerText = `${index + 1}. ${score}`;
        leaderboardContainer.appendChild(scoreEntry);
    });
}
