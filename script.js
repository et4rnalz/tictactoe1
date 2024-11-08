const menu = document.getElementById('menu');
const gameScreen = document.getElementById('game-screen');
const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status-text');
const restartButton = document.getElementById('restart-btn');
const aiModeButton = document.getElementById('ai-mode-btn');
const twoPlayerModeButton = document.getElementById('two-player-mode-btn');
const quitButton = document.getElementById('quit-btn');

let oTurn;
let isSinglePlayer = false; // Set based on selected mode

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
        if (isSinglePlayer && oTurn) {
            setTimeout(aiMove, 500);  // AI makes a move after 0.5 seconds
        }
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

// AI move logic
function aiMove() {
    const availableCells = [...cells].filter(cell => cell.textContent === '');
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    placeMark(randomCell, "O");
    if (checkWin("O")) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setStatusText();
    }
}

// Menu event listeners
aiModeButton.addEventListener('click', () => {
    isSinglePlayer = true;
    menu.style.display = 'none';
    gameScreen.style.display = 'block';
    startGame();
});

twoPlayerModeButton.addEventListener('click', () => {
    isSinglePlayer = false;
    menu.style.display = 'none';
    gameScreen.style.display = 'block';
    startGame();
});

restartButton.addEventListener('click', () => {
    menu.style.display = 'block';
    gameScreen.style.display = 'none';
});

quitButton.addEventListener('click', () => {
    alert("Thank you for playing!");
    window.close(); // This may not work on all browsers
});

startGame();
