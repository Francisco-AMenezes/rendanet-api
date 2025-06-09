const { Client, Installation } = require("../models");

exports.initInstallation = async (req, res) => {
  try {
    const { cpf, name, code, email, phone } = req.body;

    // create or find a client
    let client = await Client.findOne({ where: { cpf } });

    if (!client) {
      client = await Client.create({ cpf, name, email, phone });
    }

    // create installation
    const installation = await Installation.create({
      client_id: client.id,
      is_active: true,
      code: code
    });
    res.status(201).json({ success: true, installation_id: installation.id, installation_code: installation.code });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erro ao inicializar a instalação: ${error.message}` });
  }
};
