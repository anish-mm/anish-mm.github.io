var angle = to_radian(1);
var stopAngle = to_radian(24);
var lenOrig;
var fact = 1.02;
var stop = false;
var inCanvasScope = false;
var iter = 0;

function setup() {

   //get height and width paramenters for canvas
    var winHeight = windowHeight < 400 ? windowHeight : 400;
    var winWidth  = 400;
    var myCanvas = createCanvas(windowWidth, winHeight);
    myCanvas.parent("fractalTree");
    lenOrig = 0.25 * height;

    //to keep track of mouse movement.
    myCanvas.mouseOver(function() {inCanvasScope = true;});
    myCanvas.mouseOut(function() {inCanvasScope = false;});
}

function draw() {

    background(255);
    if (angle > Math.PI) {
        fact = 0.99;
        iter++;
    }
    else if (angle < to_radian(1)) {
        fact = 1.02;
        iter++;
    }
    if (iter > 0 && angle <= stopAngle) {
        noLoop();
    }
//    angle = to_radian(25);
    angle = fact * angle;
    //change origin
    translate(width / 2, height);
//    rotate(Math.PI / 2);
    stroke(45);
    function branch(len) {
        stroke(45);
        strokeWeight(len * 4 / lenOrig);
        line(0, 0, 0, -len);

        translate(0, -len);

        if (len > 4) {
            push();
            rotate(angle);
            branch(len * 0.7);
            pop();
            push();
            rotate(-angle);
            branch(len * 0.7);
            pop();
        }
    }
    branch(lenOrig);
}

function windowResized() {
    winHeight = windowHeight < 400 ? windowHeight : 400;
    resizeCanvas(windowWidth, winHeight);
    redraw();
}

function to_radian(x) {
    return (Math.PI * x) / 180;
}

function mousePressed() {

    if (stop && inCanvasScope) {
        loop();
    }
    else if (inCanvasScope) {
        noLoop();
    }
    stop = !stop;

}

