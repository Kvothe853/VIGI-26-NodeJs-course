let orderSelection = "asc";
let petSelection = ["dog", "cat", "bunny"];

function dataDisplay(data) {
  const table = document.querySelector("tbody");
  table.innerHTML = "";

  data.forEach((pet) => {
    const tr = table.insertRow();

    const td1 = tr.insertCell();
    td1.textContent = pet.name;

    const td2 = tr.insertCell();
    td2.textContent = pet.type;

    const td3 = tr.insertCell();
    td3.textContent = pet.age;
  });
}

function getData() {
  fetch(
    `http://localhost:3000/pets/${petSelection.join(",")}/${orderSelection}`
  )
    .then((res) => res.json())
    .then((responce) => dataDisplay(responce));
}

getData();

fetch("http://localhost:3000/pets")
  .then((resp) => resp.json())
  .then((response) => dataDisplay(response))
  .catch((err) => console.error(err));

document.querySelector("#age").addEventListener("click", (e) => {
  const text = e.target.textContent;
  if (text.includes("Asc")) {
    e.target.textContent = text.replace("Asc", "Dsc");
    // fetch("http://localhost:3000/pets/dsc")
    //   .then((resp) => resp.json())
    //   .then((response) => dataDisplay(response));
    orderSelection = "dsc";
  } else {
    e.target.textContent = text.replace("Dsc", "Asc");
    fetch("http://localhost:3000/pets/asc");
    // .then((resp) => resp.json())
    // .then((response) => dataDisplay(response));
    orderSelection = "asc";
  }

  getData();
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.target.classList.toggle("selected");
    const petClicked = e.target.textContent.toLowerCase();

    if (petSelection.includes(petClicked)) {
      petSelection = petSelection.filter(
        (petStored) => petStored !== petClicked
      );
    } else {
      petSelection.push(petClicked);
    }
    getData();
  });
});
