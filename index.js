const express = require("express");
const User = require("./models").user;
const app = express();
const { PORT } = require("./config/constants");
const corsMiddleWare = require("cors");
const loggerMiddleWare = require("morgan");

app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

// app.use(express.json());

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
