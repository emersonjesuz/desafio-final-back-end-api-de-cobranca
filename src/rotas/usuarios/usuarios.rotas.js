const express = require("express");
const atualizacaoUsuario = require("../../controladores/usuario/atualizacaoUsuario.controladores");
const cadastroUsuario = require("../../controladores/usuario/cadastroUsuario.controladores");
const loginUsuario = require("../../controladores/usuario/loginUsuario.controladores");
const perfilDoUsuarioLogado = require("../../controladores/usuario/perfilDoUsuario.controladores");
const validarEntradaDeAtualizacaoDoUsuario = require("../../intermediarios/usuario/validarEntradaDaAtualizacaoDoUsuario.intermediarios");
const validarEntradaDoCadastroDoUsuario = require("../../intermediarios/usuario/validarEntradaDoCadastroDoUsuario.intermediarios");
const validarEntradaDoLoginDoUsuario = require("../../intermediarios/usuario/validarEntradaDoLoginDoUsuario.intermediarios");
const validarToken = require("../../intermediarios/validarToken.intermediarios");

const rotasUsuarios = express();
rotasUsuarios.post(
  "/usuario/cadastro",
  validarEntradaDoCadastroDoUsuario,
  cadastroUsuario
);
rotasUsuarios.post(
  "/usuario/login",
  validarEntradaDoLoginDoUsuario,
  loginUsuario
);
rotasUsuarios.use(validarToken);
rotasUsuarios.patch(
  "/usuario/editar",
  validarEntradaDeAtualizacaoDoUsuario,
  atualizacaoUsuario
);
rotasUsuarios.get("/usuario/perfil", perfilDoUsuarioLogado);

module.exports = rotasUsuarios;
