const clearBgShift = (uiState) => {
  clearInterval(uiState.bgShiftTimer);
  uiState.bgShiftTimer = undefined;
};

export const startBgShift = (
  backgroundColors,
  mainContainer,
  uiState,
  viewIndex
) => {
  const c = backgroundColors[viewIndex];
  if (uiState.bgShiftTimer) {
    clearBgShift(uiState);
  }
  uiState.background = viewIndex;
  uiState.bgShiftTimer = setTimeout(() => {
    mainContainer.style.background = c;
    clearBgShift(uiState);
  }, 420);
};
