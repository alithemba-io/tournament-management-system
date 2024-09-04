const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  winnerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  score: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Result;