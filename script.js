document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const startButton = document.getElementById("start");
    const exitButton = document.getElementById("exit");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const board = document.getElementById("board");
    const rules = document.getElementById("rules");
    const player1ScoreDisplay = document.getElementById("player1Score");
    const player2ScoreDisplay = document.getElementById("player2Score");
    const placeMarkerSound = document.getElementById("placeMarkerSound");
    const winSound = document.getElementById("winSound");
    const tieSound = document.getElementById("tieSound");
    let player1Name = "";
    let player2Name = "";
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let player1Score = 0;
    let player2Score = 0;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.getAttribute("data-index");

        if (gameState[index] !== "" || checkWinner()) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        placeMarkerSound.play();

        if (checkWinner()) {
            winSound.play();
            status.textContent = `${currentPlayer === "X" ? player1Name : player2Name} wins!`;
            if (currentPlayer === "X") {
                player1Score++;
            } else {
                player2Score++;
            }
            updateScoreboard();
            animateWinningCells();
        } else if (gameState.every(cell => cell !== "")) {
            tieSound.play();
            status.textContent = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn`;
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        status.textContent = `${player1Name}'s turn`;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("win-animation");
        });
    }

    function startGame() {
        player1Name = player1Input.value || "Player 1";
        player2Name = player2Input.value || "Player 2";
        status.textContent = `${player1Name}'s turn`;
        player1Input.disabled = true;
        player2Input.disabled = true;
        startButton.classList.add("hidden");
        resetButton.classList.remove("hidden");
        exitButton.classList.remove("hidden");
        board.classList.remove("hidden");
        status.classList.remove("hidden");
        rules.classList.add("hidden");
    }

    function exitGame() {
        player1Input.value = "";
        player2Input.value = "";
        player1Input.disabled = false;
        player2Input.disabled = false;
        startButton.classList.remove("hidden");
        resetButton.classList.add("hidden");
        exitButton.classList.add("hidden");
        board.classList.add("hidden");
        status.classList.add("hidden");
        rules.classList.remove("hidden");
        resetGame();
        resetScores(); // Call the function to reset player scores
    }

    function resetScores() {
        player1Score = 0;
        player2Score = 0;
        updateScoreboard();
    }

    function updateScoreboard() {
        player1ScoreDisplay.textContent = `${player1Name}: ${player1Score}`;
        player2ScoreDisplay.textContent = `${player2Name}: ${player2Score}`;
    }

    function animateWinningCells() {
        const winningCombination = getWinningCombination();
        if (winningCombination) {
            winningCombination.forEach(index => {
                cells[index].classList.add("win-animation");
            });
        }
    }

    function getWinningCombination() {
        return winningCombinations.find(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    startButton.addEventListener("click", startGame);
    exitButton.addEventListener("click", exitGame);
});
