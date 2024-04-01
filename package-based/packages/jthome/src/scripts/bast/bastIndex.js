function showError(text) {
  const errorArea = document.getElementById("error");
  if (!errorArea) return;
  errorArea.innerText = text;
  errorArea.classList.remove("invisible");
}

function subscribe(e) {
  e.preventDefault();
  const email = document.getElementById("email");
  if (!email || !email.value) return;
  fetch("http://localhost:3000/bast/subscribe", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
    }),
  })
    .then((res) => {
      res.json().then((body) => {
        if (res.status === 400) {
          console.log(body);
          if (body.response === "REDUNDANT_EMAIL") {
            showError("You're already registered; check your spam for the verification email.");
          } else {
            showError("Please enter a valid email address.");
          }
          return;
        }

        if (res.status !== 200) {
          showError("Something went wrong. Please try later.");
          return;
        }

        window.location.href = "http://localhost:3000/bast/welcome";
        // window.location.href = "https://johntorsten.com/bast/welcome";
      });
    })
    .catch((err) => console.error(err));
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => subscribe(e));
