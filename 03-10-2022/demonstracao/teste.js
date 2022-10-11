const express = require('express');
const cors = require('cors')



const app = express();
app.use(cors())

const db = {
    alunos: [
        { id: 1, name: 'isaque' },
        { id: 2, name: 'joão' }
        , { id: 3, name: 'antonio' }
        , { id: 4, name: 'maria' }
        , { id: 5, name: 'antonia' }
    ]
}

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/alunos', (req, res) => {
    res.json(db.alunos)
})

app.get('/alunos/:id',(req,res) => {
    const aluno = db.alunos.find(i => i.id == req.params.id);
    res.json(aluno)
})

app.listen(3000, () => {
    console.log('app is running')
})