const form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("firstName");
  const surnameInput = document.getElementById("surname");
  const ageInput = document.getElementById("age");

  const personObject = {
    name: nameInput.value,
    surname: surnameInput.value,
    age: +ageInput.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(personObject),
  };
  nameInput.value = "";
  surnameInput.value = "";
  ageInput.value = "";

  fetch("http://localhost:3000/", options)
    .then((resp) => resp.json())
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
});
