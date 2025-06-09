const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController');

// route to execute the tasks
router.post('/tasks/execute', taskController.executeTasks);

module.exports = router;