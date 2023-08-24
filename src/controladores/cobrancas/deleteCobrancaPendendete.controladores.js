const {
  fazendoBuscaDeTodasAsCobrancas,
  fazendoAdeletacaoDaCobranca,
} = require("../../conexao/cobrancas/cobrancas.conexao.servicos");

const deletarCobranca = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ mensagem: "informe uma cobrança!" });
  try {
    const cobrancasDoCliente = await fazendoBuscaDeTodasAsCobrancas();
    const buscaIDCobranca = cobrancasDoCliente.filter((cobranca) => {
      return cobranca.id === Number(id);
    });

    if (!buscaIDCobranca.length)
      return res.status(400).json({ mensagem: "cobrança não encontrada!" });

    if (buscaIDCobranca[0].status !== "paga") {
      await fazendoAdeletacaoDaCobranca({ id });
      return res
        .status(201)
        .json({ mensagem: "Cobrança excluída com sucesso!" });
    } else {
      return res
        .status(400)
        .json({ mensagem: "Cobrança não pode ser excluida!" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = deletarCobranca;
