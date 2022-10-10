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

router.delete('/delete/:id', (req, res) => {
  const employeeId = req.params.id;
  const remainingEmployees = employees.filter((employee) => employee.id !== employeeId);
  fs.writeFile('src/data/employees.json', JSON.stringify(remainingEmployees), (err) => {
    if (err) {
      res.send('Failed deleting user');
    } else {
      res.send('User deleted successfully');
    }
  });
});

module.exports = router;
