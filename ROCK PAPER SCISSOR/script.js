const buttons = document.querySelectorAll('.choice-button');
const resultDisplay = document.getElementById('result');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const stopGameButton = document.getElementById('stop-game');
const restartButton = document.getElementById('restart');

let userScore = 0;
let computerScore = 0;
let isGameStopped = false;
let isGameOver = false;
const roundsToWin = 5; // You can adjust this to your desired number of rounds

function computerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function playRound(userChoice) {
    if (isGameStopped || isGameOver) return;

    const computerSelection = computerChoice();

    if (userChoice === computerSelection) {
        resultDisplay.textContent = "It's a tie!";
    } else if (
        (userChoice === 'rock' && computerSelection === 'scissors') ||
        (userChoice === 'scissors' && computerSelection === 'paper') ||
        (userChoice === 'paper' && computerSelection === 'rock')
    ) {
        resultDisplay.textContent = `User wins! ${userChoice} beats ${computerSelection}.`;
        userScore++;
    } else {
        resultDisplay.textContent = `Computer wins! ${computerSelection} beats ${userChoice}.`;
        computerScore++;
    }

    playerScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;

    if (userScore === roundsToWin || computerScore === roundsToWin) {
        endGame();
    }
}

function endGame() {
    isGameOver = true;
    stopGameButton.disabled = true;

    if (userScore > computerScore) {
        resultDisplay.textContent = "User wins the game!";
    } else if (computerScore > userScore) {
        resultDisplay.textContent = "Computer wins the game!";
    } else {
        resultDisplay.textContent = "It's a tie game!";
    }
}

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const userChoice = this.id;
        playRound(userChoice);
    });
});

stopGameButton.addEventListener('click', function () {
    if (!isGameStopped && !isGameOver) {
        isGameStopped = true;
        stopGameButton.disabled = true;
        resultDisplay.textContent = "Game stopped";
    }
});

restartButton.addEventListener('click', function () {
    isGameOver = false;
    isGameStopped = false;
    stopGameButton.disabled = false;
    userScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;
    resultDisplay.textContent = "Game restarted.";
});
