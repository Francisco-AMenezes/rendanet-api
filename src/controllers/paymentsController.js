require("dotenv").config();
const { Payment } = require("../models");
const mercadoPago = require("mercadopago");
const { notify } = require("../routes/tasks");

// Initialize Mercado Pago SDK
const client = new mercadoPago.MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const paymentPreferences = new mercadoPago.Preference(client);

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

    // Create a payment preference for Mercado Pago
    const preference = {
      items: [
        {
          title: `Payment for Client ${client_id}`,
          unit_price: 1.0,
          quantity: 1,
        },
      ],
      external_reference: `${newPayment.id}`,
      notify_url: `${process.env.BASE_URL}/api/payments/webhook`,
    };

    // simulate returning from payment url
    const response = await paymentPreferences.create({ body: preference });
    const paymentUrl = response.init_point;

    res.status(201).json({
      success: true,
      payment_id: newPayment.id,
      url: paymentUrl,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error); // Adicione isso
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
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: `Payment with ID ${payment_id} not found`,
      });
    }

    payment.status = status;
    payment.consolidadetAte = new Date();
    await payment.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      error: `Error updating payment status: ${error.message}`,
    });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const { payment_id } = req.query;

    const payment = await Payment.findByPk(payment_id);
    if (!payment)
      return res.status(404).json({ error: "Pagamento não encontrado" });

    res.json({ status: payment.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};