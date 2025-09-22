// ------------------------------------------------------------
// Code created with help from Bassima's flower example and ChatGPT
// ------------------------------------------------------------

let palette = [
  [135, 206, 250],   
  [0, 102, 204],  
  [0, 51, 102],
];

let petalsCount = 6; 
let amount = 4;      // grid: 4x4 flowers
let flowerSize;      // radius (will be calculated responsively)
let gap;             // space between flowers (calculated)
let seed = 0;
let noiseOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1.5);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  recalcSizes();
  drawGrid();
}

function drawGrid() {
  background(0);
  randomSeed(seed);

  // total grid width/height (using diameter + gaps)
  let gridW = amount * (flowerSize * 2) + (amount - 1) * gap;
  let gridH = gridW;

  // center the grid and compute the first center position
  let startX = (width - gridW) / 2 + flowerSize;
  let startY = (height - gridH) / 2 + flowerSize;

  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      push();
      translate(startX + j * (flowerSize * 2 + gap), startY + i * (flowerSize * 2 + gap));
      drawPetalFlower(flowerSize, petalsCount);
      pop();
    }
  }
}

function drawPetalFlower(r, loops) {
  let steps = 400;      // smoothness
  let wobbleAmp = 1.4;  // petal depth
  let wobbleFreq = 7;   // affects petal shape
  let noiseAmp = 200;   // slight organic distortion
  let noiseScale = 0.4;

  // pick random color for each flower from the palette
  let col = random(palette);
  stroke(col[0], col[1], col[2], 200);
  noFill();

  beginShape();
  for (let i = 0; i < steps; i++) {
    let angle = map(i, 0, steps - 1, 0, TWO_PI * loops);
    let wobble = sin(angle * wobbleFreq) * r * wobbleAmp;
    let n = noise(cos(angle) * noiseScale + 100, sin(angle) * noiseScale + 100 + noiseOffset);
    let nCentered = (n - 0.5) * 2;
    let rad = r + wobble + nCentered * noiseAmp;

    let px = cos(angle) * rad;
    let py = sin(angle) * rad;
    vertex(px, py);
  }
  endShape(CLOSE);

  // center dot
  fill(255, 200);
  noStroke();
  ellipse(0, 0, 8);
}

function recalcSizes() {
  // use most of the screen but leave margin
  let usableW = width * 0.9;
  let usableH = height * 0.9;

  // maximum size for each cell
  let maxCellW = usableW / amount;
  let maxCellH = usableH / amount;
  let cell = min(maxCellW, maxCellH);

  // flower diameter is a portion of the cell so there's breathing room
  let flowerDiameter = cell * 0.8;
  flowerSize = flowerDiameter / 2;
  gap = cell * 0.2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  recalcSizes();
  drawGrid();
}

function mousePressed() {
  seed = floor(random(10000));
  noiseOffset = random(1000, 10000);
  drawGrid();
}