const form = document.forms[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const brandInput = document.getElementById("brand");
  const modelInput = document.getElementById("model");
  const sizeInput = document.getElementById("size").value;
  const priceInput = document.getElementById("price");

  const shirtObj = {
    brand: brandInput.value,
    model: modelInput.value,
    size: sizeInput,
    price: +priceInput.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shirtObj),
  };

  fetch("http://localhost:8080/shirts", options)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  console.log(shirtObj);
});
