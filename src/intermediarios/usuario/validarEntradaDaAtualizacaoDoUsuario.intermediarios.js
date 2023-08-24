const Joi = require("joi");

const validarEntradaDeAtualizacaoDoUsuario = async (req, res, next) => {
  const { nome, email, cpf, telefone, senha } = req.body;

  const convertendoTelefone = +telefone;
  const telefoneEValido = isNaN(convertendoTelefone);

  if (telefoneEValido && telefone)
    return res
      .status(400)
      .json({ mensagem: "Informe o Telefone apenas com numeros" });
  const convertendoCpf = +cpf;
  const cpfEValido = isNaN(convertendoCpf);

  if (cpfEValido && cpf)
    return res
      .status(400)
      .json({ mensagem: "Informe o CPF apenas com numeros" });

  try {
    const validarEntrada = Joi.object({
      nome: Joi.string().required().messages({
        "any.required": "O campo Nome precisa ser preencido !",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "O campo Email precisa ser preencido !",
        "string.email": "Formato do Email Incorreto!",
      }),
      senha: Joi.string().min(5).messages({
        "string.min": "A senha Precisa ter no minimo 5 caracteres!",
      }),
      cpf: Joi.string().length(11).messages({
        "string.length": "cpf precisa ter 11 caracteres",
      }),
      telefone: Joi.string().min(8).max(11).messages({
        "string.min": "O Telefone Precisa ter no minimo 8 caracteres!",
        "string.max": "O Telefone precisa ter no maximo 11 caracteres!",
      }),
    });

    await validarEntrada.validateAsync({ nome, email, senha, cpf, telefone });

    next();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validarEntradaDeAtualizacaoDoUsuario;
