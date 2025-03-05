import { loadImages } from "../lib/loadImages";
import { ALBUMS } from "./albums";

let album;
let albumName;
let imagesLoaded = 0;
let isPhotoAlbum = false;

const init = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  albumName = queryParams.get("album");
  album = ALBUMS[albumName];
  isPhotoAlbum = !album.isArt;

  if (!album) {
    const text = document.querySelector("#images-container > p");
    text.style.paddingBottom = "64px";
    text.innerText = "Failed to load album";
    document.getElementById("load-images-btn").style.display = "none";
    return;
  }

  document.getElementById("gallery-content").style.backgroundColor =
    album.background;
  document.getElementById("gallery-header").innerText = album.name;

  imagesLoaded = await loadImages(
    8,
    "images",
    imagesLoaded,
    isPhotoAlbum ? `photos/${albumName}` : `art/${albumName}`,
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
      isPhotoAlbum ? `photos/${albumName}` : `art/${albumName}`,
      album.count,
      album.alts,
    );
  });
};

init();
mountBtnListener();
