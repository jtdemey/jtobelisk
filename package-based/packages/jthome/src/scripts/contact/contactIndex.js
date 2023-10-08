const copyKeyBtn = document.getElementById("copy-pgp-key-btn");
copyKeyBtn.addEventListener("click", () => {
  const keyElement = document.querySelector("blockquote > p");
  const text = keyElement.innerHTML.replace(/<br>/g, "\n");
  navigator.clipboard.writeText(text);
});
