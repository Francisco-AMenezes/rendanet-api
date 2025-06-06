const Client = require("./client");
const Installation = require("./installation");
const Payment = require("./payment");
const Task = require("./task");

// define associations betwen models

Client.hasMany(Payment, { foreignKey: "client_id" });
Payment.belongsTo(Client, { foreignKey: "client_id" });

Client.hasMany(Installation, { foreignKey: "client_id" });
Installation.belongsTo(Client, { foreignKey: "client_id" });

Installation.hasMany(Task, { foreignKey: "client_id" });
Task.belongsTo(Installation, { foreignKey: "client_id" });

module.exports = {
  Client,
  Payment,
  Installation,
  Task,
};
