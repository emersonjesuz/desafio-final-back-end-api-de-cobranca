const express = require("express");

const rotasClientes = require("./clientes/clientes.rotas");
const rotasCobrancas = require("./cobrancas/cobrancas.rotas");
const rotasUsuario = require("./usuarios/usuarios.rotas");
const rotas = express();

rotas.use(rotasUsuario);
rotas.use(rotasClientes);
rotas.use(rotasCobrancas);

module.exports = rotas;
