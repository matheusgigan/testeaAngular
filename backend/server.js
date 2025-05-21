// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API do backend está rodando!');
});

app.listen(3000, () => {
  console.log('Backend rodando na porta 3000');
});