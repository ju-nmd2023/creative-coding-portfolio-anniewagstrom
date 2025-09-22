let agents = [];
let scale = 20;          
let noiseDivider = 100;  
let globalAngle = Math.PI / 4; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 500; i++) {
    agents.push(new Agent(random(width), random(height)));
  }
  background(10, 10, 30); 
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
    let wrapped = false; // flag to check if we teleport
    if (this.pos.x > width) { this.pos.x = 0; wrapped = true; }
    if (this.pos.x < 0) { this.pos.x = width; wrapped = true; }
    if (this.pos.y > height) { this.pos.y = 0; wrapped = true; }
    if (this.pos.y < 0) { this.pos.y = height; wrapped = true; }

    if (wrapped) {
      this.prevPos = this.pos.copy(); // prevent lines across edges
    }
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
