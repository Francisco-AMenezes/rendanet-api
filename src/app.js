const express = require("express");
const sequelize = require("./database");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();

// import routes
const paymentsRoutes = require("./routes/payments");
const installationsRoutes = require("./routes/installations"); 
const tasksRoutes = require("./routes/tasks");


// middlewares
app.use(bodyParser.json());

// import models 

const models = require("./models");


// use routes
app.use("/api/", paymentsRoutes);
app.use("/api/", installationsRoutes);
app.use("/api/", tasksRoutes);

// sync database

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`API rodando na porta ${port}`)
  })
})> 
  


app.listen(port, () => {
  console.log(`server is now running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello world");
});
