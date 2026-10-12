
const Gameboard = (() => {
    let board = Array(9).fill("")

    const getBoard = () => board

    const placeMark = (index, mark) => {
        if (!Number.isInteger(index) || index < 0 || index > 8) {
            return false
        }

        if (board[index] !== "") {
            return false
        }

        board[index] = mark
        return true
    }

    const reset = () => {
        board = Array(9).fill("")
    }

    return { getBoard, placeMark, reset }
})()

const Player = (name, mark, isAI = false) => ({
    name,
    mark,
    isAI
})

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const AI = (() => {
    const getAvailableMoves = board =>
        board.reduce((moves, cell, index) => {
            if (cell === "") moves.push(index)
            return moves
        }, [])

    const getWinner = board => {
        for (const [a, b, c] of WINNING_COMBINATIONS) {
            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[b] === board[c]
            ) {
                return board[a]
            }
        }

        return null
    }

    const findWinningMove = (board, mark) => {
        for (const index of getAvailableMoves(board)) {
            board[index] = mark
            const wins = getWinner(board) === mark
            board[index] = ""

            if (wins) return index
        }

        return null
    }

    const randomMove = board => {
        const moves = getAvailableMoves(board)

        if (moves.length === 0) return null

        return moves[Math.floor(Math.random() * moves.length)]
    }

    const chooseEasyMove = board => randomMove(board)

    const chooseMediumMove = board => {
        const winningMove = findWinningMove(board, "O")
        if (winningMove !== null) return winningMove

        const blockingMove = findWinningMove(board, "X")
        if (blockingMove !== null) return blockingMove

        if (board[4] === "") return 4

        const corners = [0, 2, 6, 8].filter(
            index => board[index] === ""
        )

        if (corners.length > 0) {
            return corners[Math.floor(Math.random() * corners.length)]
        }

        return randomMove(board)
    }

    const minimax = (board, isMaximizing, depth) => {
        const winner = getWinner(board)

        if (winner === "O") return 10 - depth
        if (winner === "X") return depth - 10

        const moves = getAvailableMoves(board)
        if (moves.length === 0) return 0

        if (isMaximizing) {
            let bestScore = -Infinity

            for (const index of moves) {
                board[index] = "O"
                const score = minimax(board, false, depth + 1)
                board[index] = ""
                bestScore = Math.max(bestScore, score)
            }

            return bestScore
        }

        let bestScore = Infinity

        for (const index of moves) {
            board[index] = "X"
            const score = minimax(board, true, depth + 1)
            board[index] = ""
            bestScore = Math.min(bestScore, score)
        }

        return bestScore
    }

    const chooseHardMove = board => {
        const moves = getAvailableMoves(board)
        let bestMove = null
        let bestScore = -Infinity

        for (const index of moves) {
            board[index] = "O"
            const score = minimax(board, false, 0)
            board[index] = ""

            if (score > bestScore) {
                bestScore = score
                bestMove = index
            }
        }

        return bestMove
    }

    const chooseMove = (board, difficulty) => {
        const simulatedBoard = [...board]

        if (difficulty === "easy") {
            return chooseEasyMove(simulatedBoard)
        }

        if (difficulty === "medium") {
            return chooseMediumMove(simulatedBoard)
        }

        return chooseHardMove(simulatedBoard)
    }

    return { chooseMove }
})()

const Game = (player1, player2, mode, difficulty) => {
    let currentPlayer = player1
    let gameOver = false
    let gameResult = null
    let winner = null

    const getCurrentPlayer = () => currentPlayer
    const getGameResult = () => gameResult
    const getWinner = () => winner

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1
    }

    const checkWinner = mark =>
        WINNING_COMBINATIONS.some(combination =>
            combination.every(
                index => Gameboard.getBoard()[index] === mark
            )
        )

    const checkTie = () =>
        Gameboard.getBoard().every(cell => cell !== "")

    const finishTurn = player => {
        if (checkWinner(player.mark)) {
            winner = player
            gameResult = "WIN"
            gameOver = true
            return true
        }

        if (checkTie()) {
            gameResult = "TIE"
            gameOver = true
            return true
        }

        return false
    }

    const playRound = index => {
        if (gameOver) return false

        const player = currentPlayer

        if (!Gameboard.placeMark(index, player.mark)) {
            return false
        }

        if (finishTurn(player)) return true

        if (mode === "ai") {
            currentPlayer = player2

            const aiIndex = AI.chooseMove(
                Gameboard.getBoard(),
                difficulty
            )

            if (aiIndex !== null) {
                Gameboard.placeMark(aiIndex, player2.mark)
                finishTurn(player2)
            }

            if (!gameOver) currentPlayer = player1
        } else {
            switchPlayer()
        }

        return true
    }

    const reset = () => {
        Gameboard.reset()
        currentPlayer = player1
        gameOver = false
        gameResult = null
        winner = null
    }

    return {
        getCurrentPlayer,
        getGameResult,
        getWinner,
        playRound,
        reset
    }
}

const GameDisplayController = (() => {
    let game

    const gameBoardDisplay = document.querySelector(".game-board")
    const gameStatus = document.querySelector(".game-status")
    const modal = document.querySelector(".modal")

    const render = () => {
        gameBoardDisplay.innerHTML = ""

        const board = Gameboard.getBoard()

        if (!game) {
            gameStatus.textContent = ""
        } else if (game.getGameResult() === "WIN") {
            gameStatus.textContent = `${game.getWinner().name} Wins!`
            gameStatus.classList.remove("tie")
            gameStatus.classList.add("winner")
        } else if (game.getGameResult() === "TIE") {
            gameStatus.textContent = "This is a tie"
            gameStatus.classList.remove("winner")
            gameStatus.classList.add("tie")
        } else {
            gameStatus.textContent =
                `${game.getCurrentPlayer().name}'s turn`
            gameStatus.classList.remove("winner", "tie")
        }

        board.forEach((cell, index) => {
            const cellElement = document.createElement("div")
            cellElement.classList.add("cell")
            cellElement.dataset.index = index
            cellElement.textContent = cell

            if (cell === "X") cellElement.classList.add("player-x")
            if (cell === "O") cellElement.classList.add("player-o")

            cellElement.addEventListener("click", () => {
                if (!game || game.getGameResult()) return

                if (game.playRound(index)) {
                    render()
                }
            })

            gameBoardDisplay.appendChild(cellElement)
        })
    }

    const updateSetupFields = () => {
        const mode = document.querySelector("#gameMode").value

        document.querySelector("#player2Field").hidden = mode === "ai"
        document.querySelector("#aiDifficultyField").hidden = mode !== "ai"
    }

    const startGame = () => {
        const mode = document.querySelector("#gameMode").value
        const player1Name = document.querySelector("#player1").value.trim()
        const player2Name = document.querySelector("#player2").value.trim()
        const difficulty = document.querySelector("#difficulty").value

        if (!player1Name) {
            document.querySelector("#player1").focus()
            return false
        }

        if (mode === "human" && !player2Name) {
            document.querySelector("#player2").focus()
            return false
        }

        const player1 = Player(player1Name, "X")
        const player2 = mode === "ai"
            ? Player("AI", "O", true)
            : Player(player2Name, "O")

        Gameboard.reset()
        game = Game(player1, player2, mode, difficulty)

        return true
    }

    document.querySelector(".new-game-btn").addEventListener("click", () => {
        modal.showModal()
    })

    document.querySelector(".close-modal").addEventListener("click", () => {
        modal.close()
    })

    document.querySelector("#gameMode").addEventListener("change", updateSetupFields)

    document.querySelector(".start-game").addEventListener("click", () => {
        if (startGame()) {
            modal.close()
            render()
        }
    })

    document.querySelector(".reset-game-btn").addEventListener("click", () => {
        if (!game) return

        game.reset()
        render()
    })

    updateSetupFields()
    render()

    return { render, startGame }
})()
