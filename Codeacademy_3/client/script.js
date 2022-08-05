"use strict";

fetch("http://localhost:3001/")
  .then((resp) => resp.json())
  .then((resp) => {
    const ul = document.createElement("ul");
    resp.forEach((car) => {
      const li = document.createElement("li");
      li.textContent = car;
      ul.append(li);
    });
    document.body.append(ul);
  })
  .catch((err) => console.error(err));

fetch("http://localhost:3001/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(["Airidas"]),
});
