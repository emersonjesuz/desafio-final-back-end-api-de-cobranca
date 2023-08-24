const {
  fazendoBuscaTodosOsClientes,
} = require("../../conexao/clientes/clientes.conexao.servico");
const {
  fazendoBuscaDeTodasAsCobrancas,
} = require("../../conexao/cobrancas/cobrancas.conexao.servicos");

const listarClientes = async (req, res) => {
  try {
    const clientes = await fazendoBuscaTodosOsClientes();

    const listaDeCobrancas = await fazendoBuscaDeTodasAsCobrancas();

    for (let cliente of clientes) {
      const cobrancasDoCliente = listaDeCobrancas.filter(
        (cobrancas) => cobrancas.id_cliente === cliente.id
      );

      if (cobrancasDoCliente.length) {
        for (let cadaCobranca of cobrancasDoCliente) {
          if (
            cadaCobranca.status === "pendente" ||
            cadaCobranca.status === "vencida"
          ) {
            const verificandoStatusDeVencimento =
              new Date(cadaCobranca.vencimento) < new Date()
                ? "vencida"
                : "pendente";

            if (verificandoStatusDeVencimento === "vencida") {
              cliente.status = "Inadimplente";
              break;
            }
          }
          cliente.status = "Em dia";
        }
      } else {
        cliente.status = "Em dia";
      }
    }

    res.json({ clientes });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = listarClientes;
