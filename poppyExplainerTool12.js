
let graphPanels = [];
let gridA;
let flatGridA;
let mouseClick;
let fillCol;

// all scaling should be done in parentGrid.
const parentGrid = {
    posX: 0,
    posY: 0,
    w: 0,
    h: 0,
    cellW: 0,
    cellH: 0,
    rows: 3,
    cols: 3,
    marginX: 10,
    marginY: 10,
    update(){
        parentGrid.w = windowWidth;
        parentGrid.h = windowHeight;
        parentGrid.cellW = parentGrid.w / parentGrid.rows
        parentGrid.cellH = parentGrid.h / parentGrid.cols
        console.log("parentGrid.update finished, should only be ran once at a time");
    },
    drawSelf(){
        push();
        noFill();
        strokeWeight(10.0);
        stroke(0,0,255);
        for(let y = 0; y < this.cols; y++){
            for(let x = 0; x < this.rows; x++){
                rect(parentGrid.cellW * x, parentGrid.cellH * y, parentGrid.cellW, parentGrid.cellH);
            }
        }
        stroke(0,255,0);
        rect(parentGrid.posX, parentGrid.posY, parentGrid.w, parentGrid.h);
        pop();
    }
}

function preload(){
    poppy = loadImage("data/poppy.jpg");
    font = loadFont("data/S-Medium.otf");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    parentGrid.w = windowWidth;
    parentGrid.h = windowHeight;

    backCol = color(255);
    strokeCol = color(0);
    fillCol = color(160);
    //   ->                      x    y    z    a
    camAnim     = new Animatable(0.0, 0.0, 1.0, 1.0);
    flowerAnim  = new Animatable(0.0, 0.0, 0.0, 1.0);
    gridAnim    = new Animatable(0.0, 0.0, 0.0, 0.0);
    subGridAnim = new Animatable(0.0, 0.0, 0.0, 0.0);
    graphsAnim  = new Animatable(0.0, 0.0, 1.0, 1.0);

    scaler.scl = 1.0;
    scaler.windowTransX = 0.0;
    scaler.windowTransY = 0.0;
    
    graphPanels.push(new GraphsPanel(width, 0.0));
    resizeThings();

}

function draw(){
    textFont(font);
    push();
    background(backCol);
    // translate(-windowWidth * scaler.windowTransX, -windowHeight * scaler.windowTransY);
    scale(scaler.scl);
    // translate(scaler.windowTransX, scaler.windowTransY);
    strokeWeight(1.0);
    // noFill();
    let flatGridAW = (sqrt(flatGridA.length) * flatGridA[0].width);
    push();
    // translate((windowWidth*0.5) - (flatGridAW * 0.5), -parentGrid.marginY)
    flatGridA.forEach(cell => {
            // stroke(fillCol);
            // rect(cell.x, cell.y, cell.width, cell.height)
            cell.circle.drawCirc();
            cell.circle.checkMouse();
            cell.circle.drawDumbGrid();
            functionB(cell.circle);
    });
    pop();

    graphPanels.forEach(panel => {
            panel.updateSelectionGsap(flatGridA[user0.currentCell].circle);
            panel.brightGraph.drawSelf(width - parentGrid.marginX - (panel.width*0.25), parentGrid.marginY, panel.width, panel.height);
            panel.widthGraph.drawSelf(width - parentGrid.marginX*2 - (panel.width*0.5), parentGrid.marginY, panel.width, panel.height);
            panel.circGraph.drawSelf(parentGrid.marginX , parentGrid.marginY, panel.width, panel.height);
            panel.graphText.drawSelf(panel.posX + parentGrid.marginX, panel.posY, panel.width, panel.height);
        }
    )
    scaledMouse.update();
    push();
    puck.showPuck();
    pop();
    mouseClick = false;
    pop();
}

