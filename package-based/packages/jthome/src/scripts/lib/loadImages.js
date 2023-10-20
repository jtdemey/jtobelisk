const loadImage = async (ind, elementIdentifier, imgDirectory, isPreview) => {
  const uri = `${window.location.origin}/img/${imgDirectory}/`;
  const dood = new Image();
  dood.src = `${uri}${isPreview ? "thumbs/" : ""}img${ind}.webp`;

  const link = document.createElement("a");
  link.href = `${uri}img${ind}.webp`;
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
  link.appendChild(dood);

  const card = document.createElement("article");
  card.classList.add(isPreview ? "image-preview" : "image-card");
  card.appendChild(link);

  const cards = document.getElementById(elementIdentifier);
  cards.appendChild(card);
};

export const loadImages = async (
  amountToLoad,
  elementIdentifier,
  imagesLoaded,
  imgDirectory,
  maxImages
) => {
  let newImagesLoaded = imagesLoaded;
  for (let i = imagesLoaded; i < imagesLoaded + amountToLoad; i++) {
    if (imagesLoaded <= maxImages) {
      newImagesLoaded += 1;
      await loadImage(i, elementIdentifier, imgDirectory, false);
    } else {
      document.querySelector("#load-images-btn").style.display = "none";
    }
  }
  return newImagesLoaded;
};

export const loadImagePreviews = async (
  amountToLoad,
  elementIdentifier,
  imgDirectory,
  maxImages
) => {
  const randInts = [];
  while (randInts.length < amountToLoad) {
    const ind = Math.floor(Math.random() * maxImages) + 1;
    if (!randInts.some((int) => int === ind)) {
      randInts.push(ind);
    }
  }
  for (let i = 0; i < randInts.length; i++) {
    await loadImage(randInts[i], elementIdentifier, imgDirectory, true);
  }
};
