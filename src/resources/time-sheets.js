const express = require('express');
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

module.exports = router;
