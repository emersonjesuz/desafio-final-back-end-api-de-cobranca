const variaveis = {
  PORT: process.env.PORT ? process.env.PORT : 3000,
  DB_HOST: process.env.DB_HOST ? process.env.DB_HOST : "",
  DB_PORT: process.env.DB_PORT ? process.env.DB_PORT : "",
  DB_USER: process.env.DB_USER ? process.env.DB_USER : "",
  DB_PASSWORD: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "",
  DB_DATABASE: process.env.DB_DATABASE ? process.env.DB_DATABASE : "",
  SENHA_JWT: process.env.SENHA_JWT ? process.env.SENHA_JWT : "",
};

module.exports = variaveis;
