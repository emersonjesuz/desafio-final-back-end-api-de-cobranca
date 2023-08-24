const knex = require("../conexao");

const cadastrandoClienteNoBD = async (dados) => {
  return await knex("clientes")
    .insert({ ...dados })
    .debug();
};

const verificandoExistenciaDoCliente = async (dados) => {
  const { email } = dados;

  return await knex("clientes").where({ email }).debug();
};

const verificandoExistenciaDoCPFCliente = async (dados) => {
  const { cpf } = dados;
  return await knex("clientes").where({ cpf }).debug();
};

const buscandoCliente = async (dados) => {
  const { id } = dados;
  return await knex("clientes").where({ id });
};

const atualizandoDadosDoCliente = async (dados) => {
  const { dadosDoCliente, id } = dados;

  return await knex("clientes")
    .update({ ...dadosDoCliente })
    .where({ id })
    .debug();
};

const buscarTodosOsClientes = async () => {
  return await knex("clientes");
};

module.exports = {
  cadastrandoClienteNoBD,
  verificandoExistenciaDoCliente,
  verificandoExistenciaDoCPFCliente,
  atualizandoDadosDoCliente,
  buscandoCliente,
  buscarTodosOsClientes,
};
