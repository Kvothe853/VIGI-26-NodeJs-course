const express = require("express");
const cors = require("cors");
// const router = express.Router();

const mysql = require("mysql2/promise");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8080;

const mysqlConfig = {
  host: "db-mysql-fra1-92309-do-user-12248653-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "AVNS_IXvAR64lCvCKVVR4nwN",
  database: "defaultdb",
  port: "25060",
};

1;
app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    res.send("Success");
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get("/shirts/:size?limit=20", async (req, res) => {
  let size = req.params.size;

  try {
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(
      req.params.size
        ? `SELECT * FROM defaultdb.shirts where size = '${size}' ORDER BY price LIMIT 10`
        : `SELECT * FROM defaultdb.shirts ORDER BY price LIMIT 10`
    );
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.post("/shirts", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const response = await con.execute(
      `INSERT INTO defaultdb.shirts 
      (brand, model, size, price) values 
      ('${req.body.brand}', '${req.body.model}', '${req.body.size}', '${req.body.price}');`
    );
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
