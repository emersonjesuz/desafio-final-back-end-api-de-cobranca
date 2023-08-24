const {
  buscarTodasCobrancas,
  cadastroDeCobrancasNoBD,
  buscandoCobrancasDoCliente,
  deletarCobrancaPendente,
  atualizarCobranca,
  atualizarNomeDoClienteNaCobranca,
} = require("./cobrancas.conexao.repositorio");

const fazendoBuscaDeTodasAsCobrancas = async () => {
  return await buscarTodasCobrancas();
};

const fazerCadastroDeCobrancas = async (dados) => {
  const { cliente, descricao, status, valor, vencimento, id_cliente } = dados;

  return await cadastroDeCobrancasNoBD({
    cliente,
    descricao,
    status,
    valor,
    vencimento,
    id_cliente,
  });
};

const fazendoABuscaDeTodasCobrancasDoCliente = async (dados) => {
  const { id } = dados;
  return await buscandoCobrancasDoCliente({ id });
};

const fazendoAdeletacaoDaCobranca = async (dados) => {
  const { id } = dados;
  return await deletarCobrancaPendente({ id });
};

const fazendoAtualizacaoCobranca = async (dados) => {
  const { id, dadosAtualizados } = dados;
  return await atualizarCobranca({ id, dadosAtualizados });
};

const fazendoAAtualizacaoDoNomeDoClienteNaCobranca = async (dados) => {
  const { cliente, id_cliente } = dados;
  const atualizarNome = await atualizarNomeDoClienteNaCobranca({
    cliente,
    id_cliente,
  });
  return !!atualizarNome;
};

module.exports = {
  fazendoBuscaDeTodasAsCobrancas,
  fazerCadastroDeCobrancas,
  fazendoABuscaDeTodasCobrancasDoCliente,
  fazendoAdeletacaoDaCobranca,
  fazendoAtualizacaoCobranca,
  fazendoAAtualizacaoDoNomeDoClienteNaCobranca,
};
