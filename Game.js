class Game {
    constructor(size, numOfMines) {
        this.board = new Board(size, numOfMines);
    }
        
    /** 
     * Initializes game. 
     */
    startGame(){
        this.board.drawHTMLBoard(size);
        this.ready = true;
    }
        
    /** 
     * Displays win info 
     */

    winGame(winMessage){
        alert(winMessage)
    }
    
    /** 
     * Displays gameOver info.
     * @param   {String}    message - Game over message.      
     */
    gameOver(loseMessage) {
        alert("Game Over")
		// document.getElementById('game-over').style.display = 'block';
        // document.getElementById('game-over').textContent = loseMessage;
    }
}