const express = require('express');
const fileSystem = require('fs');
const tasks = require('../data/tasks.json');

const router = express.Router();

router.post('/add', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  fileSystem.writeFile(
    'src/data/tasks.json',
    JSON.stringify(tasks, null, 4),
    (err) => {
      if (err) {
        res.send('Cannot save new task');
      } else {
        res.send(`Task added \n ${JSON.stringify(newTask)}`);
      }
    },
  );
});

router.get('/getByDescription/:description', (req, res) => {
  const taskDescription = req.params.description;
  if (taskDescription) {
    const targetDesc = taskDescription;
    const targetTask = tasks
      .filter((current) => current.description === targetDesc);
    if (targetTask.length > 0) {
      res.send(targetTask);
    } else {
      res.status = 404;
      res.send(`ERROR, task with description: ${targetDesc} not found.`);
    }
  } else {
    res.status = 400;
    res.send('ERROR, invalid request.');
  }
});

module.exports = router;
