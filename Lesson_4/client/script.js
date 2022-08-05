"use strict";

fetch("http://localhost:8080/users")
  .then((res) => res.json())
  .then((data) => {
    const name = document.createElement("h2");
    name.textContent = "Users";
    document.body.append(name);

    const ul = document.createElement("ul");
    const div = document.createElement("div");
    div.className = "usersOutput";

    data.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user;
      ul.appendChild(li);
    });
    div.appendChild(ul);
    document.body.append(ul);
  })
  .catch((err) => console.error(err));

fetch("http://localhost:8080/links")
  .then((res) => res.json())
  .then((data) => {
    const name = document.createElement("h2");
    name.textContent = "Links";
    document.body.append(name);

    const div = document.createElement("div");
    div.className = "linksOutput";
    const ul = document.createElement("ul");
    data.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user;
      ul.appendChild(li);
    });
    div.appendChild(ul);
    document.body.append(div);
  })
  .catch((err) => console.error(err));
