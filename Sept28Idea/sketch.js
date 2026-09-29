let tilt = 0;
let gyroBeta = null;

function setup() {
    createCanvas(windowWidth, windowHeight);

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    lockGestures();
    window.addEventListener('deviceorientation', handleOrientation, true);
    enableGyroTap('Tap to enable motion sensors');
}

function draw() {
    background(255);

    let darkness = 0;
    let status = 'GYRO WAITING';

    if (window.sensorsEnabled && gyroBeta !== null) {
        tilt = constrain(abs(gyroBeta), 0, 180);
        let distanceFromNinety = abs(tilt - 90);
        darkness = map(distanceFromNinety, 90, 0, 0, 255, true);
        status = 'GYRO OK';
    }

    noStroke();
    fill(0, darkness);
    rect(0, 0, width, height);

    // Keep the sensor and overlay state visible while testing on the phone.
    fill(darkness > 127 ? 255 : 0);
    textSize(16);
    textAlign(LEFT, TOP);
    text(`${status} | tilt: ${tilt.toFixed(1)}° | darkness: ${Math.round(darkness / 255 * 100)}%`, 12, 12);
}

function handleOrientation(event) {
    if (typeof event.beta === 'number') {
        gyroBeta = event.beta;
    }
}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}