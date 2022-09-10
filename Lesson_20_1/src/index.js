const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mysql = require("mysql2/promise");
const app = express();
app.use(express.json());
app.use(cors());

const { port } = require("./config");
const { dbConfig } = require("./config");

const { pets } = require("./routes/v1");
app.use("/v1/pets/", pets);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
