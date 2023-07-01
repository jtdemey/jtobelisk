export const resizeUpdate = (contentViews, mobileNav, uiState) => {
  uiState.contentHeight = contentViews[0].clientHeight;
  if (uiState.mobileCheckTimer === undefined) {
    uiState.mobileCheckTimer = setTimeout(() => {
      uiState.mobile =
        window.getComputedStyle(mobileNav).display !== 'block' ? false : true;
      uiState.mobileCheckTimer = undefined;
    }, 1000);
  }
};
