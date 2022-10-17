// const fs = require('fs');
// const employees = require('../data/employees.json');
const Employee = require('../models/Employee');

// function createEmployeeLocal(req, res) {
//   const newEmployee = req.body;
//   employees.push(newEmployee);
//   fs.writeFile('src/data/employees.json',
//     JSON.stringify(employees, null, 4),
//     (err) => {
//     if (err) {
//       res.send('Local database: Error writing to file system.');
//     } else {
//       res.send('Local database: Successful write.');
//     }
//   });
// }

async function createEmployeeMongo(req, res) {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({
      message: 'New employee successfully created.',
      data: req.body,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: `Failed to create document in database: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
}

// const employeeLocalDBController = {
//   create: createEmployeeLocal,
// };

const employeeDBController = {
  create: createEmployeeMongo,
};

module.exports = employeeDBController;
