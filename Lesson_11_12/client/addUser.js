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
  const userIdInput = +document.getElementById("membershipId").value;

  const newUserObj = {
    name: firstnameInput.value,
    surname: lastnameInput.value,
    email: emailInput.value,
    service_id: userIdInput,
  };

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserObj),
  };

  firstnameInput.value = "";
  lastnameInput.value = "";
  emailInput.value = "";

  fetch("http://localhost:3000/users", option)
    .then((res) => res.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
});

function updateMembershipId(membershipInput) {
  fetch("http://localhost:3000/memberships")
    .then((res) => res.json())
    .then((response) => {
      response.forEach((user) => {
        if (user.name === membershipInput) {
          document.getElementById("membershipId").value = user.id;
        }
      });
    })
    .catch((err) => console.error(err));
}
