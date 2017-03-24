var meter;
var clock;

function setup() {
  createCanvas(windowWidth, windowHeight);
  meter = new FPSmeter();

  clock = new Clock();
}

function draw() {
  background(51);
  push();
  clock.display();
  pop();
  meter.tick();
}
