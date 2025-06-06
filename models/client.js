const Datatypes = require("sequelize");
const sequelize = require("../database");

// define the client model

const Client = sequelize.define(
  "CLient",
  {
    id: {
      type: Datatypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    cpf: {
      type: Datatypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    credit_ballance: {
      type: Datatypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    is_active: {
      type: Datatypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: Datatypes.DATE,
      defaultValue: Datatypes.NOW,
    },
  },
  {
    tableName: "clients",
    timestamps: false,
  }
);

module.exports = Client;