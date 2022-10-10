const express = require('express');
const taskList = require('../data/tasks.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(taskList);
});

module.exports = router;
