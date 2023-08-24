const {
  fazendoAVerificacaoDaExistenciaDoCliente,
  fazendoAVerificacaoDaExistenciaCPFDoCliente,
  fazendoAtualizacaoDoCliente,
  fazendoABuscaDoCliente,
} = require("../../conexao/clientes/clientes.conexao.servico");
const {
  atualizarNomeDoClienteNaCobranca,
} = require("../../conexao/cobrancas/cobrancas.conexao.repositorio");
const {
  fazendoAAtualizacaoDoNomeDoClienteNaCobranca,
} = require("../../conexao/cobrancas/cobrancas.conexao.servicos");

const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    email,
    telefone,
    cpf,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
  } = req.body;
  try {
    const existeCliente = await fazendoABuscaDoCliente({ id });
    if (!existeCliente.length)
      return res.status(400).json({ mensagem: "Cliente não  encontrado!" });

    const emailEIgualODoClienteCadastrado = existeCliente[0].email === email;
    if (!emailEIgualODoClienteCadastrado) {
      const jaExisteAlgumClienteComEsseEmail =
        await fazendoAVerificacaoDaExistenciaDoCliente({ email });

      if (jaExisteAlgumClienteComEsseEmail)
        return res.status(401).json({ mensagem: "Email já cadastrado!" });
    }

    const cpfEIgualODoClienteCadastrado = existeCliente[0].cpf === cpf;
    if (!cpfEIgualODoClienteCadastrado) {
      const jaExisteAlgumClienteComEsseCPF =
        await fazendoAVerificacaoDaExistenciaCPFDoCliente({ cpf });

      if (jaExisteAlgumClienteComEsseCPF)
        return res.status(401).json({ mensagem: "CPF já cadastrado!" });
    }

    const dadosDoClienteAtualizado = {
      nome,
      email,
      telefone,
      cpf,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
    };

    const atualizarCliente = await fazendoAtualizacaoDoCliente({
      dadosDoClienteAtualizado,
      id,
    });

    if (!atualizarCliente)
      return res.status(400).json({ mensagem: "Cliente não foi atualizado!" });

    const atualizandoOsNomesdasCobrancasReferentesAoCliente =
      await fazendoAAtualizacaoDoNomeDoClienteNaCobranca({
        cliente: nome,
        id_cliente: id,
      });

    if (!atualizandoOsNomesdasCobrancasReferentesAoCliente)
      return res.status(201).json({ mensagem: "cobrancas não atualizadas!" });

    res.status(201).json({ mensagem: "Cliente atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor !" });
  }
};

module.exports = atualizarCliente;
