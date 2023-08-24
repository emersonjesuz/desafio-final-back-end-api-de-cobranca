const Joi = require("joi");

const validarEntradaDoCadastroDoUsuario = async (req, res, next) => {
  const { nome, email, senha } = req.body;
  try {
    const validarEntrada = Joi.object({
      nome: Joi.string().required().messages({
        "any.required": "O campo Nome precisa ser preenchido !",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "O campo Email precisa ser preenchido !",
        "string.email": "Formato do Email Incorreto!",
      }),
      senha: Joi.string().min(5).required().messages({
        "any.required": "O campo Senha precisa ser preenchido !",
        "string.min": "A senha Precisa Ter mais De 5 caracteres!",
      }),
    });

    await validarEntrada.validateAsync({ nome, email, senha });
    next();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validarEntradaDoCadastroDoUsuario;
