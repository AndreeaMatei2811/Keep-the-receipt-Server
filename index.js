const express = require("express");
const User = require("./models").user;
const app = express();
const { PORT } = require("./config/constants");
const corsMiddleWare = require("cors");
const loggerMiddleWare = require("morgan");
const authRouter = require("./routers/auth");
const categoryRouter = require("./routers/categories");
const productsRouter = require("./routers/products");
const shoppingItemsRouter = require("./routers/shoppingItems");
// const authMiddleWare = require("./auth/middleware");

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

app.use("/", authRouter);
app.use("/categories", categoryRouter);
app.use("/products", productsRouter);
app.use("/shoppingItems", shoppingItemsRouter);

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
