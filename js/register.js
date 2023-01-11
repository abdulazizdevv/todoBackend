let elForm = document.querySelector(".js-form");
let elNameInput = document.querySelector(".js-name");
let elPhoneInput = document.querySelector(".js-phone");
let elEmailInput = document.querySelector(".js-email");
let elPasswordInput = document.querySelector(".js-password");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  fetch("http://192.168.5.231:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: elNameInput.value,
      phone: elPhoneInput.value,
      email: elEmailInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        location.replace("index.html");
      }
    })
    .catch((err) => console.log(err));
});
