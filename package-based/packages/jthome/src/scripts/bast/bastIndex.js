function subscribe(e) {
  e.preventDefault();
  const email = document.getElementById("email");
  if (!email || !email.value) return;
  console.log(email.value);
  fetch("http://localhost:3000/bast/subscribe", {
    method: "post",
    body: {
      email: email.value,
    },
  }).catch((err) => console.error(err));
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => subscribe(e));
