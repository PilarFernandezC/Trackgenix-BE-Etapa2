const express = require('express');
const fileSystem = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getByDate', (req, res) => {
  const tSDate = req.query.date;
  if (tSDate) {
    const targetDate = tSDate;
    const targetTS = timeSheets.filter(
      (current) => current.date === targetDate,
    );
    if (targetTS.length > 0) {
      res.send(targetTS);
    } else {
      res.status = 404;
      res.send(`Error, time sheet with date= ${targetDate} not found.`);
    }
  } else {
    res.status = 400;
    res.send('Error, invalid request.');
  }
});

router.get('/getByDescription/:description', (req, res) => {
  const tSDescription = req.params.description;
  if (tSDescription) {
    const targetDesc = tSDescription;
    const targetTS = timeSheets.filter(
      (current) => current.description === targetDesc,
    );
    if (targetTS.length > 0) {
      res.send(targetTS);
    } else {
      res.status = 404;
      res.send(`Error, time sheet with description= ${targetDesc} not found.`);
    }
  } else {
    res.status = 400;
    res.send('Error, invalid request.');
  }
});

router.post('/add', (req, res) => {
  const newTimeSheet = req.body;
  timeSheets.push(newTimeSheet);
  fileSystem.writeFile(
    'src/data/time-sheets.json',
    JSON.stringify(timeSheets, null, 4),
    (err) => {
      if (err) {
        res.send('Cannot save new user');
      } else {
        res.send(`User created\n ${JSON.stringify(newTimeSheet)}`);
      }
    },
  );
});

router.delete('/deleteById/:id', (req, res) => {
  const timeSheetsId = parseInt(req.params.id, 10);
  const timeSheetsFilter = timeSheets.filter(
    (timeSheet) => timeSheet.id !== timeSheetsId,
  );
  fileSystem.writeFile(
    'src/data/time-sheets.json',
    JSON.stringify(timeSheetsFilter, null, 4),
    (err) => {
      if (err) {
        res.send('Cannot found the item');
      } else {
        res.send(
          `Item id: ${timeSheetsId} deleted\n${JSON.stringify(
            timeSheets,
            null,
            4,
          )}`,
        );
      }
    },
  );
});

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
  if (date.getTime() > refDate.getTime()) {
    return 1;
  }
  return date < refDate ? -1 : 0;
}
router.get('/filterBy/:filters', (req, res) => {
  const [
    fromDate, // dates are '-' separated. orderDate takes care of the different formats.
    toDate,
    descriptionContains,
    taskIs,
    taskContains,
  ] = req.params.filters.split(',').map((filter) => (filter !== '*' ? filter : undefined));
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
