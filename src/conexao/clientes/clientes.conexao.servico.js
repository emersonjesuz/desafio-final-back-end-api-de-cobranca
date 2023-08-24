const {
  cadastrandoClienteNoBD,
  verificandoExistenciaDoCliente,
  verificandoExistenciaDoCPFCliente,
  atualizandoDadosDoCliente,
  buscandoCliente,
  buscarTodosOsClientes,
} = require("./clientes.conexao.repositorio");

const fazerCadastroDoCliente = async (dados) => {
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
  } = dados;

  return await cadastrandoClienteNoBD({
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
  });
};

const fazendoAVerificacaoDaExistenciaDoCliente = async (dados) => {
  const { email } = dados;
  const buscando = await verificandoExistenciaDoCliente({ email });

  return buscando.length > 0;
};

const fazendoAVerificacaoDaExistenciaCPFDoCliente = async (dados) => {
  const { cpf } = dados;
  const buscando = await verificandoExistenciaDoCPFCliente({ cpf });

  return buscando.length > 0;
};

const fazendoABuscaDoCliente = async (dados) => {
  const { id } = dados;
  return await buscandoCliente({ id });
};

const fazendoAtualizacaoDoCliente = async (dados) => {
  const { dadosDoClienteAtualizado, id } = dados;

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
  } = dadosDoClienteAtualizado;

  const dadosDoCliente = {
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

  const AtualizandoOCliente = await atualizandoDadosDoCliente({
    dadosDoCliente,
    id,
  });

  return !!AtualizandoOCliente;
};

const fazendoBuscaTodosOsClientes = async () => {
  return await buscarTodosOsClientes();
};

module.exports = {
  fazerCadastroDoCliente,
  fazendoAVerificacaoDaExistenciaDoCliente,
  fazendoAVerificacaoDaExistenciaCPFDoCliente,
  fazendoAtualizacaoDoCliente,
  fazendoABuscaDoCliente,
  fazendoBuscaTodosOsClientes,
};
