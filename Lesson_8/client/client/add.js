const form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const petName = document.getElementById("name");
  const petType = document.getElementById("type");
  const petAge = document.getElementById("age");

  const petObject = {
    name: petName.value,
    type: petType.value,
    age: +petAge.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(petObject),
  };

  petName.value = "";
  petType.value = "";
  petAge.value = "";

  fetch("http://localhost:3000/pets", options)
    .then((resp) => resp.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
});
