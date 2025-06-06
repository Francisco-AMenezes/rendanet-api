const express = require("express");
const sequelize = require("./database");
const models = require("./models");

sequelize
  .sync({ alter: true })
  .then(() => console.log("Models succesfuly sync!"))
  .catch((err) =>
    console.log(`Something went wrong with the models sync: ${err}`)
  );

const port = 3000;
const app = express();

app.listen(port, () => {
  console.log(`server is now running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello world");
});
