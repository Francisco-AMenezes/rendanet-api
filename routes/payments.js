const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

// route to create a payment

router.post("/payments", paymentsControllercreatePayment);

module.exports = router;

// route to uptade the payment status

router.post('/webhook', paymentsController.updatePaymentStatus);

// route to check the payment status

router.get('status', paymentsController.getPaymentStatus);