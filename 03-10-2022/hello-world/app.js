//npm install express body-parser cors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const alunos = [{
    id: 1,
    name: 'isaque'
},
{
    id: 2,
    name: 'joão'
}];

app.get('/alunos', (req, res) => {
    res.json(alunos)
});

app.get('/alunos/:id', (req, res) => {
    const aluno = alunos.find(aluno => aluno.id == req.params.id)
    res.json(aluno)
});


app.listen(3000, () => {
    console.log('app is running')
})