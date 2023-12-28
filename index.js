const GameBoard = (function () {
    let board = Array(3 * 3).fill("");

    const setMove = (position, player) => {
        if (board[position] === "") {
            board[position] = player;
            return true;
        }
        return false;
    };

    const getBoard = () => {
        return board;
    };

    const resetBoard = () => {
        board = Array(3 * 3).fill("");
    };

    return { setMove, getBoard, resetBoard };
})();

function createPlayer(symbol) {
    const getSymbol = () => {
        return symbol;
    };

    return { getSymbol };
}

const playerX = createPlayer("X");
const playerO = createPlayer("O");

const Game = (function () {
    let isGameOver = false;
    let currentPlayer = playerX;

    function checkWinner() {
        const board = GameBoard.getBoard();
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

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (!board.includes("")) {
            return "Tie";
        }

        return false;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }

    const makeMove = position => {
        if (isGameOver) {
            console.log("Game is over. Please reset the board.");
            return;
        }

        if (GameBoard.setMove(position, currentPlayer.getSymbol())) {
            const winner = checkWinner();

            if (winner) {
                isGameOver = true;
                console.log(
                    winner === "Tie" ? "It's a Tie!" : `Player ${winner} wins!`
                );
            } else {
                switchPlayer();
            }
        } else {
            console.log("Invalid move. Try another position.");
        }
    };

    const resetGame = () => {
        isGameOver = false;
        GameBoard.resetBoard();
        currentPlayer = playerX;
    }

    return {makeMove, resetGame}
})();