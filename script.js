const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1436;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'static/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 4;
let frameY = 1;
let gameFrame = 0;
const staggerFrames = 14;

const speed = 2;
let direction = 1; // 1 for right, -1 for left
let currentPosition = 0;
let sleepMode = false;
let petMode = false;
let feedMode = false;

// class selectors for buttons
const sleepButton = document.querySelector('.buttons0');
const petButton = document.querySelector('.buttons2');
const feedButton = document.querySelector('.buttons1')

sleepButton.addEventListener('click', handleSleep);
petButton.addEventListener('click', handlePet);
feedButton.addEventListener('click', handleFeed);

playerImage.onload = function () {
    animate();
};

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // sprite drawn based on frameX and frameY
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, currentPosition, 0, spriteWidth, spriteHeight);

    if (!sleepMode && !petMode && gameFrame % staggerFrames === 0) {
        if (frameX < 5) frameX++;
        else frameX = 0;

        // if sprite reaches the right boundary
        if (currentPosition + spriteWidth >= CANVAS_WIDTH) {
            frameY = 3; // Switch to frameY 3 when at the boundary
        }
    }

    gameFrame++;
    requestAnimationFrame(animate);

    //  sprite will move horizontally
    moveSprite();
}

function moveSprite() {
    if (!sleepMode && !petMode) {
        currentPosition += speed * direction;

        // Check if the sprite reaches the right or left boundary
        if (currentPosition + spriteWidth > CANVAS_WIDTH) {
            currentPosition = CANVAS_WIDTH - spriteWidth;
            direction = -1;
        } else if (currentPosition < 0) {
            currentPosition = 0;
            direction = 1;
        }
    }
}

function handleSleep() {
    changeMode(animationModes.SLEEP);
    setTimeout(() => {
        frameY = 0;
        petMode = false;
    }, 1500);
}

function handlePet() {
    if (!petMode) {
        changeMode(animationModes.PET);
        setTimeout(() => {
            frameY = 0;
            petMode = false;
        }, 500);
    }
}

function handleFeed() {
    changeMode(animationModes.FEED);
    setTimeout(() => {
        frameY = 0;
        petMode = false;
    }, 1500);
}

const animationModes = {
    IDLE: 0,
    SLEEP: 4,
    PET: 5,
    FEED: 7,
};

let currentMode = animationModes.IDLE;

function changeMode(mode) {
    currentMode = mode;
    frameX = 0; // Reset frameX when changing mode
    frameY = mode;
}

// Start the animation loop
animate();

