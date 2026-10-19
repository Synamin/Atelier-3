let tilt = 0;
let gyroBeta = null;
const TILT_BOUNDARY = 10;
const STATIONARY_TIME = 10000;
let stationaryTilt = null;
let stationarySince = null;
let blackoutActive = false;
let feedImage;
let canvasLayer;

function setup() {
    canvasLayer = createCanvas(windowWidth, windowHeight);

    feedImage = loadImage('youtubeScroll.jpg', setFeedPageHeight);
    document.body.style.touchAction = 'auto';
    canvasLayer.style('position', 'fixed');
    canvasLayer.style('top', '0');
    canvasLayer.style('left', '0');
    canvasLayer.style('z-index', '1');

    lockGestures();
    window.addEventListener('deviceorientation', handleOrientation, true);
    enableGyroTap('Tap to enable motion sensors');
}

function draw() {
    let darkness = 0;
    let status = 'GYRO WAITING';
    const now = millis();

    if (window.sensorsEnabled && gyroBeta !== null) {
        tilt = constrain(abs(gyroBeta), 0, 180);
        darkness = tilt <= 90 ? 255 : map(tilt, 90, 180, 255, 0, true);
        status = 'GYRO OK';

        if (stationaryTilt === null || abs(tilt - stationaryTilt) > TILT_BOUNDARY) {
            stationaryTilt = tilt;
            stationarySince = now;
            blackoutActive = false;
        } else {
            blackoutActive = now - stationarySince >= STATIONARY_TIME;
        }
    } else {
        stationaryTilt = null;
        stationarySince = null;
        blackoutActive = false;
    }

    const scrollEnabled =
        window.sensorsEnabled &&
        gyroBeta !== null &&
        tilt > 90;
    updatePageScroll(scrollEnabled);

    noStroke();
    if (blackoutActive) {
        background(0);
        const secondsStationaryAfterBlackout = floor(
            (now - stationarySince - STATIONARY_TIME) / 1000
        );
        const glitchIntensity = constrain(
            (secondsStationaryAfterBlackout + 1) / 10,
            0.1,
            1
        );
        drawGlitch(glitchIntensity);
    } else {
        clear();

        // Restore the original tilt-based darkness outside the stationary blackout.
        fill(0, darkness);
        rect(0, 0, width, height);

        // Keep the sensor and stationary-angle state visible while testing on the phone.
        fill(darkness > 127 ? 255 : 0);
        textSize(16);
        textAlign(LEFT, TOP);
        const stationarySeconds = stationarySince === null
            ? 0
            : floor((now - stationarySince) / 1000);
        text(
            `${status} | tilt: ${tilt.toFixed(1)}° | darkness: ${Math.round(darkness / 255 * 100)}% | stationary: ${stationarySeconds}s`,
            12,
            12
        );
    }
}

function setFeedPageHeight(image) {
    const pageHeight = max(windowHeight, windowWidth * image.height / image.width);
    document.body.style.minHeight = `${pageHeight}px`;
}

function updatePageScroll(scrollEnabled) {
    document.body.style.overflowY = scrollEnabled ? 'auto' : 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.touchAction = scrollEnabled ? 'auto' : 'none';
    document.body.style.minHeight = feedImage
        ? `${max(windowHeight, windowWidth * feedImage.height / feedImage.width)}px`
        : `${windowHeight}px`;
    canvasLayer.style('pointer-events', scrollEnabled && !blackoutActive ? 'none' : 'auto');
}

function drawGlitch(intensity) {
    const sliceCount = floor(1 + intensity * 34);
    const maxSliceHeight = max(2, height * 0.025 * intensity);

    for (let i = 0; i < sliceCount; i++) {
        const sliceY = random(height);
        const sliceHeight = random(1, maxSliceHeight);
        const offset = random(-width, width) * intensity;

        copy(0, sliceY, width, sliceHeight, offset, sliceY, width, sliceHeight);

        if (random() < intensity * 0.75) {
            fill(random(140, 255), random(140, 255), random(140, 255), random(45, 180));
            rect(random(width), sliceY, random(4, max(8, width * 0.18)), sliceHeight);
        }
    }

    if (intensity > 0.35) {
        stroke(255, random(30, 140));
        for (let i = 0; i < intensity * 80; i++) {
            const scanlineY = random(height);
            line(0, scanlineY, width, scanlineY);
        }
        noStroke();
    }
}

function handleOrientation(event) {
    if (typeof event.beta === 'number') {
        gyroBeta = event.beta;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (feedImage) {
        setFeedPageHeight(feedImage);
    }
}