const express = require('express');
// const fileSystem = require('fs');
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

module.exports = router;
