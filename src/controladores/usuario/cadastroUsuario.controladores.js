const {
  fazerCadastroDoUsuario,
  fazendoAVerificacaoDaExistenciaDoUsuarioEmail,
} = require("../../conexao/usuarios/usuarios.conexao.servico");
const bcrypt = require("bcrypt");

const cadastroUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = {
      nome,
      email,
      senha: senhaCriptografada,
    };

    const verificandoUsuario =
      await fazendoAVerificacaoDaExistenciaDoUsuarioEmail({
        email,
      });

    if (verificandoUsuario)
      return res.status(401).json({ mensagem: " email ja existe!" });

    await fazerCadastroDoUsuario(novoUsuario);

    res.status(201).json({ mensagem: "Usuario cadastrado!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = cadastroUsuario;
