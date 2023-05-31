 

const user0 = {
    currentCell: 48,
}

const scaler = {
    scl: 1.0,
    windowTransX: 1.0,
    windowTransY: 1.0,
}

const scaledMouse = {
    lastClick: [],
    x: 0,
    y: 0,
    update(){
        this.x = mouseX;
        this.y = mouseY;
    }
}

const puck = {
    puckX: 50.0,
    puckY: 300.0,
    puckW: 30.0,
    isHovered: false,
    showPuck(){
        if(scaledMouse.x > (this.puckX - (this.puckW * 0.5))
            && scaledMouse.x < this.puckX + (this.puckW * 0.5)
            && scaledMouse.y > (this.puckY - (this.puckW * 0.5))
            && scaledMouse.y < (this.puckY + (this.puckW * 0.5))
        ) this.isHovered = true;
        else this.isHovered = false;
        push();
        noFill();
        stroke("#3A8B36");
        strokeWeight(10.0);
        circle(this.puckX, this.puckY, 30.0);
        pop();
    }
}

function mouseClicked(){
    scaledMouse.lastClick = [mouseX, mouseY];
    mouseClick = true;
    console.log("mouseClick: " + mouseClick);
    zoomCamera();
}

function zoomCamera(){
    scaler.scl = 1.0
    gsap.to(scaler, {
        windowTransX: (-scaledMouse.lastClick[0]) + ((windowWidth * 0.5)),
        windowTransY: (-scaledMouse.lastClick[1]) + ((windowHeight * 0.5)),
        duration: 1.5,
        ease: "power3.inOut"
    });
    // windowTransX = ((scaledMouse.lastClick[0] + (windowWidth * windowTransX)));
    // windowTransY = ((scaledMouse.lastClick[1] + (windowHeight * windowTransY)));
}

function mouseDragged() {
    if(puck.isHovered){
        puck.puckX = mouseX;
        puck.puckY = mouseY;
    }
}