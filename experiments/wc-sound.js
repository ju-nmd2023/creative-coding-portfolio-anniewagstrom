let centerX, centerY;
let angle = 0;
let radius = 5;
let radiusNoise = 0.2;
let lastX = -999, lastY = -999;

// Colors
let bgColor = [20, 20, 40];
let lineColors = [
  [0, 255, 255],
  [255, 0, 255],
  [255, 255, 0],
  [255, 100, 50]
];

// Tone.js
let synth;
let toneStarted = false;

// Speeds
let baseAngleSpeed = 0.2;
let baseNoteInterval = 0.4;
let angleSpeed = baseAngleSpeed;
let noteInterval = baseNoteInterval;
let currentStroke = [200, 200, 255];

let startTime;

// Define 4 chords (each with 4 notes)
let chordProgression = [
  ["C5", "E4", "A4", "E4"],   // Variation 1
  ["B5", "G4", "B4", "A4"],  // Variation 2: same contour as var3, slightly different pitches
  ["A5", "F4", "C5", "B4"],   // Variation 3
  ["B4", "D4", "G4", "D4"]    // Variation 4
];

let currentChordIndex = 0;
let noteInChord = 0;   // which note to play (0..3)
let chordPlayCount = 0;
let chordPlayMax = 4;  // play each chord 4 times before switching

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  background(bgColor);
  colorMode(RGB, 255, 255, 255, 1);
  strokeWeight(1.5);

  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },
    envelope: { attack: 0.05, decay: 0.1, sustain: 0.5, release: 1 }
  }).toDestination();

  document.body.addEventListener("click", async () => {
    if (!toneStarted) {
      await Tone.start();
      toneStarted = true;
      startTime = millis();

      Tone.Transport.scheduleOnce(playNote, "+0");
      Tone.Transport.start();
    }
  }, { once: true });
}

function playNote(time) {
  if (!toneStarted) return;

  let chord = chordProgression[currentChordIndex];
  let note = chord[noteInChord];

  synth.triggerAttackRelease(note, "8n", time);
  currentStroke = lineColors[noteInChord % lineColors.length];

  // Move to next note
  noteInChord++;
  if (noteInChord >= 4) {
    noteInChord = 0;
    chordPlayCount++;
    if (chordPlayCount >= chordPlayMax) {
      chordPlayCount = 0;
      currentChordIndex = (currentChordIndex + 1) % chordProgression.length;
    }
  }

  // Speed adjustments
  angleSpeed += 0.003;
  noteInterval *= 0.992;
  if (millis() - startTime > 60000) {
    angleSpeed = baseAngleSpeed;
    noteInterval = baseNoteInterval;
    startTime = millis();
  }

  Tone.Transport.scheduleOnce(playNote, `+${noteInterval}`);
}

function draw() {
  fill(bgColor[0], bgColor[1], bgColor[2], 0.02);
  noStroke();
  rect(0, 0, width, height);

  radiusNoise += 0.01;
  radius = noise(radiusNoise) * min(width, height) / 2 + 1;

  angle += noise(radiusNoise) * angleSpeed * 6 - angleSpeed * 3;
  let rad = radians(angle);

  let x1 = centerX + radius * cos(rad);
  let y1 = centerY + radius * sin(rad);

  let oppositeRad = rad + PI;
  let x2 = centerX + radius * cos(oppositeRad);
  let y2 = centerY + radius * sin(oppositeRad);

  let pulse = map(sin(frameCount * 0.3), -1, 1, 0.8, 1.2);
  let px1 = centerX + radius * cos(rad) * pulse;
  let py1 = centerY + radius * sin(rad) * pulse;
  let px2 = centerX + radius * cos(oppositeRad) * pulse;
  let py2 = centerY + radius * sin(oppositeRad) * pulse;

  stroke(currentStroke[0], currentStroke[1], currentStroke[2], 150);
  strokeWeight(1.5);
  line(px1, py1, px2, py2);

  if (lastX > -999) line(px1, py1, lastX, lastY);

  lastX = px1;
  lastY = py1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  background(bgColor);
}
