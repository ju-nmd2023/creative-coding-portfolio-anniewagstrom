// ------------------- Agent Class -------------------
class Agent {
  constructor(x, y, maxSpeed = 4, maxForce = 0.1) {
    this.position = createVector(x, y);
    this.lastPosition = this.position.copy();
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  follow(direction) {
    let desired = direction.copy().mult(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) { this.position.x = width; this.lastPosition.x = width; }
    if (this.position.x > width) { this.position.x = 0; this.lastPosition.x = 0; }
    if (this.position.y < 0) { this.position.y = height; this.lastPosition.y = height; }
    if (this.position.y > height) { this.position.y = 0; this.lastPosition.y = 0; }
  }

  draw() {
    stroke(0, 150, 255, 100); // neon blue lines
    strokeWeight(1);
    line(this.lastPosition.x, this.lastPosition.y, this.position.x, this.position.y);
  }
}

// ------------------- Global Variables -------------------
let agents = [];
let field = [];
let fieldSize = 50;
let cols, rows;
let divider = 4;

// ------------------- Setup -------------------
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  let container = document.getElementById("p5container");
  if (container) cnv.parent(container);

  cols = ceil(width / fieldSize);
  rows = ceil(height / fieldSize);

  generateField();
  generateAgents(200);
  background(0); // black background
}

// ------------------- Flow Field -------------------
function generateField() {
  field = [];
  noiseSeed(random(1000));

  for (let x = 0; x < cols; x++) {
    field[x] = [];
    for (let y = 0; y < rows; y++) {
      let angle = noise(x / divider, y / divider) * TWO_PI * 2;
      field[x][y] = p5.Vector.fromAngle(angle);
    }
  }
}

// ------------------- Agents -------------------
function generateAgents(count) {
  agents = [];
  for (let i = 0; i < count; i++) {
    agents.push(new Agent(random(width), random(height)));
  }
}

// ------------------- Draw Loop -------------------
function draw() {
  // semi-transparent black to leave trails
  fill(0, 10);
  noStroke();
  rect(0, 0, width, height);

  for (let agent of agents) {
    let x = constrain(floor(agent.position.x / fieldSize), 0, cols - 1);
    let y = constrain(floor(agent.position.y / fieldSize), 0, rows - 1);

    agent.follow(field[x][y]);
    agent.update();
    agent.checkBorders();
    agent.draw();
  }
}

// ------------------- Responsive -------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = ceil(width / fieldSize);
  rows = ceil(height / fieldSize);
  generateField();
  generateAgents(200);
  background(0);
}
