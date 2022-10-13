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

module.exports = router;
