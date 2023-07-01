const loadDoodle = async (ind, isPreview) => {
  const uri = `${window.location.origin}/doodles/`;
  const dood = new Image();
  dood.src = `${uri}${isPreview ? 'thumbs/' : ''}img${ind}.jpg`;

  const link = document.createElement('a');
  link.href = `${uri}img${ind}.jpg`;
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.appendChild(dood);

  const card = document.createElement('article');
  card.classList.add(isPreview ? 'doodle-card' : 'drawing');
  card.appendChild(link);

  const cards = document.querySelector(
    isPreview ? '.doodle-cards' : '.drawings'
  );
  cards.appendChild(card);
};

export const loadDoodles = (amt, uiState) => {
  const s = uiState.doodlesLoaded;
  for (let i = s; i < s + amt; i++) {
    if (uiState.doodlesLoaded <= uiState.doodleTotal) {
      uiState.doodlesLoaded += 1;
      loadDoodle(i, false);
    } else {
      document.querySelector('#load-doodles-btn').style.display = 'none';
    }
  }
};

export const loadDoodlePreviews = uiState => {
  const randInts = [];
  while (randInts.length < 5) {
    const ind = Math.floor(Math.random() * uiState.doodleCt);
    if (!randInts.some(int => int === ind)) {
      randInts.push(ind);
    }
  }
  for (let i = 0; i < randInts.length; i++) {
    loadDoodle(i, true);
  }
};
