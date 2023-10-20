const scoreElement = document.getElementById("score");

const gameButtons = document.querySelectorAll(".game__button");

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
}

gameButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    const choice = e.target.dataset.choice;
    handleUserSelection(choice);
  })
);
