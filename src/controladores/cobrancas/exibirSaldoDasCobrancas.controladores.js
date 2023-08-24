const {
  fazendoBuscaDeTodasAsCobrancas,
} = require("../../conexao/cobrancas/cobrancas.conexao.servicos");

const exibirSaldoDasCobrancas = async (req, res) => {
  let cobrancaVencida = 0;
  let cobrancaPendente = 0;
  let cobrancaPaga = 0;
  try {
    const cobrancas = await fazendoBuscaDeTodasAsCobrancas();

    for (let cobranca of cobrancas) {
      const verificandoStatusDeVencimento =
        new Date(cobranca.vencimento) < new Date() ? "vencida" : "pendente";

      if (cobranca.status === "pendente") {
        cobranca.status = verificandoStatusDeVencimento;
      }

      if (cobranca.status === "pago") {
        cobrancaPaga += cobranca.valor;
      }

      if (cobranca.status === "pendente") {
        cobrancaPendente += cobranca.valor;
      }

      if (cobranca.status === "vencida") {
        cobrancaVencida += cobranca.valor;
      }
    }

    const saldoDasCobrancas = {
      pagas: cobrancaPaga,
      pendentes: cobrancaPendente,
      vencidas: cobrancaVencida,
    };

    res.json(saldoDasCobrancas);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = exibirSaldoDasCobrancas;
