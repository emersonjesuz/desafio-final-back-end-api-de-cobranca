const Joi = require("joi");

const validarEntradaDoCadastroDeCobranca = async (req, res, next) => {
  const { id: id_cliente } = req.params;
  const { descricao, status, valor, vencimento } = req.body;
  try {
    if (!id_cliente)
      return res.status(400).json({ mensagem: "informe um cliente!" });

    const validarEntrada = Joi.object({
      descricao: Joi.string().required().messages({
        "any.required": "O campo descricão precisa ser preencido !",
        "string.empty": "O campo descricão precisa ser preencido !",
      }),
      vencimento: Joi.date().required().messages({
        "any.required": "O campo vencimento precisa ser preencido !",
        "date.base": "O formato da data de vencimento esta invalido!",
      }),
    });

    await validarEntrada.validateAsync({
      descricao,
      vencimento,
    });

    const statusEValido = status === "pago" || status === "pendente";
    if (!statusEValido)
      return res.status(400).json({ mensagem: "Status da cobranca invalido!" });

    if (!valor)
      return res
        .status(400)
        .json({ mensagem: "A cobranca precisa de um valor!" });
    if (valor > 2147483647)
      return res
        .status(400)
        .json({ mensagem: " O valor excedeu o  maximo permitido!" });
    next();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validarEntradaDoCadastroDeCobranca;
