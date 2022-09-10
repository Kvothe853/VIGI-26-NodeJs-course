const express = require("express");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../../config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    SELEC id, name, dob, client_email
    FROM pets
    WHERE archived = 0
    `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: `Server error. Please try again.` });
  }
});

module.exports = router;
