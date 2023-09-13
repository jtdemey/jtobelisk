const FRAMES = {
  awaken: [
    [1, 3],
    [1, 2],
    [1, 1],
    [1, 0],
  ],
  neutral: [
    [0, 0],
    [0, 0],
    [0, 2],
    [0, 2],
    [0, 0],
    [0, 0],
    [0, 1],
    [0, 1],
    [0, 0],
    [0, 0],
    [0, 2],
    [0, 2],
    [0, 1],
    [0, 1],
  ],
  blink: [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 2],
    [1, 1],
    [1, 0],
  ],
  right_down: [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 0],
  ],
  right_up: [
    [3, 2],
    [3, 3],
    [4, 0],
    [4, 1],
    [4, 2],
  ],
};

const FRAME_INTERVAL = 100;

let animation = "awaken";
let blinked = true;
let frameIndex = 0;
let hasAwoken = false;
let interval;

const changeAnimation = (nextAnimation) => {
  frameIndex = 0;
  animation = nextAnimation;
};

const checkToAwaken = () => {
  if (!hasAwoken) {
    window.setTimeout(() => {
      changeAnimation("neutral");
      hasAwoken = true;
    }, FRAME_INTERVAL * FRAMES["awaken"].length - 2);
  }
};

const checkToBlink = () => {
  if (hasAwoken && blinked) {
    blinked = false;
    const nextBlink = Math.floor(Math.random() * 8) * 1000 + 2000;
    window.setTimeout(() => {
      changeAnimation("blink");
      window.setTimeout(() => {
        changeAnimation("neutral");
        blinked = true;
      }, FRAME_INTERVAL * FRAMES["blink"].length + 2);
    }, nextBlink);
  }
};

const startEyeAnimation = (bitmap, canvas, context) => {
  interval = window.setInterval(() => {
    checkToAwaken();
    checkToBlink();
    const activeFrames = FRAMES[animation];
    if (frameIndex > activeFrames.length - 1) {
      frameIndex = 0;
    }
    const frame = activeFrames[frameIndex];
    context.clearRect(0, 0, canvas.width, canvas.height);
    const offset = -240;
    context.drawImage(bitmap, offset * frame[1], offset * frame[0]);
    frameIndex++;
  }, FRAME_INTERVAL);
};

const makeEyeball = () => {
  const canvas = document.getElementById("eye");
  canvas.width = 240;
  canvas.height = 240;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  fetch("/img/eye/eye.webp")
    .then((res) => res.blob())
    .then((imgData) => {
      createImageBitmap(imgData).then((bitmap) => {
        startEyeAnimation(bitmap, canvas, context);
      });
    });
};

export default makeEyeball;
