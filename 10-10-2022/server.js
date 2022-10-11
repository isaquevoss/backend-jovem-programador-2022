const express = require('express')

const server = express();

server.get('/', function (request , response) {
    console.log(request.headers.token);
    response.send('bem vindo a minha primeira aplicação nodejs')
})
server.post('/', function (request , response) {
    response.status(401).send('request no metodo post')
})
server.put('/', function (request , response) {
    response.send('request no metodo put')
})
server.patch('/', function (request , response) {
    response.send('request no metodo patch')
})
server.delete('/', function (request , response) {
    response.send('request no metodo delete')
})

server.listen(3000, function () {
    console.log('app iniciado na porta 3000')
})
