const express = require("express");
const app = express();
const PORT = 4000;

const User = require("./models").user;
app.use(express.json());

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
