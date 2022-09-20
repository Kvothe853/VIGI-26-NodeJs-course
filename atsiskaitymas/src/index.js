const express = require('express');
const cors = require('cors');

const { port } = require('./config');
const { api, fill } = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/', api);
app.use('/api/', fill);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
