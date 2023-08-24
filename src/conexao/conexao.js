const variaveis = require("../variaveis/tratamentoDeVariaveis");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: variaveis.DB_HOST,
    port: variaveis.DB_PORT,
    user: variaveis.DB_USER,
    password: variaveis.DB_PASSWORD,
    database: variaveis.DB_DATABASE,
  },
});

module.exports = knex;
