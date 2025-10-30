document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

let canvas;
let xPos = 0;
let yPos = 0;
let easing =.05;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-2');
    // background(225);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    clear();

    xPos = xPos + ((mouseX - xPos) * easing);
    yPos = yPos + ((mouseY - yPos) * easing);

    cvAwesomeFace(xPos,yPos);
}

function mouseMoved(){


}

function cvAwesomeFace(lx,ly) {
    push();
    translate(lx,ly);
      //eyebrows
      fill(0); //top
      stroke(0);
      strokeWeight(4);
      //features
      fill("white");
      stroke(0);
      ellipse(222,155,33,50); //eyes
      ellipse(178,155,33,50);
      quad(155,230,245,230,205,280,195,280); //teeth
      fill("black");
      ellipse(220,148,25,33); //puipls
      ellipse(176,148,25,33);
      quad(163,238,237,238,205,280,195,280); //mouth  
    pop();
  }