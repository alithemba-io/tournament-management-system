const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tournamentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  player1Id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  player2Id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'ongoing', 'completed'),
    defaultValue: 'scheduled'
  }
});

module.exports = Match;