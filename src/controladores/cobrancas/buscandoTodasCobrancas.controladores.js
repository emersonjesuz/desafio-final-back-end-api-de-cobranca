const {
  fazendoBuscaDeTodasAsCobrancas,
} = require("../../conexao/cobrancas/cobrancas.conexao.servicos");

const buscarListaDeTodasCobrancas = async (req, res) => {
  try {
    const listaDeCobrancas = await fazendoBuscaDeTodasAsCobrancas();

    for (let cadaCobranca of listaDeCobrancas) {
      const verificandoStatusDeVencimento =
        new Date(cadaCobranca.vencimento) < new Date() ? "vencida" : "pendente";

      if (cadaCobranca.status === "pendente") {
        cadaCobranca.status = verificandoStatusDeVencimento;
      }
    }

    res.json(listaDeCobrancas);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = buscarListaDeTodasCobrancas;
