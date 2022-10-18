import Employee from '../models/Employee';

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    return res.status(200).json({
      message: 'Employee found',
      data: employee,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error has ocurred: ${error}`,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
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
    const employeeFoundById = await Employee.findByIdAndDelete(req.params.id);
    if (employeeFoundById === ' ') {
      return res.status(404).json({
        message: 'Error: Could not get the selected employee',
      });
    }
    return res.status(204).json({
      message: `Employee with the ID ${req.params.id} has been deleted.`,
      data: employeeFoundById,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error has ocurred: ${error}`,
    });
  }
};

export default {
  getEmployeeById,
  editEmployee,
  deleteEmployee,
};
