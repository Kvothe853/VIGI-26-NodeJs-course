const express = require("express");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../../config");

const router = express.Router();

router.get("/:id?", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const query = req.params.id ? `WHERE logs.pet_id = ${req.params.id}` : "";
    const [data] = await con.execute(`
      SELECT logs.id, logs.pet_id, pets.name, logs.description, logs.status
      FROM logs
      LEFT JOIN pets
      ON pets.id = logs.pet_id
      ${query}
      `);
    return res.send(data);
    await con.end();
  } catch (err) {
    return res.status(500).send({ err: `Server error. Please try again.` });
  }
});

router.post("/", async (req, res) => {
  const logs = req.body;
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    INSERT INTO logs (pet_id, description, status)
    VALUES (${mysql.escape(logs.pet_id)},
    ${mysql.escape(logs.description)},
    ${mysql.escape(logs.status)})
    `);
    return res.send(data);
    await con.end();
  } catch (err) {
    return res.status(500).send({ err: `Server error. Please try again.` });
  }
});

module.exports = router;
