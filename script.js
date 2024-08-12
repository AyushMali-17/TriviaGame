// script.js

// Constants for game setup and functionality
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
        // Additional questions...
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
        // Additional questions...
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
        // Additional questions...
    ]
};

let selectedCategory = "general";
let selectedDifficulty = "easy";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let highScores = [];
let darkMode = false;
let isMuted = false;
let isMusicMuted = false;

const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');
const timerSound = new Audio('timer.mp3');
const backgroundMusic = new Audio('background.mp3');
backgroundMusic.loop = true;

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
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayText = document.getElementById('overlay-text');
const restartButton = document.getElementById('restart-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const muteSoundButton = document.getElementById('mute-sound');
const muteMusicButton = document.getElementById('mute-music');

startButton.addEventListener('click', startGame);
darkModeToggle.addEventListener('click', toggleDarkMode);
muteSoundButton.addEventListener('click', toggleSound);
muteMusicButton.addEventListener('click', toggleMusic);
restartButton.addEventListener('click', restartGame);

function startGame() {
    console.log("Game started");
    selectedCategory = categorySelect.value;
    selectedDifficulty = difficultySelect.value;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    
    // Ensure the overlay and other elements are properly hidden
    overlay.classList.add('hidden');
    startButton.parentElement.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    controlsContainer.classList.remove('hidden');
    scoreContainer.classList.remove('hidden');
    timerContainer.classList.remove('hidden');
    leaderboardContainer.classList.add('hidden');
    
    setNextQuestion();
    if (!isMusicMuted) backgroundMusic.play();
}

function setNextQuestion() {
    resetState();
    
    const filteredQuestions = questions[selectedCategory].filter(q => q.difficulty === selectedDifficulty);
    
    if (currentQuestionIndex < filteredQuestions.length) {
        showQuestion(filteredQuestions[currentQuestionIndex]);
        startTimer();
    } else {
        showResults();
    }
}

function showQuestion(question) {
    console.log("Showing question:", question.question);
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';  // Clear previous buttons
    
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
    clearInterval(timer);
    timerElement.innerText = "30";
    timeLeft = 30;
}

function selectAnswer(answer) {
    console.log("Answer selected:", answer.text);
    clearInterval(timer);
    
    const filteredQuestions = questions[selectedCategory].filter(q => q.difficulty === selectedDifficulty);
    
    if (answer.correct) {
        score++;
        scoreElement.innerText = score;
        if (!isMuted) correctSound.play();
    } else {
        if (!isMuted) incorrectSound.play();
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < filteredQuestions.length) {
        nextButton.style.display = 'block';
    } else {
        showResults();
    }
}

function startTimer() {
    console.log("Timer started");
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!isMuted) timerSound.play();
            selectAnswer({ correct: false });
        }
    }, 1000);
}

function showResults() {
    console.log("Game over");
    overlayTitle.innerText = "Game Over";
    overlayText.innerText = `Your final score is ${score}.`;
    overlay.classList.remove('hidden');
    updateLeaderboard(score);
    if (!isMusicMuted) backgroundMusic.pause();
}

function updateLeaderboard(newScore) {
    highScores.push(newScore);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);  // Keep only top 5 scores
    displayLeaderboard();
}

function displayLeaderboard() {
    console.log("Displaying leaderboard");
    leaderboardContainer.classList.remove('hidden');
    leaderboardContainer.innerHTML = '<h2>Leaderboard</h2>';
    highScores.forEach((score, index) => {
        const scoreEntry = document.createElement('p');
        scoreEntry.innerText = `${index + 1}. ${score}`;
        leaderboardContainer.appendChild(scoreEntry);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    darkMode = !darkMode;
    darkModeToggle.innerText = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
    console.log("Dark mode toggled:", darkMode);
}

function toggleSound() {
    isMuted = !isMuted;
    muteSoundButton.innerText = isMuted ? "🔇" : "🔈";
    console.log("Sound muted:", isMuted);
}

function toggleMusic() {
    isMusicMuted = !isMusicMuted;
    muteMusicButton.innerText = isMusicMuted ? "🎵 Off" : "🎵 On";
    if (isMusicMuted) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
    console.log("Music muted:", isMusicMuted);
}

function restartGame() {
    console.log("Restarting game");
    overlay.classList.add('hidden');
    startGame();
}
