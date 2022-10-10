const express = require('express');

const fs = require('fs');

const employees = require('../data/employees.json');

const router = express.Router();

router.post('/add', (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send('Failed creating new user');
    } else {
      res.send('User created successfully');
    }
  });
});

module.exports = router;
