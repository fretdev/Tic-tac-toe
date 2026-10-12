# INDIVIDUAL COMPONENTS OF THE GAME

## 1. Gameboard Module

- Creates and stores the 3×3 game board as an array containing nine cells.
- Provides access to the current board through the `getBoard()` method.
- Checks whether a cell is available before placing a mark.
- Places a mark (`"X"` or `"O"`) in an empty cell through the `placeMark()` method.
- Prevents moves at invalid indices and moves into occupied cells.
- Resets all cells to their initial empty state through the `reset()` method.
- Keeps the board state private within an Immediately Invoked Function Expression (IIFE).
- Exposes only the methods required to interact with the board.

## 2. Player Factory

- Creates player objects through the `Player()` factory function.
- Assigns each player a name.
- Assigns each player a mark (`"X"` or `"O"`).
- Supports creating multiple player objects.
- Includes an optional `isAI` property to identify computer-controlled players.

## 3. AI Module

- Implements the computer opponent's decision-making logic independently of the game display.
- Identifies available moves by finding empty cells on the board.
- Checks for a winner by evaluating the predefined winning combinations.
- Provides an Easy difficulty level that selects a random available move.
- Provides a Medium difficulty level that prioritizes winning moves, blocks the human player's immediate winning opportunities, prefers the center when available, and then considers available corners before choosing randomly.
- Provides a Hard difficulty level that uses the Minimax algorithm to evaluate possible future game states.
- Uses `"O"` as the AI's mark and `"X"` as the human player's mark.
- Assigns scores to terminal game states to prioritize wins, avoid losses, and prefer faster wins or delayed losses.
- Simulates possible moves on a copy of the board so that evaluating moves does not permanently change the actual game state.
- Selects a move according to the difficulty level chosen by the player.
- Exposes the `chooseMove()` method for the Game module to request the AI's next move.

## 4. Game Module

- Takes two player objects, a game mode, and an AI difficulty level as its parameters.
- Assigns the first player as the current player at the beginning of a game.
- Initializes private variables to track the current player, whether the game has ended, the game result, and the winner.
- Exposes the current player through the `getCurrentPlayer()` method while keeping the `currentPlayer` variable private.
- Stores the possible winning combinations in a shared `WINNING_COMBINATIONS` array.
- Checks for a winner by evaluating whether all three positions in any winning combination contain the same non-empty mark.
- Checks for a tie by determining whether every cell on the board is occupied when no winner has been found.
- Allows players to make moves through the `playRound()` method, which accepts an index representing the selected board position.
- Prevents moves when the game has already ended.
- Attempts to place the current player's mark on the board and rejects invalid moves.
- Checks for a win or tie after a successful move.
- Records the winning player and updates the game result when a player wins.
- Ends the game when a player wins or when the board is full without a winner.
- Switches turns between the two human players in Human vs. Human mode.
- Automatically requests and executes an AI move after a successful human move in Human vs. AI mode, provided the game has not already ended.
- Returns control to the human player after the AI's turn when the game continues.
- Exposes the `getGameResult()` and `getWinner()` methods to retrieve the outcome of the game.
- Provides a `reset()` method that resets the board, restores the first player as the current player, and clears the previous result and winner.

## 5. Game Display Controller

- Manages the interaction between the game logic and the user interface.
- Renders the board by creating a cell element for each of the nine board positions.
- Displays each player's mark with distinct styling for X and O.
- Displays whose turn it is while the game is in progress.
- Displays the winner or a tie message when the game ends.
- Handles board-cell clicks and passes the selected cell index to the Game module.
- Updates the display after a successful move.
- Prevents further moves through the interface once the game has ended.
- Reads the selected game mode, player names, and AI difficulty from the setup modal.
- Displays the player-two name field only in Human vs. Human mode.
- Displays the AI difficulty selector only in Human vs. AI mode.
- Validates the required player names before starting a game.
- Initializes a new game using the selected settings.
- Opens and closes the setup modal through the appropriate buttons.
- Allows the current game to be restarted without requiring the user to configure a new game.

## 6. Game Setup Modal

- Provides an interface for configuring a new game before play begins.
- Allows the user to select between Human vs. AI and Human vs. Human modes.
- Accepts the human player's name.
- Accepts a second player's name when Human vs. Human mode is selected.
- Allows the user to choose Easy, Medium, or Hard AI difficulty in Human vs. AI mode.
- Provides brief descriptions of the AI difficulty options.
- Dynamically displays or hides the relevant fields according to the selected game mode.
- Provides controls to start the game or cancel the setup.
- Uses responsive styling to adapt the modal to different screen sizes.

## 7. Styling and Responsive Layout

- Uses CSS custom properties to maintain a consistent color palette and reusable design values.
- Uses Flexbox and CSS Grid to align the game interface and arrange the board.
- Uses a responsive grid to maintain the board's three-column layout across screen sizes.
- Uses distinct colors to differentiate X and O.
- Styles the buttons, player inputs, modal, and difficulty selector consistently with the overall design.
- Uses media queries to adapt spacing and board dimensions to smaller screens and shorter browser windows.
- Keeps the game interface centered within the available viewport.
- Allows the modal to scroll internally when its content cannot fit within a short viewport.
- Includes visible keyboard focus styles and reduced-motion preferences to improve accessibility.

## 8. Game Rules and Expected Behaviour

- The game is played on a 3×3 board.
- The first player uses X, and the second player or AI uses O.
- A player wins by placing three matching marks in a horizontal, vertical, or diagonal line.
- If all nine cells are occupied and neither player has won, the game ends in a tie.
- A cell cannot be occupied by more than one mark.
- No additional moves are accepted after a win or tie.
- Human vs. AI mode automatically triggers the AI's turn after a valid human move, unless the game has already ended.
- Easy mode makes random moves, Medium mode uses tactical priorities, and Hard mode uses Minimax to select an optimal move.
- The Restart button clears the current board and starts the same configured game again.

## Conclusion

The project combines modular JavaScript, private game state, DOM manipulation, event handling, responsive CSS, and AI decision-making. It supports both human-versus-human and human-versus-AI gameplay, with three AI difficulty levels. The Minimax implementation enables the Hard AI to play optimally, meaning it should never lose when implemented correctly, although a human player can still force a draw.
