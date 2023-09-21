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
  right: [
    [4, 2],
    [4, 1],
    [4, 0],
    [3, 3],
    [3, 2],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 0],
  ],
};

const FRAME_INTERVAL = 100;

let animation = "awaken";
let blinked = true;
let frameIndex = 0;
let hasAwoken = false;
let interval;
let isLookingAtCursor = false;

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

const clamp = (min, max, val) => {
  if (val < min) return min;
  if (val > max) return max;
  return val;
};

const drawFrame = (bitmap, canvas, context, frame) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const offset = -240;
  context.drawImage(bitmap, offset * frame[1], offset * frame[0]);
};

const mountMouseOverNav = (onMouseOver, bitmap, canvas, context) => {
  const homeNav = document.getElementById("home-nav");
  if (!homeNav) return;
  homeNav.addEventListener("mouseenter", () => {
    if (!hasAwoken) return;
    isLookingAtCursor = true;
  });
  homeNav.addEventListener("mouseleave", () => {
    if (!hasAwoken) return;
    isLookingAtCursor = false;
    changeAnimation("neutral");
  });
  homeNav.addEventListener("mousemove", (e) =>
    onMouseOver(e, bitmap, canvas, context)
  );
  const eye = document.getElementById("eye");
  if (!eye) return;
  eye.addEventListener("mouseenter", () => {
    if (!hasAwoken) return;
    isLookingAtCursor = false;
    changeAnimation("neutral");
  });
  eye.addEventListener("mouseleave", () => {
    if (!hasAwoken) return;
    isLookingAtCursor = true;
  });
  eye.addEventListener("mousemove", e => {
    if (!hasAwoken) return;
    e.stopPropagation();
  });
};

let mouseCooldown = false;

const getPaddedMouseCoord = (screenCoord, originPoint, padding) => {
  const diff = Math.abs(screenCoord - originPoint);
  let paddedDiff = Math.round(diff / padding);
  if (screenCoord < originPoint && paddedDiff !== 0) {
    paddedDiff = -paddedDiff;
  }
  return paddedDiff;
};

const onMouseOverNav = (mouseOverEvent, bitmap, canvas, context) => {
  if (mouseCooldown === true || !hasAwoken) return;
  window.setTimeout(() => {
    mouseCooldown = false;
  }, 50);
  mouseCooldown = true;
  if (!isLookingAtCursor) {
    isLookingAtCursor = true;
  }

  const isMobile = window.innerWidth < 700;
  const origin = isMobile ? [120, 640] : [190, 640];
  const paddedXDiff = clamp(
    0,
    12,
    getPaddedMouseCoord(mouseOverEvent.clientX, origin[0], 120)
  );
  const paddedYDiff = clamp(
    -5,
    4,
    getPaddedMouseCoord(mouseOverEvent.clientY, origin[1], 60)
  );
  const rightAnimationIndex = paddedYDiff + 5;
  const indexPadding = Math.round(paddedXDiff / 12);
  const frameIndex =
    paddedYDiff < 1
      ? rightAnimationIndex + indexPadding
      : rightAnimationIndex - indexPadding;
  const desiredFrame =
    FRAMES["right"][frameIndex] ?? FRAMES["right"][FRAMES["right"].length - 1];
  drawFrame(bitmap, canvas, context, desiredFrame);
};

const startEyeAnimation = (bitmap, canvas, context) => {
  interval = window.setInterval(() => {
    if (isLookingAtCursor === true) return;
    checkToAwaken();
    checkToBlink();
    const activeFrames = FRAMES[animation];
    if (frameIndex > activeFrames.length - 1) {
      frameIndex = 0;
    }
    const frame = activeFrames[frameIndex];
    drawFrame(bitmap, canvas, context, frame);
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
        const clickMeElements = document.querySelectorAll(".click-me");
        clickMeElements.forEach((clickMe) =>
          clickMe.addEventListener("click", () =>
            startEyeAnimation(bitmap, canvas, context)
          )
        );
        mountMouseOverNav((e) => onMouseOverNav(e, bitmap, canvas, context));
      });
    });
};

export default makeEyeball;
