const express = require('express');
const fileSystem = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(timeSheets);
});

router.get('/getById', (req, res) => {
  const queryId = req.query.id;
  if (queryId) {
    const targetId = parseInt(queryId, 10);
    const targetTS = timeSheets.filter((current) => current.id === targetId).pop();
    if (targetTS) {
      res.send(targetTS);
    } else {
      res.status = 404;
      res.send(`Error: Time sheet with id=${targetId} not found.`);
    }
  } else {
    res.status = 400;
    res.send('Error: invalid request.');
  }
});
router.put('/editById', (req, res) => {
  const {
    id: reqId,
    date: newDate,
    description: newDescription,
    task: newTask,
  } = req.body;
  const indexOfTS = timeSheets.findIndex((element) => element.id === parseInt(reqId, 10));
  if (indexOfTS !== -1) {
    const {
      id,
      date: oldDate,
      description: oldDescription,
      task: oldTask,
    } = timeSheets[indexOfTS];
    const updatedTimesheet = {
      id,
      date: newDate || oldDate,
      description: newDescription || oldDescription,
      task: newTask || oldTask,
    };
    timeSheets[indexOfTS] = updatedTimesheet;
    fileSystem.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets, null, 4), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(`Timesheet modified\n ${JSON.stringify(updatedTimesheet, null, 4)}`);
      }
    });
  } else {
    res.send('Modify error: Timesheet not found');
  }
});
module.exports = router;
