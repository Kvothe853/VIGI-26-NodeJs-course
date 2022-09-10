const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mysql = require("mysql2/promise");
const { response } = require("express");
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

app.get("/items/:limit?", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const query = req.params.limit
      ? `SELECT * FROM products LIMIT ${req.params.limit}`
      : `SELECT * FROM products`;

    const response = await con.execute(query);
    res.send(response[0]);
    await con.end();
  } catch (e) {
    if (e.code === "ER_ACCESS_DANIED_ERROR") {
      res.status(401).send("Unauthorized");
    } else {
      console.log(e);
    }
  }
});

app.post("/items", async (req, res) => {
  try {
    product = req.body;
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(
      `INSERT INTO products (title) values (${con.escape(product.title)})`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    if (e.code === "ER_ACCESS_DANIED_ERROR") {
      res.status(401).send("Unauthorized");
    } else {
      console.log(e);
    }
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(
      `DELETE FROM products WHERE id=${con.escape(req.params.id)};`
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
