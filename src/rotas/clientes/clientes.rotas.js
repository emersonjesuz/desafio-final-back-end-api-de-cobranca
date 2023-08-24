const express = require("express");
const listarClientes = require("../../controladores/clientes/listarClientes.controladores");
const atualizarCliente = require("../../controladores/clientes/atualizarCliente.controladores");
const cadastroCliente = require("../../controladores/clientes/cadastroCliente.controladores");
const detalheCliente = require("../../controladores/clientes/detalhesCliente.controladores");
const validarEntradaDeAtualizacaoDoCliente = require("../../intermediarios/cliente/validarAtualizacaoDoCliente.intermediarios");
const validarEntradaDoCadastroDoCliente = require("../../intermediarios/cliente/validarEntradaDoCadastroDoCliente.intermediarios");

const rotasClientes = express();

rotasClientes.post(
  "/cliente/cadastro",
  validarEntradaDoCadastroDoCliente,
  cadastroCliente
);
rotasClientes.put(
  "/cliente/editar/:id",
  validarEntradaDeAtualizacaoDoCliente,
  atualizarCliente
);
rotasClientes.get("/clientes", listarClientes);
rotasClientes.get("/cliente/detalhes/:id", detalheCliente);

module.exports = rotasClientes;
