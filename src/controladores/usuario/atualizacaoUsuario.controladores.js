const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const variaveis = require("../../variaveis/tratamentoDeVariaveis");
const {
  fazendoAtulizacaoDosDadosDoUsuario,
  buscandoOsDadosDoPerfilDoUsuario,
  fazendoAVerificacaoDoLoginDoUsuario,
} = require("../../conexao/usuarios/usuarios.conexao.servico");

const atualizacaoUsuario = async (req, res) => {
  const { nome, email, senha, cpf, telefone } = req.body;
  const { authorization } = req.headers;

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, variaveis.SENHA_JWT);
    const [usuario] = await buscandoOsDadosDoPerfilDoUsuario({
      id,
    });
    const emailEIgualDoUsuarioLogado = email === usuario.email;
    const emailJaExiste = await fazendoAVerificacaoDoLoginDoUsuario({ email });
    if (!emailEIgualDoUsuarioLogado) {
      if (emailJaExiste.length) {
        return res.status(401).json({ mensagem: "Email já cadastrado!" });
      }
    }

    const dadosParaFazerAtualizacao = {
      nome,
      email,
      senha: senha,
      cpf,
      telefone,
    };
    if (senha) {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      dadosParaFazerAtualizacao.senha = senhaCriptografada;
    }

    const usuarioAtualizado = await fazendoAtulizacaoDosDadosDoUsuario({
      dadosDoUsuario: dadosParaFazerAtualizacao,
      emailDoUsuarioLogado: usuario.email,
    });
    if (!usuarioAtualizado)
      return res
        .status(404)
        .json({ mensagem: "Dados do usuario não foram Atualizados!" });

    res.status(201).json({ mensagem: "Dados do usuario foram atualizados!" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
};

module.exports = atualizacaoUsuario;
