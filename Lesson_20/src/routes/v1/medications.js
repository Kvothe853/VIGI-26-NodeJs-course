const express = require("express");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../../config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`SELECT * FROM medications`);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: `Server error. Please try again.` });
  }
});

router.post("/", async (req, res) => {
  const medications = req.body;
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    INSERT INTO medications (name, description)
    VALUES (${mysql.escape(medications.name)}, ${mysql.escape(
      medications.description
    )})
    `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: `Server error. Please try agan.` });
  }
});

module.exports = router;
