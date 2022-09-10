const express = require("express");
const cors = require("cors");
const nysql = require("mysql2/promise");

const app = express();
app.use(express.json());
app.use(cors());

const { port } = require("./config");
const { dbConfig } = require("./config");

const { pets, medications, logs, prescriptions } = require("./routes/v1");

app.use("/v1/pets/", pets);
app.use("/v1/medications/", medications);
app.use("/v1/logs", logs);
app.use("/v1/prescriptions", prescriptions);

app.get("/", async (req, res) => {
  res.send("Ok");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
