const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const employeesRouter = express.Router();
employeesRouter.get('/getAll', (req, res) => {
  res.send(employees);
});
employeesRouter.get('/getById/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const findEmployee = employees.find((employee) => employee.id === employeeId);
  if (findEmployee) {
    res.send(findEmployee);
  } else {
    res.send("Employee doesn't exist");
  }
});
employeesRouter.put('/update/:id', (req, res) => {
  const employeeId = req.params.id;
  const updatedData = req.body;
  const selectedEmployee = employees.filter((employee) => `${employee.id}` !== employeeId);
  selectedEmployee.push(updatedData);
  fs.writeFile('src/data/employees.json', JSON.stringify(selectedEmployee, null, 4), (err) => {
    if (err) {
      res.status(400).send('Error');
    } else {
      res.send('Employee Updated');
    }
  });
});

module.exports = employeesRouter;
