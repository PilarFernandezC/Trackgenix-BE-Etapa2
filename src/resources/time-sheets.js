const express = require('express');
const fileSystem = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(timeSheets);
});

router.get('/getById/:id', (req, res) => {
  const queryId = req.params.id;
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
router.put('/editById/:id', (req, res) => {
  const reqId = req.params.id;
  if (reqId) {
    const {
      id: newId,
      date: newDate,
      description: newDescription,
      task: newTask,
    } = req.body;
    const indexOfTS = timeSheets.findIndex((element) => element.id === parseInt(reqId, 10));
    if (indexOfTS !== -1) {
      const {
        id: oldId,
        date: oldDate,
        description: oldDescription,
        task: oldTask,
      } = timeSheets[indexOfTS];
      const updatedTimesheet = {
        id: newId || oldId,
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
      res.send(`Error: Timesheet id=${reqId} not found`);
    }
  } else {
    res.status = 400;
    res.send('Error: no id specified.');
  }
});
function orderDate(dateStr, refDateStr) {
  const date = new Date(dateStr);
  const refDate = new Date(refDateStr);
  if (date > refDate) {
    return 1;
  }
  return date < refDate ? -1 : 0;
}
router.get('/filterBy', (req, res) => {
  const {
    fromDate,
    toDate,
    descriptionContains,
    taskIs,
    taskContains,
  } = req.query;
  if (
    (fromDate
    || toDate
    || descriptionContains
    || taskIs
    || taskContains) !== undefined
  ) {
    let filteredTSs = [...timeSheets];
    if (fromDate) {
      filteredTSs = filteredTSs.filter((ts) => orderDate(ts.date, fromDate) > -1);
    }
    if (toDate) {
      filteredTSs = filteredTSs.filter((ts) => orderDate(ts.date, toDate) < 1);
    }
    if (descriptionContains) {
      filteredTSs = filteredTSs.filter((ts) => ts.description.includes(descriptionContains));
    }
    if (taskIs) {
      filteredTSs = filteredTSs.filter((ts) => ts.task.localeCompare(taskIs) === 0);
    }
    if (taskContains) {
      filteredTSs = filteredTSs.filter((ts) => ts.task.includes(taskContains));
    }
    res.send(filteredTSs);
  } else {
    res.status = 400;
    res.send('Error: no filtering parameters specified.');
  }
});
module.exports = router;
