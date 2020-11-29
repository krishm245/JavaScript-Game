const X_turn = "x";
const O_turn = "o";
let cirlceTurn = true;
const cellElements = document.querySelectorAll("[data-cell]");
const resutMesage = document.querySelector("[result-message]");
const resultScreen = document.getElementById("resultScreen");
const restartbutton = document.getElementById("playAgain");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleChange, { once: true });
});

restartbutton.addEventListener("click", restartGame);

function restartGame() {
  location.reload();
}

function handleChange(e) {
  const cell = e.target;
  const currentClass = cirlceTurn ? O_turn : X_turn;
  placeSymbol(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swap();
  }
}

function endGame(draw) {
  if (draw) {
    resutMesage.innerText = "Draw";
  } else {
    resutMesage.innerText = `${cirlceTurn ? "O " : "X "}Wins!`;
  }
  resultScreen.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_turn) || cell.classList.contains(O_turn);
  });
}

function placeSymbol(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swap() {
  cirlceTurn = !cirlceTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
