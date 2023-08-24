const {
  fazendoABuscaDoCliente,
} = require("../../conexao/clientes/clientes.conexao.servico");
const {
  fazerCadastroDeCobrancas,
} = require("../../conexao/cobrancas/cobrancas.conexao.servicos");

const cadastroDeCobrancas = async (req, res) => {
  const { id: id_cliente } = req.params;
  const { descricao, status, valor, vencimento } = req.body;

  try {
    const existeCliente = await fazendoABuscaDoCliente({ id: id_cliente });
    if (!existeCliente.length)
      return res.status(400).json({ mensagem: "cliente não encontrado!" });

    const novaCobranca = {
      cliente: existeCliente[0].nome,
      descricao,
      status,
      valor,
      vencimento,
      id_cliente,
    };

    await fazerCadastroDeCobrancas(novaCobranca);

    res.status(201).json({ mensagem: "Cobrança cadastrada!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = cadastroDeCobrancas;
