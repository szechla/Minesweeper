class Game {
    constructor(size, numOfMines) {
        this.board = new Board(size, numOfMines);
    }
        
    /** 
     * Initializes game. 
     */
    startGame(){
        this.board.drawHTMLBoard(size);
        this.board.setFieldsValue();
        this.ready = true;
    }
        
    /** 
     * Displays win info 
     */
    winGame(winMessage){
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
        alert(loseMessage)
		// document.getElementById('game-over').style.display = 'block';
        // document.getElementById('game-over').textContent = loseMessage;
    }
}