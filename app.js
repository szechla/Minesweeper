let sizeInput = document.getElementById("gameSizeInput");
const fieldSize = 50;
let clickCounter = 0;
var timer;
let size;
let game;
let numOfMines;
let level = "medium";
const elToHide = document.getElementsByClassName("hideInGame");

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

// Additional functions

// Hide el when game is ready
function hideElementsInGame(){
    for (i=0; i<elToHide.length; i++){
        elToHide[i].className = "hide"
    }
}

// Set level
function setLevel(diff){
    level = diff;
}

// Set number of mines
function setNumOfMines(level){
    console.log(level)
    switch(level){
        case "easy":
            return (size - 1);
        case "medium":
            return 2*(size - 1);
        case "hard":
            return 3*(size - 1);
    }
}

// Start timer
function setTimer(){
    window.clearInterval(timer)
    let date = new Date();
    document.getElementById("timer").innerHTML = `Time: 0 sec`;
    timer = window.setInterval(() => {
        let nd = new Date();
        let time = Math.floor(0.001*(nd-date))
        document.getElementById("timer").innerHTML = `Time: ${time} sec`;
    }, 1000)
}

// Stop timer
function stopTimer(){
    window.clearInterval(timer)
}