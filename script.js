const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const gameContainer = document.querySelector('#game');
const countdownContainer = document.querySelector('#countdown');
const resultContainer = document.querySelector('#result');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const answerInput = document.querySelector('#answer');
const submitButton = document.querySelector('#submit');
let timerInput = document.querySelector('#timer');
let timer = 0;
let score = 0;
let questionCount = 0;
let intervalId;
let currentAlphabet;

function startGame() {
    timer = timerInput.value;
    timerInput.disabled = true;
    startButton.disabled = true;
    resetButton.disabled = true;
    answerInput.disabled = false;
    submitButton.disabled = false;
    answerInput.focus();

    intervalId = setInterval(() => {
        timer--;
        if (timer <= 0) {
            endGame();
        } else {
            displayCountdown();
        }
    }, 1000);

    displayAlphabet();
    displayCountdown();
}

function endGame() {
    clearInterval(intervalId);
    timerInput.disabled = false;
    startButton.disabled = false;
    resetButton.disabled = false;
    answerInput.disabled = true;
    submitButton.disabled = true;

    resultContainer.innerHTML = `You answered ${score} out of ${questionCount} questions correctly.`;
    countdownContainer.innerHTML = '';
}

function displayAlphabet() {
    currentAlphabet = getRandomAlphabet();
    gameContainer.innerHTML = currentAlphabet;
}

function getRandomAlphabet() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function checkAnswer() {
    const answer = answerInput.value.trim();
    answerInput.value = '';
    answerInput.focus();

    if (answer === String(getPosition(currentAlphabet))) {
        score++;
    }

    questionCount++;
    displayAlphabet();
}

function getPosition(letter) {
    return alphabet.indexOf(letter) + 1;
}

function displayCountdown() {
    countdownContainer.innerHTML = `Time left: ${timer} seconds`;
}

startButton.addEventListener('click', startGame);



timerInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        startGame();
    }
});


submitButton.addEventListener('click', () => {
    checkAnswer();
});

answerInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        checkAnswer();
    }
});

resetButton.addEventListener('click', () => {
    timerInput.disabled = false;
    timerInput.value = '';
    startButton.disabled = false;
    resetButton.disabled = false;
    answerInput.disabled = true;
    answerInput.value = '';
    submitButton.disabled = true;
    resultContainer.innerHTML = '';
    countdownContainer.innerHTML = '';
    score = 0;
    questionCount = 0;
});
