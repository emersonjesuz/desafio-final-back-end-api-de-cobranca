const {
  fazendoABuscaDoCliente,
} = require("../../conexao/clientes/clientes.conexao.servico");
const {
  fazendoABuscaDeTodasCobrancasDoCliente,
} = require("../../conexao/cobrancas/cobrancas.conexao.servicos");

const detalheCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await fazendoABuscaDoCliente({ id });
    const existeCliente = cliente.length;
    if (!existeCliente) {
      return res.status(400).json({ mensagem: "cliente não encontrado!" });
    }

    const cobrancasDoCliente = await fazendoABuscaDeTodasCobrancasDoCliente({
      id,
    });

    for (let cadaCobranca of cobrancasDoCliente) {
      const verificandoStatusDeVencimento =
        new Date(cadaCobranca.vencimento) < new Date() ? "vencida" : "pendente";

      if (cadaCobranca.status === "pendente") {
        cadaCobranca.status = verificandoStatusDeVencimento;
      }
    }

    const clienteDetalhado = {
      cliente: cliente[0],
      cobrancas: cobrancasDoCliente,
    };

    return res.json(clienteDetalhado);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = detalheCliente;
