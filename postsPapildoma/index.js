const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

let users = [];

// 1
app.get("/posts", (req, res) => {
  res.status = 200;
  res.send(users);
});

// 2
app.get("/posts/:model", (req, res) => {
  res.status = 200;
  res.send(users.filter((user) => user.id === +req.params.model));
});

// 3
app.get("/posts/title/:model", (req, res) => {
  res.status = 200;
  res.send(users.filter((user) => user.title === req.params.model));
});

// 4

// POST'S
app.post("/posts", (req, res) => {
  users = req.body;
  res.send(users);
});

// addUser
app.post("/addedUsers", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
});

// PUT'S

app.put("http://localhost:8080/change/:model", (req, res) => {
  res.send("OK");
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
