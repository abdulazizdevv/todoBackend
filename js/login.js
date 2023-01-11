let elForm = document.querySelector("form");
let elEmailInput = document.querySelector(".js-email");
let elPasswordInput = document.querySelector(".js-password");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  fetch("http://192.168.1.3:5000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: elEmailInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.replace("index.html");
      }
    })
    .catch((err) => console.log(err));
});
