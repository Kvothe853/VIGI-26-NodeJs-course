const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const { dbConfig } = require('../config');

// 2. a add new user
router.post('/users', async (req, res) => {
  const user = req.body;
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] =
      await con.execute(`INSERT INTO users (name, email, address) values (
      ${mysql.escape(user.name)}, ${mysql.escape(user.email)}, ${mysql.escape(
        user.address,
      )})`);
    await con.end();
    return res.send(data);
  } catch (e) {
    return res.status(404).send({ error: e });
  }
});

// 2. b
router.get('/users', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    SELECT id, name, username, email, phone, website
    FROM users
    `);

    const [address] = await con.execute(`
    SELECT street, suite, city, zipcode 
    FROM user_address
    `);

    const [geo] = await con.execute(`
    SELECT lat, lng
    FROM user_geo
    `);

    const [company] = await con.execute(`
    SELECT name, catchPhrase, bs
    FROM user_company
    `);

    for (const [key, value] of Object.entries(data)) {
      address[key].geo = geo[key];
      data[key].address = address[key];
      data[key].company = company[key];
    }

    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(404).send({ error: err });
  }
});

// 2.c, 2.d, 2.e
router.get('/users/:x', async (req, res) => {
  try {
    let query = '';
    const x = req.params.x;
    if (x === 'names') {
      query = `SELECT id, name FROM users`;
    } else if (x === 'emails') {
      query = `SELECT id, name, email FROM users`;
    } else if (x === 'address') {
      query = `
      SELECT u.id, u.name, CONCAT(a.street, ' St., ', a.city) AS Address 
      FROM users AS u
      INNER JOIN user_address AS a
      ON u.user_address = a.id 
      GROUP BY u.id 
      ORDER BY u.id;
      `;
    } else {
      return res.status(404).send('Page is not found');
    }
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(query);
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(404).send({ error: err });
  }
});

module.exports = router;
