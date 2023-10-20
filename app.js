const scoreElement = document.getElementById("score");

const gameActive = document.getElementById("game-active");
const gameEnd = document.getElementById("game-end");

const gameButtons = document.querySelectorAll(".game__button");

const userChoiceElement = document.getElementById("user-choice");
const gameStatusElement = document.getElementById("game-status");
const computerChoiceElement = document.getElementById("computer-choice");
const restartButton = document.getElementById("restart");

let score = 0;
if (localStorage.getItem("score")) {
  score = localStorage.getItem("score");
}

scoreElement.textContent = score;

let userChoice = "";
let computerChoice = "";
let gameState = "active";

function computerTurn() {
  const randomNumber = generateRandomNumber();
  if (randomNumber <= 3) {
    computerChoice = "rock";
  } else if (randomNumber <= 6) {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * (10 - 1) + 1);
}

function handleUserSelection(choice) {
  userChoice = choice;
  computerTurn();
  // console.log("user " + userChoice, "cpu " + computerChoice);
  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    score++;
    localStorage.setItem("score", score);
    gameState = "win";
  } else if (
    (userChoice === "rock" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "rock")
  ) {
    gameState = "lose";
  } else {
    gameState = "draw";
  }
  renderEndGame();
}

function renderEndGame() {
  scoreElement.textContent = score;
  gameActive.classList.add("hide");
  gameEnd.classList.add("show");
  userChoiceElement.classList.add(`game__button--${userChoice}`);
  gameStatusElement.textContent = gameState;
  computerChoiceElement.classList.add(`game__button--${computerChoice}`);
}

gameButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const choice = e.target.dataset.choice;
    handleUserSelection(choice);
  })
);

restartButton.addEventListener("click", () => location.reload());
