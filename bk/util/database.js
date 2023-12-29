// database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-app', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports = sequelize;
