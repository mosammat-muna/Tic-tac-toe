/*This script manages the game logic for a Tic Tac Toe game, including turn 
handling, win checking, and updating the user interface based on player interactions.*/

// Define constants for the two classes representing X and Circle
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

// Define all possible winning combinations for the game
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Center column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Select all cells and store in a NodeList
const cellElements = document.querySelectorAll('[data-cell]');
// Select the board element
const board = document.getElementById('board');
// Select the winning message element
const winningMessageElement = document.getElementById('winningMessage');
// Select the restart button
const restartButton = document.getElementById('restartButton');
// Select the element for displaying winning messages
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

// Variable to track whose turn it is
let circleTurn;

// Initialize the game
startGame();

// Add an event listener to the restart button to restart the game when clicked
restartButton.addEventListener('click', startGame);

// Function to start or restart the game
function startGame() {
  circleTurn = false; // Start with X's turn
  cellElements.forEach(cell => {
    // Remove existing marks from cells
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    // Remove previous click event listeners
    cell.removeEventListener('click', handleClick);
    // Add click event listener for the current game state
    cell.addEventListener('click', handleClick, { once: true });
  });
  // Set the board hover class based on whose turn it is
  setBoardHoverClass();
  // Hide the winning message
  winningMessageElement.classList.remove('show');
}

// Function to handle cell clicks
function handleClick(e) {
  const cell = e.target;
  // Determine the current class based on whose turn it is
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // Place the mark (X or O) in the clicked cell
  placeMark(cell, currentClass);
  // Check for a win or draw
  if (checkWin(currentClass)) {
    endGame(false); // End the game with a win
  } else if (isDraw()) {
    endGame(true); // End the game with a draw
  } else {
    // Swap turns and update the board hover class
    swapTurns();
    setBoardHoverClass();
  }
}

// Function to handle end of the game
function endGame(draw) {
  if (draw) {
    // Display a draw message if there is no winner
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    // Display the winner based on whose turn it was
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  // Show the winning message
  winningMessageElement.classList.add('show');
}

// Function to check if the game is a draw
function isDraw() {
  // Check if all cells are filled with X or O
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

// Function to place a mark (X or O) in a cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Function to swap turns between X and O
function swapTurns() {
  circleTurn = !circleTurn;
}

// Function to set the hover class on the board based on whose turn it is
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// Function to check if there is a winning combination
function checkWin(currentClass) {
  // Check if any of the winning combinations are met
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
