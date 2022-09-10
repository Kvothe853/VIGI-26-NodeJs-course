const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fetch = require('node-fetch');

const { port, dbConfig } = require('./config');

const app = express();

app.use(express.json());
app.use(cors());

// app.use('/auth/', auth);
// app.use('/tutorials/', tutorials);
// app.use('/users/', users);

app.get('/', async (req, res) => {
  try {
    const randomUsers = await fetch('https://randomuser.me/api/');
    const randomUsersResponse = await randomUsers.json();
    const firstName = randomUsersResponse.results[0].name.first;
    console.log(firstName);

    // fetch('https://randomuser.me/api/')
    //   .then((resp) => resp.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));

    const con = await mysql.createConnection(dbConfig);
    await con.execute(
      `INSERT INTO names (name) VALUES (${mysql.escape(firstName)})`,
    );
    const [data] = await con.execute(`SELECT * FROM names`);
    await con.end();
    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: 'Error' });
  }
});

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
