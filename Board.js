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
        if (target.getAttributeNS(null, "class") != 'fieldMarked' && target.getAttributeNS(null, "class") != 'fieldImg'){
            if(target.getAttributeNS(null, "type") === 'mine'){
                target.setAttribute("class", "mineField");
                game.gameOver();
            }
            else{
                target.setAttribute("class", "numberField");
                document.getElementById(`${event.target.id}-text`).style.display = 'initial';                
            }
        }
    }

    markMine(){
        // handle right MB click
        const target = document.getElementById(`${event.target.id}`)
        const targetText = document.getElementById(`${event.target.id}-text`)
        event.preventDefault();
        // Click on flag
        if(target.getAttribute("class") === 'fieldImg'){
            const prevTarget = document.getElementById(`${target.id.substring(0, target.id.length-4)}`)
            target.remove()
            prevTarget.setAttribute("class", "field");
        }
        // Click on unmarked field
        else if(target.getAttribute("class") != 'fieldMarked'){
            target.setAttribute("class", "fieldMarked");
            this.drawImage("flag", target)
        }
        // Click on marked field
        else{
            target.setAttribute("class", "field");
            document.getElementById(`${target.id}-img`).remove();
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
    }

    drawImage(imgName, target){
        const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
        img.setAttributeNS(null, "href", `img/${imgName}.png`);
        img.setAttributeNS(null, "id", `${target.id}-img`);
        img.setAttributeNS(null, "width", 0.7*target.getAttributeNS(null, "width"));
        img.setAttributeNS(null, "height", 0.7*target.getAttributeNS(null, "height"));
        img.setAttributeNS(null, "x", (parseFloat(target.getAttributeNS(null, "x"))+0.15*parseFloat(target.getAttributeNS(null, "width"))));
        img.setAttributeNS(null, "y", (parseFloat(target.getAttributeNS(null, "y"))+0.15*parseFloat(target.getAttributeNS(null, "height"))));
        img.setAttributeNS(null, "class", 'fieldImg');
        const targetField = document.getElementById(target.id);
        targetField.insertAdjacentElement("afterend", img);
    }

    setFieldsValue(){
        for (let column of this.fields) {
            for (let field of column) {
                document.getElementById(`${field.id}-text`).textContent = field.setFieldValue();
            }
        }
    }
}