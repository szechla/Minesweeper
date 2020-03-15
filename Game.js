class Game {
    constructor(size, numOfMines) {
        this.board = new Board(size, numOfMines);
    }
        
    /** 
     * Initializes game. 
     */
    startGame(){
        this.clearGame();
        hideElementsInGame()
        document.getElementById("gameBoard").style.display = "inherit"
        this.board.drawHTMLBoard(size);
        this.board.setFieldsValue();
        this.ready = true;
        setTimer();
    }
    clearGame(){
        clickCounter = 0;
        document.getElementById("clickCounter").innerHTML = `Clicks: ${clickCounter}`;
        document.getElementById("mask").innerHTML = "";
        this.board = new Board(size, numOfMines);
    }
        
    /** 
     * Displays win info 
     */
    winGame(winMessage){
        stopTimer();
        alert(winMessage);
    }
    
    /** 
     * Displays gameOver info.
     * @param   {String}    message - Game over message.      
     */
    gameOver(loseMessage) {
        const allFields = document.getElementsByClassName("field");
        for (let i=0; i<allFields.length; i++){
            const fieldValue = document.getElementById(`${allFields[i].id}-text`)
            fieldValue.style.display = 'initial';
            if(fieldValue.innerHTML === ""){                
                this.board.drawSVGImage("bomb", allFields[i])
            }
        }
        stopTimer();
        alert(loseMessage)
		// document.getElementById('game-over').style.display = 'block';
        // document.getElementById('game-over').textContent = loseMessage;
    }
}