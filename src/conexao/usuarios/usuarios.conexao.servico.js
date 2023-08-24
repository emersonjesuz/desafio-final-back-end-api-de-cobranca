const {
  cadastrandoUsuarioNoBD,
  verificandoExistenciaDoUsuarioId,
  verificandoExistenciaDoUsuarioEmail,
  atualizarDadosDoUsuarioExistente,
  verificandoLoginDoUsuario,
  dadosDoPerfilDoUsuario,
} = require("./usuarios.conexao.repositorio");

const fazerCadastroDoUsuario = async (dados) => {
  const { nome, email, senha } = dados;

  return await cadastrandoUsuarioNoBD({ nome, email, senha });
};

const fazendoAVerificacaoDaExistenciaDoUsuarioId = async (dados) => {
  const { id } = dados;
  const buscando = await verificandoExistenciaDoUsuarioId({ id });

  return buscando.length > 0;
};
const fazendoAVerificacaoDaExistenciaDoUsuarioEmail = async (dados) => {
  const { email } = dados;
  const buscando = await verificandoExistenciaDoUsuarioEmail({ email });

  return buscando.length > 0;
};

const fazendoAtulizacaoDosDadosDoUsuario = async (dados) => {
  const { dadosDoUsuario, emailDoUsuarioLogado } = dados;
  const usuarioAtualizado = await atualizarDadosDoUsuarioExistente({
    dadosDoUsuario,
    emailDoUsuarioLogado,
  });
  return !!usuarioAtualizado;
};

const fazendoAVerificacaoDoLoginDoUsuario = async (dados) => {
  const { email } = dados;
  return await verificandoLoginDoUsuario({ email });
};

const buscandoOsDadosDoPerfilDoUsuario = (dados) => {
  const { id } = dados;
  return dadosDoPerfilDoUsuario({ id });
};
module.exports = {
  fazerCadastroDoUsuario,
  fazendoAVerificacaoDaExistenciaDoUsuarioId,
  fazendoAVerificacaoDaExistenciaDoUsuarioEmail,
  fazendoAtulizacaoDosDadosDoUsuario,
  fazendoAVerificacaoDoLoginDoUsuario,
  buscandoOsDadosDoPerfilDoUsuario,
};
