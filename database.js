const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("DB_NAME", "USER", "PASSWORD", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
