let orderSelection = "asc";

function dataDisplay(response) {
  document.querySelector(".users-container").innerHTML = "";
  const users = response;
  console.log(users);
  users.forEach((user) => {
    const box = document.createElement("div");
    box.className = "box";
    const boxInfo = document.createElement("div");
    //name
    const nameDiv = document.createElement("div");
    nameDiv.className = "fullNameDiv";
    nameDiv.textContent = `${user.name} ${user.surname}`;

    //email
    const emailDiv = document.createElement("div");
    emailDiv.textContent = `Email Address: `;
    const a = document.createElement("a");
    a.href = `mailto: ${user.email}`;
    a.text = user.email;
    emailDiv.append(a);

    //membership
    const membershipDiv = document.createElement("div");
    // membershipDiv.innerHTML = `Membership: <span>${user.membership_info[0].name}</span>`;
    membershipDiv.innerHTML = `Membership: <span>${user.membership_info[0]?.name}</span>`;

    //ip
    const ipDiv = document.createElement("div");
    ipDiv.textContent = "IP: 222.241.145.180";

    boxInfo.append(nameDiv, emailDiv, membershipDiv, ipDiv);
    box.append(boxInfo);
    document.querySelector(".users-container").append(box);
  });
}

function getData() {
  fetch(`http://localhost:3000/users/${orderSelection}`)
    .then((res) => res.json())
    .then((response) => dataDisplay(response));
}

getData();

document.querySelector(".sortingUsers").addEventListener("click", (e) => {
  const text = e.target.textContent;
  if (text.includes("Asc")) {
    e.target.textContent = text.replace("Asc", "Dsc");
    orderSelection = "dsc";
  } else {
    e.target.textContent = text.replace("Dsc", "Asc");
    orderSelection = "asc";
  }

  getData();
});
