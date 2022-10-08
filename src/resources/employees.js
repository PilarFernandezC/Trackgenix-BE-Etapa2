const express = require('express');
const employees = require('../data/employees.json');

const employeesRouter = express.Router();
employeesRouter.get('/getAll', (req, res) => {
  res.send(employees);
});
employeesRouter.get('/getEmployee/:id', (req, res) => {
  const employeeId = req.params.id;
  const findEmployee = employees.find((employee) => employee.id === employeeId);
  if (findEmployee) {
    res.send(findEmployee);
  } else {
    res.send("Employee dosen't exist");
  }
});
module.exports = employeesRouter;
