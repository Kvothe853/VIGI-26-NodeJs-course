const express = require("express");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../../config");

const router = express.Router();

router.get("/:id?", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const query = req.params.id
      ? `WHERE prescriptions.pet_id = ${req.params.id}`
      : "";
    const [data] = await con.execute(`
    SELECT * 
    FROM prescriptions
    LEFT JOIN medications
    ON medications.id = prescriptions.medication_id 
    ${query}
    `);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err: `Server error. Please try again.` });
  }
});

router.post("/", async (req, res) => {
  const prescription = req.body;
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
      INSERT INTO prescriptions (medication_id, pet_id, comment)
      VALUES (${mysql.escape(prescription.medication_id)},
      ${mysql.escape(prescription.pet_id)},
      ${mysql.escape(prescription.comment)})
      `);
    return res.send(data);
    await con.end();
  } catch (err) {
    return res.status(500).send({ err: `Server error. Please try again.` });
  }
});

module.exports = router;
