// ------------------------------------------------------------
// Code created with help from Bassima's flower example and ChatGPT
// ------------------------------------------------------------

let flowerSize = 60; // fixed radius of each flower
let petalsCount = 6; // number of petals per flower
let amount = 4;      // grid: 4x4 flowers
let gap = 140;       // space between flowers

let palette = [
  [200, 30, 40],
  [255, 100, 200],
  [150, 80, 200],
  [40, 80, 220]
];

function setup() {
  createCanvas(1000, 1000);
  background(0);
  noFill();
  strokeWeight(1.5);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  // center the grid
  let startY = (height - (flowerSize * amount + gap * (amount - 1))) / 2;
  for (let i = 0; i < amount; i++) {
    let startX = (width - (flowerSize * amount + gap * (amount - 1))) / 2;
    for (let j = 0; j < amount; j++) {
      push();
      translate(startX, startY);
      drawPetalFlower(flowerSize, petalsCount);
      pop();
      startX += flowerSize + gap;
    }
    startY += flowerSize + gap;
  }
}

function drawPetalFlower(r, loops) {
  let steps = 400;      // smoothness
  let wobbleAmp = 1.4;   // petal depth
  let wobbleFreq = 7;  // affects petal shape
  let noiseAmp = 200;     // slight organic distortion
  let noiseScale = 0.4;

  // pick random color for each flower
  let col = random(palette);
  stroke(col[0], col[1], col[2], 200);

  beginShape();
  for (let i = 0; i < steps; i++) {
    let angle = map(i, 0, steps - 1, 0, TWO_PI * loops);
    let wobble = sin(angle * wobbleFreq) * r * wobbleAmp;
    let n = noise(cos(angle) * noiseScale + 100, sin(angle) * noiseScale + 100);
    let nCentered = (n - 0.5) * 2;
    let rad = r + wobble + nCentered * noiseAmp;

    let px = cos(angle) * rad;
    let py = sin(angle) * rad;
    vertex(px, py);
  }
  endShape(CLOSE);

  // optional: center dot
  fill(255, 200);
  noStroke();
  ellipse(0, 0, 8);
}
