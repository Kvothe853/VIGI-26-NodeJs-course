"use strict";

fetch("http://localhost:3000/memberships")
  .then((resp) => resp.json())
  .then((response) => {
    const memberships = response;

    const newMembership = document.createElement("div");
    newMembership.className = "new-membership";

    memberships.forEach((membership) => {
      //box
      const box = document.createElement("div");
      box.className = "box";

      // box info
      const boxInfo = document.createElement("div");
      boxInfo.className = "membership-info";
      const h3 = document.createElement("h3");
      h3.textContent = `$${membership.price} ${membership.name}`;
      const p = document.createElement("p");
      p.textContent = membership.description;

      //button
      const boxDelete = document.createElement("div");
      boxDelete.className = "delete-membership-box";
      const deleteBtn = document.createElement("button");
      const i = document.createElement("i");
      i.classList.add("fa-solid");
      i.classList.add("fa-trash");
      deleteBtn.addEventListener("click", (e) => {});

      deleteBtn.append(i);
      boxDelete.appendChild(deleteBtn);

      boxInfo.append(h3, p);
      box.append(boxInfo, boxDelete);
      document.querySelector(".memberships-container").append(box);
    });
  })
  .catch((err) => console.error(err));
