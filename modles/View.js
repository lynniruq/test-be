const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Views = sequelize.define('Views', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  AdName: {
    type: DataTypes.STRING,
  },
  ClicksSum:{
    type: DataTypes.INTEGER,
  },
  
});

module.exports = Views; // Export the Views model
