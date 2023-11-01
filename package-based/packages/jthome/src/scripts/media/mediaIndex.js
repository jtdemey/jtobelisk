import backgroundColors from "./backgroundColors";
import uiState from "../lib/uiState";
import { startBgShift } from "../lib/backgroundShifter";
import { resizeUpdate } from "../lib/resize";
import { scrollPoll } from "../lib/scroll";
import { loadImagePreviews } from "../lib/loadImages";

const MEETING_MINUTES_IMAGE_COUNT = 20;
const TOP_THINGS_IMAGE_COUNT = 15;

const siteWrapper = document.querySelector(".site-wrapper");
const mainContainer = document.querySelector(".main-container");
const mobileNav = document.querySelector(".mnav-area");
const contentViews = document.querySelectorAll(".content-view");

uiState.mobile = window.getComputedStyle(mobileNav).display === "block";
const shiftBg = (viewInd) =>
  startBgShift(backgroundColors, mainContainer, uiState, viewInd);
setInterval(() => scrollPoll(mobileNav, siteWrapper, shiftBg, uiState), 500);
const triggerResize = () => resizeUpdate(contentViews, mobileNav, uiState);
window.addEventListener("resize", triggerResize);
setTimeout(() => {
  uiState.contentHeight = contentViews[0].clientHeight;
  triggerResize();
}, 500);
mainContainer.style.transition = "background 1.2s";

const amountToLoad = uiState.mobile ? 2 : 4;
loadImagePreviews(
  amountToLoad,
  "mm-images",
  "meeting_minutes",
  MEETING_MINUTES_IMAGE_COUNT
);
loadImagePreviews(
  amountToLoad,
  "things-to-know-images",
  "things_to_know",
  TOP_THINGS_IMAGE_COUNT
);
