// ============================================
// Gyroscope-controlled blank screen
// ============================================

// ============================================
// SETUP FUNCTION - Runs once at the start
// ============================================
function setup() {
    let canvasWidth = min(windowWidth, windowHeight * 0.5625); // 9:16 ratio
    let canvasHeight = canvasWidth * 1.777; // 16:9 ratio (inverted)
    
    // Ensure canvas fits in window
    if (canvasHeight > windowHeight) {
        canvasHeight = windowHeight;
        canvasWidth = canvasHeight * 0.5625;
    }
    
    createCanvas(canvasWidth, canvasHeight);

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
    // Recalculate portrait canvas dimensions on resize
    let canvasWidth = min(windowWidth, windowHeight * 0.5625); // 9:16 ratio
    let canvasHeight = canvasWidth * 1.777; // 16:9 ratio (inverted)
    
    // Ensure canvas fits in window
    if (canvasHeight > windowHeight) {
        canvasHeight = windowHeight;
        canvasWidth = canvasHeight * 0.5625;
    }
    
    // Resize canvas with new dimensions
    resizeCanvas(canvasWidth, canvasHeight);
    
}

