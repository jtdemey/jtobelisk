const FRAMES = {
  neutral: [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  blink: [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
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

let animation = "neutral";
let frameIndex = 0;
let interval;

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

const startEyeAnimation = (bitmap, canvas, context) => {
	interval = window.setInterval(() => {
		const activeFrames = FRAMES[animation];
		if (frameIndex > activeFrames.length - 1) {
			frameIndex = 0;
		}
		const frame = activeFrames[frameIndex];
		console.log(frame);
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(bitmap, 240 * frame[0], 240 * frame[1]);
		frameIndex++;
	}, 1000);
};

export default makeEyeball;
