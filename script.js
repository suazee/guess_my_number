"use strict";

// DECLARING ALL THE VARIABLES OUTSIDE TO MAKE SURE THEY CAN BE AVAILABLE IN ALL THE FUNCTIONS

const bodyEl = document.body;
const btnCheck = document.querySelector(".check");
const btnAgain = document.querySelector(".again");
const guessEl = document.querySelector(".guess");
const messageEl = document.querySelector(".message");
const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");
const numberEl = document.querySelector(".number");

let score = 20;
let highscore = 0;
let secretNumber;
let win;

function secretNumberGenerator() {
  // WHEN THE WEBPAGE IS LOADED, THE RANDOM NUMBER IS FIRST GENERATED.
  secretNumber = Math.floor(Math.random() * 100 + 1);
  // console.log(secretNumber);
  btnCheckActivate();
}

function btnCheckActivate() {
  //  THE USER IS ALLOWED TO INPUT IN GUESSES
  btnCheck.addEventListener("click", gameLogic);
}

function gameLogic() {
  // USER INPUT IS BEING CHECKED AND RESULT IS CHECKED TOO
  if (score > 1) {
    const userGuess = Number(guessEl.value);

    if (userGuess < 1) {
      messageEl.textContent = "⛔ Not a valid number!";
    } else {
      btnCheck.removeEventListener("click", gameLogic);
      if (userGuess === secretNumber) {
        score > highscore ? (highscore = score) : (highscore = highscore);
        win = true;
        gameAnimation(win);
      } else {
        messageEl.textContent =
          userGuess < secretNumber ? "📉 Too low!" : "📈 Too high!";
        score--;
        scoreEl.textContent = score;
        btnCheckActivate();
      }
    }
  } else {
    win = false;
    score--;
    scoreEl.textContent = score;
    gameAnimation(win);
  }
}

function gameAnimation(status) {
  // THIS TAKES CARE OF ALL THE ANIMATIONS IN THE GAME
  highscoreEl.textContent = highscore;
  numberEl.textContent = secretNumber;
  numberEl.classList.add("increase-number");

  if (status) {
    bodyEl.classList.add("correct-guess");
    messageEl.textContent = "🎉 Correct number!";
  } else {
    bodyEl.classList.add("game-over");
    messageEl.textContent = "😟 You lost the game!";
  }
  btnAgain.addEventListener("click", resetGame);
}

function resetGame() {
  // THIS RESETS THE ENTIRE GAME AND CALL THE START GAME FUNCTION
  score = 20;
  scoreEl.textContent = score;
  guessEl.value = "";
  numberEl.textContent = "?";
  messageEl.textContent = "Start guessing...";
  numberEl.classList.remove("increase-number");
  btnAgain.removeEventListener("click", resetGame);

  win
    ? bodyEl.classList.remove("correct-guess")
    : bodyEl.classList.remove("game-over");

  secretNumberGenerator();
}

secretNumberGenerator();
