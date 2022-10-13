const fs = require('fs');
const express = require('express');
const tasks = require('../data/tasks.json');

const router = express.Router();

router.put('/edit/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskToEdit = tasks.find((task) => task.id === taskId);
  if (taskToEdit) {
    const editTask = req.body;
    tasks.forEach((tk) => {
      if (tk.id === parseInt(req.params.id, 10)) {
        taskToEdit.id = editTask.id ? editTask.id : tk.id;
        taskToEdit.description = editTask.description ? editTask.description : tk.description;
        fs.writeFile('src/data/tasks.json', JSON.stringify(tasks, null, 2), (err) => {
          if (err) {
            res.send('task error');
          } else {
            res.send('task updated');
          }
        });
        res.json({ taskToEdit });
      }
    });
  }
});
module.exports = router;
