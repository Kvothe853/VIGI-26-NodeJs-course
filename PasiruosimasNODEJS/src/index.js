const express = require('express');
const cors = require('cors');

const { port } = require('./config');
const { products } = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/products/', products);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
