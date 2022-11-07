const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const app = express();

app.use(bodyParser.json());

var conexao;

async function conectarBanco() {
  return await sqlite.open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
}

app.post('/produtos', async (req, res) => {
  const produto = req.body;
  await conexao.run(
    `insert into produtos (nome, preco, loja)
     values (:nome, :preco, :loja)`,
    {
      ':nome': produto.nome,
      ':preco': produto.preco,
      ':loja': produto.loja,
    }
  );

  res.send('produto cadastrado');
});
app.get('/produtos', async (req, res) => {
  const produtos = await conexao.all('select * from produtos');
  res.json(produtos);
});

async function start() {
  conexao = await conectarBanco();
  await conexao.exec(`create table if not exists produtos 
    (id INTEGER PRIMARY KEY, nome TEXT, preco FLOAT, loja TEXT)`);

  app.listen(3000, () => {
    console.log('app is running');
  });
}

start();
