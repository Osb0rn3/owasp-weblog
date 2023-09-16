const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('modern', 'modern', 'SuperSecureP4ssword', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
