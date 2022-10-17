import Employee from '../models/Employee';

async function createEmployeeMongo(req, res) {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({
      message: 'New employee successfully created.',
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      message: `Failed to create document in database: ${error.message}`,
    });
  }
}

async function filterEmployeesMongo(req, res) {
  const {
    name, lastName, phone, email,
  } = req.query;
  const allowedFilterParams = {
    name, lastName, phone, email,
  };
  const getAll = Object.values(allowedFilterParams)
    .reduce(((acc, cur) => acc && cur === undefined), true);
  const objKeys = Object.keys(allowedFilterParams);
  const filterParams = Object.values(allowedFilterParams)
    .reduce(((obj, cur, i) => (cur ? { ...obj, [objKeys[i]]: cur } : obj)), {});
  try {
    const filteredEmployees = await Employee.find(getAll ? {} : filterParams);
    res.status(200).json({
      message: 'List of employees matching the query params was successfully retrieved.',
      data: filteredEmployees,
    });
  } catch (error) {
    res.status(400).json({
      message: `Failed to retrieve documents in database: ${error.message}`,
    });
  }
}

const employeeDBController = {
  create: createEmployeeMongo,
  filter: filterEmployeesMongo,
};

export default employeeDBController;
