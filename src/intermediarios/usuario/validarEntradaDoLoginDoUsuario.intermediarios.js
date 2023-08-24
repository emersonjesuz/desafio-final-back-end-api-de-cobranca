const Joi = require("joi");

const validarEntradaDoLoginDoUsuario = async (req, res, next) => {
  const { email, senha } = req.body;
  try {
    const validarEntrada = Joi.object({
      email: Joi.string().email().required().messages({
        "any.required": "O campo Email precisa ser preencido !",
        "string.email": "Formato do Email Incorreto!",
      }),
      senha: Joi.string().min(5).required().messages({
        "any.required": "O campo Senha precisa ser preencido !",
        "string.min": "A senha Precisa Ter mais De 5 caracteres!",
      }),
    });

    await validarEntrada.validateAsync({ email, senha });
    next();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validarEntradaDoLoginDoUsuario;
