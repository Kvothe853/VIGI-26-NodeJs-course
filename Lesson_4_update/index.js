const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

const names = [];
const links = [];

//Names
app.get("/names", (req, res) => {
  res.status = 200;
  res.send(names);
});

app.post("/names", (req, res) => {
  console.log(req.body);
  names.push({ name: req.body.name, surname: req.body.surname });
});

//Links
app.get("/links", (req, res) => {
  res.status = 200;
  res.send(links);
});

app.post("/links", (req, res) => {
  console.log(req.body);
  links.push({ link: req.body.link });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
