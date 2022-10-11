const express = require('express');
const fileSystem = require('fs');
const tasks = require('../data/tasks.json');

const router = express.Router();

router.post('/addNewTask', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    fileSystem.writeFile('src/data/tasks.json', JSON.stringify(tasks, null, 4), (err) => {
      if (err) {
        res.send('Cannot save new task');
      } else {
        res.send(`Task added \n ${JSON.stringify(newTask)}`);
      }
    });
  });

  router.get('/getTaskByDesc', (req, res) => {
    const queryDescription = req.query.description;
    if (queryDescription) {
      const targetDesc = (queryDescription);
      const targetTask = tasks.filter((current) => current.description === targetDesc).pop();
      if (targetTask) {
        res.send(targetTask);
      } else {
        res.status = 404;
        res.send(`Error, task with description= ${targetDesc} not found.`);
      }
    } else {
      res.status = 400;
      res.send('Error, invalid request.');
    }
  });

  module.exports = router;