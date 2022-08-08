fetch("https://jsonplaceholder.typicode.com/posts")
  .then((resp) => resp.json())
  .then((response) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };

    fetch("http://localhost:8080/posts", options)
      .then((resp) => resp.json())
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
