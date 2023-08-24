const knex = require("../conexao");

const buscarTodasCobrancas = async () => {
  return await knex("cobrancas");
};

const cadastroDeCobrancasNoBD = async (dados) => {
  return await knex("cobrancas").insert(dados).debug();
};

const buscandoCobrancasDoCliente = async (dados) => {
  const { id } = dados;
  const detalharCobrancasCliente = await knex("cobrancas")
    .where("id_cliente", id)
    .debug();
  return detalharCobrancasCliente;
};

const buscandoCobrancaPendente = async (dados) => {
  const { id } = dados;
  const cobrancaPendente = await knex("cobrancas").where("id", id).debug();
  return cobrancaPendente;
};

const atualizarCobranca = async (dados) => {
  const { id, dadosAtualizados } = dados;
  return await knex("cobrancas")
    .where("id", id)
    .update({ ...dadosAtualizados });
};

const deletarCobrancaPendente = async (dados) => {
  const { id } = dados;
  const cobrancaDeletada = await knex("cobrancas").del().where("id", id);

  return cobrancaDeletada;
};

const atualizarNomeDoClienteNaCobranca = async (dados) => {
  const { cliente, id_cliente } = dados;
  return await knex("cobrancas")
    .update({ cliente })
    .where({ id_cliente })
    .debug();
};

module.exports = {
  buscarTodasCobrancas,
  cadastroDeCobrancasNoBD,
  buscandoCobrancasDoCliente,
  buscandoCobrancaPendente,
  atualizarCobranca,
  deletarCobrancaPendente,
  atualizarNomeDoClienteNaCobranca,
};
