const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());
app.use(cors());

const mysqlConfig = {
  host: "db-mysql-fra1-92309-do-user-12248653-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "AVNS_IXvAR64lCvCKVVR4nwN",
  database: "defaultdb",
  port: "25060",
};

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    console.log("Success: " + con);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.listen(25060, () => {
  console.log(`http://localhost:25060`);
});
