// Generative Willow Bough–inspired pattern (William Morris, 1887)
// Creates flowing branches with clusters of leaves

function setup() {
  createCanvas(800, 800);
  noLoop();
  background("#f5f0e6"); // cream background
  stroke("#6b4e2e"); // branch brown
  noFill();

  for (let i = 0; i < 12; i++) {
    drawBranch(random(width), random(height), random(TWO_PI));
  }
}

function drawBranch(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);

  strokeWeight(2);
  let branchLength = random(300, 500);

  beginShape();
  for (let i = 0; i < branchLength; i += 20) {
    let bx = i;
    let by = sin(i * 0.02) * 50;
    vertex(bx, by);

    // Draw leaves along the branch
    if (i % 40 === 0) {
      let leafAngle = random(-PI / 3, PI / 3);
      drawLeaf(bx, by, leafAngle);
      drawLeaf(bx, by, leafAngle + PI); // opposite side
    }
  }
  endShape();
  pop();
}

function drawLeaf(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  fill(random(["#4d6b44", "#6f8f5a", "#90a67b"]));
  noStroke();
  ellipse(0, 0, 20, 50);
  pop();
}
