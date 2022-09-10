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

const PORT = 8080;

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    console.log("Success :" + con);

    con.execute("");
    await con.end();
    res.send("Success");
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
