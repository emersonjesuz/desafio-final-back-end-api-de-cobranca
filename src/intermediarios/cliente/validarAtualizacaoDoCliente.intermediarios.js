const Joi = require("joi");

const validarEntradaDeAtualizacaoDoCliente = async (req, res, next) => {
  const { nome, email, cpf, telefone, cep } = req.body;
  const { id } = req.params;

  const convertendoTelefone = +telefone;
  const telefoneEValido = isNaN(convertendoTelefone);

  if (telefoneEValido && cpf)
    return res
      .status(400)
      .json({ mensagem: "Informe o Telefone apenas com numeros" });

  const convertendoCpf = +cpf;
  const cpfEValido = isNaN(convertendoCpf);

  if (cpfEValido && cpf)
    return res
      .status(400)
      .json({ mensagem: "Informe o CPF apenas com numeros" });

  if (cep && cep.length !== 8)
    return res.status(400).json({ mensagem: "Informe um cep valido" });
  try {
    const validarEntrada = Joi.object({
      id: Joi.number().integer().required().messages({
        "any.required": "Informe o indentificador do Cliente!",
        "number.integer": "Indentificador invalido!",
      }),
      nome: Joi.string().required().messages({
        "any.required": "O campo Nome precisa ser preencido !",
        "string.empty": "O campo Nome precisa ser preencido !",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "O campo Email precisa ser preencido !",
        "string.empty": "O campo Email precisa ser preencido !",
        "string.email": "Formato do Email Incorreto!",
      }),
      cpf: Joi.string().length(11).messages({
        "string.length": "cpf precisa ter 11 caracteres",
        "string.empty": "cpf precisa ter 11 caracteres",
      }),
      telefone: Joi.string().min(9).max(11).messages({
        "string.min": "O Telefone Precisa ter no minimo 9 caracteres!",
        "string.max": "O Telefone precisa ter no maximo 11 caracteres!",
      }),
    });
    await validarEntrada.validateAsync({
      id,
      nome,
      email,
      cpf,
      telefone,
    });

    next();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validarEntradaDeAtualizacaoDoCliente;
