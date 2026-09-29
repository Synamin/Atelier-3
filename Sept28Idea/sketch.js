let tilt = 180;
let orientationStarted = false;

function setup() {
createCanvas(windowWidth, windowHeight);

// Prevent scrolling, zooming, and other touch gestures.
document.body.style.overflow = 'hidden';
document.body.style.touchAction = 'none';

canvas.style('touch-action', 'none');
canvas.elt.style.pointerEvents = 'none';

// Start reading the phone's orientation automatically.
window.addEventListener(
    'deviceorientation',
    handleOrientation,
    true
);

}

function draw() {
// Normal screen
background(255);

/*
 * We want:

 * 90°  = almost completely black
 * 180° = completely normal

 * Map the angle between those two points
 * to brightness.
 */
let brightness = map(
    tilt,
    90,
    180,
    0,
    255,
    true
);

// Convert brightness into black-overlay opacity.
let darkness = 255 - brightness;

noStroke();
fill(0, darkness);
rect(0, 0, width, height);

}

function handleOrientation(event) {
if (event.beta === null) {
return;
}

orientationStarted = true;

/*
 * beta represents front/back tilt.

 * Keep the useful range between 90° and 180°.
 */
tilt = constrain(abs(event.beta), 90, 180);

}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}