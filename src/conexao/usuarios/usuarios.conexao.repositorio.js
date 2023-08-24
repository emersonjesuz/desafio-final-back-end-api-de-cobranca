const knex = require("../conexao");

const cadastrandoUsuarioNoBD = async (dados) => {
  return await knex("usuarios")
    .insert({ ...dados })
    .debug();
};

const verificandoExistenciaDoUsuarioId = async (dados) => {
  const { id } = dados;

  return await knex("usuarios").where({ id }).debug();
};

const verificandoExistenciaDoUsuarioEmail = async (dados) => {
  const { email } = dados;

  return await knex("usuarios").where({ email }).debug();
};

const atualizarDadosDoUsuarioExistente = async (dados) => {
  const { dadosDoUsuario, emailDoUsuarioLogado } = dados;

  const { nome, email, senha, cpf, telefone } = dadosDoUsuario;

  return await knex("usuarios")
    .update({ nome, email, senha, cpf, telefone })
    .where({ email: emailDoUsuarioLogado })
    .debug();
};

const verificandoLoginDoUsuario = async (dados) => {
  const { email } = dados;
  const usuario = await knex("usuarios").where({ email }).debug();
  return usuario;
};

const dadosDoPerfilDoUsuario = async (dados) => {
  const { id } = dados;
  return await knex("usuarios").where({ id }).debug();
};

module.exports = {
  cadastrandoUsuarioNoBD,
  verificandoExistenciaDoUsuarioId,
  verificandoExistenciaDoUsuarioEmail,
  atualizarDadosDoUsuarioExistente,
  verificandoLoginDoUsuario,
  dadosDoPerfilDoUsuario,
};
