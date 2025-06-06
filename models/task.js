const { DataTypes } = require("sequelize");
const sequelize = require("../database");

// define the task model

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  installation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  task_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  output: DataTypes.TEXT,
  credits_used: {
    type: DataTypes.FLOAT,
  }, created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
    tableName: "tasks",
    timestamps: false,
});

module.exports = Task;