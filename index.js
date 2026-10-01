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
                gameOver = true
            } else if(checkTie()){
                gameOver = true
            }
            else{
                switchPlayer()
            }
        }
        return moveSuccessful
    }

    return{
        getCurrentPlayer,
        playRound
    }
}

const player1 = Player("Prosper","X")
const player2 = Player("Mercy","O")

const game = Game(player1,player2)

game.playRound(0)
game.playRound(1)
game.playRound(2)
game.playRound(4)
game.playRound(3)
game.playRound(5)
game.playRound(8)
game.playRound(6)
game.playRound(7)



console.log(game.playRound(0))
console.log(Gameboard.getBoard())