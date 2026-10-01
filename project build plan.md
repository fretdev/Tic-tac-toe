# INDIVIDUAL COMPONENTS OF THE GAME

## 1. Gameboard Module

- Creates and stores the 3x3 board as an array.
- Provides access to the current board.
- Checks whether a cell is free before placing a mark.
- Places a mark ("X" or "O") if a cell is free.
- Resets the board.
- Keeps the board state private.

## 2. Player Factory

- Creates player objects.
- Assigns each player a name.
- Assigns each player a mark ("X" or "O").
- Allows multiple player objects to be created.

## 3. Game Module

- Takes two players as its parameters.
- Assigns the current player to one of the players at the start of the game.
- Initializes a `gameOver` variable as `false` to keep track of the game state.
- Exposes the current player through the `getCurrentPlayer` method while keeping the `currentPlayer` variable private.
- Enables player switching throughout the game through a private `switchPlayer` method.
- Stores all possible winning combinations in a `winningCombinations` array.
- Checks for a winner by using the `some()` array method on the `winningCombinations` array to determine whether all three positions in any combination contain the current player's mark.
- Checks for a tie by checking the board for any empty cells. If there are no empty cells, the game is a tie.
- Enables the two players to play rounds through the `playRound` method. The method takes an index representing the position on the Gameboard where the current player's mark should be placed.
- The `playRound` method first checks the `gameOver` state. If it is `true`, the method stops the players from playing any more rounds. If it is `false`, the player is allowed to attempt a move.
- The `playRound` method creates a `moveSuccessful` variable to track whether the mark was successfully placed on the Gameboard.
- If the move is successful, the method checks for a winner. If there is a winner, `gameOver` is changed to `true` and the game ends.
- If there is no winner, the method checks for a tie. If there is a tie, `gameOver` is changed to `true` and the game ends.
- If there is no winner or tie, the current player is switched so the other player can play.
- The `playRound` method returns `moveSuccessful`.
- Finally, the `Game` module exposes the `playRound` and `getCurrentPlayer` methods.
