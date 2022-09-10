const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mysql = require("mysql2/promise");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const mysqlConfig = {
  host: process.env.MY_SQL_HOST,
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DATABASE,
  port: process.env.MY_SQL_PORT,
};

1;
app.get("/cars/:id?", async (req, res) => {
  try {
    if (Number.isInteger(+req.params.id) || !req.params.id) {
      const con = await mysql.createConnection(mysqlConfig);
      const query = req.params.id
        ? `SELECT * FROM cars WHERE id = ${req.params.id}`
        : `SELECT * FROM cars`;

      const response = await con.execute(query);

      res.send(response[0]);
      await con.end();
    } else {
      res.status(400).send([]);
    }
  } catch (e) {
    if (e.code === "ER_ACCESS_DENIED_ERROR") {
      res.status(401).send("Unauthorized");
    }
    console.log(e);
  }
});

app.post("/cars", async (req, res) => {
  try {
    const car = req.body;
    console.log(req.body);
    if (car.title && car.image && car.price && car.numberplates) {
      const con = await mysql.createConnection(mysqlConfig);
      const response = await con.execute(
        `INSERT INTO cars (title, image, price, numberplates) values (${con.escape(
          car.title
        )}, ${con.escape(car.image)}, ${con.escape(car.price)}, ${con.escape(
          car.numberplates
        )})`
      );
      res.send(response[0]);
      await con.end();
    } else {
      res.status(400).send("Bad syntax");
    }
  } catch (e) {
    console.log(e);
  }
});

app.delete("/cars/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(
      `DELETE FROM cars WHERE id=${req.params.id};`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("This webpage is not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
