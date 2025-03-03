const loadImage = async (
  ind,
  elementIdentifier,
  imgDirectory,
  isPreview,
  altDescription,
) => {
  const uri = `${window.location.origin}/img/${imgDirectory}/`;
  const dood = new Image();
  dood.src = `${uri}${isPreview ? "thumbs/" : ""}img${ind}.webp`;

  const setImgDimensions = (e) => {
    dood.alt = altDescription;
    dood.width = e.target?.width;
    dood.height = e.target?.height;
  };
  dood.addEventListener("load", setImgDimensions);

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
  maxImages,
  altDescriptions,
) => {
  let newImagesLoaded = imagesLoaded;
  for (let i = imagesLoaded + 1; i < imagesLoaded + amountToLoad + 1; i++) {
    if (newImagesLoaded <= maxImages) {
      await loadImage(
        i,
        elementIdentifier,
        imgDirectory,
        false,
        altDescriptions[i - 1],
      );
      newImagesLoaded += 1;
    } else {
      const siteWrapper = document.querySelector(".site-wrapper");
      const loadImagesButton = document.querySelector(
        "#load-images-btn > div > h5",
      );
      loadImagesButton.innerHTML = "Scroll to top";
      loadImagesButton.addEventListener("click", () =>
        siteWrapper.scrollTo({ behavior: "smooth", top: 0 }),
      );
    }
  }
  return newImagesLoaded;
};

export const loadImagePreviews = async (
  amountToLoad,
  elementIdentifier,
  imgDirectory,
  maxImages,
) => {
  const randInts = [];
  while (randInts.length < amountToLoad) {
    const ind = Math.floor(Math.random() * maxImages) + 1;
    if (!randInts.some((int) => int === ind)) {
      randInts.push(ind);
    }
  }
  // TODO check max
  const loadImagePromises = randInts.map((randInt) =>
    loadImage(randInt, elementIdentifier, imgDirectory, true),
  );
  return Promise.allSettled(loadImagePromises);
};
