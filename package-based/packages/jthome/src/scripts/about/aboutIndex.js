import backgroundColors from "./backgroundColors";
import uiState from "./uiState";
import { startBgShift } from "../jthome/backgroundShifter";
import { loadDoodlePreviews } from "../doodles/loadDoodles";
import { resizeUpdate } from "../jthome/resize";
import { scrollPoll } from "../jthome/scroll";

const siteWrapper = document.querySelector(".site-wrapper");
const mainContainer = document.querySelector(".main-container");
const mobileNav = document.querySelector(".mnav-area");
const contentViews = document.querySelectorAll(".content-view");

(() => {
  uiState.mobile = window.getComputedStyle(mobileNav).display === "block";
  const shiftBg = (viewInd) =>
    startBgShift(backgroundColors, mainContainer, uiState, viewInd);
  setInterval(() => scrollPoll(mobileNav, siteWrapper, shiftBg, uiState), 800);
  const triggerResize = () => resizeUpdate(contentViews, mobileNav, uiState);
  window.addEventListener("resize", triggerResize);
  setTimeout(() => {
    uiState.contentHeight = contentViews[0].clientHeight;
    triggerResize();
  }, 500);
  mainContainer.style.transition = "background 1.2s";
  //loadParticles('../media/particles/homeParticles.json');
  loadDoodlePreviews(uiState);
})();
