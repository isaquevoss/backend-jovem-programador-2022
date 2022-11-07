const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

const sessions = require('express-session');
var session = [];

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: 'asdfasdfasfasdfasd',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  if (req.body.email == 'isaque@senac.com.br' && req.body.senha == '123456') {
    session[req.sessionID] = req.session;
    res.send('logado');
  } else {
    res.status(401).send('usuário ou senha incorreto');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send('logout');
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.use((req, res, next) => {
  if (session[req.sessionID]) {
    next();
  } else {
    res.status(401).send('não autorizado');
  }
});

app.get('/produtos', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/produtos.html'));
});

app.listen(3000, () => {
  console.log('app está rodando');
});
