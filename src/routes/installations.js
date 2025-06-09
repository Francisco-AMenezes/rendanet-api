const express = require('express');
const router = express.Router();
const installationsController = require('../controllers/installationsController');

// route to register a new installation
router.post('/installation/init', installationsController.initInstallation);

module.exports = router;