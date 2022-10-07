const express = require('express');
const fileSystem = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
    res.send(timeSheets);
});
module.exports = router;