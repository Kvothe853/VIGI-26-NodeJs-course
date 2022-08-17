fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .then((response) => {
    const users = response;
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
      membershipDiv.innerHTML = `Membership: <span>${user.membership_info[0].name}</span>`;

      //ip
      const ipDiv = document.createElement("div");
      ipDiv.textContent = "IP: 222.241.145.180";

      boxInfo.append(nameDiv, emailDiv, membershipDiv, ipDiv);
      box.append(boxInfo);
      document.querySelector(".users-container").append(box);
    });
  })
  .catch((err) => console.error(err));
