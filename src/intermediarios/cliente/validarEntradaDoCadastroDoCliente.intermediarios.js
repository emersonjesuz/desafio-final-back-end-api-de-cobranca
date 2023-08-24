const Joi = require("joi");

const validarEntradaDoCadastroDoCliente = async (req, res, next) => {
  const { nome, email, cpf, telefone, cep } = req.body;

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

  if (cep && cep.length !== 8)
    return res.status(400).json({ mensagem: "Informe um cep valido" });
  try {
    const validarEntrada = Joi.object({
      nome: Joi.string().required().messages({
        "any.required": "O campo Nome precisa ser preencido !",
        "string.empty": "O campo Nome precisa ser preencido !",
      }),
      email: Joi.string().email().required().messages({
        "any.required": "O campo Email precisa ser preencido !",
        "string.empty": "O campo Email precisa ser preencido !",
        "string.email": "Formato do Email Incorreto!",
      }),
      telefone: Joi.string().min(9).max(11).required().messages({
        "any.required": "O campo Telefone precisa ser preencido !",
        "string.empty": "O campo Telefone precisa ser preencido !",
        "string.min": "O Telefone Precisa ter no minimo 9 caracteres!",
        "string.max": "O Telefone precisa ter no maximo 11 caracteres!",
      }),
      cpf: Joi.string().length(11).required().messages({
        "any.required": "O campo CPF precisa ser preencido !",
        "string.empty": "O campo CPF precisa ser preencido !",
        "string.length": "Formato do CPF Incorreto!",
      }),
    });

    await validarEntrada.validateAsync({ nome, email, cpf, telefone });
    next();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validarEntradaDoCadastroDoCliente;
