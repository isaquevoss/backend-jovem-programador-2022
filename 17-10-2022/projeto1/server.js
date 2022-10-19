const express = require('express')

const app = express()

app.listen(3000);

function helloWorld (req, res) {
    res.status(400);
    res.send(JSON.stringify(req.headers));
    // res.send('hello world com function separada')
}

// app.get('', function (req, res) {
//     res.send('hello world com function separada')
// })

app.get('/', helloWorld)