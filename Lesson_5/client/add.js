"use strict";

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.querySelector("input[name=firstname]");
  console.log(nameInput.value);

  const nameObject = { name: nameInput.value };

  const headers = {
    method: "POST",
    "Content-type": "application/json",
    body: JSON.stringify(nameObject),
  };

  fetch("http://localhost:8080/names", headers)
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.error(err));
});
