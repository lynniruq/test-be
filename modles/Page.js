const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Pages = sequelize.define('Pages', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  PageName: {
    type: DataTypes.STRING,
  },
  TimeSpent:{
    type: DataTypes.STRING,
  },
  PageLoad:{
    type: DataTypes.STRING,
  },
  
});

module.exports = Pages; // Export the Pages model
