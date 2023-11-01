import { loadImages } from "../lib/loadImages";

const MAX_IMAGES = 14;

let imagesLoaded = 0;

const mountBtnListener = () => {
  const loadImageBtn = document.getElementById("load-images-btn");
  if (!loadImageBtn) return;
  loadImageBtn.addEventListener("click", async () => {
    imagesLoaded = await loadImages(
      4,
      "images",
      imagesLoaded,
      "things_to_know",
      MAX_IMAGES,
    );
  });
};

imagesLoaded = await loadImages(
  8,
  "images",
  imagesLoaded,
  "things_to_know",
  MAX_IMAGES,
);
mountBtnListener();
