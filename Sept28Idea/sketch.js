// ============================================
// Gyroscope-controlled blank screen
// ============================================

// ============================================
// SETUP FUNCTION - Runs once at the start
// ============================================
function setup() {
    createCanvas(windowWidth, windowHeight);

    lockGestures();
}

// ============================================
// DRAW FUNCTION - Runs continuously (60fps by default)
// ============================================
function draw() {
    background(255);

    // At 90 degrees the screen is black; face down makes it fully clear.
    let blackness = map(abs(rotationX), 90, 180, 255, 0, true);
    noStroke();
    fill(0, blackness);
    rect(0, 0, width, height);
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

