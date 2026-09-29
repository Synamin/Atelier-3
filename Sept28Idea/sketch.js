let tilt = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    lockGestures();
    enableGyroTap('Tap to enable motion sensors');
}

function draw() {
// Normal screen
background(255);

    if (!window.sensorsEnabled) {
        return;
    }

    tilt = constrain(abs(rotationX), 0, 180);
    let distanceFromNinety = abs(tilt - 90);
    let darkness = map(distanceFromNinety, 90, 0, 0, 255, true);

noStroke();
fill(0, darkness);
rect(0, 0, width, height);

}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}