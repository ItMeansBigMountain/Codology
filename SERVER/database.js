const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Codology', 'root', '123never', {
    dialect: 'mysql',
    host: 'localhost', 
});

module.exports = sequelize;
