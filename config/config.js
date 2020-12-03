require("dotenv").config(); // we configure dotenv
module.exports = {
  development: {
    url: process.env.ELEPHANT_SQL, // and use the env vars to get the url
    dialect: "postgres",
    operatorsAliases: "0",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_evn_variable: "DATABASE_URL",
  },
};
