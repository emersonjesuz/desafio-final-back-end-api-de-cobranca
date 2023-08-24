require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rotas = require("./rotas/rotas");
const variaveis = require("./variaveis/tratamentoDeVariaveis");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(rotas);

app.listen(variaveis.PORT);
