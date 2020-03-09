class Field{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `space-${x}-${y}`;
        this.mine = null;
        this.value = null;
        this.width = fieldSize;
    }

    setFieldValue(){
        // Check neighbour fields if there are mines'
        if(this.mine){
            return null
        }
        else{
        var value = 0;
        for (let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){            
                var checkedField = document.getElementById(`space-${this.x+i}-${this.y+j}`)
                if(checkedField && checkedField.getAttribute("type") === "mine"){
                    value++;
                }
            }            
        }
        return value;
    }}

    drawSVGField() {
        const svgField = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        svgField.setAttributeNS(null, "id", this.id);
        svgField.setAttributeNS(null, "width", this.width);
        svgField.setAttributeNS(null, "height", this.width);
        svgField.setAttributeNS(null, "x", this.x*this.width +1);
        svgField.setAttributeNS(null, "y", this.y*this.width +1);
        svgField.setAttributeNS(null, "rx", 0.05*this.width);
        svgField.setAttributeNS(null, "ry", 0.05*this.width);
        svgField.setAttributeNS(null, "fill", "grey");
        svgField.setAttributeNS(null, "stroke", "black");
        svgField.setAttributeNS(null, "stroke-width", 0.01*this.width);
        svgField.setAttributeNS(null, "class", "field");
        if(this.mine){
            svgField.setAttributeNS(null, "type", "mine");
        }

        const svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        svgText.setAttributeNS(null, "width", this.width);
        svgText.setAttributeNS(null, "height", this.width);
        svgText.setAttributeNS(null, "x", (this.x+0.455)*this.width);
        svgText.setAttributeNS(null, "y", (this.y+0.555)*this.width);
        svgText.setAttribute ("id", `${this.id}-text`)
        svgText.setAttributeNS(null, "class", "fieldValue");

        document.getElementById("mask").appendChild(svgField);  
        document.getElementById("mask").appendChild(svgText);     
    }    
}
