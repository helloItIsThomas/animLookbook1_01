
class Animatable{
    constructor(x, y, z, a){
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
    }
}

class CustomRect {
    constructor(x, y, width, height, firstPixelRGB, firstPixelBright, _id) {
        this.id = _id,
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.fpRGB = firstPixelRGB;
        this.fpBright = firstPixelBright;
        this.circle = {
            id: this.id,
            hover: false,
            thisAlpha: 255,
            fill: color(this.fpRGB),
            rectW: this.width,
            rectH: this.height,
            rectX: this.x,
            rectY: this.y,
            w: this.width,
            h: this.height,
            cellRGB: this.fpRGB,
            cellBright: this.fpBright,
            posX: this.x + (this.width / 2),
            posY: this.y + (this.height / 2),
            maxW: this.width * 2.0,
            maxH: this.height * 2.0,
            calcSize(_fpBright) {
                this.w = map(_fpBright, 0.0, 255.0, 0.0, this.maxW);
                this.h = map(_fpBright, 0.0, 255.0, 0.0, this.maxH);
              },
            drawCirc(){
                // this.fill.setAlpha(this.thisAlpha);
                fill(this.fill);
                noStroke();
                circle(this.posX, this.posY, this.w);
            },
            drawDumbGrid(){
                let grid = functionA(this.rectW, this.rectH, 3, 3, 0.05).flat();
                push();
                translate(this.rectX, this.rectY);
                stroke(0);
                strokeWeight(1);
                noFill();
                grid.forEach(cell => {
                    // rect(cell.x, cell.y, cell.width, cell.height);
                });
                pop();
            },
            checkMouse(){
            if(
                scaledMouse.x > this.rectX
                && scaledMouse.x < (this.rectX + (this.rectW))
                && scaledMouse.y > this.rectY
                && scaledMouse.y < (this.rectY + (this.rectH))
            ){
                this.hover = true;
                console.log(puck.isHovered);
                if(
                    puck.puckX > this.rectX
                    && puck.puckX < (this.rectX + (this.rectW))
                    && puck.puckY > this.rectY
                    && puck.puckY < (this.rectY + (this.rectH))
                ) user0.currentCell = this.id;
                // this.thisAlpha = 255;
            } else{
                this.hover = false;
                }
                
            }
        }
    }
}


class GraphsPanel {
    constructor(_x, _y){
        this.posX = _x;
        this.posY = _y;
        this.width = 0;
        this.height = 0;
        this.maxW = 0.0;
        this.maxH = 0.0;
        this.cols = 2;
        this.rows = 1;
        this.grid = [];
        this.currentBrightness;
        this.currentWidth;
        this.graphText = {
            currentRGB: {
                rgba: [0, 0, 0, 0], // r, g, b, a
            },
            currentBrightness: 0.0,
            x: 0.0,
            y: 0.0,
            w: 0.0,
            h: 0.0,
            drawSelf(_posX, _posY, _w, _h){
                this.w = _w * 0.25;
                this.h = this.w;
                this.x = _posX + this.w;
                this.y = _posY + this.h;
                push();
                translate(this.x, this.y);
                push();
                stroke(0);
                // rect(0.0, 0.0, this.w, this.h);
                pop();
                stroke(0)
                fill(0);
                noStroke();
                // console.log(this.currentRGB.rgba[0]);
                this.hue = round(ColorConverter.rgbToHsv(this.currentRGB.rgba[0], this.currentRGB.rgba[1], this.currentRGB.rgba[2])[0], 2);
                this.sat = round(ColorConverter.rgbToHsv(this.currentRGB.rgba[0], this.currentRGB.rgba[1], this.currentRGB.rgba[2])[1], 2);
                if(this.hue == NaN) this.hue = 0.00;
                if(this.sat == NaN) this.sat = 0.00;
                pop();
                fill(fillCol);
                textSize(parentGrid.marginY*2);
                text("HUE: " + this.hue, this.w * 2 + parentGrid.marginX * 2, parentGrid.marginY*3);
                text("SATURATION: " + this.sat, this.w * 2 + parentGrid.marginX * 2, parentGrid.marginY*5);
                text("BRIGHTNESS: " + round(this.currentBrightness, 2), this.w * 2 + parentGrid.marginX * 2, parentGrid.marginY*7);
            }
        }
        this.brightGraph = {
            currentBrightness: 0.0,
            x: 0.0,
            y: 0.0,
            w: 0.0,
            h: 0.0,
            drawSelf(_posX, _posY, _w, _h){
                this.w = _w * 0.25;
                this.h = this.w;
                this.x = _posX;
                this.y = _posY;
                push();
                translate(this.x, this.y);
                push();
                stroke(fillCol);
                fill(backCol);
                rect(0.0, 0.0, this.w, this.h, 10);
                pop();
                stroke(fillCol);
                beginShape();
                curveVertex(this.w * 0.1, this.h);
                curveVertex(this.w * 0.1, this.h * 0.9);
                curveVertex(this.w * 0.9, this.h * 0.1);
                curveVertex(this.w * 0.9, this.h * 0.1);
                endShape();
                fill(fillCol);
                stroke(0)
                circle(this.w * (this.currentBrightness), this.h * (1.0 - this.currentBrightness), 10.0);
                pop();
            }
        }
        this.widthGraph = {
            currentWidth: 0.0,
            x: 0.0,
            y: 0.0,
            w: 0.0,
            h: 0.0,
            drawSelf(_posX, _posY, _w, _h){
                this.w = _w * 0.25;
                this.h = this.w;
                this.x = _posX;
                this.y = _posY;
                push();
                translate(this.x, this.y);
                push();
                stroke(fillCol);
                fill(backCol);
                rect(0.0, 0.0, this.w, this.h, 10);
                pop();
                stroke(fillCol)
                beginShape();
                curveVertex(this.w * 0.1, this.h);
                curveVertex(this.w * 0.1, this.h * 0.9);
                curveVertex(this.w * 0.9, this.h * 0.1);
                curveVertex(this.w * 0.9, this.h * 0.1);
                endShape();
                stroke(0)
                fill(fillCol);
                circle(this.w * (this.currentWidth), this.h * (1.0 - this.currentWidth), 10.0);
                pop();
            }
        }
        this.circGraph = {
            circW: 0.0,
            circRGB: [],
            x: 0.0,
            y: 0.0,
            w: 0.0,
            h: 0.0,
            drawSelf(_posX, _posY, _w, _h){
                this.x = _posX;
                this.y = _posY;
                this.w = _w * 0.5;
                this.h = this.w;
                push();
                translate(this.x, this.y);
                push();
                stroke(fillCol);
                fill(backCol);
                rect(0.0, 0.0, this.w, this.h, 20);
                pop();
                fill(color(this.circRGB));
                noStroke();
                circle(this.w * 0.5, this.h * 0.5, this.circW);
                pop();
            }
        }
    }
    // argument is current CustomRect.circle object
    updateSelection(_selection){}

    updateSelectionGsap(_selection){
        gsap.to(this.graphText.currentRGB.rgba, {
            [0]: _selection.cellRGB[0],
            [1]: _selection.cellRGB[1],
            [2]: _selection.cellRGB[2],
            duration: 0.5,
            ease: "power3.out"
        });
        gsap.to(this.graphText, {
            currentBrightness: _selection.cellBright,
            duration: 0.25,
            ease: "power3.out"
        });
        gsap.to(this.circGraph, {
            circW: _selection.w,
            duration: 1,
            ease: "power3.out"
        });
        this.circGraph.circRGB = _selection.cellRGB;
        gsap.to(this.widthGraph, {
            currentWidth: map(_selection.w, 0.0, _selection.maxW, 0.0, 2.0),
            duration: 1,
            ease: "power3.out"
        });
        gsap.to(this.brightGraph, {
            currentBrightness: map(_selection.cellBright, 0.0, 255.0, 0.0, 2.0),
            duration: 1.5
        });
    }
    update(){
        this.width = parentGrid.w * 0.33;
        this.height = parentGrid.h;
        this.maxW = parentGrid.w * 0.5;
        this.maxH = parentGrid.h;
        this.grid = functionA(this.width, this.height, this.cols, this.rows, 0.0).flat();
    }
    drawSelf(){
        push();
        translate(this.posX, this.posY);
        fillCol.setAlpha(255);
        fill(fillCol);
        noStroke();
        rect(0.0, 0.0, this.w, this.h);
        stroke(0);
        strokeWeight(1);
        this.grid.forEach(cell => {
            rect(cell.x, cell.y, cell.width, cell.height);
        });
        pop();
    }
}

class ColorConverter {

    // Convert a single RGB color to HSV.
    static rgbToHsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;

        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, v];
    }
}

