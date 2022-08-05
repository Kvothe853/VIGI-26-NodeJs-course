const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const names = [];

app.get("/names", (req, res) => {
  res.status = 200;
  res.send(names);
});

app.post("/names", (req, res) => {
  //   const { body } = req;
  console.log(req.body);
  names.push(req.body.name);
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is alive on http://localhost:${PORT}`);
});
