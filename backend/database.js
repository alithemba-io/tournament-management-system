const { Sequelize } = require ('sequelize'); 
const sequelize = new Sequelize('tournament_management', 'postgres', 'Devs@w0rk', {
    host: 'localhost',
    dialect: 'postgres'
  });
module.exports = sequelize;