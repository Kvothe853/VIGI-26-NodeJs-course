"use strict";

const form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const carNumberplate = document.getElementById("carNumberplates");
  const carModel = document.getElementById("carModel");
  const carImage = document.getElementById("carImage");
  const carPrice = document.getElementById("carPrice");

  const inputStatus = document.querySelector(".inputStatus");

  if (carNumberplate.value && carModel.value && carImage.value && carPrice) {
    const newCarObj = {
      title: carModel.value,
      image: carImage.value,
      price: carPrice.value,
      numberplates: carNumberplate.value,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCarObj),
    };

    carNumberplate.value = "";
    carModel.value = "";
    carImage.value = "";
    carPrice.value = "";

    fetch("http://localhost:3000/cars", option)
      .then((resp) => resp.json())
      .then((response) => console.log(response))
      .catch((e) => console.error(e));

    inputStatusSuccess(inputStatus);
    const myTimeout = setTimeout(removeInputStatus, 1700);
  } else {
    inputStatusError(inputStatus);
    const myTimeout = setTimeout(removeInputStatus, 1700);
  }
});

function removeInputStatus() {
  const inputStatus = document.querySelector(".inputStatus");
  inputStatus.classList.add("hidden");
  inputStatus.textContent = "";
}

function inputStatusError(inputStatus) {
  inputStatus.classList.remove("hidden");
  inputStatus.textContent = "Please fill all fields";
  inputStatus.style.backgroundColor = "#FF9494";
}

function inputStatusSuccess(inputStatus) {
  inputStatus.classList.remove("hidden");
  inputStatus.textContent = "Success";
  inputStatus.style.backgroundColor = "#4BB543";
  inputStatus.style.color = "#fff";
}
