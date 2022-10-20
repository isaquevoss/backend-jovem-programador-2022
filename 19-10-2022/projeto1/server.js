const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('',)

const produtos = [];

app.post('/produtos', (req, res) => {
    const produto = req.body;
    produtos.push(produto)
    res.json('produto cadastrado')
})

app.get('/produtos', (req, res) => {
    res.json(produtos)
});

app.get('/produtos/comparar/:nome', (req, res) => {
    var produtosComparados = produtos.filter(item => {
        return item.nome == req.params.nome
    })    
    res.json(produtosComparados);
})

app.listen(3000, () => {
    console.log('app is running');
})