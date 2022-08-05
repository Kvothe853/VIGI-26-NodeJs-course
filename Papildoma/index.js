const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
