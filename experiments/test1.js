let flowerSize = 5;
let amount = 4;
let gap = 100;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(20, 100, 20);
  frameRate(4);
}

function flower() {
  let petals = 12;
  noStroke();

  for (let y = 0; y < petals; y++) {
    for (let x = 0; x < petals; x++) {
      fill(0, 220, 100);
      rect(x, y, 30, 2);

      fill(20, 40, 255);
      rect(x, y, 20, 10);

      fill(255, random(20, 200), 240);
      ellipse(x, y, 10, 3);

      rotate(PI / 5);
    }
  }
}

function draw() {
  let y = (height - flowerSize * amount - gap * (amount - 1)) / 2;
  for (let i = 0; i < amount; i++) {
    let x = (width - flowerSize * amount - gap * (amount - 1)) / 2;
    for (let j = 0; j < amount; j++) {
      push();
      translate(x, y);
      flower();
      pop();
      x += flowerSize + gap;
    }
    y += flowerSize + gap;
  }
}