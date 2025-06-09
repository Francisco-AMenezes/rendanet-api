const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || 'rendanet',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'velhodoouro', 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  })

module.exports = sequelize;
