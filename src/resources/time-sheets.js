const express = require('express');
const fileSystem = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getByDate', (req, res) => {
  const queryDate = req.query.date;
  if (queryDate) {
    const targetDate = (queryDate);
    const targetTS = timeSheets.filter((current) => current.date === targetDate).pop();
    if (targetTS) {
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

router.get('/getByDesc', (req, res) => {
  const queryDescription = req.query.description;
  if (queryDescription) {
    const targetDesc = (queryDescription);
    const targetTS = timeSheets.filter((current) => current.description === targetDesc).pop();
    if (targetTS) {
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
  fileSystem.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets, null, 4), (err) => {
    if (err) {
      res.send('Cannot save new user');
    } else {
      res.send(`User created\n ${JSON.stringify(newTimeSheet)}`);
    }
  });
});

router.delete('/deleteById', (req, res) => {
  const timeSheetsId = parseInt(req.query.id, 10);
  const timeSheetsFilter = timeSheets.filter((timeSheet) => timeSheet.id !== timeSheetsId);
  fileSystem.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheetsFilter, null, '\n'), (err) => {
    if (err) {
      res.send('Cannot found the item');
    } else {
      res.send(`Item id=${timeSheetsId} deleted\n${JSON.stringify(timeSheets, null, '\n')}`);
    }
  });
});

module.exports = router;
