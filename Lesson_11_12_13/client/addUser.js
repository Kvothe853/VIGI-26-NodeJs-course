const form = document.forms[0];

// select option
fetch("http://localhost:3000/memberships")
  .then((res) => res.json())
  .then((resp) => {
    const memberships = resp;
    const selectInput = document.getElementById("membership");

    memberships.forEach((membership) => {
      const option = document.createElement("option");
      option.value = membership.name;
      option.appendChild(document.createTextNode(`${membership.name}`));
      selectInput.append(option);
    });
  })
  .catch((err) => console.error(err));

// creating new user
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstnameInput = document.getElementById("firstname");
  const lastnameInput = document.getElementById("lastname");
  const emailInput = document.getElementById("email");
  const membershipInput = document.getElementById("membership").value;
  // const userIdInput = +document.getElementById("user-id").value;

  let serviceId = 1;
  //   fetch("http://localhost:3000/memberships")
  //     .then((res) => res.json())
  //     .then((response) => {
  //       response.forEach((user) => {
  //         let serviceId = 1;
  //         if (user.name === membershipInput.value) {
  //           serviceId = user.id;
  //         }
  //       });
  //     })
  //     .catch((err) => console.error(err));

  const newUserObj = {
    name: firstnameInput.value,
    surname: lastnameInput.value,
    email: emailInput.value,
    service_id: 4,
  };

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserObj),
  };

  fetch("http://localhost:3000/users", option)
    .then((res) => res.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
});
