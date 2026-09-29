// ============================================
// BASIC GIF TEMPLATE - Mobile p5.js
// A well-commented template for mobile p5.js projects
// ============================================

// Configuration variables
const SHOW_DEBUG = false; // Set to false to hide mobile debug console

// Global variables
let gif; // Variable to store the loaded GIF

// ============================================
// PRELOAD FUNCTION - Runs before setup()
// ============================================
function preload() {
    // Load the GIF file before setup() runs
    // This ensures the GIF is ready when we need it
    gif = loadImage('image/kindleEvo.gif');
}

// ============================================
// SETUP FUNCTION - Runs once at the start
// ============================================
function setup() {
    // Create portrait canvas to mimic phone dimensions
    // Using 9:16 aspect ratio (common phone proportion)
    let canvasWidth = min(windowWidth, windowHeight * 0.5625); // 9:16 ratio
    let canvasHeight = canvasWidth * 1.777; // 16:9 ratio (inverted)
    
    // Ensure canvas fits in window
    if (canvasHeight > windowHeight) {
        canvasHeight = windowHeight;
        canvasWidth = canvasHeight * 0.5625;
    }
    
    createCanvas(canvasWidth, canvasHeight);
    
    // STEP 1: Enable debug console for mobile development (if enabled)
    // This shows debug messages on the mobile screen
    if (SHOW_DEBUG) {
        showDebug();
        debug("Debug console enabled");
    }
    
    // Debug: Log that setup has started
    if (SHOW_DEBUG) {
        debug("Setup function started");
        debug("Canvas size:", width + "x" + height + " (portrait)");
    }
    
    // STEP 2: Lock mobile gestures to prevent browser interference
    // This prevents swipe gestures, zoom, refresh, etc.
    lockGestures();
    if (SHOW_DEBUG) {
        debug("Mobile gestures locked");
    }
    
    // STEP 3: Check if GIF loaded successfully
    if (gif) {
        if (SHOW_DEBUG) {
            debug("GIF loaded successfully");
            debug("GIF dimensions:", gif.width + "x" + gif.height);
        }
    } else {
        if (SHOW_DEBUG) {
            debug("Error: GIF failed to load");
            debug("Check that image/kindleEvo.gif exists");
        }
    }
    
    // Set initial background
    background(50);
    
    if (SHOW_DEBUG) {
        debug("Setup complete");
    }
}

// ============================================
// DRAW FUNCTION - Runs continuously (60fps by default)
// ============================================
function draw() {
    // Clear the background with a dark color
    background(50, 50, 60);
    
    // Only draw if GIF has loaded
    if (gif) {
        
        // Scale GIF to fill the entire canvas
        // This maintains aspect ratio and fills the canvas completely
        let scaleX = width / gif.width;
        let scaleY = height / gif.height;
        let scale = max(scaleX, scaleY); // Use larger scale to fill canvas
        
        // Calculate centered position with scaling
        let scaledWidth = gif.width * scale;
        let scaledHeight = gif.height * scale;
        let x = (width - scaledWidth) / 2;
        let y = (height - scaledHeight) / 2;
        
        // Draw the scaled GIF
        image(gif, x, y, scaledWidth, scaledHeight);
        
    } else {
        // Show loading message if GIF failed to load
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("GIF not loaded", width/2, height/2);
        textSize(16);
        text("Check console for errors", width/2, height/2 + 30);
    }
    
    // Debug info in corner (only show first few seconds to avoid spam)
    if (SHOW_DEBUG && frameCount < 180) { // Show for first 3 seconds (60fps * 3)
        if (frameCount % 60 === 0) { // Update once per second
            debug("Frame count:", frameCount);
            debug("Frame rate:", Math.round(frameRate()) + " fps");
        }
    }
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
    
    if (SHOW_DEBUG) {
        debug("Window resized to:", canvasWidth + "x" + canvasHeight + " (portrait)");
    }
}

// ============================================
// TOUCH/CLICK INTERACTION EXAMPLES
// ============================================

// Touch started (finger down)
function touchStarted() {
    if (SHOW_DEBUG) {
        debug("Touch started at:", mouseX + ", " + mouseY);
    }
    
    // Example: Change background color on touch
    background(random(100, 255), random(100, 255), random(100, 255));
    
    // Prevent default browser behavior
    return false;
}

// Touch ended (finger up)
function touchEnded() {
    if (SHOW_DEBUG) {
        debug("Touch ended");
    }
    return false;
}

// Double tap detection
function doubleClicked() {
    if (SHOW_DEBUG) {
        debug("Double tap detected");
    }
    
    // Example: Reset to original background
    background(50, 50, 60);
    
    return false;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Function to toggle debug console visibility
function keyPressed() {
    if (key === 'd' || key === 'D') {
        if (SHOW_DEBUG) {
            toggleDebug();
            debug("Debug console toggled");
        }
    }
    
    if (key === 'c' || key === 'C') {
        if (SHOW_DEBUG) {
            debug.clear();
            debug("Debug console cleared");
        }
    }
}

// ============================================
// TEMPLATE USAGE NOTES:
// ============================================

/*
HOW TO USE THIS TEMPLATE:

1. CONFIGURATION:
   - Set SHOW_DEBUG to true/false to enable/disable mobile debug console
   - This single variable controls all debug output

2. SETUP CHECKLIST:
   - p5.js library loaded
   - Mobile permissions library loaded
   - GIF file loaded with preload()
   - Debug console enabled (if SHOW_DEBUG is true)
   - Mobile gestures locked

3. CUSTOMIZATION:
   - Replace 'image/kindleEvo.gif' with your own GIF file
   - Modify the draw() function for your specific needs
   - Add your own interaction functions
   - Customize the styling in index.html

4. DEBUG FEATURES (when SHOW_DEBUG = true):
   - Press 'D' to toggle debug console visibility
   - Press 'C' to clear debug messages
   - Debug messages show loading status, touch events, etc.
   - All debug output can be disabled by setting SHOW_DEBUG = false

5. MOBILE FEATURES:
   - Gestures are locked (no zoom, swipe, refresh)
   - Touch events are handled properly
   - Responsive canvas that adapts to screen size
   - Debug console visible on mobile screen (when enabled)

6. NEXT STEPS:
   - Add motion sensor support with enableGyroTap()
   - Add microphone support with enableMicTap()
   - Implement your creative interactive features
   - Test on actual mobile devices

7. COMMON PATTERNS:
   - Use preload() for loading assets (images, sounds, etc.)
   - Use setup() for initialization
   - Use draw() for continuous animation
   - Use touchStarted/touchEnded for interactions
   - Use windowResized() for orientation changes
   - Use debug() instead of console.log() for mobile (when SHOW_DEBUG = true)
*/