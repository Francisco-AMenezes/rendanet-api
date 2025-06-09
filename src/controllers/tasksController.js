const { Client, Installation, Task } = require("../models");

exports.executeTasks = async (req, res) => {
  try {
    const { cpf, code, task_type, content } = req.body;

    // validade input
    const client = await Client.findOne({ where: { cpf } });
    const installation = await Installation.findOne({ where: { code } });

    if (!client || !installation) {
      return res
        .status(400)
        .json({ error: "Cliente ou isntalação não encontrados." });
    }

    // validade credit balance
    const cost = 1;
    if (client.credit_balance < cost) {
      return res.status(400).json({ error: "Saldo insuficiente." });
    }

    // show result
    const output = `Resultado convertido: ${content.toUpperCase()}`;

    // create task

    const task = await Task.create({
      installation_id: installation.id,
      task_type,
      output,
      credits_udes: cost,
    });

    // update client credit balance
    client.credit_balance -= cost;
    await client.save();

    // return response
    res.json({ success: true, result: output });
  } catch (error) {
    res.status(500).json({ error: "Houve um arro ao executar a tarefa." });
  }
};
