export const scrollPoll = (
  mobileNav,
  siteWrapper,
  shiftBg,
  uiState,
) => {
  const ypos = siteWrapper.pageYOffset || siteWrapper.scrollTop;
  if (uiState.mobile) {
    if (uiState.lastScrollPos > ypos) {
      if (ypos < 301 && uiState.mNavFixed) {
        setTimeout(() => {
          mobileNav.classList.remove('mnav-fixed');
          uiState.mNavFixed = false;
        }, 200);
        mobileNav.classList.remove('mnav-top');
        uiState.mNavTop = false;
      } else if (ypos > 300) {
        if (!uiState.mNavFixed) {
          mobileNav.classList.add('mnav-fixed');
          uiState.mNavFixed = true;
        }
        mobileNav.classList.add('mnav-top');
        uiState.mNavTop = true;
      }
    } else if (uiState.lastScrollPos < ypos) {
      if (ypos > 300 && !uiState.mNavFixed) {
        mobileNav.classList.add('mnav-fixed');
        uiState.mNavFixed = true;
      }
      mobileNav.classList.remove('mnav-top');
      uiState.mNavTop = false;
    }
  }
  const viewInd =
    Math.floor(ypos / uiState.contentHeight) < 1
      ? 0
      : Math.floor(
          (ypos - 96 + uiState.contentHeight / 2) / uiState.contentHeight
        );
  if (viewInd !== uiState.background) {
    shiftBg(viewInd);
  }
  uiState.lastScrollPos = ypos;
};
