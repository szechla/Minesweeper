class Board {
    constructor(size) {
        this.rows = size;
        this.columns = size;
        this.fields = this.createFields();
        this.mines = this.createMines(numOfMines);
    }
    
    /** 
     * Generates 2D array of spaces. 
     * @return  {array}     An array of space objects
     */
    createFields() {
        const fields = [];        
		for (let x = 0; x < this.columns; x++) {
			const col = [];			
			for (let y = 0; y < this.rows; y++) {
				const field = new Field(x, y);
				col.push(field);
			}			
			fields.push(col);
		}
        return fields;
    }    

    showValue(){
        const target = document.getElementById(`${event.target.id}`)
        // handle left MB click
        if (target.getAttributeNS(null, "class") != 'fieldMarked'){
            if(target.getAttributeNS(null, "class") === 'mineField'){
                game.gameOver();
            }
            document.getElementById(`${event.target.id}-text`).style.display = 'initial';
        }
    }

    markMine(){
        // handle right MB click
        const target = document.getElementById(`${event.target.id}`)
        const targetText = document.getElementById(`${event.target.id}-text`)
        event.preventDefault();
        console.log("Right click!")
        if(target.getAttribute("class") === 'fieldMarked' && !targetText.textContent){
            target.setAttribute("class", "mineField");
        }
        else if(target.getAttribute("class") === 'fieldMarked' && targetText.textContent){
            target.setAttribute("class", "numerField");
        }
        else{
            target.setAttribute("class", "fieldMarked");
        }
    }

    /** 
     * Creates n mine objects
     * @return  {array}    An array of mine objects.
     * n - number of mines
     */
    createMines(n) {
        // Make n random Fields a mined field
        var mineCounter = 0;
        while(mineCounter<n){
            const x = Math.floor(size*Math.random())
            const y = Math.floor(size*Math.random())
            const selectedField = this.fields[x][y];
            if (!selectedField.mine){
                selectedField.mine = true;
                selectedField.className = 'mineField';
                mineCounter++
            }
        }
    }
    
    /** 
     * Draws associated SVG spaces for all game spaces.
     */
	drawHTMLBoard(size) {
        const mask = document.getElementById("mask");
        mask.style.height = 1.01 * fieldSize * size;
        mask.style.height += ' px'
        mask.style.width = mask.style.height;

        for (let column of this.fields) {
            for (let field of column) {
                field.drawSVGField();
            }
        }
        for (let column of this.fields) {
            for (let field of column) {
                document.getElementById(`${field.id}-text`).textContent = field.setFieldValue();
            }
        }
	} 
}