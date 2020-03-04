// 1. Create 2-sided field
    // Create base field
        // x, y
        // Number field
        // Mine field
// 2. Create clock
const size = 6;
const numOfMines = 8;
const fieldSize = 50;

const game = new Game(size, numOfMines);

/** 
 * Listens for click on `#beginGame` and calls startGame() on game object
 */
document.getElementById('beginGame').addEventListener('click', function(){
    game.startGame();
    this.style.display = 'none';
    document.getElementById('gameBoard').style.opacity = '1';
});

// Handle mouse click events
document.getElementById('mask').addEventListener("click", ()=>game.board.showValue())
document.getElementById('mask').addEventListener("contextmenu", ()=>game.board.markMine())
