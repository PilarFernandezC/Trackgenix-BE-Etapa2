import firebaseApp from '../helpers/firebase/index';
import Employee from '../models/Employee';

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Employee not found.', status: 404,
      };
    } else {
      return res.status(200).json({
        message: 'Employees found.',
        data: employee,
      });
    }
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const validateFilterParams = (filterParams) => {
  const objKeys = Object.keys(filterParams); // Extract key names into array
  return Object.values(filterParams) // With an array of values do the following
    .reduce(((obj, cur, i) => (cur ? { ...obj, [objKeys[i]]: cur } : obj)), {});
  // Starting with an empty object, evaluate the current value
  // If it's undefined, return the obj in construction as is
  // If not, add a key with the current value. Result is an object with defined filter keys.
};

const filterEmployees = async (req, res) => {
  const {
    name, lastName, phone, email,
  } = req.query;
  const allowedFilterParams = {
    name, lastName, phone, email,
  };
  const filterParams = validateFilterParams(allowedFilterParams);
  try {
    if (!filterParams) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Employee not found.', status: 404,
      };
    }
    const filteredEmployees = await Employee.find(filterParams);
    res.status(200).json({
      message: 'Employees found.',
      data: filteredEmployees,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });

    const newEmployee = new Employee({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      firebaseUid: newFirebaseUser.uid,
    });
    await newEmployee.save();
    if (!newEmployee) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Could not create a new employee.', status: 404,
      };
    }
    res.status(201).json({
      message: 'New employee successfully created.',
      data: newEmployee,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const employeeUid = await Employee.findById(req.params.id);
    const employee = await Employee.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    await firebaseApp.auth().updateUser(employeeUid.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });
    if (!employee) {
      return res.status(404).json({
        message: 'Employee not found',
      });
    }
    return res.status(200).json({
      message: `Employee with the ID ${req.params.id} has been updated.`,
      data: employee,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error has ocurred: ${error}`,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    await firebaseApp.auth().deleteUser(employee.firebaseUid);
    const employeeFoundById = await Employee.findByIdAndDelete(req.params.id);
    if (employeeFoundById === ' ') {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Employee not found.', status: 404,
      };
    }
    res.status(204).json({
      message: `Employee with the ID ${req.params.id} has been deleted.`,
      data: employeeFoundById,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

export default {
  createEmployee,
  filterEmployees,
  getEmployeeById,
  editEmployee,
  deleteEmployee,
};
