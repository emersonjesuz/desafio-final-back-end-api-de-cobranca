const {
  fazendoABuscaDoCliente,
} = require("../../conexao/clientes/clientes.conexao.servico");
const {
  fazendoBuscaDeTodasAsCobrancas,
  fazendoAtualizacaoCobranca,
} = require("../../conexao/cobrancas/cobrancas.conexao.servicos");

const editarCobranca = async (req, res) => {
  const cobrancaId = req.params.id;
  const { descricao, status, valor, vencimento } = req.body;

  try {
    const listaCobrancas = await fazendoBuscaDeTodasAsCobrancas();
    const cobranca = listaCobrancas.filter(
      (cobranca) => cobranca.id === +cobrancaId
    );

    if (!cobranca.length) {
      return res.status(404).json({ mensagem: "Cobrança não encontrada." });
    }

    const cliente = await fazendoABuscaDoCliente({
      id: cobranca[0].id_cliente,
    });

    const dadosAtualizados = {
      cliente: cliente[0].nome,
      descricao,
      status,
      valor,
      vencimento,
    };

    await fazendoAtualizacaoCobranca({ id: cobrancaId, dadosAtualizados });

    return res
      .status(200)
      .json({ mensagem: "Cobrança atualizada com sucesso." });
  } catch (error) {
    if (error.code === "22007")
      return res.status(404).json({ mensagem: "formato da data incorreto !" });
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = editarCobranca;
