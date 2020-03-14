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

    /** 
     * Creates n mine objects
     * @return  {array}    An array of mine objects.
     * n - number of mines
     */

    createMines(n) {
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
     * Check every field and set the value with number of mines in neighbour fields.
    */
   setFieldsValue(){
        for (let column of this.fields) {
            for (let field of column) {
                document.getElementById(`${field.id}-text`).textContent = field.setFieldValue();
            }
        }
    }

    /** 
     * Handles left mouse button click
     *  1) Click on mine -> Game Over
     *  2) Click on field -> Show value
     */
    showValue(e){
        const target = document.getElementById(`${event.target.id}`)
        if (target.getAttributeNS(null, "class") != 'fieldMarked' && target.getAttributeNS(null, "class") != 'fieldImg' && target.getAttributeNS(null, "class") != 'fieldValue' && target.getAttributeNS(null, "id") != 'mask'){
            if(target.getAttributeNS(null, "type") === 'mine'){
                target.setAttribute("class", "mineField");
                this.drawSVGImage("bomb", target)
                game.gameOver("BOOOOM!! Sorry - Game Over");
            }
            else{
                target.setAttribute("class", "numberField");
                document.getElementById(`${event.target.id}-text`).style.display = 'initial';
                if(document.getElementById(`${event.target.id}-text`).innerHTML == "0"){
                    console.log(target)
                    this.clickOnZeroField(target);
                }                
            }
        }
        this.checkForWin();
    }

    clickOnZeroField(clickedField){
        for (let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){            
                const neighbourID = `space-${(clickedField.getAttribute("x")-1)/fieldSize+i}-${(clickedField.getAttribute("y")-1)/fieldSize+j}`
                const neighbourField = document.getElementById(neighbourID)
                console.log(`space-${(clickedField.getAttribute("x")-1)/fieldSize+i}-${(clickedField.getAttribute("y")-1)/fieldSize+j}`)
                console.log(neighbourID)
                console.log(neighbourField)
                if(neighbourField){
                    neighbourField.setAttribute("class", "numberField");
                    document.getElementById(`${neighbourField.id}-text`).style.display = 'initial'; 
                }
            }            
        }
    }

    /** 
     * Handles right mouse button click
     *  1) Tag field with flag
     *  2) 3) Handle click on flag or marked field -> Remove flag
     */
    markMine(){
        const target = document.getElementById(`${event.target.id}`)
        event.preventDefault();
        // Click on unmarked field
        if(target.getAttribute("class") === 'field'){
            target.setAttribute("class", "fieldMarked");
            this.drawSVGImage("flag", target)
        }
        // Click on flag
        else if(target.getAttribute("class") === 'fieldImg flag'){
            const prevTarget = document.getElementById(`${target.id.substring(0, target.id.length-4)}`)
            target.remove()
            prevTarget.setAttribute("class", "field");
        }
        // Click on marked field
        else if(target.getAttribute("class") === "fieldMarked"){
            target.setAttribute("class", "field");
            document.getElementById(`${target.id}-img`).remove();
        }
        else 
        this.checkForWin();
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

    /** 
     * Draws SVG image.
     * @imgName - name of file in img folder with .png extension
     * @target - image is located after target element
     */
    drawSVGImage(imgName, target){
        const SVGimg = document.createElementNS("http://www.w3.org/2000/svg", "image");
        const targetField = document.getElementById(target.id);

        SVGimg.setAttributeNS(null, "href", `img/${imgName}.png`);
        SVGimg.setAttributeNS(null, "id", `${target.id}-img`);
        SVGimg.setAttributeNS(null, "width", 0.7*target.getAttributeNS(null, "width"));
        SVGimg.setAttributeNS(null, "height", 0.7*target.getAttributeNS(null, "height"));
        SVGimg.setAttributeNS(null, "x", (parseFloat(target.getAttributeNS(null, "x"))+0.15*parseFloat(target.getAttributeNS(null, "width"))));
        SVGimg.setAttributeNS(null, "y", (parseFloat(target.getAttributeNS(null, "y"))+0.15*parseFloat(target.getAttributeNS(null, "height"))));
        SVGimg.setAttributeNS(null, "class", `fieldImg ${imgName}`);

        targetField.insertAdjacentElement("afterend", SVGimg);
    }

    // Check if every mine is marked
    checkMinesForWin(){
        const mineFields = document.querySelectorAll("rect[type='mine']");
        let mineFieldsMarked = 0;
        for (let i=0; i<mineFields.length; i++){
            if(mineFields[i].className.baseVal === "fieldMarked"){
                mineFieldsMarked += 1;
            }
        }
        if (mineFieldsMarked === numOfMines){
            return true;
        }
        else {
            return false;
        }
    } 

    // Check if every mine is marked
    checkFieldsForWin(){
        const numFields = [...document.querySelectorAll("rect")].filter((el)=>{
            return el.getAttribute("type") != "mine" && el.getAttribute("class") === "numberField"
        })
        if (numFields.length === size*size - numOfMines){
            return true;
        }
        else {
            return false;
        }
    }  

    /**
     * Check if game is won
     * @WON - if 2 conditions are fulfilled
     *  1. Every mine have to be marked with flag (Right MB)
     *  2. Every field have to be shown (Left MB)
     */
    checkForWin(){
        if (this.checkMinesForWin() && this.checkFieldsForWin()){
            game.winGame("Congratulations! You have won!")
        }       
    }
}