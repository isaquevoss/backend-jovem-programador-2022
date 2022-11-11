const express = require('express');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

app.get('/jwt/valid/:token', (req, res) => {
  const token = req.params.token;
  const valid = jwt.verify(token, 'minha_senha');
  if (valid) {
    res.send('token válido');
  } else {
    res.send('token inválido');
  }
});

app.get('/jwt/:texto', (req, res) => {
  const token = jwt.sign(
    {
      texto: req.params.texto,
    },
    'minha_senha'
  );
  res.json({ token });
});

app.listen(3000);
