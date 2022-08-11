const form = document.forms[0];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const typeInput = document.getElementById("typs");

  const petsObject = {
    name: nameInput.value,
    age: +ageInput.value,
    type: typeInput.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(petsObject),
  };

  fetch("http://localhost:3000/pets", options)
    .then((resp) => resp.json())
    .then((response) => console.log(response))
    .catch((error) => console.error(error));

  nameInput.value = "";
  ageInput.value = "";
});
