const { DataTypes } = require("sequelize");
const sequelize = require("../database");

// define the instalation model

const Installation = sequelize.define(
  "Instalation",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "installations",
    timestamps: false,
  }
);

module.exports = Installation;
