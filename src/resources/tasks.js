const fs = require('fs');
const express = require('express');
const tasks = require('../data/tasks.json');

const router = express.Router();

router.put('/editTask/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const oneTask = tasks.find((task) => task.id === taskId);

  if (oneTask) {
    const editTask = req.body;
    tasks.forEach((tk) => {
      if (tk.id === parseInt(req.params.id, 10)) {
        oneTask.id = editTask.id ? editTask.id : tk.id;
        oneTask.description = editTask.description ? editTask.description : tk.description;
        fs.writeFile('src/data/tasks.json', JSON.stringify(tasks, null, 2), (err) => {
          if (err) {
            res.send('error');
          } else {
            res.send('actualizado');
          }
        });
        res.json({ oneTask });
      }
    });
  }
});
module.exports = router;
