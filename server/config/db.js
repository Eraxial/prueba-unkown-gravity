const Sequelize = require("sequelize") ;

const db = new Sequelize('prueba', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports =  db;