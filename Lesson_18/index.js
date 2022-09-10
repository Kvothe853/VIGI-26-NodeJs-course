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

app.get("/authors", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(
      `SELECT books.id, authors.name, authors.surname, books.title, books.year  FROM books left join authors on books.author_id = authors.id`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get("/books", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(
      `SELECT authors.id, authors.name, authors.surname, COUNT(books.author_id) as books_total FROM authors left join books on authors.id=books.author_id GROUP BY authors.id ORDER BY authors.id`
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
