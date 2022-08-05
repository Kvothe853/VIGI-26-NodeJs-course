fetch("http://localhost:8080/names")
  .then((resp) => resp.json())
  .then((response) => {
    const names = response;
    const ul = document.createElement("ul");
    names.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = `${name.name} ${name.surname}`;
      ul.appendChild(li);
    });
    document.querySelector(".names").append(ul);
  })
  .catch((error) => console.error(error));

fetch("http://localhost:8080/links")
  .then((resp) => resp.json())
  .then((response) => {
    const links = response;
    const ul = document.createElement("ul");
    links.forEach((link) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.link;
      a.text = link.link;
      li.append(a);
      ul.append(li);
    });
    document.querySelector(".links").append(ul);
  });
