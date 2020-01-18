const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); // importando as rotas
const http = require('http');
const { setupWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://root:root@cluster0-yaskd.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json()); // faz o express "entender" json
app.use(routes);

//Métodos HTTP: get(recebe info), post(criar info -salvar,cadastro,etc), put(editar um recurso), delete()

//Tipos de parametros
//Query params : req.query(Filtros, ordernar, paginar,etc) , São usados no método get em sua maioria
//Route Params:  request.params (Indentificar um recurso na alteração ou remoção)       - usado em put e delete em sua maioria
//Body: request.body (Dados para criação ou alteração de um registro)    Usado principalmente no post e put

// MongoDB (Não-relacional)



/*app.get('/users/:id', (request, response) => {
    console.log(request.query);
    return response.json({ message: 'Hello Mundo'});//Enviando um objeto via JSON
})*/


server.listen(3333);