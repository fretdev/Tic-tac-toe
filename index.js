const Gameboard = (()=>{
    let board = ["","","","","","","","",""]

    const getBoard = ()=> board

    const placeMark = (index,mark)=>{
        if(board[index]===""){
            board[index] = mark
            return true
        }
        else return false
    }

    const reset = ()=>{
        board = ["","","","","","","","",""]
        return true
    }

    return {
        getBoard,
        placeMark,
        reset
    }
})()


const Player = (name,mark)=>{
    return{
        name,
        mark
    }
}


const Game =(player1,player2)=>{
    let currentPlayer = player1
    let gameOver = false
    let gameResult = null

    const getCurrentPlayer = ()=>currentPlayer
    const switchPlayer = ()=>{
        currentPlayer = currentPlayer === player1 ? player2 : player1
    }

    const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

    const  checkWinner = ()=>{
        const board = Gameboard.getBoard()

        return winningCombinations.some(combination =>{
            return(
                board[combination[0]] === currentPlayer.mark &&
                board[combination[1]] === currentPlayer.mark &&
                board[combination[2]] === currentPlayer.mark
            )
        })
    }

    const checkTie = ()=>{
        const board = Gameboard.getBoard()
        return !board.some(cell=>cell === "")
    }

    const playRound = (index)=>{
        if(gameOver){
            return false
        }
        const moveSuccessful = Gameboard.placeMark(index,currentPlayer.mark)
        if(moveSuccessful){
            if(checkWinner()){
                gameResult = "WIN"
                gameOver = true
            } else if(checkTie()){
                gameResult = "TIE"
                gameOver = true
            }
            else{
                switchPlayer()
            }
        }
        return moveSuccessful
    }
    const getGameResult = ()=> gameResult

    const reset = ()=>{
        Gameboard.reset()
        currentPlayer = player1
        gameOver = false
        gameResult = null
    }

    return{
        getCurrentPlayer,
        getGameResult,
        playRound,
        reset
    }
}

const GameDisplayController = (()=>{
    let game
    const render = ()=>{
        const gameBoardDisplay = document.querySelector('.game-board')
        const gameStatus = document.querySelector('.game-status')
        gameBoardDisplay.innerHTML=""
        const gameBoard = Gameboard.getBoard()
        const currentPlayer = game?.getCurrentPlayer()
        const gameResult = game?.getGameResult()

        if(!game){
            gameStatus.textContent = ""
        }else if(gameResult === "WIN"){
            gameStatus.textContent = `${currentPlayer.name} Wins!`
            gameStatus.classList.remove("tie")
            gameStatus.classList.add("winner")
        } else if(gameResult === "TIE"){
            gameStatus.textContent = "This is a tie"
            gameStatus.classList.remove("winner")
            gameStatus.classList.add("tie")
        } else{
            gameStatus.textContent = `${currentPlayer.name}'s turn`
            gameStatus.classList.remove("winner")
            gameStatus.classList.remove("tie")
        }

        gameBoard.forEach((cell,index)=>{
        const cellElement = document.createElement("div")
        cellElement.classList.add("cell")
        cellElement.dataset.index = index
        cellElement.textContent=cell
        cellElement.addEventListener("click",()=>{ 
            if(!game){
                return
            }
            const gameResult = game.getGameResult()
            if(gameResult === "WIN" || gameResult === "TIE"){
                return
            }
            const moveSuccessful = game.playRound(index)
            if(moveSuccessful){
                render()
            }
        })
         gameBoardDisplay.appendChild(cellElement)
    })
    }
    const startGame = ()=>{
        const player1Name = document.getElementById("player1").value.trim()
        const player2Name = document.getElementById("player2").value.trim()
        
        if(!player1Name || !player2Name){
            return
        }
        const player1 = Player(player1Name,"X")
        const player2 = Player(player2Name,"O")

        Gameboard.reset()
        game = Game(player1,player2)
        render()
    }
    const newGameButton = document.querySelector(".new-game-btn")
    newGameButton.addEventListener("click",()=>{
        startGame()
    })
    const restartGameButton = document.querySelector(".reset-game-btn")
    restartGameButton.addEventListener('click',()=>{
        if(!game){
            return
        }
        game.reset()
        render()
    })
    render()
    return{
        render,
        startGame
    }
})()

console.log(Gameboard.getBoard())