const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mysql = require("mysql2/promise");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const mysqlConfig = {
  host: process.env.MY_SQL_HOST,
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DATABASE,
  port: process.env.MY_SQL_PORT,
};

app.get("/products/:id?", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const query = req.params.id
      ? `SELECT * FROM products WHERE id = ${req.params.id}`
      : `SELECT * FROM products`;
    const response = await con.execute(query);
    res.send(response[0]);
    await con.end();
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/orders/:id?", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const query = req.params.id ? `WHERE orders.id = ${req.params.id}` : "";

    const response = await con.execute(
      `SELECT orders.id, orders.customer_name, orders.customer_email, products.title, products.image, products.price, orders.date
      FROM orders inner join products on orders.product_id = products.id ${query}`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = req.body;
    if (product.title && product.image && product.price) {
      const con = await mysql.createConnection(mysqlConfig);
      const response = await con.execute(
        `INSERT INTO products (title, image, price) values (${con.escape(
          product.title
        )}, ${con.escape(product.image)}, ${con.escape(product.price)})`
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

app.delete("/products/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(`
    DELETE FROM products WHERE id=${req.params.id}
    `);
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
