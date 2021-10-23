require('dotenv').config();

const { server, PORT } = require('./server');

server.listen(PORT, () => console.log(`Server on ${PORT} , Fecha: ${new Date().toLocaleString('en-US')}`));