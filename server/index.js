const express = require('express');

const server = express();
//const bodyParser = require('body-parser');
//const { errors } = require('celebrate');

const cors = require('cors');
const routes = require('../routes');

const PORT = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded and application/json
//server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.urlencoded({ extended: false }));
//server.use(bodyParser.json());
server.use(express.json());

// TODO  Definir que restricciones tendremos

// Con esta configuración permitimos acceso cors
server.use(cors());

// import all routes
server.use('/service/print', routes);

// root endpoint
server.get('/', (req, res) => res.json({ message: 'Hello, World!' }));
//server.use(errors());

module.exports = {
  server,
  PORT,
};
