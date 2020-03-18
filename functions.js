let sizeInput = document.getElementById("gameSizeInput");
const fieldSize = 50;
let clickCounter = 0;
var timer;
let size;
let game;
let numOfMines;
let level = "medium";
const elToHide = document.getElementsByClassName("hideInGame");

/* ------------------- 
------FUNCTIONS-------
------------------- */

// Hide el when game is ready
function hideElementsInGame(){
    for (i=0; i<elToHide.length; i++){
        elToHide[i].classList.add("hide");
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