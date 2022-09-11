const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const dbConfig = {
  host: "db-mysql-fra1-92309-do-user-12248653-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "AVNS_IXvAR64lCvCKVVR4nwN",
  database: "ecommerce",
  port: "25060",
};

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express", name: "Airidas" });
// });

router.get("/", async function (req, res, next) {
  const con = await mysql.createConnection(dbConfig);
  const [data] = await con.execute("SELECT * FROM orders WHERE ID = 1");
  await con.end();
  res.render("index", {
    page: "Home",
    menuId: "home",
    name: data[0].customer_name,
    age: 25,
    email: data[0].customer_email,
  });
});

module.exports = router;
