let centerX, centerY;
let angle = 0;
let radius = 5;
let radiusNoise = 0.2;
let lastX = -999, lastY = -999;

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  background(244, 254, 200);
  colorMode(RGB, 255, 255, 255, 1);
  strokeWeight(1);
  // constant blue color for all lines
  stroke(7, 46, 103, 0.5);
}

function draw() {
  // semi-transparent background for trailing effect
  background(244, 254, 200, 0.01);

  radiusNoise += 0.01;
  radius = noise(radiusNoise) * min(width, height) / 2 + 1;

  angle += noise(radiusNoise) * 6 - 3;
  let rad = radians(angle);
  
  let x1 = centerX + radius * cos(rad);
  let y1 = centerY + radius * sin(rad);
  
  let oppositeRad = rad + PI;
  let x2 = centerX + radius * cos(oppositeRad);
  let y2 = centerY + radius * sin(oppositeRad);

  line(x1, y1, x2, y2);

  if (lastX > -999) {
    line(x1, y1, lastX, lastY);
  }
  lastX = x1;
  lastY = y1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  background(244, 254, 200); 
}
