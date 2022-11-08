const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
});

const Produto = sequelize.define(
  'produto',
  {
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

app.post('/produtos', async (req, res) => {
  const produto = await Produto.create({
    nome: req.body.nome,
    preco: req.body.preco,
  });
  res.json(produto);
});
app.delete('/produtos/:id', async (req, res) => {
  await Produto.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send('deletado');
});

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

app.put('/produtos/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  produto.nome = req.body.nome;
  produto.preco = req.body.preco;
  produto.save();
  res.json(produto);
});

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  sequelize.sync();
  app.listen(3000, () => {
    console.log('app is running');
  });
}

start();
