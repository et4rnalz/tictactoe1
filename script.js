const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status-text');
const restartButton = document.getElementById('restart-btn');

let oTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.textContent = '';  // Clear any text in the cell
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setStatusText();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? "O" : "X";
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setStatusText();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;  // Display X or O in the cell
}

function swapTurns() {
    oTurn = !oTurn;
}

function setStatusText() {
    statusText.innerText = `${oTurn ? "O's" : "X's"} Turn`;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === "X" || cell.textContent === "O";
    });
}

function endGame(draw) {
    if (draw) {
        statusText.innerText = 'Draw!';
    } else {
        statusText.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartButton.addEventListener('click', startGame);

startGame();
