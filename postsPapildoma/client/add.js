const createUserForm = document.forms[0];
const updateUserForm = document.forms[1];

createUserForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userIdInput = document.getElementById("userIdCreate");
  const userTitleInput = document.getElementById("titleCreate");
  const userBodyInput = document.getElementById("bodyCreate");

  const options = {
    method: "POST",
    body: JSON.stringify({
      userId: +userIdInput.value,
      title: userTitleInput.value,
      body: userBodyInput.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  };

  fetch("http://localhost:8080/addedUsers", options)
    .then((response) => response.json())
    .then((json) => console.log(json));

  userBodyInput.value = "";
  userTitleInput.value = "";
  userIdInput.value = "";
});

updateUserForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userIdInput = document.getElementById("userIdUpdate");
  const userTitleInput = document.getElementById("titleUpdate");
  const userBodyInput = document.getElementById("bodyUpdate");
  const userIdIdInput = document.getElementById("userIdIdUpdate");

  const options = {
    method: "PUT",
    body: JSON.stringify({
      userId: +userIdIdInput.value,
      title: userTitleInput.value,
      body: userBodyInput.value,
    }),
  };

  fetch(`http://localhost:8080/posts/${userIdInput.value}`, options)
    .then((resp) => resp.json())
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  console.log(userIdInput);

  userIdInput.value = 1;
  userIdIdInput.value = "";
  userBodyInput.value = "";
  userTitleInput.value = "";
});
