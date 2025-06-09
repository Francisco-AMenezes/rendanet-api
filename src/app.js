const express = require("express");
const sequelize = require("./database");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();


// middlewares
app.use(bodyParser.json());

// import models 

const models = require("./models");


// use routes
app.use("/api/payments", require("./routes/payments"));
app.use("/api/installations", require("./routes/installations"));
app.use("/api/tasks", require("./routes/tasks"))

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
