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

export default {
  getEmployeeById,
};
