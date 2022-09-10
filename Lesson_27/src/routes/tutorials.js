const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const { isLoggedIn, isAuth } = require('../middleware');
const { dbConfig, jwtSecret } = require('../config');

router.get('/user/:id', isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `SELECT * FROM tutorials WHERE user_id=${id}`,
    );
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: 'Error' });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const isAuthenticated = await isAuth(req);

    const id = req.params.id;
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `SELECT * FROM tutorials ${isAuthenticated ? '' : 'WHERE private = 0'}`,
    );
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: 'Error' });
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `INSERT INTO tutorials (user_id, title, content) VALUES (${mysql.escape(
        userId,
      )}, ${mysql.escape(req.body.title)}, ${mysql.escape(req.body.content)})`,
    );
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: 'Error' });
  }
});

module.exports = router;
