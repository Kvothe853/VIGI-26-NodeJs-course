const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const fetch = require('node-fetch');

const { port, dbConfig } = require('../config');

router.get('/fill', async (req, res) => {
  try {
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersResponse = await users.json();
    const con = await mysql.createConnection(dbConfig);

    for (const user of usersResponse) {
      await con.execute(
        `INSERT INTO users (name, username, email, phone, user_address, website, company)
        VALUES
        (
        ${mysql.escape(user.name)},
        ${mysql.escape(user.username)},
        ${mysql.escape(user.email)},
        ${mysql.escape(user.phone)},
        ${mysql.escape(user.id)},
        ${mysql.escape(user.website)},
        ${mysql.escape(user.company.name)}
        )`,
      );

      await con.execute(
        `INSERT INTO user_address (street, suite, city, zipcode)
        VALUES
        (
        ${mysql.escape(user.address.street)},
        ${mysql.escape(user.address.suite)},
        ${mysql.escape(user.address.city)},
        ${mysql.escape(user.address.zipcode)}
        )`,
      );

      await con.execute(
        `INSERT INTO user_geo (lat, lng)
        VALUES
        (
        ${mysql.escape(user.address.geo.lat)},
        ${mysql.escape(user.address.geo.lng)}
        )`,
      );

      await con.execute(
        `INSERT INTO user_company (name, catchPhrase, bs)
        VALUES
        (
        ${mysql.escape(user.company.name)},
        ${mysql.escape(user.company.catchPhrase)},
        ${mysql.escape(user.company.bs)}
        )`,
      );
    }

    res.send('Success');
    await con.end;
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: `Error` });
  }
});

module.exports = router;
