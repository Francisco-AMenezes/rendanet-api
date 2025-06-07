const { Client, Installation } = require("../models");

exports.initInstallation = async (req, res) => {
    try{
        const {cpf, name, code} = req.body;

        // create or find a client
        let client = await Client.findOne({ where: { cpf } });
        if(!cpf || !name || !code) {
            return res.status(400).json({ error: "CPF, nome e código são obrigatórios."});
        }

        // create installation 
        const installation = await Installation.create({
            client_id: client.isSoftDeleted,
            is_active: true,
        })
        res.status(201).json({ success: true, installation_id: installation.id });
    } catch (error) {
        res.status(500).json({ error: `Erro ao inicializar a instalação: ${error.message}`})
    }
}