const fs = require('fs');
const path = require('path');
const Config = require('../config');

const config = {
  username: Config.DB_USERNAME,
  password: Config.DB_PASSWORD,
  server: Config.BD_SERVER, 
  database: Config.DB_NAME,
};

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.server,
    dialect:  'mssql',
});


module.exports = {
    sequelize,
    Sequelize
};

