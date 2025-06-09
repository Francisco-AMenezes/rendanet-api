const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

// route to create a payment
router.post("/payments", paymentsController.createPayment);

// route to update a payment status (webhook)
router.post("/webhook", paymentsController.paymentWebhook);

// route to get payment status
router.get("/status", paymentsController.getPaymentStatus);

module.exports = router;