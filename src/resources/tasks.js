const express = require('express');
const fs = require('fs');
const taskList = require('../data/tasks.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(taskList);
});

router.get('/getById/:id', (req, res) => {
  const taskIndex = parseInt(req.params.id, 10) - 1;
  const selectedTask = taskList[taskIndex];
  if (selectedTask) {
    res.send(selectedTask);
  } else {
    res.status(404);
    res.send(`Error: No task with id=${req.params.id} found.`);
  }
});

router.post('/add', (req, res) => {
  const newTask = req.body;
  taskList.push(newTask);
  fs.writeFile(
    'src/data/tasks.json',
    JSON.stringify(taskList, null, 4),
    (err) => {
      if (err) {
        res.send('Cannot save new task');
      } else {
        res.send(`Task added \n ${JSON.stringify(newTask)}`);
      }
    },
  );
});

router.delete('/deleteById/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  if (!(Number.isNaN(taskId))) {
    if (taskList.some((task) => task.id === taskId)) {
      const updatedTaskList = taskList.filter((task) => task.id !== taskId);
      const payload = JSON.stringify(updatedTaskList, null, 4);
      fs.writeFile('src/data/tasks.json', payload, (err) => {
        if (err) {
          res.status(500);
          res.send('Error: cannnot write to server files system. Nothing changed.');
        } else {
          res.send(`Task id=${req.params.id} successfully deleted.`);
        }
      });
    } else {
      res.status(404);
      res.send(`Error: No task with id=${req.params.id} found.`);
    }
  } else {
    res.status(400);
    res.send('Error: No id parameter provided.');
  }
});

router.get('/getByDescription/:description', (req, res) => {
  const taskDescription = req.params.description;
  if (taskDescription) {
    const targetDesc = taskDescription;
    const targetTask = taskList
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
