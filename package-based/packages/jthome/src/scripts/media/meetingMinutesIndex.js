import { loadImages } from "../lib/loadImages";

const MAX_IMAGES = 14;

const ALT_DESCRIPTIONS = [
  "A mechanical bird attached to an odd apparatus in a desert staring at an orb",
];

let imagesLoaded = 0;

const mountBtnListener = () => {
  const loadImageBtn = document.getElementById("load-images-btn");
  if (!loadImageBtn) return;
  loadImageBtn.addEventListener("click", async () => {
    imagesLoaded = await loadImages(
      4,
      "images",
      imagesLoaded,
      "meeting_minutes",
      MAX_IMAGES,
      ALT_DESCRIPTIONS,
    );
  });
};

imagesLoaded = await loadImages(
  8,
  "images",
  imagesLoaded,
  "meeting_minutes",
  MAX_IMAGES,
  ALT_DESCRIPTIONS,
);
mountBtnListener();
