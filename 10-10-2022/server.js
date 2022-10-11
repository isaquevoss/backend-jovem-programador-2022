const express = require('express')

const server = express();

server.get('/', function (request , response) {
    console.log(request.headers.token);
    response.send('bem vindo a minha primeira aplicação nodejs')
})
server.post('/', function (request , response) {
    response.send('post')
})

server.listen(3000, function () {
    console.log('app iniciado na porta 3000')
})
