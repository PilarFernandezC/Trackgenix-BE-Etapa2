const express = require('express');
const taskList = require('../data/tasks.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(taskList);
});

router.get('/getById', (req, res) => {
  const taskIndex = parseInt(req.query.id, 10) - 1;
  const selectedTask = taskList[taskIndex];
  if (selectedTask) {
    res.send(selectedTask);
  } else {
    res.status(404);
    res.send(`Error: No task with id=${req.query.id} found.`);
  }
});

module.exports = router;
