const {
  fazendoBuscaDeTodasAsCobrancas,
} = require("../../conexao/cobrancas/cobrancas.conexao.servicos");

const detalheDeCobranca = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ mensagem: "informe uma cobrança!" });
  try {
    const todasAsCobrancas = await fazendoBuscaDeTodasAsCobrancas();
    const dadosDeCobranca = todasAsCobrancas.filter(
      (detalhamento) => detalhamento.id === +id
    );
    if (!dadosDeCobranca.length)
      return res.status(400).json({ mensagem: "cobrança não encontrada!" });

    if (
      dadosDeCobranca[0].status === "pendente" ||
      dadosDeCobranca[0].status === "vencida"
    ) {
      const verificandoStatusDeVencimento =
        new Date(dadosDeCobranca[0].vencimento) < new Date()
          ? "vencida"
          : "pendente";

      if (dadosDeCobranca[0].status === "pendente") {
        dadosDeCobranca[0].status = verificandoStatusDeVencimento;
      }
    }

    if (!dadosDeCobranca.length)
      return res.status(400).json({ mensagem: "cobrança não encontrada!" });

    res.json(dadosDeCobranca);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = detalheDeCobranca;
