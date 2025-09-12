/*Parts of the code were written with guidance from ChatGPT (OpenAI, 2025). 
Guidance includes forming random triangles, grid layout, coloring, and optional wiggle.*/

let size = 120;   // size of each triangle block
let layers = 8;   // layers per triangle
let t = 0;        // time for wiggle

function setup() {
  createCanvas(1000, 1000);
  frameRate(3);
}

function getRandomValue(pos, variance) {
  return pos + map(random(), 0, 1, -variance, variance);
}

function drawLayersTriangle(x, y, size, layers, t) {
  const variance = size / 30;

  for (let i = 0; i < layers; i++) {
    if (random() > 0.7) continue;

    const s = (size / layers) * i;
    const half = s / 2;

    stroke(255); // white lines
    strokeWeight(1.5);
    noFill(); // empty inside

    // Draw the triangle multiple times for hand-drawn effect
    for (let k = 0; k < 5; k++) { // 5 jittered lines
      beginShape();
      for (let j = 0; j < 3; j++) {
        const angle = map(j, 0, 3, 0, TWO_PI);
        const px = cos(angle) * half + x + sin(t + i + j + k) * 3 + getRandomValue(0, variance);
        const py = sin(angle) * half + y + cos(t + i + j + k) * 3 + getRandomValue(0, variance);
        vertex(px, py);
      }
      endShape(CLOSE);
    }
  }
}


function draw() {
  // background(255, 150, 200);
  let c1 = color(255, 120 + 50 * sin(t * 2), 180 + 40 * cos(t * 2));
  let c2 = color(255, 180 + 40 * cos(t * 2), 220 + 50 * sin(t * 2));

  let cols = 4;
  let rows = 4;

  // calculate total grid size
  let gridW = cols * size;
  let gridH = rows * size;

  // offsets to center the grid
  let offsetX = (width - gridW) / 2;
  let offsetY = (height - gridH) / 2 - 150;

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      drawLayersTriangle(
        offsetX + size / 2 + x * size,
        offsetY + size / 2 + y * size,
        size,
        layers,
        t
      );
    }
  }

  t += 0.05; // update time for wiggle
}