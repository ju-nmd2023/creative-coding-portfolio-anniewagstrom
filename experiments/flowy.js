let agents = [];
let scale = 20;          // grid cell size
let noiseDivider = 100;  // subtle variation
let globalAngle = Math.PI / 4; // direction (45°)

function setup() {
  createCanvas(windowWidth, windowHeight); // canvas appended to body
  for (let i = 0; i < 500; i++) {
    agents.push(new Agent(random(width), random(height)));
  }
  background(10, 10, 30); // dark background
}

function draw() {
  for (let agent of agents) {
    agent.followDirection();
    agent.update();
    agent.edges();
    agent.show();
  }
}

class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
    this.col = color(random(100, 255), random(100, 255), random(200, 255), 50);
  }

  followDirection() {
    let angleNoise = noise(this.pos.x / noiseDivider, this.pos.y / noiseDivider) * PI / 4;
    let angle = globalAngle + angleNoise;
    let force = p5.Vector.fromAngle(angle);
    force.setMag(0.1);
    this.applyForce(force);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
    this.prevPos = this.pos.copy();
  }

  show() {
    stroke(this.col);
    strokeWeight(1);
    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    this.prevPos = this.pos.copy();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(10, 10, 30);
}
