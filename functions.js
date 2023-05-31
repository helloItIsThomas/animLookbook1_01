
function getRGB(_img, _x, _y){
    if(_img != null) return _img.get(_x, _y);
    else{
        return color(0);
    }
}

function getBrightness(_img, _x, _y){
    let myBrightness;
    if(_img != null) myBrightness = brightness(_img.get(_x, _y));
    else {
        myBrightness = 0;
        // console.log("getBrightness: Image returned NULL");
    }
    return myBrightness;
}

function functionA(_w, _h, _rC, _cC, _m, _img = null) {
    let img = _img;
    let gridW = _w;
    let gridH = _h;
    let margin = gridW * _m;
    let gridCellW = (gridW - (margin * 2)) / _rC;
    let gridCellH = (gridH - (margin * 2)) / _cC;
    const grid = [];
    let counter = 0;
    for (let i = 0; i < _cC; i++) {
        const row = [];
            for (let j = 0; j < _rC; j++) {
                const customRect = new CustomRect(
                    margin + (j * gridCellW),
                    margin + (i * gridCellH),
                    gridCellW,
                    gridCellH,
                    getRGB(
                        img,
                        margin + (j * gridCellW),
                        margin + (i * gridCellH)
                    ),
                    getBrightness(
                        img,
                        margin + (j * gridCellW),
                        margin + (i * gridCellH)
                    ),
                    counter);
                row.push(customRect);
                counter++;
            }
        grid.push(row);
    }
    return grid;
}

function functionB(_cell){
    let cell = _cell;
    cell.calcSize(cell.cellBright);
}


