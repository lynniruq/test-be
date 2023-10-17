const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'postgres', '123456aA!', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize; // Export the Sequelize instance
