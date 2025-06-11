const { Payment } = require("../models");

exports.createPayment = async (req, res) => {
  try {
    const { client_id, payment_method, payment_gateway } = req.body;

    const newPayment = await Payment.create({
      client_id: client_id,
      payment_method: payment_method,
      payment_gateway: payment_gateway,
      status: "pending",
      created_at: new Date(),
    });

    // simulate returning from payment url
    const paymentUrl = `https://gordopay.com/payments/${newPayment.id}`;

    res.status(201).json({
      success: true,
      payment_id: newPayment.id,
      url: paymentUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.paymentWebhook = async (req, res) => {
    try {
        const { payment_id, status } = req.body;

        const payment = await Payment.findByPk(payment_id);
        if(!payment) {
            return res.status(404).json({
                success: false,
                error: `Payment with ID ${payment_id} not found`
            })
        }

        payment.status = status;
        payment.consolidadetAte = new Date();
        await payment.save();

        res.json({success: true});
    } catch (error) {
        res.status(500).json({
            error: `Error updating payment status: ${error.message}`
        })
    }
}

exports.getPaymentStatus = async (req, res) => {
    try {
      const { payment_id } = req.query;
  
      const payment = await Payment.findByPk(payment_id);
      if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
  
      res.json({ status: payment.status });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };