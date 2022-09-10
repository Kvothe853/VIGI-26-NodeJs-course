const express = require("express");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../../config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`SELECT * FROM pets WHERE archived = 0`);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: `Server error. Please try again.` });
  }
});

router.post("/", async (req, res) => {
  const pet = req.body;
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    INSERT INTO pets (name, dob, client_email)
    VALUES (${mysql.escape(pet.name)}, ${mysql.escape(pet.dob)}, ${mysql.escape(
      pet.client_email
    )});
    `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: `Server error. Please try again.` });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    UPDATE pets
    SET archived = 1
    WHERE id = ${mysql.escape(req.params.id)}
    `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.send(500).send({ err: `Server error. Please try again.` });
  }
});

module.exports = router;
