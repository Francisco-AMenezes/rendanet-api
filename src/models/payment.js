const { DataTypes } = require("sequelize");
const sequelize = require("../database");

// define the payment model

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    payment_method: DataTypes.STRING,
    payment_gateway: DataTypes.STRING,
    status: DataTypes.STRING,
    conciliated_at: DataTypes.DATE,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "payments",
    timestamps: false,
  }
);

module.exports = Payment;
