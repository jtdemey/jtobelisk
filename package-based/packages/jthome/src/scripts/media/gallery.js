import { loadImages } from "../lib/loadImages";
import { ALBUMS } from "./photos";

let album;
let albumName;
let imagesLoaded = 0;

const init = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  albumName = queryParams.get("album");
  album = ALBUMS[albumName];
  if (!album) {
    const text = document.querySelector("#images-container > p");
    text.style.paddingBottom = "64px";
    text.innerText = "Failed to load album";
    return;
  }

  document.getElementById("gallery-header").innerText = album.name;

  imagesLoaded = await loadImages(
    8,
    "images",
    imagesLoaded,
    `photos/${albumName}`,
    album.count,
    album.alts,
  );
};

const mountBtnListener = () => {
  const loadImageBtn = document.getElementById("load-images-btn");
  if (!loadImageBtn) return;
  loadImageBtn.addEventListener("click", async () => {
    imagesLoaded = await loadImages(
      4,
      "images",
      imagesLoaded,
      `photos/${albumName}`,
      album.count,
      album.alts,
    );
  });
};

init();
mountBtnListener();
