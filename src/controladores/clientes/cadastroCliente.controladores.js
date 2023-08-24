const {
  fazerCadastroDoCliente,
  fazendoAVerificacaoDaExistenciaDoCliente,
  fazendoAVerificacaoDaExistenciaCPFDoCliente,
} = require("../../conexao/clientes/clientes.conexao.servico");

const cadastroCliente = async (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
  } = req.body;

  try {
    const verificandoClienteEmail =
      await fazendoAVerificacaoDaExistenciaDoCliente({ email });
    if (verificandoClienteEmail)
      return res.status(401).json({ mensagem: "E-mail já cadastrado!" });

    const verificandoClienteCPF =
      await fazendoAVerificacaoDaExistenciaCPFDoCliente({ cpf });
    if (verificandoClienteCPF)
      return res.status(401).json({ mensagem: "CPF invalido!" });

    const novoCliente = {
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
    };

    await fazerCadastroDoCliente(novoCliente);

    res.status(201).json({ mensagem: "Cliente cadastrado!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = cadastroCliente;
