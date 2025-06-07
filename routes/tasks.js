const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// route to execute the tasks

router.post('execute', taskController.executeTasks);

module.exports = router;