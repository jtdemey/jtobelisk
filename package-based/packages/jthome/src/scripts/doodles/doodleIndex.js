import uiState from "./uiState";
import { loadDoodles } from "./loadDoodles";

const setBtnListener = () => {
  const moreBtn = document.querySelector(".content-btn");
  moreBtn.addEventListener("click", () => {
    loadDoodles(4, uiState);
  });
};

//Init
(() => {
  loadDoodles(4, uiState);
  setBtnListener();
})();
