const jwt = require("jsonwebtoken");
const {
  buscandoOsDadosDoPerfilDoUsuario,
} = require("../../conexao/usuarios/usuarios.conexao.servico");
const variaveis = require("../../variaveis/tratamentoDeVariaveis");

const perfilDoUsuarioLogado = async (req, res) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, variaveis.SENHA_JWT);

    const [dadosDoUsuarioLogado] = await buscandoOsDadosDoPerfilDoUsuario({
      id,
    });

    const { senha: _, ...usuario } = dadosDoUsuarioLogado;
    res.json({ usuario });
  } catch (error) {
    res.status(500).json({ mensagem: "erro interno do servidor!" });
  }
};

module.exports = perfilDoUsuarioLogado;
