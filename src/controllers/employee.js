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

function validateFilterParams(filterParams) {
  const objKeys = Object.keys(filterParams); // Extract key names into array
  return Object.values(filterParams) // With an array of values do the following
    .reduce(((obj, cur, i) => (cur ? { ...obj, [objKeys[i]]: cur } : obj)), {});
  // Starting with an empty object, evaluate the current value
  // If it's undefined, return the obj in construction as is
  // If not, add a key with the current value. Result is an object with defined filter keys.
}

async function filterEmployeesMongo(req, res) {
  const {
    name, lastName, phone, email,
  } = req.query;
  const allowedFilterParams = {
    name, lastName, phone, email,
  };
  const filterParams = validateFilterParams(allowedFilterParams);
  try {
    const filteredEmployees = await Employee.find(filterParams);
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
