let permissionGranted = false;
let permissionButton;

function setup() {
    createCanvas(windowWidth, windowHeight);

    lockGestures();

    let isMobileDevice = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    let requiresGyroscopePermission = typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function';

    if (isMobileDevice && requiresGyroscopePermission) {
        permissionButton = createButton('Enable Gyroscope');
        permissionButton.position(width / 2 - 80, height / 2);
        permissionButton.style('position', 'fixed');
        permissionButton.style('z-index', '10');
        permissionButton.style('font-size', '18px');
        permissionButton.style('padding', '12px 16px');
        permissionButton.mousePressed(requestGyroscopePermission);
    } else {
        permissionGranted = true;
    }
}

function draw() {
    background(255);

    if (!permissionGranted) {
        return;
    }

    let totalTilt = constrain(abs(rotationX) + abs(rotationY), 0, 180);
    let distanceFromNinety = abs(totalTilt - 90);
    let blackness = map(distanceFromNinety, 0, 90, 255, 0, true);

    noStroke();
    fill(0, blackness);
    rect(0, 0, width, height);
}

function requestGyroscopePermission() {
    DeviceOrientationEvent.requestPermission()
        .then((response) => {
            if (response === 'granted') {
                permissionGranted = true;
                permissionButton.remove();
            }
        })
        .catch(console.error);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    if (permissionButton) {
        permissionButton.position(width / 2 - 80, height / 2);
    }
}

