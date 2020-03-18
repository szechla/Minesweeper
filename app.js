/** 
 * Listens for click on `#beginGame` and calls startGame() on game object
 */
document.getElementById('beginGame').addEventListener('click', function(){
    size = parseInt(sizeInput.value);
    numOfMines = setNumOfMines(level);
    game = new Game(size, numOfMines);
    this.innerHTML = 'Start over';
    game.startGame();
    document.getElementById('gameBoard').style.opacity = '1';
});

// Handle mouse click events
// - Left MB click
document.getElementById('mask').addEventListener("click", ()=>{
    clickCounter++
    document.getElementById("clickCounter").innerHTML = `Clicks: ${clickCounter}`;
    game.board.showValue()
})
// - Right MB Click
document.getElementById('mask').addEventListener("contextmenu", ()=>game.board.markMine())

const welcome = document.getElementById("welcomeText");
console.log(welcome)

// window.setInterval(()=>console.log(welcome.clientHeight), 100)