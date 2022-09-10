const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const { isLoggedIn } = require('../middleware');
const { dbConfig } = require('../config');

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`SELECT * FROM articles`);
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: 'Error' });
  }
});

module.exports = router;
