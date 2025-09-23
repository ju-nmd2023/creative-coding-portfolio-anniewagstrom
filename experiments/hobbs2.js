// ------------------------------------------------------------
// Psychedelic Flower Grid - With guidance from ChatGPT
// ------------------------------------------------------------

let palette = [
  [135, 206, 250],
  [0, 102, 204],
  [0, 51, 102],
];

let petalsCount = 6; 
let amount = 3;       // grid: 3x3 flowers
let flowerSize;       // radius (calculated responsively)
let gap;              // space between flowers
let pulseSpeed = 0.04;
let spin = 0;         // drives both grid & flower spins

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1.5);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  recalcSizes();
}

function draw() {
  drawGrid();
  spin += 0.01;
}

function drawGrid() {
  background(0, 20); // trails effect

  let gridW = amount * (flowerSize * 2) + (amount - 1) * gap;

  let scaleFactor = 0.8 + 0.2 * sin(frameCount * pulseSpeed);

  // --- rotate entire grid around canvas center ---
  push();
  translate(width / 2, height / 2);
  rotate(spin * 0.3);          // global grid rotation
  translate(-gridW / 2, -gridW / 2);

  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      push();
      translate(j * (flowerSize * 2 + gap) + flowerSize,
                i * (flowerSize * 2 + gap) + flowerSize);

      // individual flower spin
      rotate(spin + i * 0.3 + j * 0.3);

      // scale based on mouse hover
      let d = dist(mouseX, mouseY, j * (flowerSize * 2 + gap), i * (flowerSize * 2 + gap));
      let mouseScale = map(d, 0, width / 2, 1.4, 0.6, true);

      drawPetalFlower(flowerSize * scaleFactor * mouseScale, petalsCount, i, j);
      pop();
    }
  }

  pop();
}

function drawPetalFlower(r, loops, i, j) {
  let steps = 400;
  let wobbleAmp = 1.4;
  let wobbleFreq = 7;
  let noiseAmp = 200;
  let noiseScale = 0.4;

  // psychedelic color cycling (time + grid rotation)
  let hueVal = (frameCount * 2 + i * 50 + j * 80 + spin * 50) % 360;
  colorMode(HSB, 360, 100, 100, 100);
  stroke(hueVal, 80, 100, 80);
  colorMode(RGB, 255);
  noFill();

  beginShape();
  for (let k = 0; k < steps; k++) {
    let angle = map(k, 0, steps - 1, 0, TWO_PI * loops);
    let wobble = sin(angle * wobbleFreq) * r * wobbleAmp;
    let n = noise(cos(angle) * noiseScale + 100, sin(angle) * noiseScale + 100, frameCount * 0.01);
    let nCentered = (n - 0.5) * 2;
    let rad = r + wobble + nCentered * noiseAmp;
    let px = cos(angle) * rad;
    let py = sin(angle) * rad;
    vertex(px, py);
  }
  endShape(CLOSE);

  noStroke();
  for (let k = 3; k > 0; k--) {
    fill(255, 200 / k);
    ellipse(0, 0, 5 * k);
  }
}

function recalcSizes() {
  let usableW = width * 0.9;
  let usableH = height * 0.9;

  let maxCellW = usableW / amount;
  let maxCellH = usableH / amount;
  let cell = min(maxCellW, maxCellH);

  let flowerDiameter = cell * 0.8;
  flowerSize = flowerDiameter / 2;
  gap = cell * 0.2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  recalcSizes();
}
