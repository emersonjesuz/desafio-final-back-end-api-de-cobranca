const jwt = require("jsonwebtoken");

const {
  fazendoAVerificacaoDaExistenciaDoUsuarioId,
} = require("../conexao/usuarios/usuarios.conexao.servico");
const variaveis = require("../variaveis/tratamentoDeVariaveis");
const validarToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ message: "Não autorizado!" });

  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, variaveis.SENHA_JWT);
    if (!id) return res.status(401).json({ message: "Não autorizado!" });

    const verificarUsuario = await fazendoAVerificacaoDaExistenciaDoUsuarioId({
      id,
    });

    if (!verificarUsuario)
      return res.status(401).json({ message: "Não autorizado!" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Não autorizado!" });
  }
};

module.exports = validarToken;
