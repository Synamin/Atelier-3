let tilt = 0;
let permissionButton;

function setup() {
    createCanvas(windowWidth, windowHeight);

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    let requiresPermission = typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function';

    if (requiresPermission) {
        permissionButton = createButton('Enable Gyroscope');
        permissionButton.position(width / 2 - 80, height / 2);
        permissionButton.style('position', 'fixed');
        permissionButton.style('z-index', '10');
        permissionButton.style('font-size', '18px');
        permissionButton.style('padding', '12px 16px');
        permissionButton.mousePressed(requestOrientationPermission);
    } else {
        startOrientation();
    }
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

function startOrientation() {
window.addEventListener('deviceorientation', handleOrientation, true);
}

function requestOrientationPermission() {
DeviceOrientationEvent.requestPermission()
    .then((response) => {
        if (response === 'granted') {
            startOrientation();
            permissionButton.remove();
        }
    })
    .catch(console.error);
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

if (permissionButton) {
    permissionButton.position(width / 2 - 80, height / 2);
}
}