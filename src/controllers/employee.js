import Employee from '../models/Employee';

const getEmployeeById = async (req, res) => {
  try {
    // const { id } = req.params;
    const employee = await Employee.findById(req.params.id);
    return res.status(200).json({
      message: 'Employee found',
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Error',
      error: true,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    // const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true },
    );
    return res.status(200).json({
      message: `Employee with the ID ${req.params.id} has been updated.`,
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'ERROR',
      error: true,
    });
  }
};

export default {
  getEmployeeById,
  editEmployee,
};
