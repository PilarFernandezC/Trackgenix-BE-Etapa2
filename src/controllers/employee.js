const Employee = require('../models/Employee');

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

async function fileterEmployeesMongo(req, res) {
  try {
    const filteredEmployees = await Employee.find(req.body);
    res.status(200).json({
      message: 'List of employees that match the request criteria successfully retrieved.',
      data: filteredEmployees,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: `Failed to retrieve documents in database: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
}

const employeeDBController = {
  create: createEmployeeMongo,
  filter: fileterEmployeesMongo,
};

module.exports = employeeDBController;
