const namesForm = document.forms[0];
const linksForm = document.forms[1];

namesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("input[name=name]");
  const surnameInput = document.querySelector("input[name=surname]");

  const nameObject = { name: nameInput.value, surname: surnameInput.value };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nameObject),
  };

  if (nameInput.value && surnameInput.value) {
    fetch("http://localhost:8080/names", options)
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  }

  nameInput.value = "";
  surnameInput.value = "";
});

linksForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const linkInput = document.querySelector("input[name=link]");
  const linkObject = { link: linkInput.value };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(linkObject),
  };

  if (linkInput.value) {
    fetch("http://localhost:8080/links", options)
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  }
  linkInput.value = "";
});
