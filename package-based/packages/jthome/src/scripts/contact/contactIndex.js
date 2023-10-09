const copyKeyBtn = document.getElementById("copy-pgp-key-btn");
copyKeyBtn.addEventListener("click", () => {
  const keyElement = document.querySelector("blockquote > p");
  if (!keyElement) return;
  const text = keyElement.innerHTML.replace(/<br>/g, "\n");
  navigator.clipboard.writeText(text);
  const btnTextElement = document.querySelector("#copy-pgp-key-btn > h5");
  if (!btnTextElement) return;
  btnTextElement.innerHTML = "Copied!";
  setTimeout(() => {
    btnTextElement.innerHTML = "Copy PGP key";
  }, 4000);
});
