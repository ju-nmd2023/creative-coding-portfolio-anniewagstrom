let centerX, centerY;
let angle = 0;
let radius = 5;
let radiusNoise = 0.2;
let lastX = -999, lastY = -999;

// Example palette: soft neon
let bgColor = [20, 20, 40]; // dark background
let lineColors = [
  [0, 255, 255],   // neon cyan
  [255, 0, 255],   // neon magenta
  [255, 255, 0],   // neon yellow
  [255, 100, 50]   // neon orange
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  background(bgColor);
  colorMode(RGB, 255, 255, 255, 1);
  strokeWeight(1.5);
}

function draw() {
  // subtle trailing effect
  fill(bgColor[0], bgColor[1], bgColor[2], 0.02);
  noStroke();
  rect(0, 0, width, height);

  radiusNoise += 0.01;
  radius = noise(radiusNoise) * min(width, height) / 2 + 1;

  angle += noise(radiusNoise) * 6 - 3;
  let rad = radians(angle);

  let x1 = centerX + radius * cos(rad);
  let y1 = centerY + radius * sin(rad);

  let oppositeRad = rad + PI;
  let x2 = centerX + radius * cos(oppositeRad);
  let y2 = centerY + radius * sin(oppositeRad);

  // pick a random stroke color from the palette
  let c = random(lineColors);
  stroke(c[0], c[1], c[2]);

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
  background(bgColor); 
}
