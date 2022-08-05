// POST

// const names = [];
// const links = [];

// document.forms[0].addEventListener("submit", (e) => {
//   e.preventDefault();
//   const name = document.getElementById("firstName").value;
//   if (name) {
//     names.push(name);

//     const message = document.querySelector(".message");
//     message.textContent = `User: ${name} successfully added`;
//     message.classList.remove("hidden");
//     setTimeout(() => {
//       message.classList.add("hidden");
//     }, 2000);

//     document.getElementById("firstName").value = "";

//     fetch("http://localhost:8080/users", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//       body: JSON.stringify(names),
//     });
//   }
// });

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("firstName").value;
  if (name) {
    const message = document.querySelector(".message");
    message.textContent = `User: ${name} successfully added`;
    message.classList.remove("hidden");
    setTimeout(() => {
      message.classList.add("hidden");
    }, 2000);

    document.getElementById("firstName").value = "";
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify([name]),
    });
  }
});

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const link = document.getElementById("link").value;
  if (link) {
    const message = document.querySelector(".message");
    message.textContent = `User: ${name} successfully added`;
    message.classList.remove("hidden");
    setTimeout(() => {
      message.classList.add("hidden");
    }, 2000);

    document.getElementById("link").value = "";
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify([link]),
    });
  }
});

// document.forms[1].addEventListener("submit", (e) => {
//   e.preventDefault();
//   const link = document.getElementById("link").value;
//   if (link) {
//     links.push(link);
//     const message = document.querySelector(".message");

//     message.textContent = `Link: ${link} successfully added`;
//     message.classList.remove("hidden");
//     setTimeout(() => {
//       message.classList.add("hidden");
//     }, 2000);

//     document.getElementById("link").value = "";

//     fetch("http://localhost:8080/links", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//       body: JSON.stringify(links),
//     });
//   }
// });
