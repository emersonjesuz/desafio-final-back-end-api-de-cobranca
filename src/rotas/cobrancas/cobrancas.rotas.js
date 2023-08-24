const express = require("express");
const buscarListaDeTodasCobrancas = require("../../controladores/cobrancas/buscandoTodasCobrancas.controladores");
const cadastroDeCobrancas = require("../../controladores/cobrancas/cadastroDeCobrancas.controladores");
const exibirSaldoDasCobrancas = require("../../controladores/cobrancas/exibirSaldoDasCobrancas.controladores");
const editarCobranca = require("../../controladores/cobrancas/editarCobranca.controladores");
const validarEntradaDoCadastroDeCobranca = require("../../intermediarios/cobrancas/validarEntradaDoCadastroDeCobranca.intermediarios");
const detalheDeCobranca = require("../../controladores/cobrancas/detalheDeCobranca.controladores");
const deletarCobranca = require("../../controladores/cobrancas/deleteCobrancaPendendete.controladores");
const validarEntradaDeEditarCobranca = require("../../intermediarios/cobrancas/validarEntradaDoEditarCobranca.intermediarios");

const rotasCobrancas = express();

rotasCobrancas.post(
  "/cobrancas/cadastro/:id",
  validarEntradaDoCadastroDeCobranca,
  cadastroDeCobrancas
);
rotasCobrancas.get("/cobrancas", buscarListaDeTodasCobrancas);
rotasCobrancas.get("/cobrancas/saldo", exibirSaldoDasCobrancas);
rotasCobrancas.get("/cobranca/detalhe/:id", detalheDeCobranca);
rotasCobrancas.put(
  "/cobrancas/editar/:id",
  validarEntradaDeEditarCobranca,
  editarCobranca
);
rotasCobrancas.delete("/cobrancas/deletar/:id", deletarCobranca);

module.exports = rotasCobrancas;
