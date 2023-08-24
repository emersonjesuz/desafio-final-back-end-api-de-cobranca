const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  fazendoAVerificacaoDoLoginDoUsuario,
} = require("../../conexao/usuarios/usuarios.conexao.servico");
const variaveis = require("../../variaveis/tratamentoDeVariaveis");

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await fazendoAVerificacaoDoLoginDoUsuario({ email });
    if (!usuario.length)
      return res
        .status(400)
        .json({ mensagem: "Email ou senha estão incorreto!" });

    const { id, senha: senhaCriptografada } = usuario[0];

    const senhaEstarCorreta = await bcrypt.compare(senha, senhaCriptografada);

    if (!senhaEstarCorreta)
      return res
        .status(400)
        .json({ mensagem: "Email ou senha estão incorreto!" });

    const token = jwt.sign({ id }, variaveis.SENHA_JWT, {
      expiresIn: "8h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao realizar login" });
  }
};

module.exports = loginUsuario;
