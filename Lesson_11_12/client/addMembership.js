const form = document.forms[0];

fetch("http://localhost:3000/memberships")
  .then((resp) => resp.json())
  .then((res) => {
    document.getElementById("idInput").value = res.length + 1;
  })
  .catch((err) => console.error(err));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //id

  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const descriptionInput = document.getElementById("description");
  const idInput = document.getElementById("idInput");

  const newMemberObject = {
    id: +idInput.value,
    name: nameInput.value,
    price: +priceInput.value,
    description: descriptionInput.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMemberObject),
  };

  nameInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
  fetch("http://localhost:3000/memberships", options)
    .then((resp) => resp.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
});
