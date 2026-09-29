let tilt = 0;

function setup() {
createCanvas(windowWidth, windowHeight);

// Prevent scrolling, zooming, and other touch gestures.
document.body.style.overflow = 'hidden';
document.body.style.touchAction = 'none';

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

// Darkness peaks at 90 degrees and fades toward both flat positions.
let distanceFromNinety = abs(tilt - 90);
let darkness = map(distanceFromNinety, 90, 0, 0, 255, true);

noStroke();
fill(0, darkness);
rect(0, 0, width, height);

}

function handleOrientation(event) {
if (event.beta === null) {
return;
}

// beta represents front/back tilt: 0 is flat, 90 is upright, 180 is face down.
tilt = constrain(abs(event.beta), 0, 180);

}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}