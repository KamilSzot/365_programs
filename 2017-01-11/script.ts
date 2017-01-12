
class Ui {
    dragging = false;
    svg:SVGElement;
    spot:SVGCircleElement;
    line:SVGPathElement;
    m1:SVGCircleElement;
    constructor() {
        this.svg = document.getElementById('display') as any as SVGElement;
        this.spot = document.getElementById('spot') as any as SVGCircleElement;
        this.spot.onmousedown = (e) => this.startDragging(e);
        this.svg.onmousemove = (e) => this.continueDragging(e);
        this.svg.onmouseup = (e) => this.stopDragging(e);
    }
    startDragging(e:MouseEvent) {
        this.dragging = true;
        this.line = document.createElementNS("http://www.w3.org/2000/svg", 'path') as any as SVGPathElement;
        this.line.setAttribute('id', 'line');
        this.svg.insertBefore(this.line, this.svg.firstChild);
        this.updateLine(e);
    }
    updateLine(e:MouseEvent) {
        var x = this.spot.cx.baseVal.valueInSpecifiedUnits;
        var y = this.spot.cy.baseVal.valueInSpecifiedUnits;
        
        this.line.setAttribute("d",`M ${x} ${y} L ${e.clientX} ${e.clientY}`);
    }
    continueDragging(e:MouseEvent) {
        if(this.dragging) {
            this.updateLine(e);
        }
    }
    stopDragging(e:MouseEvent) {
        if(this.dragging) {
            this.updateLine(e);
            this.dragging = false;            
            this.showMenu(e);
            //this.line.remove();
        }
    }
    showMenu(e:MouseEvent) {
        this.m1 = document.createElementNS("http://www.w3.org/2000/svg", 'circle') as any as SVGCircleElement;
        this.m1.setAttribute('class', 'menu-item');
        this.m1.setAttribute('r', '15');
        this.m1.setAttribute('cx', e.clientX.toString());
        this.m1.setAttribute('cy', e.clientY.toString());
        this.svg.insertBefore(this.m1, this.svg.firstChild);
        
        
    }

}

var ui = new Ui();