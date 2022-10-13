const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.post('/add', (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees, null, 4), (err) => {
    if (err) {
      res.send('Failed creating new employee');
    } else {
      res.send('Employee created successfully');
    }
  });
});

router.delete('/delete/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employeeToDelete = employees.some((employee) => employee.id === employeeId);
  if (employeeToDelete) {
    const remainingEmployees = employees.filter((employee) => employee.id !== employeeId);
    fs.writeFile('src/data/employees.json', JSON.stringify(remainingEmployees, null, 4), (err) => {
      if (err) {
        res.send('Failed deleting employee');
      } else {
        res.send('Employee deleted successfully');
      }
    });
  } else {
    res.send('ID does not exist');
  }
});

router.get('/filterByName/:first_name', (req, res) => {
  const firstName = req.params.first_name;
  const filterEmployees = employees.filter((employee) => employee.first_name.includes(firstName));
  if (filterEmployees.length > 0) {
    res.send(JSON.stringify(filterEmployees, null, 4));
  } else {
    res.send('Employee does not exist');
  }
});

module.exports = router;
