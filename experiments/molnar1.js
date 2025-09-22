function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(4);
}

const cols = 17;   // fixed number of columns
const layers = 10;

function getRandomValue(pos, variance) {
    return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
    const variance = size / 30;
    for (let i = 0; i < layers; i++) {
        if (Math.random() > 0.7) continue;

        const s = (size / layers) * i;
        const half = s / 2;
        fill(random(0, 80), random(100, 200), random(180, 255), 60); 
        stroke(20, 30, 80, 200);

        beginShape();
        vertex(getRandomValue(x - half, variance), getRandomValue(y - half, variance));
        vertex(getRandomValue(x + half, variance), getRandomValue(y - half, variance));
        vertex(getRandomValue(x + half, variance), getRandomValue(y + half, variance));
        vertex(getRandomValue(x - half, variance), getRandomValue(y + half, variance));
        endShape(CLOSE);
    }
}

function draw() {
    background(10, 20, 60);

    let size = width / cols;        // square size based on screen width
    let rows = ceil(height / size); // auto-fit rows to screen height

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
