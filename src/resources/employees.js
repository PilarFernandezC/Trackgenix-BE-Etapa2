const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const employeesRouter = express.Router();
employeesRouter.get('/getAll', (req, res) => {
  res.send(employees);
});
employeesRouter.get('/getEmployee/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const findEmployee = employees.find((employee) => employee.id === employeeId);
  console.log(findEmployee)
  if (findEmployee) {
    res.send(findEmployee);
  } else {
    res.send("Employee dosen't exist");
  }
});
employeesRouter.put('/editEmployee/:id', (req, res) => {
  const employeeId = req.params.id;
  const employeeEdit = req.body;
  const employeeFilter = employees.filter((employee) => `${employee.id}` !== employeeId);
  employeeFilter.push(employeeEdit);
  fs.writeFile('src/data/employees.json', JSON.stringify(employeeFilter,null,4), (err) => {
    if (err) {
      res.status(400).send('Error');
    } else {
      res.send('Employee Updated');
    }
  });
});

module.exports = employeesRouter;
